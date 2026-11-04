import type { Treatment } from "../types";
import { rich } from "../rich.ts";
import { images } from "./images.ts";

/*
 * Service area and gap pages (TTR OS plan for Smiles by Jiveh, Nov 4, 2026; TTR-1237).
 * DRAFTS FOR REVIEW: written only from facts already on this site (the practice, Dr. Jiveh, the treatments, the office
 * address and hours) and from the practice's brain. No prices, no promised results or timelines, no claim that one treatment
 * is better than another. Nothing here goes live until Kia approves it and Dr. Jiveh approves it in writing.
 * Each page is a normal treatment page at the site root (/dentist-wellington-fl/), so the same template, schema,
 * sitemap and Sanity merge apply. Edit them later in /cms > Treatments.
 */

export const areaTreatments: Treatment[] = [
  {
    slug: "dentist-royal-palm-beach-fl",
    title: "Dentist in Royal Palm Beach, FL",
    category: "general",
    order: 30,
    hero: {
      eyebrow: "Royal Palm Beach, Florida",
      heading: "A Dentist in Royal Palm Beach for Patients Who Value Quality",
      text: rich(
        "Smiles By Jiveh is a private, fee for service dental practice at 11989 Southern Blvd in Royal Palm Beach, led by Dr. Farokh Jiveh and serving Royal Palm Beach, Wellington and surrounding communities since 1997. We are out of network with insurance plans, and we say so up front so there are no surprises.",
        "If you are looking for a dentist who takes the time to understand your health, your goals and your concerns, we invite you to start with a complimentary consultation.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.generalHero],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Your Royal Palm Beach Dental Office",
        items: [
          {
            heading: "Comprehensive Care Under One Roof",
            body: rich(
              "Whether you need a routine visit or a complete smile plan, you can see one team for all of it. Our care includes [general dentistry](/general-dentistry/), [dental cleanings](/dental-cleanings/), [tooth-colored fillings](/tooth-color-fillings/), [gum therapy](/gum-therapy/), [root canal treatment](/root-canal-treatment/) and [sedation dentistry](/sedation-dentistry/) for patients who feel nervous at the dentist.",
              "When a bigger step is the right one, Dr. Jiveh also provides [dental implants](/dental-implants/), [crowns](/dental-crowns/), [bridges](/dental-bridges/), [dentures](/dentures/) and [All-on-X full arch restoration](/all-on-x-full-arch-restoration/), along with [porcelain veneers](/dental-veneers/), [teeth whitening](/teeth-whitening-treatment/) and [smile makeovers](/smile-makeovers/).",
            ),
          },
          {
            heading: "Dentistry Led by an Educator of Dentists",
            body: rich(
              "Dr. Jiveh is the Clinical and Course Director at Palm Beach Dental Academy, where he mentors dentists in advanced clinical techniques, and he served as President of the Florida Academy of Cosmetic Dentistry. He brings that same training and attention to detail to every patient in Royal Palm Beach.",
              "Learn more about [Dr. Jiveh](/meet-dr-jiveh/) and [our practice](/who-we-are/).",
            ),
          },
          {
            heading: "Private Practice, Clear Expectations",
            body: rich(
              "We are a private, fee for service practice and we are out of network with insurance plans. During your consultation we explain your options in plain language, so you can decide with confidence. Read about [insurance and payment options](/insurance-payment-options/), including the flexible financing we offer.",
              "Our team can also support you in English, Spanish and other languages.",
            ),
          },
        ],
      },
      { _type: "sharedBlock", kind: "whyChooseUs" },
      { _type: "sharedBlock", kind: "process" },
      {
        _type: "faqBlock",
        eyebrow: "Common Questions",
        heading: "Frequently Asked Questions",
        items: [
          { question: "Where is Smiles By Jiveh located?", answer: "Our office is at 11989 Southern Blvd, Royal Palm Beach, FL 33411. We also welcome patients from Wellington and nearby communities." },
          { question: "Are you in network with my insurance?", answer: "No. We are a private, fee for service practice and we are out of network with insurance plans. We explain your options and any financing at your consultation." },
          { question: "Do you offer a consultation for new patients?", answer: "Yes. Your complimentary consultation includes meeting our team, an explanation of our process and answers to your questions." },
          { question: "What are your office hours?", answer: "We see patients Monday through Thursday, 9:00 AM to 5:00 PM, by appointment only. Friday morning hours are available by special request." },
          { question: "Do you have team members who speak Spanish?", answer: "We offer bilingual support in English, Spanish and other languages. Please call (561) 798-9997 and we will help you." },
        ],
      },
      { _type: "sharedBlock", kind: "testimonials" },
    ],
    seo: {
      title: "Dentist in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "A private, fee for service dentist in Royal Palm Beach, FL. Dr. Farokh Jiveh offers general, cosmetic, implant and reconstructive dentistry. Book a consultation.",
    },
  },
  {
    slug: "dentist-wellington-fl",
    title: "Dentist Serving Wellington, FL",
    category: "general",
    order: 31,
    hero: {
      eyebrow: "Wellington, Florida",
      heading: "A Dentist for Wellington Patients Who Want More Than a Routine Visit",
      text: rich(
        "Patients from Wellington choose Smiles By Jiveh for personalized, high-quality dental care from Dr. Farokh Jiveh. Our office is at 11989 Southern Blvd in Royal Palm Beach, and we have proudly served Wellington and surrounding communities since 1997.",
        "From preventive care to full smile designs, every visit starts with listening to what matters to you.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.homeConsultation],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Dentistry for Wellington",
        items: [
          {
            heading: "Cosmetic Dentistry for Wellington Smiles",
            body: rich(
              "Many Wellington patients come to us for a smile they feel confident about. Dr. Jiveh designs each smile around your face, your personality and your goals, using digital smile design so you can preview your plan before treatment begins.",
              "Explore [veneers and smile makeovers in Wellington](/veneers-smile-makeovers-wellington-fl/), [teeth whitening](/teeth-whitening-treatment/), [Invisalign](/invisalign/) and [clear aligners](/clear-aligners/).",
            ),
          },
          {
            heading: "Replacing Missing or Failing Teeth",
            body: rich(
              "If you are missing teeth or your teeth are failing, we offer [dental implants](/dental-implants/), [bridges](/dental-bridges/), [dentures](/dentures/) and [All-on-X full arch restoration](/all-on-x-wellington-palm-beach-county/). We evaluate your jawbone and overall health at your consultation so the plan fits you.",
            ),
          },
          {
            heading: "Everyday Dentistry and Comfort",
            body: rich(
              "Healthy teeth and gums are the base of every great smile. We provide [general dentistry](/general-dentistry/), [dental cleanings](/dental-cleanings/), [gum therapy](/gum-therapy/) and [sedation dentistry](/sedation-dentistry/) for patients who want a more relaxed visit.",
              "We are a private, fee for service practice and out of network with insurance plans. See [insurance and payment options](/insurance-payment-options/).",
            ),
          },
        ],
      },
      { _type: "sharedBlock", kind: "whyChooseUs" },
      { _type: "sharedBlock", kind: "process" },
      {
        _type: "faqBlock",
        eyebrow: "Common Questions",
        heading: "Frequently Asked Questions",
        items: [
          { question: "Do you see patients from Wellington?", answer: "Yes. Many of our patients come from Wellington, Royal Palm Beach and nearby communities. Our office is at 11989 Southern Blvd, Royal Palm Beach, FL 33411." },
          { question: "Do you offer cosmetic dentistry?", answer: "Yes. Dr. Jiveh offers porcelain veneers, teeth whitening, bonding, Invisalign and complete smile makeovers, designed around your goals." },
          { question: "Can I book a consultation?", answer: "Yes. Your complimentary consultation includes meeting our team, an explanation of our process and answers to your questions." },
          { question: "Do you work with dental insurance?", answer: "We are a private, fee for service practice and we are out of network with insurance plans. We also offer flexible financing options." },
        ],
      },
      { _type: "sharedBlock", kind: "testimonials" },
    ],
    seo: {
      title: "Dentist Serving Wellington, FL - Smiles By Jiveh",
      description: "Smiles By Jiveh serves Wellington, FL patients with cosmetic, implant and general dentistry from Dr. Farokh Jiveh. Book a complimentary consultation.",
    },
  },
  {
    slug: "veneers-smile-makeovers-wellington-fl",
    title: "Veneers and Smile Makeovers in Wellington, FL",
    category: "cosmetic",
    order: 32,
    hero: {
      eyebrow: "Wellington, Florida",
      heading: "Porcelain Veneers and Smile Makeovers for Wellington Patients",
      text: rich(
        "If you live in Wellington and want a smile that looks natural and feels like yours, Dr. Farokh Jiveh designs veneers and smile makeovers around your face, your features and your goals. Every plan begins with a conversation and a digital preview of what is possible.",
        "Dr. Jiveh teaches other dentists advanced cosmetic techniques and is a past President of the Florida Academy of Cosmetic Dentistry.",
      ),
      cta: { label: "Book A Cosmetic Consultation", href: "/appointment/" },
      images: [images.serviceVeneers],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Your Smile Design",
        items: [
          {
            heading: "How a Veneer Smile Is Planned",
            body: rich(
              "A veneer is a thin, custom shell that covers the front of a tooth. We begin with a facial and smile evaluation, photographs and digital smile design, so you can see a preview and give feedback before any treatment starts. Your plan is then made with one of the nation's premier cosmetic dental laboratories.",
              "To see the full process, visit our [porcelain veneers page](/dental-veneers/) and our [smile makeovers page](/smile-makeovers/).",
            ),
          },
          {
            heading: "Is a Veneer Right for You?",
            body: rich(
              "Veneers may help with chipped, worn, stained or uneven teeth and small gaps. Some patients are candidates for no-prep veneers, which are designed to work without altering natural teeth. Whether veneers fit your situation depends on your teeth, gums and bite, so Dr. Jiveh evaluates each patient individually.",
              "Not every smile needs veneers. Depending on your goals, we may suggest [teeth whitening](/teeth-whitening-treatment/), bonding, [Invisalign](/invisalign/) or a combination.",
            ),
          },
          {
            heading: "Beautiful and Healthy Together",
            body: rich(
              "A beautiful smile must also work well. We look at your bite and the health of your teeth and gums, because lasting results come from a healthy foundation. Wellington patients visit our Royal Palm Beach office at 11989 Southern Blvd.",
            ),
          },
        ],
      },
      { _type: "sharedBlock", kind: "whyChooseUs" },
      { _type: "sharedBlock", kind: "process" },
      {
        _type: "faqBlock",
        eyebrow: "Common Questions",
        heading: "Frequently Asked Questions",
        items: [
          { question: "Can I see my new smile before treatment?", answer: "Yes. Digital smile design lets you preview a plan and give feedback before treatment begins." },
          { question: "What are no-prep veneers?", answer: "No-prep veneers are designed to be placed with little or no changes to your natural teeth. Dr. Jiveh will tell you at your consultation whether they suit your teeth." },
          { question: "Do veneers damage natural teeth?", answer: "That depends on the type of veneer and your teeth. Dr. Jiveh explains how each option works at your consultation, so you can choose with full information." },
          { question: "Do you offer a consultation?", answer: "Yes. Your complimentary cosmetic consultation includes meeting our team, an explanation of our process and answers to your questions." },
          { question: "Are you in network with insurance?", answer: "We are a private, fee for service practice and out of network with insurance plans. We also offer flexible financing options." },
        ],
      },
      { _type: "sharedBlock", kind: "testimonials" },
    ],
    seo: {
      title: "Veneers and Smile Makeovers in Wellington, FL - Smiles By Jiveh",
      description: "Porcelain veneers and smile makeovers for Wellington, FL patients. Dr. Farokh Jiveh designs natural smiles with digital smile design. Book a consultation.",
    },
  },
  {
    slug: "all-on-x-wellington-palm-beach-county",
    title: "All-on-X Full Arch Implants in Wellington and Palm Beach County",
    category: "restorative",
    order: 33,
    hero: {
      eyebrow: "Wellington and Palm Beach County",
      heading: "All-on-X Full Arch Implants for Patients in Wellington and Palm Beach County",
      text: rich(
        "If you are missing many teeth, or your remaining teeth are failing, All-on-X can replace a full arch of teeth with a fixed, implant-supported set. Dr. Farokh Jiveh provides All-on-X to patients from Wellington, Royal Palm Beach and across Palm Beach County at our Royal Palm Beach office.",
        "Your first step is an evaluation of your jawbone, your gums and your overall health.",
      ),
      cta: { label: "Book An Implant Consultation", href: "/appointment/" },
      images: [images.serviceAllOnX],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "About All-on-X",
        items: [
          {
            heading: "What All-on-X Is",
            body: rich(
              "All-on-X (also called All-on-4) uses a small number of dental implants placed in strategic positions to support a full arch of fixed teeth. It is an alternative to removable dentures for patients who want a stable, natural feeling smile. See the full details on our [All-on-X page](/all-on-x-full-arch-restoration/).",
            ),
          },
          {
            heading: "All-on-X, Implants or Dentures?",
            body: rich(
              "The right choice depends on how many teeth you are missing, the health of your bone and gums, and what matters most to you. Dr. Jiveh also provides [dental implants](/dental-implants/), [bridges](/dental-bridges/) and [dentures](/dentures/), and he explains the options at your consultation so you can choose with confidence. We do not push one option over another: we recommend what fits your health and goals.",
            ),
          },
          {
            heading: "Comfort and Care",
            body: rich(
              "Anesthesia and sedation keep you comfortable, and most patients report only mild discomfort during recovery. Learn about [sedation dentistry](/sedation-dentistry/) if you feel nervous about dental treatment. With regular checkups and good home care, implant teeth can serve you for many years.",
            ),
          },
        ],
      },
      { _type: "sharedBlock", kind: "whyChooseUs" },
      { _type: "sharedBlock", kind: "process" },
      {
        _type: "faqBlock",
        eyebrow: "Common Questions",
        heading: "Frequently Asked Questions",
        items: [
          { question: "Am I a candidate for All-on-X?", answer: "Many adults missing many teeth or with failing teeth are candidates. We evaluate your jawbone and overall health at your consultation." },
          { question: "Is the procedure painful?", answer: "Anesthesia and sedation keep you comfortable. Most patients report only mild discomfort during recovery, which medication helps manage." },
          { question: "How do I care for All-on-X teeth?", answer: "You brush and floss them like natural teeth. Regular dental cleanings keep everything healthy." },
          { question: "Do you serve patients outside Royal Palm Beach?", answer: "Yes. Patients come to us from Wellington and across Palm Beach County. Our office is at 11989 Southern Blvd, Royal Palm Beach, FL 33411." },
          { question: "Do you offer financing?", answer: "We are a private, fee for service practice and we offer flexible financing options. Your consultation covers the details." },
        ],
      },
      { _type: "sharedBlock", kind: "testimonials" },
    ],
    seo: {
      title: "All-on-X Implants in Wellington and Palm Beach County - Smiles By Jiveh",
      description: "All-on-X full arch dental implants for Wellington and Palm Beach County patients from Dr. Farokh Jiveh in Royal Palm Beach, FL. Book an implant consultation.",
    },
  },
  {
    slug: "smile-rehabilitation-palm-beach-county",
    title: "Smile Rehabilitation in Palm Beach County",
    category: "restorative",
    order: 34,
    hero: {
      eyebrow: "Palm Beach County, Florida",
      heading: "Smile Rehabilitation and Full Mouth Reconstruction in Palm Beach County",
      text: rich(
        "When teeth are worn, broken, missing or uncomfortable, a complete plan can restore how your smile looks and how it works. Dr. Farokh Jiveh designs smile rehabilitation plans for patients from Royal Palm Beach, Wellington and across Palm Beach County.",
        "Every plan begins with a thorough evaluation of your teeth, gums, bite and jaw.",
      ),
      cta: { label: "Book A Consultation", href: "/appointment/" },
      images: [images.baSmileStack],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "A Complete Plan",
        items: [
          {
            heading: "What Smile Rehabilitation Means",
            body: rich(
              "Smile rehabilitation (also called full mouth rehabilitation or reconstruction) combines treatments so your teeth, gums and bite work together. Depending on your needs, a plan may include crowns, veneers, implants, bridges, gum care or bite treatment. Read more about [full mouth reconstruction](/full-mouth-reconstruction/), [reconstructive dentistry](/reconstructive-dentistry/) and [worn teeth rehabilitation](/worn-teeth-rehabilitation/).",
            ),
          },
          {
            heading: "Signs You May Want an Evaluation",
            body: rich(
              "- Teeth that look short, flat or worn down",
              "- Chipped, cracked or broken teeth",
              "- Several missing or failing teeth",
              "- Jaw discomfort, headaches or clenching (see [TMJ treatment](/tmj-treatment/))",
              "- A bite that feels uneven or uncomfortable",
              "These are reasons to have an evaluation, not a diagnosis. Dr. Jiveh will explain what he finds and your options.",
            ),
          },
          {
            heading: "A Plan Made Around You",
            body: rich(
              "Complete dentistry takes planning. We use digital design and photography so you can understand and approve your plan, and we focus on a healthy, comfortable bite as well as a beautiful smile. Dr. Jiveh is the Clinical and Course Director at Palm Beach Dental Academy, where he mentors dentists in comprehensive patient care.",
            ),
          },
        ],
      },
      { _type: "sharedBlock", kind: "whyChooseUs" },
      { _type: "sharedBlock", kind: "process" },
      {
        _type: "faqBlock",
        eyebrow: "Common Questions",
        heading: "Frequently Asked Questions",
        items: [
          { question: "What is smile rehabilitation?", answer: "It is a complete treatment plan that restores teeth, gums and bite so they look and work well together." },
          { question: "How do I know if I need it?", answer: "Worn, broken or missing teeth, an uneven bite or jaw discomfort are reasons to have an evaluation. Dr. Jiveh will tell you what he recommends." },
          { question: "Does it take many visits?", answer: "It depends on your plan. We explain the steps and the visits at your consultation." },
          { question: "Where do you see patients?", answer: "Our office is at 11989 Southern Blvd, Royal Palm Beach, FL 33411. We welcome patients from Wellington and across Palm Beach County." },
          { question: "Do you offer a consultation?", answer: "Yes. Your complimentary consultation includes meeting our team, an explanation of our process and answers to your questions." },
        ],
      },
      { _type: "sharedBlock", kind: "testimonials" },
    ],
    seo: {
      title: "Smile Rehabilitation in Palm Beach County - Smiles By Jiveh",
      description: "Smile rehabilitation and full mouth reconstruction for Palm Beach County patients from Dr. Farokh Jiveh in Royal Palm Beach, FL. Book a consultation.",
    },
  },
  {
    slug: "night-guards-sports-guards",
    title: "Night Guards and Sports Guards",
    category: "general",
    order: 35,
    hero: {
      eyebrow: "Protect Your Smile",
      heading: "Custom Night Guards and Sports Guards in Royal Palm Beach",
      text: rich(
        "If you clench or grind your teeth at night, or play sports, a custom guard helps protect your teeth. At Smiles By Jiveh, Dr. Jiveh evaluates your teeth and bite and recommends the guard that fits your needs.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.tmjHero],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "Night Guards",
            body: rich(
              "Clenching and grinding can wear teeth, chip restorations and strain the jaw. A custom night guard is made to fit your teeth and is worn while you sleep to help protect them. If you also have jaw discomfort or headaches, learn about our [TMJ treatment](/tmj-treatment/).",
            ),
          },
          {
            heading: "Sports Guards",
            body: rich(
              "A custom sports guard fits better and feels more comfortable than a store-bought one, which helps you wear it. Ask us about a guard for you or your athlete at your next visit.",
            ),
          },
          {
            heading: "Why Custom Matters",
            body: rich(
              "A guard made from an impression of your teeth is designed for your bite. Dr. Jiveh will tell you what he sees and what he recommends. A guard protects your teeth but does not treat the cause of grinding, so we look at your bite and overall health too.",
            ),
          },
        ],
      },
      { _type: "sharedBlock", kind: "whyChooseUs" },
      { _type: "sharedBlock", kind: "process" },
      {
        _type: "faqBlock",
        eyebrow: "Common Questions",
        heading: "Frequently Asked Questions",
        items: [
          { question: "How do I know if I grind my teeth?", answer: "Worn or chipped teeth, jaw soreness and morning headaches can be signs. Dr. Jiveh can check your teeth and bite at your visit." },
          { question: "Is a custom guard different from a store-bought one?", answer: "A custom guard is made to fit your teeth and your bite, so it is more comfortable and protective than a one-size product." },
          { question: "Do you make sports guards?", answer: "Yes. Ask us about a custom guard at your visit." },
          { question: "Where is the office?", answer: "11989 Southern Blvd, Royal Palm Beach, FL 33411. Call (561) 798-9997 to book." },
        ],
      },
      { _type: "sharedBlock", kind: "testimonials" },
    ],
    seo: {
      title: "Night Guards and Sports Guards in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "Custom night guards and sports guards in Royal Palm Beach, FL. Dr. Jiveh evaluates your teeth and bite and recommends the right guard. Book an appointment.",
    },
  },
  {
    slug: "new-patient-health-evaluation",
    title: "Your First Visit: A Complete Health Evaluation",
    category: "general",
    order: 36,
    hero: {
      eyebrow: "New Patients",
      heading: "More Than a Dental Exam: A Complete Health Evaluation",
      text: rich(
        "Your first visit with Dr. Jiveh is a thorough look at your teeth, gums, bite and overall oral health. We take the time to listen to your goals and explain what we find in plain language.",
      ),
      cta: { label: "Book Your First Visit", href: "/appointment/" },
      images: [images.homeConsultation],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "What to Expect",
        items: [
          {
            heading: "A Thorough Evaluation",
            body: rich(
              "Your evaluation can include digital imaging, an iTero scan, a TMJ screening, an oral cancer screening and a smile design preview. Together these give Dr. Jiveh a complete picture so he can recommend care that fits you.",
            ),
          },
          {
            heading: "Optional Advanced Testing",
            body: rich(
              "Some patients also choose saliva and genetic testing or an oral microbiome evaluation, which can help personalize gum and prevention care. Ask us whether testing makes sense for you. See how this connects to [gum therapy](/gum-therapy/).",
            ),
          },
          {
            heading: "Your Plan, Explained",
            body: rich(
              "After your evaluation we go over what we found, your options and your next steps. We are a private, fee for service practice, out of network with insurance plans, and we explain costs and financing options so nothing is a surprise. See [insurance and payment options](/insurance-payment-options/).",
            ),
          },
        ],
      },
      { _type: "sharedBlock", kind: "process" },
      {
        _type: "faqBlock",
        eyebrow: "Common Questions",
        heading: "Frequently Asked Questions",
        items: [
          { question: "What happens at my first visit?", answer: "We listen to your goals, examine your teeth, gums and bite, and may take images and scans. Then we explain what we found and your options." },
          { question: "Is there a consultation for cosmetic or implant care?", answer: "Yes. We offer complimentary consultations for cosmetic and restorative dentistry." },
          { question: "Do you take insurance?", answer: "We are a private, fee for service practice and out of network with insurance plans. We also offer flexible financing options." },
          { question: "How do I book?", answer: "Use our appointment page or call (561) 798-9997. We see patients Monday through Thursday by appointment." },
        ],
      },
      { _type: "sharedBlock", kind: "testimonials" },
    ],
    seo: {
      title: "New Patients: Complete Health Evaluation - Smiles By Jiveh",
      description: "Your first visit at Smiles By Jiveh in Royal Palm Beach, FL is a complete health evaluation of your teeth, gums and bite. Book your first visit with Dr. Jiveh.",
    },
  },
];
