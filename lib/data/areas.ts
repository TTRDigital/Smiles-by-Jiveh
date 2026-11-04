import type { Block, Treatment } from "../types";
import type { IconName } from "../icons.ts";
import { extraFaqs, extraProse, morePages } from "./areas-more.ts";
import { rich } from "../rich.ts";
import { images } from "./images.ts";

/*
 * Service area and gap pages (TTR OS plan for Smiles by Jiveh, Nov 4, 2026; TTR-1237).
 * DRAFTS FOR REVIEW: written only from facts already on this site (the practice, Dr. Jiveh, the treatments, the office
 * address and hours) and from the practice's brain. No prices, no promised results or timelines, no claim that one treatment
 * is better than another. Nothing here goes live until Kia approves it and Dr. Jiveh approves it in writing.
 * Each page is a treatment page at the site root (/dentist-wellington-fl/) with layout "area": a full-width photo hero,
 * a trust strip, photo cards that link to the treatments, feature sections, steps, a location card and a closing band
 * (components/sections/AreaSections.tsx). Edit them in code for now; the same slugs can be moved to /cms later.
 */

const book = { label: "Book An Appointment", href: "/appointment/" };
const AREAS = ["Royal Palm Beach", "Wellington", "Palm Beach County", "The Western Communities"];

const stats = (): Block => ({
  _type: "statsBlock",
  items: [
    { value: "4.9", label: "on Google", source: "rating" },
    { value: "111", label: "Google reviews" },
    { value: "Since 1997", label: "serving patients" },
    { value: "Private", label: "fee for service practice" },
  ],
});

const card = (title: string, text: string, href: string, icon: IconName) => ({ title, text, href, icon });

const doctor = (heading: string, line: string): Block => ({
  _type: "doctorBlock",
  eyebrow: "Meet Your Dentist",
  heading,
  text: rich(line, "Dr. Jiveh combines artistic vision with advanced digital technology, and he takes the time to listen before he recommends anything."),
  points: [
    "Clinical and Course Director at Palm Beach Dental Academy, mentoring dentists in advanced clinical techniques",
    "Past President of the Florida Academy of Cosmetic Dentistry (2021)",
    "More than 20 years of experience in cosmetic, restorative, implant and wellness-focused dentistry",
    "A private, fee for service practice: personal attention and no rushed visits",
  ],
  image: images.drJiveh,
  cta: { label: "Learn More About Dr. Jiveh", href: "/meet-dr-jiveh/" },
});

const location = (heading: string, text: string): Block => ({ _type: "locationBlock", heading, text, areas: AREAS });

const band = (heading: string, text: string): Block => ({
  _type: "ctaBandBlock",
  heading,
  text,
  image: images.ctaBand,
  ctas: [book],
});

const faq = (items: { question: string; answer: string }[]): Block => ({ _type: "faqBlock", eyebrow: "Common Questions", heading: "Frequently Asked Questions", items });

const seoTitle = (t: string) => `${t} - Smiles By Jiveh`;

const baseAreaTreatments: Treatment[] = [
  /* ------------------------------------------------------------------ Royal Palm Beach */
  {
    slug: "dentist-royal-palm-beach-fl",
    layout: "area",
    title: "Dentist in Royal Palm Beach, FL",
    category: "general",
    order: 30,
    hero: {
      eyebrow: "Royal Palm Beach, Florida",
      heading: "A Dentist in Royal Palm Beach for Patients Who Value Quality",
      text: rich(
        "Smiles By Jiveh is a private, fee for service dental practice led by Dr. Farokh Jiveh, serving Royal Palm Beach, Wellington and surrounding communities since 1997.",
        "Start with a complimentary consultation and see what dentistry feels like when no one is rushing you.",
      ),
      cta: book,
      images: [images.teamGroup],
    },
    blocks: [
      stats(),
      {
        _type: "imageCardsBlock",
        eyebrow: "Our Care",
        heading: "Everything Your Smile Needs, Under One Roof",
        text: "From routine visits to complete smile plans, you see one team who knows you.",
        columns: 3,
        cards: [
          card("General Dentistry", "Exams, cleanings, fillings and gum care for the whole family.", "/general-dentistry/", "stethoscope"),
          card("Cosmetic Dentistry", "Veneers, whitening and smile makeovers designed around you.", "/cosmetic-dentistry/", "sparkles"),
          card("Dental Implants", "Replace missing teeth with a stable, natural feeling solution.", "/dental-implants/", "layers"),
        ],
      },
      {
        _type: "featureBlock",
        eyebrow: "Your Visit",
        heading: "Dentistry That Starts With Listening",
        text: rich(
          "Every patient begins with a conversation: your health, your goals and your concerns. Then we examine your teeth, gums and bite, explain what we see in plain language, and show you your options.",
          "Our office is at 11989 Southern Blvd in Royal Palm Beach, and our team can support you in English, Spanish and other languages.",
        ),
        bullets: ["A thorough, unhurried examination", "Clear explanations, with no pressure", "Flexible financing options", "Complimentary consultations for cosmetic and restorative care"],
        image: images.homeConsultation,
        ctas: [book, { label: "Our Practice", href: "/who-we-are/" }],
      },
      doctor("Dr. Farokh Jiveh", "Dr. Jiveh has been caring for patients in Royal Palm Beach and Wellington since 1997, and he teaches other dentists how to do advanced dentistry."),
      location("Find Us in Royal Palm Beach", "Our office is easy to reach for patients across Royal Palm Beach and Wellington."),
      faq([
        { question: "Where is Smiles By Jiveh located?", answer: "Our office is at 11989 Southern Blvd, Royal Palm Beach, FL 33411. We also welcome patients from Wellington and nearby communities." },
        { question: "Are you in network with my insurance?", answer: "No. We are a private, fee for service practice and we are out of network with insurance plans. We explain your options and any financing at your consultation." },
        { question: "Do you offer a consultation for new patients?", answer: "Yes. Your complimentary consultation includes meeting our team, an explanation of our process and answers to your questions." },
        { question: "What are your office hours?", answer: "We see patients Monday through Thursday, 9:00 AM to 5:00 PM, by appointment only. Friday morning hours are available by special request." },
        { question: "Do you have team members who speak Spanish?", answer: "We offer bilingual support in English, Spanish and other languages. Please call (561) 798-9997 and we will help you." },
      ]),
      { _type: "sharedBlock", kind: "testimonials" },
      band("Ready to Meet Dr. Jiveh?", "Book a visit and see why patients across Palm Beach County choose Smiles By Jiveh."),
    ],
    seo: {
      title: seoTitle("Dentist in Royal Palm Beach, FL"),
      description: "A private, fee for service dentist in Royal Palm Beach, FL. Dr. Farokh Jiveh offers general, cosmetic, implant and reconstructive dentistry. Book a consultation.",
    },
  },

  /* ------------------------------------------------------------------ Wellington */
  {
    slug: "dentist-wellington-fl",
    layout: "area",
    title: "Dentist Serving Wellington, FL",
    category: "general",
    order: 31,
    hero: {
      eyebrow: "Wellington, Florida",
      heading: "A Dentist for Wellington Patients Who Want More Than a Routine Visit",
      text: rich(
        "Patients from Wellington choose Smiles By Jiveh for personalized, high-quality dental care from Dr. Farokh Jiveh. We have proudly served Wellington and surrounding communities since 1997.",
      ),
      cta: book,
      images: [images.serviceCosmetic],
    },
    blocks: [
      stats(),
      {
        _type: "imageCardsBlock",
        eyebrow: "For Wellington Smiles",
        heading: "Cosmetic, Restorative and Everyday Dentistry",
        text: "Whether you want a brighter smile or need missing teeth replaced, we plan care around your goals.",
        columns: 3,
        cards: [
          card("Veneers and Smile Makeovers", "A natural smile designed around your face, previewed before you begin.", "/veneers-smile-makeovers-wellington-fl/", "sparkles"),
          card("All-on-X Full Arch Implants", "A fixed, implant-supported option for patients missing many teeth.", "/all-on-x-wellington-palm-beach-county/", "layers"),
          card("Smile Rehabilitation", "A complete plan for worn, broken or missing teeth.", "/smile-rehabilitation-palm-beach-county/", "badge-check"),
        ],
      },
      {
        _type: "featureBlock",
        eyebrow: "Digital Smile Design",
        heading: "See Your Plan Before You Begin",
        text: rich(
          "Using digital photography and smile design, Dr. Jiveh can show you a preview of your new smile and refine it with your feedback before treatment starts. Your plan then moves forward only when you are comfortable.",
          "Read more about [smile makeovers](/smile-makeovers/) and [porcelain veneers](/dental-veneers/).",
        ),
        bullets: ["A smile designed around your face and goals", "A preview before treatment begins", "Conservative options, including no-prep veneers when they suit your teeth"],
        image: images.smileMakeoverHero,
        reverse: true,
        ctas: [{ label: "Book A Cosmetic Consultation", href: "/appointment/" }],
      },
      doctor("A Dentist Who Teaches Dentists", "Wellington patients make the short trip to Royal Palm Beach to see Dr. Jiveh, who mentors other dentists in advanced techniques."),
      location("From Wellington to Our Royal Palm Beach Office", "We are at 11989 Southern Blvd in Royal Palm Beach, serving Wellington families and professionals."),
      faq([
        { question: "Do you see patients from Wellington?", answer: "Yes. Many of our patients come from Wellington, Royal Palm Beach and nearby communities. Our office is at 11989 Southern Blvd, Royal Palm Beach, FL 33411." },
        { question: "Do you offer cosmetic dentistry?", answer: "Yes. Dr. Jiveh offers porcelain veneers, teeth whitening, bonding, Invisalign and complete smile makeovers, designed around your goals." },
        { question: "Can I book a consultation?", answer: "Yes. Your complimentary consultation includes meeting our team, an explanation of our process and answers to your questions." },
        { question: "Do you work with dental insurance?", answer: "We are a private, fee for service practice and we are out of network with insurance plans. We also offer flexible financing options." },
      ]),
      { _type: "sharedBlock", kind: "testimonials" },
      band("Your Wellington Smile Starts Here", "Book a complimentary consultation with Dr. Jiveh."),
    ],
    seo: {
      title: seoTitle("Dentist Serving Wellington, FL"),
      description: "Smiles By Jiveh serves Wellington, FL patients with cosmetic, implant and general dentistry from Dr. Farokh Jiveh. Book a complimentary consultation.",
    },
  },

  /* ------------------------------------------------------------------ Veneers and smile makeovers, Wellington */
  {
    slug: "veneers-smile-makeovers-wellington-fl",
    layout: "area",
    title: "Veneers and Smile Makeovers in Wellington, FL",
    category: "cosmetic",
    order: 32,
    hero: {
      eyebrow: "Wellington, Florida",
      heading: "Porcelain Veneers and Smile Makeovers for Wellington Patients",
      text: rich(
        "Want a smile that looks natural and feels like yours? Dr. Farokh Jiveh designs veneers and smile makeovers around your face, your features and your goals, and shows you a preview before you begin.",
      ),
      cta: { label: "Book A Cosmetic Consultation", href: "/appointment/" },
      images: [images.serviceVeneers],
    },
    blocks: [
      stats(),
      {
        _type: "stepsBlock",
        eyebrow: "Your Smile Design",
        heading: "How a Veneer Smile Is Planned",
        text: "No two smiles are alike, so no two plans are either.",
        steps: [
          { title: "Evaluation and photos", text: "Dr. Jiveh looks at your face, smile line, bite and the health of your teeth and gums." },
          { title: "Digital smile design", text: "You see a preview of your new smile and give feedback before any treatment starts." },
          { title: "Crafted with care", text: "Your restorations are made with one of the nation's premier cosmetic dental laboratories and fitted for comfort." },
        ],
      },
      {
        _type: "featureBlock",
        eyebrow: "Is A Veneer Right For You?",
        heading: "Options Fitted to Your Teeth",
        text: rich(
          "Veneers may help with chipped, worn, stained or uneven teeth and small gaps. Some patients are candidates for no-prep veneers, which are designed to work without altering natural teeth. Whether they suit you depends on your teeth, gums and bite.",
          "Not every smile needs veneers. Depending on your goals, we may suggest [teeth whitening](/teeth-whitening-treatment/), bonding, [Invisalign](/invisalign/) or a combination. Learn more on our [porcelain veneers page](/dental-veneers/).",
        ),
        bullets: ["Traditional porcelain veneers and no-prep veneers", "Bonding, whitening and aligners when they fit better", "A healthy bite behind every beautiful smile"],
        image: images.smileMakeoverHero,
        ctas: [{ label: "See Smile Makeovers", href: "/smile-makeovers/" }],
      },
      {
        _type: "galleryBlock",
        heading: "Smile Makeovers by Dr. Jiveh",
        text: "Real patients, designed around their own faces.",
        images: [images.baPortrait, images.baPortraitCurly, images.baFrontTeeth],
      },
      location("Wellington Patients Visit Us in Royal Palm Beach", "11989 Southern Blvd, Royal Palm Beach. Visits are by appointment, Monday to Thursday."),
      faq([
        { question: "Can I see my new smile before treatment?", answer: "Yes. Digital smile design lets you preview a plan and give feedback before treatment begins." },
        { question: "What are no-prep veneers?", answer: "No-prep veneers are designed to be placed with little or no changes to your natural teeth. Dr. Jiveh will tell you at your consultation whether they suit your teeth." },
        { question: "Do veneers damage natural teeth?", answer: "That depends on the type of veneer and your teeth. Dr. Jiveh explains how each option works at your consultation, so you can choose with full information." },
        { question: "Do you offer a consultation?", answer: "Yes. Your complimentary cosmetic consultation includes meeting our team, an explanation of our process and answers to your questions." },
        { question: "Are you in network with insurance?", answer: "We are a private, fee for service practice and out of network with insurance plans. We also offer flexible financing options." },
      ]),
      { _type: "sharedBlock", kind: "testimonials" },
      band("Design Your Smile With Dr. Jiveh", "Book a complimentary cosmetic consultation."),
    ],
    seo: {
      title: seoTitle("Veneers and Smile Makeovers in Wellington, FL"),
      description: "Porcelain veneers and smile makeovers for Wellington, FL patients. Dr. Farokh Jiveh designs natural smiles with digital smile design. Book a consultation.",
    },
  },

  /* ------------------------------------------------------------------ All-on-X, Wellington and Palm Beach County */
  {
    slug: "all-on-x-wellington-palm-beach-county",
    layout: "area",
    title: "All-on-X Full Arch Implants in Wellington and Palm Beach County",
    category: "restorative",
    order: 33,
    hero: {
      eyebrow: "Wellington and Palm Beach County",
      heading: "All-on-X Full Arch Implants for Wellington and Palm Beach County",
      text: rich(
        "If you are missing many teeth, or your remaining teeth are failing, All-on-X can replace a full arch with a fixed, implant-supported set of teeth. Dr. Farokh Jiveh provides it to patients from Wellington, Royal Palm Beach and across Palm Beach County.",
      ),
      cta: { label: "Book An Implant Consultation", href: "/appointment/" },
      images: [images.denturesHero],
    },
    blocks: [
      stats(),
      {
        _type: "featureBlock",
        eyebrow: "About All-on-X",
        heading: "A Fixed Alternative to Removable Dentures",
        text: rich(
          "All-on-X (also called All-on-4) uses a small number of dental implants placed in strategic positions to support a full arch of fixed teeth. You brush and floss them like natural teeth. See the full details on our [All-on-X page](/all-on-x-full-arch-restoration/).",
        ),
        bullets: ["Fixed, implant-supported teeth", "Anesthesia and sedation keep you comfortable", "Your jawbone and health are evaluated first"],
        image: images.baAllOnXWoman,
        ctas: [{ label: "All-on-X Details", href: "/all-on-x-full-arch-restoration/" }],
      },
      {
        _type: "imageCardsBlock",
        eyebrow: "Compare Your Options",
        heading: "All-on-X, Implants or Dentures?",
        text: "The right choice depends on how many teeth you are missing and the health of your bone and gums. We recommend what fits you, not one option for everyone.",
        columns: 3,
        cards: [
          card("All-on-X", "A full arch of fixed teeth on a few implants.", "/all-on-x-full-arch-restoration/", "layers"),
          card("Dental Implants", "Replace one tooth or several with implants.", "/dental-implants/", "layers"),
          card("Dentures", "Removable dentures, including implant-supported options.", "/dentures/", "smile"),
        ],
      },
      doctor("Implant Dentistry You Can Trust", "Dr. Jiveh has served Wellington and Royal Palm Beach since 1997, and he mentors dentists in advanced implant and restorative care."),
      location("Serving Wellington and Palm Beach County", "Patients visit our Royal Palm Beach office for implant consultations."),
      faq([
        { question: "Am I a candidate for All-on-X?", answer: "Many adults missing many teeth or with failing teeth are candidates. We evaluate your jawbone and overall health at your consultation." },
        { question: "Is the procedure painful?", answer: "Anesthesia and sedation keep you comfortable. Most patients report only mild discomfort during recovery, which medication helps manage." },
        { question: "How do I care for All-on-X teeth?", answer: "You brush and floss them like natural teeth. Regular dental cleanings keep everything healthy." },
        { question: "Do you serve patients outside Royal Palm Beach?", answer: "Yes. Patients come to us from Wellington and across Palm Beach County. Our office is at 11989 Southern Blvd, Royal Palm Beach, FL 33411." },
        { question: "Do you offer financing?", answer: "We are a private, fee for service practice and we offer flexible financing options. Your consultation covers the details." },
      ]),
      { _type: "sharedBlock", kind: "testimonials" },
      band("Ask About All-on-X", "Book an implant consultation with Dr. Jiveh."),
    ],
    seo: {
      title: seoTitle("All-on-X Implants in Wellington and Palm Beach County"),
      description: "All-on-X full arch dental implants for Wellington and Palm Beach County patients from Dr. Farokh Jiveh in Royal Palm Beach, FL. Book an implant consultation.",
    },
  },

  /* ------------------------------------------------------------------ Smile rehabilitation, Palm Beach County */
  {
    slug: "smile-rehabilitation-palm-beach-county",
    layout: "area",
    title: "Smile Rehabilitation in Palm Beach County",
    category: "restorative",
    order: 34,
    hero: {
      eyebrow: "Palm Beach County, Florida",
      heading: "Smile Rehabilitation and Full Mouth Reconstruction in Palm Beach County",
      text: rich(
        "When teeth are worn, broken, missing or uncomfortable, a complete plan can restore how your smile looks and how it works. Dr. Farokh Jiveh designs smile rehabilitation for patients from Royal Palm Beach, Wellington and across Palm Beach County.",
      ),
      cta: { label: "Book A Consultation", href: "/appointment/" },
      images: [images.generalCta],
    },
    blocks: [
      stats(),
      {
        _type: "featureBlock",
        eyebrow: "A Complete Plan",
        heading: "What Smile Rehabilitation Means",
        text: rich(
          "Smile rehabilitation (also called full mouth rehabilitation or reconstruction) combines treatments so your teeth, gums and bite work together. A plan may include crowns, veneers, implants, bridges, gum care or bite treatment, depending on your needs.",
          "Read more about [full mouth reconstruction](/full-mouth-reconstruction/), [reconstructive dentistry](/reconstructive-dentistry/) and [worn teeth rehabilitation](/worn-teeth-rehabilitation/).",
        ),
        bullets: ["One plan for your whole mouth", "A healthy, comfortable bite as well as a beautiful smile", "Digital design so you understand and approve each step"],
        image: images.baSmileStack,
        ctas: [{ label: "Full Mouth Reconstruction", href: "/full-mouth-reconstruction/" }],
      },
      {
        _type: "imageCardsBlock",
        eyebrow: "Signs To Look For",
        heading: "When To Have an Evaluation",
        text: "These are reasons to have an evaluation, not a diagnosis. Dr. Jiveh will explain what he finds and your options.",
        columns: 3,
        cards: [
          card("Worn or Short Teeth", "Teeth that look flat, short or worn down.", "/worn-teeth-rehabilitation/", "clock"),
          card("Broken or Missing Teeth", "Chipped, cracked or several missing teeth.", "/dental-implants/", "puzzle"),
          card("Jaw Discomfort", "Clenching, headaches or an uneven bite.", "/tmj-treatment/", "square-activity"),
        ],
      },
      doctor("Comprehensive Care From an Educator", "Dr. Jiveh is the Clinical and Course Director at Palm Beach Dental Academy, where he mentors dentists in comprehensive patient care."),
      location("See Us in Royal Palm Beach", "Patients come from across Palm Beach County for complete dentistry."),
      faq([
        { question: "What is smile rehabilitation?", answer: "It is a complete treatment plan that restores teeth, gums and bite so they look and work well together." },
        { question: "How do I know if I need it?", answer: "Worn, broken or missing teeth, an uneven bite or jaw discomfort are reasons to have an evaluation. Dr. Jiveh will tell you what he recommends." },
        { question: "Does it take many visits?", answer: "It depends on your plan. We explain the steps and the visits at your consultation." },
        { question: "Where do you see patients?", answer: "Our office is at 11989 Southern Blvd, Royal Palm Beach, FL 33411. We welcome patients from Wellington and across Palm Beach County." },
        { question: "Do you offer a consultation?", answer: "Yes. Your complimentary consultation includes meeting our team, an explanation of our process and answers to your questions." },
      ]),
      { _type: "sharedBlock", kind: "testimonials" },
      band("Plan Your Complete Smile", "Book a consultation and let Dr. Jiveh explain your options."),
    ],
    seo: {
      title: seoTitle("Smile Rehabilitation in Palm Beach County"),
      description: "Smile rehabilitation and full mouth reconstruction for Palm Beach County patients from Dr. Farokh Jiveh in Royal Palm Beach, FL. Book a consultation.",
    },
  },

  /* ------------------------------------------------------------------ Night guards and sports guards */
  {
    slug: "night-guards-sports-guards",
    layout: "area",
    title: "Night Guards and Sports Guards",
    category: "general",
    order: 35,
    hero: {
      eyebrow: "Protect Your Smile",
      heading: "Custom Night Guards and Sports Guards in Royal Palm Beach",
      text: rich("If you clench or grind your teeth at night, or play sports, a custom guard helps protect your teeth. Dr. Jiveh evaluates your teeth and bite and recommends the guard that fits your needs."),
      cta: book,
      images: [images.hygieneVisit],
    },
    blocks: [
      stats(),
      {
        _type: "imageCardsBlock",
        eyebrow: "Our Guards",
        heading: "Protection Made For Your Teeth",
        columns: 3,
        cards: [
          card("Night Guards", "Made to fit your teeth and worn while you sleep, to help protect them from clenching and grinding.", "/tmj-treatment/", "moon"),
          card("Sports Guards", "A custom fit is more comfortable than a store-bought guard, which helps you wear it.", "/appointment/", "shield-check"),
          card("TMJ Screening", "Jaw discomfort or headaches? Ask about our TMJ screening and treatment.", "/tmj-treatment/", "square-activity"),
        ],
      },
      {
        _type: "featureBlock",
        eyebrow: "Why Custom Matters",
        heading: "A Guard Designed for Your Bite",
        text: rich(
          "A guard made from an impression of your teeth is designed for your bite. Dr. Jiveh will tell you what he sees and what he recommends. A guard protects your teeth but does not treat the cause of grinding, so we look at your bite and overall health too.",
        ),
        bullets: ["Clenching and grinding can wear teeth and chip restorations", "A custom fit is more comfortable than one-size products", "We check your bite and jaw, not just your teeth"],
        image: images.generalHero,
        reverse: true,
        ctas: [book],
      },
      location("Visit Smiles By Jiveh", "Ask about a guard at your next visit."),
      faq([
        { question: "How do I know if I grind my teeth?", answer: "Worn or chipped teeth, jaw soreness and morning headaches can be signs. Dr. Jiveh can check your teeth and bite at your visit." },
        { question: "Is a custom guard different from a store-bought one?", answer: "A custom guard is made to fit your teeth and your bite, so it is more comfortable and protective than a one-size product." },
        { question: "Do you make sports guards?", answer: "Yes. Ask us about a custom guard at your visit." },
        { question: "Where is the office?", answer: "11989 Southern Blvd, Royal Palm Beach, FL 33411. Call (561) 798-9997 to book." },
      ]),
      { _type: "sharedBlock", kind: "testimonials" },
      band("Protect Your Smile", "Book an appointment and ask about a custom guard."),
    ],
    seo: {
      title: seoTitle("Night Guards and Sports Guards in Royal Palm Beach, FL"),
      description: "Custom night guards and sports guards in Royal Palm Beach, FL. Dr. Jiveh evaluates your teeth and bite and recommends the right guard. Book an appointment.",
    },
  },

  /* ------------------------------------------------------------------ New patient evaluation */
  {
    slug: "new-patient-health-evaluation",
    layout: "area",
    title: "Your First Visit: A Complete Health Evaluation",
    category: "general",
    order: 36,
    hero: {
      eyebrow: "New Patients",
      heading: "More Than a Dental Exam: A Complete Health Evaluation",
      text: rich("Your first visit with Dr. Jiveh is a thorough look at your teeth, gums, bite and overall oral health. We take the time to listen to your goals and explain what we find in plain language."),
      cta: { label: "Book Your First Visit", href: "/appointment/" },
      images: [images.homeConsultation],
    },
    blocks: [
      stats(),
      {
        _type: "stepsBlock",
        eyebrow: "What To Expect",
        heading: "Your First Visit, Step by Step",
        steps: [
          { title: "A thorough evaluation", text: "Digital imaging, an iTero scan, a TMJ screening, an oral cancer screening and a smile design preview give Dr. Jiveh a complete picture." },
          { title: "Optional advanced testing", text: "Some patients choose saliva and genetic testing or an oral microbiome evaluation to help personalize gum and prevention care." },
          { title: "Your plan, explained", text: "We go over what we found, your options and your next steps, including costs and flexible financing, so nothing is a surprise." },
        ],
      },
      {
        _type: "featureBlock",
        eyebrow: "A Different Kind of Visit",
        heading: "Time to Listen, Time to Explain",
        text: rich(
          "We are a private, fee for service practice and out of network with insurance plans, which lets us schedule longer appointments and give you our full attention. See [insurance and payment options](/insurance-payment-options/) and how testing connects to [gum therapy](/gum-therapy/).",
        ),
        bullets: ["Longer, unhurried appointments", "Plain-language explanations", "Complimentary consultations for cosmetic and restorative care"],
        image: images.generalCta,
        ctas: [{ label: "Book Your First Visit", href: "/appointment/" }],
      },
      doctor("Meet Dr. Jiveh", "At your first visit you meet Dr. Jiveh, who has served Royal Palm Beach and Wellington since 1997."),
      location("Where To Find Us", "Visits are by appointment, Monday to Thursday."),
      faq([
        { question: "What happens at my first visit?", answer: "We listen to your goals, examine your teeth, gums and bite, and may take images and scans. Then we explain what we found and your options." },
        { question: "Is there a consultation for cosmetic or implant care?", answer: "Yes. We offer complimentary consultations for cosmetic and restorative dentistry." },
        { question: "Do you take insurance?", answer: "We are a private, fee for service practice and out of network with insurance plans. We also offer flexible financing options." },
        { question: "How do I book?", answer: "Use our appointment page or call (561) 798-9997. We see patients Monday through Thursday by appointment." },
      ]),
      { _type: "sharedBlock", kind: "testimonials" },
      band("Book Your First Visit", "Come meet Dr. Jiveh and the team."),
    ],
    seo: {
      title: seoTitle("New Patients: Complete Health Evaluation"),
      description: "Your first visit at Smiles By Jiveh in Royal Palm Beach, FL is a complete health evaluation of your teeth, gums and bite. Book your first visit with Dr. Jiveh.",
    },
  },
];

/** Each page with its longer sections and extra questions, then the four more pages. */
export const areaTreatments: Treatment[] = [
  ...baseAreaTreatments.map((t) => {
    const prose = extraProse[t.slug] ?? [];
    const faqs = extraFaqs[t.slug] ?? [];
    const at = t.blocks.findIndex((b) => b._type === "locationBlock");
    const blocks = t.blocks.map((b) => (b._type === "faqBlock" && faqs.length ? { ...b, items: [...b.items, ...faqs] } : b));
    if (prose.length && at >= 0) blocks.splice(at, 0, ...prose);
    return { ...t, blocks };
  }),
  ...morePages,
];
