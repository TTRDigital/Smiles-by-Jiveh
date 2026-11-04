import type { Block, Treatment } from "../types";
import type { IconName } from "../icons.ts";
import { rich } from "../rich.ts";
import { images } from "./images.ts";

/*
 * More substance for the service area pages (TTR-1237): the longer sections that answer what patients ask, extra FAQs,
 * and four more pages (Invisalign and clear aligners, sedation, teeth whitening, dental implants).
 * Same rules as areas.ts: only facts already on this site or in the practice's brain, no prices, no promised results
 * or timelines, no claim that one treatment is better than another. For Kia's review, then Dr. Jiveh's written approval.
 */

const book = { label: "Book An Appointment", href: "/appointment/" };
const AREAS = ["Royal Palm Beach", "Wellington", "Palm Beach County", "The Western Communities"];
const card = (title: string, text: string, href: string, icon: IconName) => ({ title, text, href, icon });
const prose = (heading: string, eyebrow: string, ...lines: string[]): Block => ({ _type: "proseBlock", eyebrow, heading, text: rich(...lines) });

/** Sections inserted before the location card of each existing page. */
export const extraProse: Record<string, Block[]> = {
  "dentist-royal-palm-beach-fl": [
    prose(
      "What Comprehensive Dental Care Includes", "Our Services",
      "Good dentistry starts with a strong foundation. At our Royal Palm Beach office, general care means far more than a quick cleaning: it means finding small concerns early, protecting the teeth you have and planning ahead.",
      "#### Exams, cleanings and prevention",
      "Regular examinations, professional cleanings, digital imaging and early diagnosis help prevent small concerns from becoming complex problems. Our approach focuses on preventing disease and preserving your natural teeth. Learn more about [general dentistry](/general-dentistry/) and [dental cleanings](/dental-cleanings/).",
      "#### Healthy gums",
      "Healthy gums are essential to a healthy smile and to your overall health. We provide [gum therapy](/gum-therapy/) and periodontal care, and some patients choose saliva and genetic testing to personalize their care.",
      "#### Repairing and restoring teeth",
      "When a tooth needs attention, we offer [tooth-colored fillings](/tooth-color-fillings/), [dental crowns](/dental-crowns/), [bridges](/dental-bridges/) and [root canal treatment](/root-canal-treatment/), planned to preserve as much natural tooth as possible. We also offer [laser dental treatment](/laser-dental-treatment/) for suitable cases.",
      "#### Replacing missing teeth and improving your smile",
      "If you are missing teeth, Dr. Jiveh provides [dental implants](/dental-implants/), [dentures](/dentures/) and [All-on-X full arch restoration](/all-on-x-full-arch-restoration/). If you want to change how your smile looks, he offers [porcelain veneers](/dental-veneers/), [teeth whitening](/teeth-whitening-treatment/), [Invisalign](/invisalign/) and complete [smile makeovers](/smile-makeovers/).",
    ),
    prose(
      "A Different Pace of Dentistry", "Why Patients Choose Us",
      "We follow what we call a slow dentistry philosophy. We intentionally schedule longer appointments so that your examination is thorough, your treatment plan is personal and your visit is calm. Your comfort and well-being are never rushed.",
      "Because we are a private, fee for service practice, we are not limited by the time allowances of insurance plans. We are out of network with insurance, and we explain your options and any financing at your consultation so there are no surprises. Read more about [insurance and payment options](/insurance-payment-options/).",
      "Your first visit includes advanced imaging, a periodontal assessment, a bite analysis and a thorough health check, so Dr. Jiveh understands your whole mouth before he recommends anything. If you feel nervous about the dentist, ask about [sedation dentistry](/sedation-dentistry-nervous-patients-royal-palm-beach/).",
      "Dr. Jiveh also teaches other dentists, as Clinical and Course Director at Palm Beach Dental Academy. That commitment to learning is part of how we care for our own patients.",
    ),
  ],
  "dentist-wellington-fl": [
    prose(
      "What Wellington Patients Come To Us For", "Our Services",
      "Patients from Wellington visit our Royal Palm Beach office for a wide range of care. Here is a closer look at what many of them are looking for.",
      "#### A smile they feel confident about",
      "Dr. Jiveh designs cosmetic dentistry around your face, your personality and your goals. Options include [porcelain veneers](/dental-veneers/), [professional teeth whitening](/teeth-whitening-wellington-royal-palm-beach/), [Invisalign and clear aligners](/invisalign-clear-aligners-royal-palm-beach-wellington/) and complete [smile makeovers](/smile-makeovers/). Digital smile design lets you preview your plan before treatment begins.",
      "#### Replacing missing or failing teeth",
      "We offer [dental implants](/dental-implants-royal-palm-beach-wellington/), [bridges](/dental-bridges/), [dentures](/dentures/) and [All-on-X full arch restoration](/all-on-x-wellington-palm-beach-county/). At your consultation we evaluate your jawbone, gums and overall health so the plan fits you.",
      "#### Rebuilding a worn or damaged smile",
      "When many teeth are worn, broken or missing, a complete plan can restore how your smile looks and works. Read about [smile rehabilitation in Palm Beach County](/smile-rehabilitation-palm-beach-county/).",
      "#### A calmer visit",
      "If dental anxiety has kept you from the care you need, our team provides a calm, supportive and judgment-free environment, with [oral sedation options](/sedation-dentistry-nervous-patients-royal-palm-beach/).",
    ),
    prose(
      "Why Wellington Patients Choose a Private Practice", "Why Patients Choose Us",
      "Smiles By Jiveh is a private, fee for service practice. That means longer appointments, a thorough examination and a personal treatment plan, rather than a rushed visit. Dr. Jiveh has cared for patients in Wellington and Royal Palm Beach since 1997, and he mentors other dentists in advanced techniques.",
      "We are out of network with insurance plans and we say so up front. Your consultation covers your options and any financing, and our team can support you in English, Spanish and other languages.",
    ),
  ],
  "veneers-smile-makeovers-wellington-fl": [
    prose(
      "Types of Veneers and Smile Design Options", "Your Options",
      "Dr. Jiveh offers both traditional porcelain veneers and no-prep veneers, so your treatment can be matched to your smile.",
      "#### Traditional porcelain veneers",
      "Traditional veneers are thin, custom-made shells of porcelain that cover the front of a tooth. They are often used to improve the shape, color and alignment of teeth. Placing them can involve gently reshaping a small amount of the tooth surface so the veneer sits naturally.",
      "#### No-prep veneers",
      "No-prep veneers are designed to be placed with little or no change to your natural teeth. Whether they suit you depends on your teeth, gums and bite, and Dr. Jiveh will tell you honestly whether they are a good fit.",
      "#### Bonding, whitening and aligners",
      "Not every smile needs veneers. Depending on your goals, Dr. Jiveh may suggest [teeth whitening](/teeth-whitening-wellington-royal-palm-beach/), cosmetic bonding, [Invisalign](/invisalign-clear-aligners-royal-palm-beach-wellington/) or a combination. A smile makeover can include any mix of these. See our [smile makeovers page](/smile-makeovers/).",
    ),
    prose(
      "What Your Veneer Experience Looks Like", "The Process",
      "A smile makeover is never one size fits all, so every plan is built around you. This is what you can expect.",
      "#### 1. A conversation and a full evaluation",
      "We start by listening to what you would like to change. Dr. Jiveh evaluates your face, your smile line, your bite and the health of your teeth and gums, because a beautiful smile must also function well.",
      "#### 2. Your digital preview",
      "Using digital photography and smile design technology, we create a preview of your proposed smile. You can give feedback and refine it before any treatment begins.",
      "#### 3. Handcrafted by a premier laboratory",
      "Once your design is approved, your restorations are made with one of the nation's premier cosmetic dental laboratories, to match the design you chose.",
      "#### 4. Fitting and follow-up",
      "Your veneers are fitted and adjusted for comfort and bite. Regular checkups and good home care help protect them over time. If you clench or grind your teeth, ask us about a [custom night guard](/night-guards-sports-guards/).",
    ),
  ],
  "all-on-x-wellington-palm-beach-county": [
    prose(
      "Who May Benefit From All-on-X", "Is It Right For You?",
      "All-on-X is designed for patients who are missing many teeth, or whose remaining teeth are failing. You may want to ask about it if:",
      "- You are missing most or all of the teeth in an arch",
      "- Your remaining teeth are loose, broken or failing because of decay or gum disease",
      "- Your dentures feel loose or uncomfortable and you would like a fixed option",
      "Most adults with good oral health and enough jawbone can be candidates, and if bone has been lost, grafting can often restore enough support. Only an evaluation can tell you whether All-on-X is right for you.",
    ),
    prose(
      "What To Expect", "The Process",
      "#### Your consultation",
      "We review your health and your jawbone with advanced imaging, listen to your goals and explain your options, including implants and dentures. We do not push one option over another: we recommend what fits your health and your goals.",
      "#### Your treatment day",
      "Anesthesia and sedation keep you comfortable. In many cases, the implants are placed and a full set of new teeth is attached in a single visit, so you leave with a complete smile. Dr. Jiveh will explain the timeline for your own case.",
      "#### Caring for your new teeth",
      "You brush and floss your All-on-X teeth the way you would natural teeth, with no removing or soaking. Regular dental cleanings keep everything healthy, and Dr. Jiveh checks your restoration at your visits.",
      "For the full details, see our [All-on-X page](/all-on-x-full-arch-restoration/), or read about [single dental implants](/dental-implants-royal-palm-beach-wellington/).",
    ),
  ],
  "smile-rehabilitation-palm-beach-county": [
    prose(
      "How a Smile Rehabilitation Plan Is Built", "The Process",
      "Complete dentistry takes careful planning. Dr. Jiveh designs your plan so every treatment supports the next.",
      "#### Evaluation and records",
      "We examine your teeth, gums, bite and jaw, take photographs and imaging, and listen to your goals and concerns.",
      "#### A plan you can see",
      "Using digital design, we show you the plan so you can understand and approve it. For appearance, a digital smile design previews the result.",
      "#### Health first, then restoration",
      "Gum and tooth health, and a comfortable bite, come first. Depending on your needs, your plan may then include crowns, veneers, implants, bridges or bite treatment, sequenced step by step.",
    ),
    prose(
      "Treatments That May Be Part of Your Plan", "What It Can Include",
      "No two plans are alike. Depending on what you need, your plan may include:",
      "- [Dental crowns](/dental-crowns/) and [dental bridges](/dental-bridges/) to rebuild damaged teeth",
      "- [Porcelain veneers](/dental-veneers/) to refine shape, color and alignment",
      "- [Dental implants](/dental-implants/) and [All-on-X](/all-on-x-full-arch-restoration/) to replace missing teeth",
      "- [Gum therapy](/gum-therapy/) to protect the foundation of your smile",
      "- [TMJ treatment](/tmj-treatment/) and a [custom night guard](/night-guards-sports-guards/) to protect your bite",
      "Many patients who come to us have worn teeth from years of grinding, clenching or wear over time. Read about [worn teeth rehabilitation](/worn-teeth-rehabilitation/) and [full mouth reconstruction](/full-mouth-reconstruction/).",
    ),
  ],
  "night-guards-sports-guards": [
    prose(
      "Signs You May Be Clenching or Grinding", "Know the Signs",
      "Many people clench or grind their teeth without knowing it. Signs that are worth mentioning at your visit include:",
      "- Teeth that look flat, worn or chipped",
      "- Jaw soreness or tightness, especially in the morning",
      "- Headaches that start near the temples",
      "- A partner who hears grinding at night",
      "- Sensitive teeth or cracked restorations",
      "Dr. Jiveh can check your teeth and bite and explain what he sees. If you also have jaw clicking or pain, read about our [TMJ treatment](/tmj-treatment/).",
    ),
    prose(
      "Caring for Your Guard", "Good Habits",
      "A custom guard works best when you wear it consistently and look after it.",
      "- Rinse it after each use and brush it gently",
      "- Keep it in its case, away from heat and pets",
      "- Bring it to your dental visits so we can check the fit",
      "- Tell us if it feels loose, tight or uncomfortable, so we can adjust it",
      "A guard protects your teeth but does not treat the cause of grinding. That is why we look at your bite and overall health too. If your teeth are already worn, a complete plan may help: see [smile rehabilitation](/smile-rehabilitation-palm-beach-county/).",
    ),
  ],
  "new-patient-health-evaluation": [
    prose(
      "What Your Evaluation Includes", "Your Exam in Detail",
      "Your first visit is more than a dental exam. It is a complete look at your oral health, so we can recommend care that fits you.",
      "- Advanced imaging and an iTero digital scan of your teeth",
      "- A periodontal (gum) assessment",
      "- A bite analysis and TMJ screening",
      "- An oral cancer screening",
      "- A smile design preview when you are interested in cosmetic changes",
      "After your evaluation, Dr. Jiveh explains what he found in plain language, shows you your options and answers your questions. You decide the pace.",
    ),
    prose(
      "How To Prepare", "Before You Visit",
      "A little preparation helps us make the most of your time.",
      "- Bring a list of your medications and any health conditions",
      "- Bring previous dental records or X-rays if you have them",
      "- Write down your questions and what you would like to change",
      "- Tell us if you feel nervous, so we can help you feel at ease: ask about [sedation dentistry](/sedation-dentistry-nervous-patients-royal-palm-beach/)",
      "We are a private, fee for service practice and out of network with insurance plans, and we offer flexible financing options. Read about [insurance and payment options](/insurance-payment-options/).",
    ),
  ],
};

export const extraFaqs: Record<string, { question: string; answer: string }[]> = {
  "dentist-royal-palm-beach-fl": [
    { question: "What is slow dentistry?", answer: "We intentionally schedule longer appointments so your examination is thorough, your plan is personal and your visit is calm. Your comfort and well-being are never rushed." },
    { question: "Do you offer sedation?", answer: "Yes. We offer safe oral conscious sedation for patients who feel nervous. Ask us about it when you book." },
    { question: "What technology do you use?", answer: "We use advanced imaging, digital scanning and digital smile design, and CBCT 3D imaging for implant planning." },
  ],
  "dentist-wellington-fl": [
    { question: "Do you help patients who feel nervous about the dentist?", answer: "Yes. Our team provides a calm, judgment-free environment and safe oral conscious sedation for patients who want a more relaxed visit." },
    { question: "Can I replace missing teeth at your office?", answer: "Yes. We offer dental implants, bridges, dentures and All-on-X full arch restoration, after an evaluation of your jawbone and overall health." },
    { question: "Do you offer financing?", answer: "We are a private, fee for service practice and we offer flexible financing options. Your consultation covers the details." },
  ],
  "veneers-smile-makeovers-wellington-fl": [
    { question: "Can veneers be whitened?", answer: "Porcelain does not respond to whitening the way natural enamel does, so we usually whiten natural teeth first and match your veneers to the shade you choose." },
    { question: "How long do veneers last?", answer: "With good care and regular checkups, veneers can last for many years. Dr. Jiveh will explain what to expect for your own smile, and may suggest a night guard if you grind your teeth." },
    { question: "Will my veneers look natural?", answer: "Dr. Jiveh designs each smile to complement your face and features, and you preview the design before treatment begins." },
  ],
  "all-on-x-wellington-palm-beach-county": [
    { question: "What if I do not have enough bone?", answer: "If bone has been lost, grafting can often restore enough support. Dr. Jiveh will evaluate your jawbone with advanced imaging at your consultation." },
    { question: "Is sedation available?", answer: "Yes. Anesthesia and sedation keep you comfortable during treatment." },
    { question: "What is the difference between All-on-X and dentures?", answer: "All-on-X teeth are fixed in place on implants, while traditional dentures are removable. Dr. Jiveh explains both so you can choose what fits you." },
  ],
  "smile-rehabilitation-palm-beach-county": [
    { question: "Will I see the plan before treatment?", answer: "Yes. We use digital design so you can understand and approve your plan before treatment begins." },
    { question: "Can treatment include implants?", answer: "Yes. Depending on your needs, a plan can include implants, crowns, veneers, bridges, gum care and bite treatment." },
    { question: "Do you work with insurance?", answer: "We are a private, fee for service practice and out of network with insurance plans. We also offer flexible financing options." },
  ],
  "night-guards-sports-guards": [
    { question: "How long does a night guard last?", answer: "It depends on how you use it. We check your guard at your dental visits and adjust or replace it when needed." },
    { question: "Can my child get a custom sports guard?", answer: "Please call us and ask. Dr. Jiveh can advise on the right guard for your athlete." },
  ],
  "new-patient-health-evaluation": [
    { question: "What should I bring?", answer: "Bring a list of your medications and health conditions, any previous dental records or X-rays, and your questions." },
    { question: "Can I have sedation at my first visit?", answer: "Please call us to discuss your needs. We offer oral conscious sedation for patients who feel nervous." },
  ],
};

const faq = (items: { question: string; answer: string }[]): Block => ({ _type: "faqBlock", eyebrow: "Common Questions", heading: "Frequently Asked Questions", items });
const stats = (): Block => ({
  _type: "statsBlock",
  items: [
    { value: "4.9", label: "on Google", source: "rating" },
    { value: "111", label: "Google reviews" },
    { value: "Since 1997", label: "serving patients" },
    { value: "Private", label: "fee for service practice" },
  ],
});
const doctor = (heading: string, line: string): Block => ({
  _type: "doctorBlock",
  eyebrow: "Meet Your Dentist",
  heading,
  text: rich(line, "Dr. Jiveh combines artistic vision with advanced digital technology, and he takes the time to listen before he recommends anything."),
  points: [
    "Clinical and Course Director at Palm Beach Dental Academy, mentoring dentists in advanced clinical techniques",
    "Past President of the Florida Academy of Cosmetic Dentistry (2021)",
    "More than 20 years of experience in cosmetic, restorative, implant and wellness-focused dentistry",
  ],
  image: images.drJiveh,
  cta: { label: "Learn More About Dr. Jiveh", href: "/meet-dr-jiveh/" },
});
const location = (heading: string, text: string): Block => ({ _type: "locationBlock", heading, text, areas: AREAS });
const band = (heading: string, text: string): Block => ({ _type: "ctaBandBlock", heading, text, image: images.ctaBand, ctas: [book] });

export const morePages: Treatment[] = [
  /* ------------------------------------------------------------------ Invisalign and clear aligners */
  {
    slug: "invisalign-clear-aligners-royal-palm-beach-wellington",
    layout: "area",
    title: "Invisalign and Clear Aligners in Royal Palm Beach and Wellington",
    category: "cosmetic",
    order: 37,
    hero: {
      eyebrow: "Royal Palm Beach and Wellington",
      heading: "Invisalign and Clear Aligners for Royal Palm Beach and Wellington",
      text: rich("Straighten your teeth without the look of traditional braces. Dr. Farokh Jiveh designs each clear aligner plan around your smile, your bite and your long-term oral health."),
      cta: { label: "Book An Aligner Consultation", href: "/appointment/" },
      images: [images.invisalignHero],
    },
    blocks: [
      stats(),
      {
        _type: "imageCardsBlock",
        eyebrow: "Your Options",
        heading: "Two Clear Aligner Systems",
        text: "We recommend the option that fits your case at your consultation.",
        columns: 3,
        cards: [
          card("Invisalign", "Custom-crafted clear aligners, for teens and adults.", "/invisalign/", "smile"),
          card("SimplyClear", "A comfortable, nearly invisible way to straighten your teeth.", "/clear-aligners/", "sparkles"),
          card("Digital Smile Design", "Preview your plan and your finished smile before you begin.", "/smile-makeovers/", "badge-check"),
        ],
      },
      prose(
        "How Clear Aligners Work", "The Basics",
        "Clear aligners are a series of custom-made, removable trays. Each set makes small changes to the position of your teeth. You switch to a new set every one to two weeks, following Dr. Jiveh's plan, and regular check-ins with our office confirm that your smile is progressing as planned.",
        "Because there are no metal brackets or wires, aligners are comfortable and very hard to notice. They are removable, so you take them out to eat, drink anything other than water, brush and floss. That means there are no food restrictions, and it is easier to keep your teeth clean during treatment.",
        "#### What clear aligners can address",
        "Aligners can treat the same issues usually addressed with braces, including crowded teeth, crooked teeth, gaps and certain bite problems such as overbite, open bite, underbite or crossbite. Whether aligners suit you depends on your case, and Dr. Jiveh will tell you what he recommends.",
        "#### Designed with your bite in mind",
        "Dr. Jiveh plans every aligner case with a comprehensive approach. The goal is not only a straighter smile but also a comfortable bite, good balance and long-term oral health.",
      ),
      {
        _type: "featureBlock",
        eyebrow: "Every Age",
        heading: "Aligners for Teens and Adults",
        text: rich(
          "Clear aligner treatment can be customized for patients of all ages. Invisalign Teen is designed for teenagers who want to straighten their teeth without giving up sports, school or social life, and Invisalign First is designed to guide growing smiles in children.",
          "Most adult treatments take about 12 to 18 months, though simpler cases can finish in as little as 6 months. Your own timeline depends on your teeth and how consistently you wear your aligners. For best results, they are worn 20 to 22 hours a day.",
        ),
        bullets: ["Removable, with no food restrictions", "Comfortable, without metal wires or brackets", "Planned around your bite, not only your smile"],
        image: images.serviceAlignment,
        ctas: [{ label: "Learn About Invisalign", href: "/invisalign/" }],
      },
      doctor("Aligner Treatment Planned With Care", "Dr. Jiveh has served Royal Palm Beach and Wellington since 1997."),
      location("Visit Us for an Aligner Consultation", "Visits are by appointment, Monday to Thursday."),
      faq([
        { question: "How long does Invisalign take?", answer: "Most adult treatments take about 12 to 18 months, though simpler cases can finish in as little as 6 months. Dr. Jiveh will explain the timeline for your case." },
        { question: "Are aligners really invisible?", answer: "They are very nearly invisible. Clear plastic that hugs your teeth makes them hard to spot, even up close." },
        { question: "Do I have to avoid any foods?", answer: "No. You remove your aligners to eat and drink anything other than water, then brush and floss before putting them back." },
        { question: "How often do I change aligners?", answer: "Usually every one to two weeks, per Dr. Jiveh's plan, wearing each set 20 to 22 hours a day for best results." },
        { question: "Are aligners available for teenagers and children?", answer: "Yes. Invisalign Teen and Invisalign First are designed specifically for teenagers and growing smiles." },
        { question: "What is the difference between Invisalign and SimplyClear?", answer: "Both are clear aligner systems. We will recommend the best option for your specific case at your consultation." },
        { question: "Does it hurt?", answer: "Mild pressure is normal for a day or two after switching to a new set. Most patients describe a tight feeling, not pain." },
        { question: "Do you offer financing?", answer: "We are a private, fee for service practice and we offer flexible financing options. Your consultation covers the details." },
      ]),
      { _type: "sharedBlock", kind: "testimonials" },
      band("Straighten Your Smile With Dr. Jiveh", "Book a complimentary consultation."),
    ],
    seo: {
      title: "Invisalign and Clear Aligners in Royal Palm Beach and Wellington - Smiles By Jiveh",
      description: "Invisalign and clear aligners for Royal Palm Beach and Wellington, FL patients. Dr. Farokh Jiveh plans each case around your smile and bite. Book a consultation.",
    },
  },

  /* ------------------------------------------------------------------ Sedation dentistry */
  {
    slug: "sedation-dentistry-nervous-patients-royal-palm-beach",
    layout: "area",
    title: "Sedation Dentistry for Nervous Patients in Royal Palm Beach",
    category: "general",
    order: 38,
    hero: {
      eyebrow: "Royal Palm Beach and Wellington",
      heading: "Sedation Dentistry for Patients Who Feel Nervous About the Dentist",
      text: rich("Dental anxiety should not keep you from the care you need. Our team provides a calm, supportive and judgment-free environment, with safe oral sedation options, so you can feel relaxed and at ease."),
      cta: book,
      images: [images.sedationHero],
    },
    blocks: [
      stats(),
      {
        _type: "imageCardsBlock",
        eyebrow: "How We Help",
        heading: "Care That Starts With Your Comfort",
        columns: 3,
        cards: [
          card("A Judgment-Free Team", "We listen first. You set the pace and you can ask us to stop at any time.", "/appointment/", "heart-handshake"),
          card("Oral Conscious Sedation", "In many cases, sedation is as simple as a prescribed pill before your appointment.", "/sedation-dentistry/", "moon"),
          card("Unhurried Appointments", "Longer visits mean no rushing and time to explain each step.", "/new-patient-health-evaluation/", "heart-pulse"),
        ],
      },
      prose(
        "Understanding Dental Anxiety", "You Are Not Alone",
        "Many people feel nervous about dental visits. Fear of pain, the sounds and smells of the office, a past bad experience or simply feeling out of control can all keep people away for years. When care is delayed, small problems can grow, which makes the next visit feel even harder.",
        "At Smiles By Jiveh, we understand. Since 1997, Dr. Farokh Jiveh and our team have helped patients feel relaxed, cared for and at ease through gentle, compassionate dentistry. We never judge how long it has been since your last visit.",
        "#### How we make visits more comfortable",
        "- We take time to listen to your concerns before we begin",
        "- We explain each step in plain language so there are no surprises",
        "- We schedule longer appointments, so you never feel rushed",
        "- We offer safe oral conscious sedation to help you feel deeply relaxed",
      ),
      {
        _type: "featureBlock",
        eyebrow: "About Oral Sedation",
        heading: "What Oral Conscious Sedation Is",
        text: rich(
          "Oral conscious sedation uses a medication taken by mouth to help you feel deeply relaxed during treatment. In many cases it is as simple as taking a prescribed pill before your appointment, so you can enjoy a calm, stress-free experience.",
          "Sedation can reduce dental anxiety, make longer procedures feel easier and help you receive the care you need in a more comfortable setting. Whether sedation is right for you depends on your health and the treatment planned, and Dr. Jiveh will review this with you before your visit.",
        ),
        bullets: ["Helps you feel deeply relaxed", "Can make longer procedures feel easier", "Reviewed with you, based on your health, before your visit"],
        image: images.generalCta,
        ctas: [{ label: "Sedation Dentistry Details", href: "/sedation-dentistry/" }],
        reverse: true,
      },
      prose(
        "Dental Care You Can Get While Relaxed", "What We Can Help With",
        "Sedation can be part of many treatments, from restorative care to cosmetic and implant dentistry. Patients ask about it for [dental implants](/dental-implants-royal-palm-beach-wellington/), [All-on-X](/all-on-x-wellington-palm-beach-county/), [root canal treatment](/root-canal-treatment/), [oral surgery](/oral-surgery/) and longer cosmetic or [smile rehabilitation](/smile-rehabilitation-palm-beach-county/) visits.",
        "If you have been putting off care, a good first step is a conversation. Book a visit, tell us how you feel, and we will plan an approach that works for you.",
      ),
      doctor("A Dentist Who Takes Time", "Dr. Jiveh has cared for patients in Royal Palm Beach and Wellington since 1997."),
      location("Come In and Meet Us", "A first visit can simply be a conversation."),
      faq([
        { question: "I haven't seen a dentist in years. Will I be judged?", answer: "No. Our team provides a calm, supportive, judgment-free environment, and we focus on helping you move forward." },
        { question: "What is oral conscious sedation?", answer: "It is a medication taken by mouth that helps you feel deeply relaxed during treatment. In many cases it is as simple as a prescribed pill before your appointment." },
        { question: "Is sedation safe?", answer: "Dr. Jiveh reviews your health history and plans your care carefully. We offer safe sedation options based on your health and the treatment planned." },
        { question: "Can I be sedated for longer procedures?", answer: "Sedation can make longer procedures feel easier. We will discuss the right approach for your treatment." },
        { question: "Will I need someone to drive me?", answer: "Because sedation can affect how you feel, we will give you instructions before your visit, including whether you need a ride. Please ask when you book." },
        { question: "How do I get started?", answer: "Call (561) 798-9997 or book online, and tell us you would like to discuss sedation. A first visit can be a conversation." },
      ]),
      { _type: "sharedBlock", kind: "testimonials" },
      band("Relax. We Will Take Care of You.", "Book a visit and tell us how you feel."),
    ],
    seo: {
      title: "Sedation Dentistry for Nervous Patients in Royal Palm Beach - Smiles By Jiveh",
      description: "Calm, judgment-free dentistry with safe oral sedation in Royal Palm Beach, FL. Dr. Farokh Jiveh helps nervous patients feel at ease. Book a visit.",
    },
  },

  /* ------------------------------------------------------------------ Teeth whitening */
  {
    slug: "teeth-whitening-wellington-royal-palm-beach",
    layout: "area",
    title: "Teeth Whitening in Wellington and Royal Palm Beach",
    category: "cosmetic",
    order: 39,
    hero: {
      eyebrow: "Wellington and Royal Palm Beach",
      heading: "Professional Teeth Whitening for Wellington and Royal Palm Beach",
      text: rich("Coffee, tea, wine and everyday habits can stain teeth over time. At Smiles By Jiveh we offer professional whitening options, chosen and supervised to fit your goals and your sensitivity."),
      cta: { label: "Book A Whitening Visit", href: "/appointment/" },
      images: [images.whiteningHero],
    },
    blocks: [
      stats(),
      {
        _type: "imageCardsBlock",
        eyebrow: "Whitening Options",
        heading: "Three Ways To Brighten Your Smile",
        columns: 3,
        cards: [
          card("In-Office Zoom Whitening", "The fastest option: a brighter smile in one visit.", "/teeth-whitening-treatment/", "sparkles"),
          card("Custom Take-Home Trays", "Made from a digital scan of your smile, for gradual whitening at home.", "/teeth-whitening-treatment/", "layers"),
          card("Opalescence Go", "Disposable trays for a simple, low-sensitivity at-home option.", "/teeth-whitening-treatment/", "smile"),
        ],
      },
      prose(
        "Professional Whitening vs. Store-Bought Products", "What Is the Difference?",
        "Professional whitening uses carefully formulated materials that are selected and supervised to brighten teeth effectively and predictably, with gum protection and the right gel strength for you. Generic store-bought systems are not tailored to your teeth, your gums or your sensitivity.",
        "#### Which option is right for me?",
        "In-office whitening provides the fastest results, in a single visit. Custom take-home trays let you whiten gradually at home, and Opalescence Go disposable trays are a convenient option for patients who prefer something simple. We will recommend the right option for your goals, your lifestyle and your level of sensitivity.",
        "#### What whitening can and cannot do",
        "Whitening changes the color of your natural enamel. It does not change the color of crowns, veneers or fillings, so if you have restorations we plan shade matching with you. If your goals go beyond whitening, ask about [porcelain veneers](/dental-veneers/) or a complete [smile makeover](/smile-makeovers/).",
      ),
      {
        _type: "featureBlock",
        eyebrow: "Keeping Your Smile Bright",
        heading: "How Long Whitening Lasts",
        text: rich(
          "Results usually last about 6 to 18 months, depending on coffee, tea, wine, smoking and how well you maintain your smile. Professional cleanings and good home care help keep your results looking their best.",
          "Some patients notice temporary sensitivity, typically for 24 to 72 hours. If you have sensitive teeth, tell us, and we can adjust your plan.",
        ),
        bullets: ["Supervised by Dr. Jiveh and our team", "Gum protection and the right gel strength", "A plan adjusted for sensitive teeth"],
        image: images.hygieneVisit,
        reverse: true,
        ctas: [{ label: "Teeth Whitening Details", href: "/teeth-whitening-treatment/" }],
      },
      doctor("Whitening From a Cosmetic Dentist", "Dr. Jiveh is a past President of the Florida Academy of Cosmetic Dentistry."),
      location("Whitening at Our Royal Palm Beach Office", "Patients from Wellington and across Palm Beach County visit us."),
      faq([
        { question: "How long do whitening results last?", answer: "Usually 6 to 18 months, depending on coffee, tea, wine, smoking and maintenance." },
        { question: "Is professional whitening safe?", answer: "Yes, when it is done professionally with gum protection and the proper gel strength." },
        { question: "Will whitening make my teeth sensitive?", answer: "Sometimes, typically for 24 to 72 hours. We can adjust the plan for sensitive teeth." },
        { question: "Will whitening change my crowns or veneers?", answer: "No. Whitening only changes natural enamel. If you have restorations, we plan shade matching with you." },
        { question: "Which is better, in-office or take-home whitening?", answer: "In-office provides the fastest results in one visit, while custom take-home trays let you whiten gradually at home. We will recommend the right option for your goals." },
        { question: "Is whitening part of a smile makeover?", answer: "It can be. A smile makeover may combine whitening, bonding, veneers and other treatments, designed around your goals." },
      ]),
      { _type: "sharedBlock", kind: "testimonials" },
      band("Brighten Your Smile", "Book a whitening visit with Dr. Jiveh."),
    ],
    seo: {
      title: "Teeth Whitening in Wellington and Royal Palm Beach - Smiles By Jiveh",
      description: "Professional teeth whitening for Wellington and Royal Palm Beach, FL: in-office Zoom, custom take-home trays and Opalescence Go. Book a visit with Dr. Jiveh.",
    },
  },

  /* ------------------------------------------------------------------ Dental implants */
  {
    slug: "dental-implants-royal-palm-beach-wellington",
    layout: "area",
    title: "Dental Implants in Royal Palm Beach and Wellington",
    category: "restorative",
    order: 40,
    hero: {
      eyebrow: "Royal Palm Beach and Wellington",
      heading: "Dental Implants for Royal Palm Beach and Wellington Patients",
      text: rich("Dental implants are designed to look, feel and function as closely as possible to natural teeth. Dr. Farokh Jiveh plans each implant with advanced 3D imaging, digital scanning and guided technology."),
      cta: { label: "Book An Implant Consultation", href: "/appointment/" },
      images: [images.cosmeticCta],
    },
    blocks: [
      stats(),
      {
        _type: "imageCardsBlock",
        eyebrow: "Replacing Teeth",
        heading: "Options for Missing Teeth",
        text: "The right choice depends on your teeth, bone and goals. We explain each so you can decide.",
        columns: 3,
        cards: [
          card("Single Tooth Implant", "Replace one missing tooth without relying on neighboring teeth.", "/dental-implants/", "layers"),
          card("Multiple Teeth", "Implants and bridges to restore several missing teeth.", "/dental-bridges/", "puzzle"),
          card("All-on-X Full Arch", "A fixed set of teeth supported by a few implants.", "/all-on-x-wellington-palm-beach-county/", "badge-check"),
        ],
      },
      prose(
        "What a Dental Implant Is", "The Basics",
        "A dental implant is a small titanium replacement root placed into the jawbone to support a natural looking tooth above the gum. Because implants are fixed securely in place, they allow you to eat, smile, brush and floss with confidence while helping preserve bone and surrounding teeth.",
        "Dr. Jiveh uses CBCT three dimensional imaging, advanced digital scanning and computerized guided implant technology to plan your treatment precisely. Careful planning supports a minimally invasive approach and a result that fits your bite.",
        "#### Implants, bridges and dentures",
        "Implants are typically the most permanent, natural feeling option and do not rely on neighboring teeth for support. Bridges and dentures are alternatives that suit some patients better. We do not push one option over another: we review them with you and recommend what fits your health and goals. See our pages on [dental bridges](/dental-bridges/) and [dentures](/dentures/).",
      ),
      {
        _type: "featureBlock",
        eyebrow: "What To Expect",
        heading: "From Planning to Your New Tooth",
        text: rich(
          "Most adults with good oral health and enough jawbone can be candidates for implants. If bone has been lost, grafting can often restore enough support. Anesthesia and sedation keep you comfortable, and many patients describe the procedure as comparable to a simple extraction.",
          "From placement to the final crown usually takes about 3 to 6 months while the implant fuses to the jawbone, though All-on-4 can deliver new teeth in a day. With good oral hygiene and regular checkups, implants can last many years.",
        ),
        bullets: ["A thorough evaluation with 3D imaging", "Comfort with anesthesia and sedation", "Regular checkups to protect your investment in your smile"],
        image: images.implantModel,
        ctas: [{ label: "Dental Implants Details", href: "/dental-implants/" }],
      },
      prose(
        "Caring for Your Implants", "Long-Term Care",
        "Implants do not decay, but the gums and bone around them need care. You brush and floss your implants like natural teeth, attend regular dental cleanings and checkups, and tell us promptly about any changes. If you clench or grind your teeth, a [custom night guard](/night-guards-sports-guards/) can help protect your restorations.",
        "If you feel nervous about implant treatment, read about [sedation dentistry](/sedation-dentistry-nervous-patients-royal-palm-beach/).",
      ),
      doctor("Implant Dentistry With Careful Planning", "Dr. Jiveh has served Royal Palm Beach and Wellington since 1997."),
      location("Implant Consultations in Royal Palm Beach", "Patients from Wellington and Palm Beach County visit us."),
      faq([
        { question: "Am I a candidate for dental implants?", answer: "Most adults with good oral health and enough jawbone are candidates. If bone has been lost, grafting can often restore enough support." },
        { question: "Does the procedure hurt?", answer: "Most patients describe it as comparable to a simple extraction. Anesthesia and sedation keep you comfortable." },
        { question: "How long does the process take?", answer: "From placement to the final crown is typically 3 to 6 months while the implant fuses to the jawbone, though All-on-4 can deliver new teeth in a day." },
        { question: "How long do implants last?", answer: "With good oral hygiene and regular checkups, implants can last many years. Dr. Jiveh will explain what to expect in your case." },
        { question: "What is the difference between an implant and a bridge?", answer: "An implant replaces the root and does not rely on neighboring teeth, while a bridge uses neighboring teeth for support. We review the right choice with you." },
        { question: "Do you offer All-on-X?", answer: "Yes. All-on-X replaces a full arch of teeth with a fixed set supported by a few implants. See our All-on-X page for details." },
        { question: "Do you offer financing?", answer: "We are a private, fee for service practice and we offer flexible financing options. Your consultation covers the details." },
      ]),
      { _type: "sharedBlock", kind: "testimonials" },
      band("Replace Missing Teeth With Confidence", "Book an implant consultation with Dr. Jiveh."),
    ],
    seo: {
      title: "Dental Implants in Royal Palm Beach and Wellington - Smiles By Jiveh",
      description: "Dental implants for Royal Palm Beach and Wellington, FL patients. Dr. Farokh Jiveh plans each implant with 3D imaging and digital technology. Book a consultation.",
    },
  },
];
