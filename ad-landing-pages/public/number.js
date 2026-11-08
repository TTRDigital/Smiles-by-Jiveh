/*
 * Call-number swap for the Smiles By Jiveh ad landing pages (Twilio tracking numbers).
 * Every phone link on a page carries data-phone-href (the tel: link) and, where the number
 * is shown as text, a data-phone-text child. This script replaces both with a tracking number
 * when the visit came from a mapped source. The number printed in the HTML stays the real
 * office line, so the page works with no script, and with no tracking number configured.
 *
 * Sources are remembered for the session, so the number does not change mid-visit.
 * Fill NUMBERS below with the Twilio numbers (E.164) once they exist. Until then nothing is swapped.
 * Optional per-campaign override: ?tn=+15615550123 is ignored on purpose (no way to inject numbers).
 */
(function () {
  "use strict";
  // key = source rule, value = Twilio number in E.164, e.g. "+15615550100". Empty = no swap.
  var NUMBERS = {
    "google-ads-offer": "", // offer.smilesbyjiveh.com, visits with gclid / utm_medium=cpc
    "google-ads-implant": "", // implant.smilesbyjiveh.com
    "google-ads": "", // any other paid Google visit
    "default": "" // everyone else (usually leave empty: the office line)
  };
  var STORE = "sbj_tn";

  function source() {
    var q = new URLSearchParams(location.search);
    var paid = q.get("gclid") || q.get("gbraid") || q.get("wbraid") || /^(cpc|ppc|paid)/i.test(q.get("utm_medium") || "");
    var page = location.hostname.indexOf("implant") === 0 || /^\/implant/.test(location.pathname) ? "implant" : "offer";
    if (paid) return NUMBERS["google-ads-" + page] ? "google-ads-" + page : "google-ads";
    return "default";
  }

  function format(e164) {
    var d = e164.replace(/\D/g, "");
    if (d.length === 11 && d[0] === "1") d = d.slice(1);
    return d.length === 10 ? "+1 " + d.slice(0, 3) + "-" + d.slice(3, 6) + "-" + d.slice(6) : e164;
  }

  function apply(e164) {
    if (!/^\+\d{10,15}$/.test(e164)) return;
    document.querySelectorAll("[data-phone-href]").forEach(function (a) { a.setAttribute("href", "tel:" + e164); });
    document.querySelectorAll("[data-phone-text]").forEach(function (s) { s.textContent = format(e164); });
  }

  var key, saved = null;
  try { saved = sessionStorage.getItem(STORE); } catch (e) {}
  if (saved) { try { saved = JSON.parse(saved); } catch (e) { saved = null; } }
  if (!saved) {
    key = source();
    saved = { k: key, n: NUMBERS[key] || "" };
    // A paid visit keeps its number even if the next page view has no gclid.
    try { if (saved.n) sessionStorage.setItem(STORE, JSON.stringify(saved)); } catch (e) {}
  }
  if (saved.n) {
    apply(saved.n);
    (window.dataLayer = window.dataLayer || []).push({ event: "call_number_swapped", number_source: saved.k });
  }
})();
