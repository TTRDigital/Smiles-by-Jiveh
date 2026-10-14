<?php
/*
 * Appointment form handler for SiteGround (the static site has no Node server).
 * Validates the request like the form does, filters spam and posts it to the
 * practice's GoHighLevel inbound webhook as flat JSON.
 *
 * The webhook URL is NOT in this file. Until it is set, requests are accepted
 * (the visitor sees the thank-you message) but not sent anywhere. Set it with
 * lead-config.php next to public_html or in this folder (blocked from the web
 * by .htaccess) returning ['webhook_url' => 'https://...']. The deploy
 * workflow writes it from the GHL_WEBHOOK_URL GitHub secret.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

function reply(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    reply(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

// Same-site posts only.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = strtolower(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));
if ($origin !== '' && strtolower((string) parse_url($origin, PHP_URL_HOST)) !== $host) {
    reply(403, ['ok' => false, 'error' => 'Forbidden.']);
}

/* Best-effort per-IP rate limit: 10 requests per 10 minutes. */
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$bucket = sys_get_temp_dir() . '/sbj-lead-' . md5($ip);
$now = time();
$recent = array_filter(
    json_decode((string) @file_get_contents($bucket), true) ?: [],
    fn($t) => is_int($t) && $now - $t < 600
);
$recent[] = $now;
@file_put_contents($bucket, json_encode(array_values($recent)), LOCK_EX);
if (count($recent) > 10) {
    reply(429, ['ok' => false, 'error' => 'Too many requests. Please call us instead.']);
}

$raw = file_get_contents('php://input', false, null, 0, 64 * 1024);
$in = json_decode((string) $raw, true);
if (!is_array($in)) {
    reply(400, ['ok' => false, 'error' => 'Invalid request.']);
}

function text(array $in, string $key, int $max): string {
    $v = $in[$key] ?? '';
    if (!is_string($v)) return '';
    return mb_substr(trim($v), 0, $max);
}

// Keep in sync with lib/lead-options.ts.
$services = [
    'General Dentistry', 'Dental Cleanings', 'Dental Bridges', 'Dental Crowns', 'Dentures', 'Oral Surgery',
    'Sedation Dentistry', 'Root Canal Treatment', 'TMJ Treatment', 'Cosmetic Dentistry', 'Smile Makeovers',
    'Invisalign', 'Clear Aligners', 'Teeth Whitening', 'Tooth-Colored Fillings', 'Dental Veneers', 'Dental Implants',
    'Gum Therapy', 'Laser Dental Treatment', 'Sleep Apnea Treatment', 'Reconstructive / Advanced Dentistry',
    'All on 4 Teeth in a Day', 'Reconstructive Dentistry', 'Full Mouth Reconstruction', 'Worn Teeth Rehabilitation',
];

$lead = [
    'first_name' => text($in, 'first_name', 80),
    'last_name' => text($in, 'last_name', 80),
    'phone' => text($in, 'phone', 40),
    'email' => text($in, 'email', 200),
    'preferred_time' => text($in, 'preferred_time', 40),
    'service' => text($in, 'service', 80),
    'message' => text($in, 'message', 3000),
];

// Phone and email are required, as on the old form.
$errors = [];
if (strlen(preg_replace('/\D/', '', $lead['phone'])) < 10) $errors['phone'] = 'Please enter a phone number with area code.';
if (!filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Please enter a valid email address.';
if ($lead['service'] !== '' && !in_array($lead['service'], $services, true)) $lead['service'] = '';
if ($lead['preferred_time'] !== '' && !preg_match('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/', $lead['preferred_time'])) $lead['preferred_time'] = '';
if (($in['consent'] ?? false) !== true) $errors['consent'] = 'Please agree so we can contact you.';
if ($errors) {
    reply(422, ['ok' => false, 'error' => 'Please check the form.', 'fields' => $errors]);
}

// Spam: drop only when both signals agree (hidden field filled AND sent faster
// than a person can type). One signal alone can be autofill or a fast typist,
// so that request is delivered with a "suspected-spam" tag.
$trapFilled = text($in, 'hp_sbj', 200) !== '';
$elapsed = is_int($in['elapsed_ms'] ?? null) ? $in['elapsed_ms'] : null;
$tooFast = $elapsed !== null && $elapsed < 2500; // MIN_FILL_MS in lib/lead-options.ts
if ($trapFilled && $tooFast) {
    reply(200, ['ok' => true]);
}
$spamCheck = $trapFilled ? 'suspect: hidden field filled' : ($tooFast ? "suspect: sent in {$elapsed} ms" : 'ok');

// Settings
$config = [];
foreach ([dirname(__DIR__, 2) . '/lead-config.php', __DIR__ . '/lead-config.php'] as $file) {
    if (is_file($file)) {
        $config = (array) include $file;
        break;
    }
}
$webhook = trim((string) ($config['webhook_url'] ?? getenv('GHL_WEBHOOK_URL') ?: ''), " \t\n\r\0\x0B\"'");
if ($webhook === '') {
    // Not configured yet: accept the request so the visitor is not stuck, but say so in the error log.
    error_log('[lead] No GoHighLevel webhook configured: appointment request accepted but NOT sent.');
    reply(200, ['ok' => true, 'delivered' => false]);
}
// https only (plain http allowed for a local test receiver).
$whHost = strtolower((string) parse_url($webhook, PHP_URL_HOST));
if (!preg_match('#^https://#', $webhook) && !in_array($whHost, ['127.0.0.1', 'localhost'], true)) {
    error_log('[lead] GHL webhook URL is not https: request accepted but NOT sent. Check lead-config.php.');
    reply(200, ['ok' => true, 'delivered' => false]);
}

/** E.164 for US numbers. */
$digits = preg_replace('/\D/', '', $lead['phone']);
if (strlen($digits) === 10) $phone = '+1' . $digits;
elseif (strlen($digits) === 11 && $digits[0] === '1') $phone = '+' . $digits;
else $phone = (str_starts_with($lead['phone'], '+') ? '+' : '') . $digits;

$name = trim($lead['first_name'] . ' ' . $lead['last_name']);
$tags = ['website-appointment-request'];
if ($lead['service'] !== '') $tags[] = 'service-' . trim(preg_replace('/[^a-z0-9]+/', '-', strtolower($lead['service'])), '-');
if ($spamCheck !== 'ok') $tags[] = 'suspected-spam';

$payload = [
    'source' => 'Website appointment form',
    'submitted_at' => gmdate('c'),
    'name' => $name,
    'first_name' => $lead['first_name'],
    'last_name' => $lead['last_name'],
    'email' => $lead['email'],
    'phone' => $phone,
    'phone_raw' => $lead['phone'],
    'preferred_date_time' => $lead['preferred_time'],
    'service' => $lead['service'],
    'comments' => $lead['message'],
    'consent' => true,
    'consent_text' => text($in, 'consent_text', 600),
    'tags' => $tags,
    'spam_check' => $spamCheck,
];
foreach (['page_url', 'landing_page', 'referrer', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'] as $key) {
    $payload[$key] = text($in, $key, 1000);
}

// One retry for rate limits, server errors and network failures.
$body = json_encode($payload);
for ($attempt = 0; $attempt < 2; $attempt++) {
    $ch = curl_init($webhook);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Accept: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 8,
    ]);
    $res = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    if ($status >= 200 && $status < 300) {
        reply(200, ['ok' => true, 'delivered' => true]);
    }
    error_log("[lead] GoHighLevel webhook answered {$status}: " . substr((string) $res, 0, 300));
    if ($status !== 0 && $status !== 429 && $status < 500) break;
    usleep(600000);
}

// Nothing saved the request: tell the visitor so they can call instead.
reply(502, ['ok' => false, 'error' => 'We could not send your request. Please call us instead.']);
