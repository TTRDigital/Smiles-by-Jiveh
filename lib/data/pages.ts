import type { AboutContent, AppointmentContent, DoctorContent, HomeContent, InsuranceContent, LegalContent } from "../types";
import { rich } from "../rich.ts";
import { images } from "./images.ts";

/* Built-in page content (the client's own text from the old site). Sanity values override it field by field. */

export const fallbackHome: HomeContent = {
  hero: {
    heading: "Elevated Dentistry. Personalized Experience.",
    text: "Comprehensive Cosmetic and Restorative Dentistry. Serving Wellington and the Palm Beaches.",
    videoUrl: "https://www.youtube.com/watch?v=ieuD49s0MPc",
    image: images.heroVideoPoster,
    ctas: [
      { label: "Book Online Appointment", href: "/appointment/" },
      { label: "Learn More", href: "/appointment/" },
    ],
  },
  intro: {
    eyebrow: "Dedicated to Your Best Smile",
    heading: "Exceptional dentistry should feel personal, calm, and uncompromising in quality.",
    cards: [
      { icon: "heart-handshake", title: "One Patient at a Time", text: "Focused appointments designed around your comfort, attention, and outcome — never rushed." },
      { icon: "sparkle", title: "Artistry Meets Advanced Dentistry", text: "Beautiful smiles created with precision, function, and natural aesthetics in harmony." },
      { icon: "smile", title: "Relationships Built on Trust", text: "Clear communication, honest guidance, and care that feels personal from the first visit forward." },
    ],
  },
  about: {
    heading: "Dentistry that is as functional as it is beautiful.",
    text: rich(
      "Our practice combines advanced clinical expertise with an artistic approach to smile design, restorative care, and long-term oral wellness.",
      "We believe true full-body health begins in the mouth. Your oral health is deeply connected to your overall well-being, confidence, and quality of life, which is why we take a comprehensive approach to care that supports both beautiful smiles and lasting health.",
      "Through advanced periodontal care, salivary and genetic testing, microbiome evaluation, and personalized wellness guidance, we take a comprehensive approach to supporting both oral and full-body health.",
      "We take the time to understand your goals, create customized treatment plans, and deliver dentistry that is as functional as it is beautiful. For your convenience, we also offer complimentary consultations, flexible financing options, and bilingual support in English, Spanish, and other languages.",
    ),
    cta: { label: "Schedule a consultation.", href: "/appointment/" },
    image: images.homeConsultation,
  },
  services: {
    heading: "Comprehensive dentistry designed around your life.",
    text: "Whether you’re looking to enhance your smile, restore oral health, or completely rebuild your confidence, every treatment at Smiles By Jiveh is thoughtfully personalized to support your long-term health, function, and well-being. We combine advanced technology, artistic precision, and compassionate care to create results that are as beautiful as they are lasting.",
    slides: [
      {
        title: "Cosmetic Dentistry",
        text: "Enhance your smile with cosmetic dentistry that looks naturally beautiful, not artificial. As an educator and mentor in cosmetic dentistry, Dr. Farokh Jiveh creates personalized smile makeovers, porcelain veneers, and aesthetic treatments that enhance confidence while preserving long-term oral health.",
        href: "/cosmetic-dentistry/",
        image: images.serviceCosmetic,
      },
      {
        title: "Porcelain Restorations & No-Prep Veneers",
        text: "Beautiful smiles begin with preserving healthy teeth whenever possible. Our porcelain restorations and No-Prep veneers are thoughtfully designed to enhance shape, color, and symmetry while maintaining your natural tooth structure and creating elegant, authentic results.",
        href: "/dental-veneers/",
        image: images.serviceVeneers,
      },
      {
        title: "All-on-X Hybrid Restorations",
        text: "If you’re living with failing or missing teeth, All-on-X Hybrid Restorations can restore your ability to eat, speak, and smile with confidence. Using implant-supported full-arch restorations, every treatment is carefully planned to deliver natural beauty, lasting comfort, and life-changing function.",
        href: "/all-on-x-full-arch-restoration/",
        image: images.serviceAllOnX,
      },
      {
        title: "Smile Alignment & Enhancement",
        text: "A beautifully aligned smile enhances more than your appearance — it supports your confidence, oral health, and overall well-being. Using Invisalign® and SimplyClear® clear aligners, combined with professional whitening, every treatment is thoughtfully customized to create a naturally balanced, radiant smile.",
        href: "/invisalign/",
        image: images.serviceAlignment,
      },
      {
        title: "Surgical & Implant Rehabilitation",
        text: "When advanced surgical care or dental implants are needed, you deserve a team that makes the process feel comfortable, coordinated, and reassuring. Dr. Farokh Jiveh personally guides every phase of treatment while collaborating with trusted surgical specialists to achieve lasting function, natural aesthetics, and a seamless patient experience.",
        href: "/oral-surgery/",
        image: images.serviceSurgical,
      },
    ],
  },
  doctor: {
    eyebrow: "Meet Dr. Farokh Jiveh",
    heading: "Experience. Artistry. A relationship built on trust.",
    text: rich(
      "For more than 20 years, Dr. Farokh Jiveh has been dedicated to helping patients achieve healthier, more confident smiles through a personalized approach to comprehensive dentistry. Recognized as both a clinician and educator, he combines advanced restorative, cosmetic, implant, and wellness-focused dentistry with a commitment to preserving long-term oral health while creating naturally beautiful results. Every patient relationship is built on trust, thoughtful communication, and individualized care, because exceptional dentistry should always feel personal.",
    ),
    highlights: [
      "Dental Academy Instructor – Educating and mentoring dentists through advanced continuing education and clinical training.",
      "Florida Academy of Cosmetic Dentistry President (2021) – Leading one of Florida’s premier organizations dedicated to excellence in cosmetic dentistry.",
      "20+ Years of Experience – Delivering comprehensive cosmetic, restorative, implant, and wellness-focused dentistry with an unwavering commitment to excellence and human-centered care.",
    ],
    cta: { label: "Schedule a consultation.", href: "/appointment/" },
    image: images.drJiveh,
  },
  beforeAfter: {
    eyebrow: "Transformations that Inspire Confidence",
    heading: "Before and After",
    images: [images.compare1, images.compare2, images.compare3, images.compare4],
  },
  testimonials: { eyebrow: "Testimonials", heading: "What Our Patients Say About Their Experience" },
  contact: {
    eyebrow: "We Can’t Wait To Meet You!",
    heading: "Contact Us",
    lead: "Your healthiest, most confident smile begins here.",
    text: "Whether you’re interested in cosmetic dentistry, smile rehabilitation, preventive care, or simply finding a dental home that truly listens, we invite you to experience dentistry designed around you.",
    ghlFormId: "o5N2Cg1KTnReA0wS8Jh2",
    formNote: "New patients: once you submit this form, we’ll send you a personal link to complete your new patient forms.",
  },
  ctaBand: {
    heading: "Your healthiest, most confident smile begins here.",
    text: "Whether you’re interested in cosmetic dentistry, smile rehabilitation, preventive care, or simply finding a dental home that truly listens, we invite you to experience dentistry designed around you.",
    ctas: [
      { label: "Schedule a Complimentary Consultation", href: "/appointment/" },
      { label: "Call Our Office", href: "tel:5617989997" },
    ],
    image: images.ctaBand,
  },
  seo: {
    title: "Dentist in Royal Palm Beach, FL - Smiles By Jiveh",
    description:
      "Elevated dentistry, personalized care: cosmetic and restorative dentistry with Dr. Farokh Jiveh in Royal Palm Beach, serving Wellington and the Palm Beaches.",
  },
};

export const fallbackAbout: AboutContent = {
  hero: {
    eyebrow: "Smiles By Jiveh · Royal Palm Beach & Wellington, FL",
    heading: "Award-Winning Dentistry Led by Dr. Farokh Jiveh",
    text: "At Smiles By Jiveh, we believe exceptional dentistry is about more than beautiful smiles—it is about building lasting relationships, restoring health, and creating personalized experiences that improve lives. Every treatment is thoughtfully designed to combine advanced clinical expertise, artistic precision, and genuine compassion in an environment that feels calm, welcoming, and deeply personal.",
    cta: { label: "Book Appointment", href: "/appointment/" },
    image: images.teamCollage,
  },
  philosophy: {
    eyebrow: "Practice Philosophy",
    heading: "More than exceptional dentistry.",
    text: rich(
      "Smiles By Jiveh was created around a simple belief: every patient deserves to feel heard, respected, and genuinely cared for. We take time to understand your goals, educate you on your options, and create personalized treatment plans that support long-term oral health, confidence, and overall well-being.",
      "Whether you are visiting us for preventive care, cosmetic dentistry, full-mouth rehabilitation, or implant treatment, our commitment remains the same—to deliver dentistry that is as functional as it is beautiful in an environment that feels comfortable, calming, and uncompromising in quality.",
    ),
    image: images.teamGroup,
  },
  specialties: {
    heading: "What We Specialize In",
    items: [
      "Cosmetic Dentistry",
      "Smile Design",
      "Porcelain Veneers & No-Prep Veneers",
      "Restorative Dentistry",
      "Dental Implants & Full-Mouth Rehabilitation",
      "Invisalign® & Smile Enhancement",
      "Comprehensive Oral Wellness",
      "Advanced Periodontal Care",
    ],
    stats: [
      { value: 10000, suffix: "+", label: "Smiles Transformed" },
      { value: 27, suffix: "+", label: "Years of Experience" },
      { value: 5, decimals: 1, label: "Average Google Rating" },
      { value: 168, label: "Five-Star Reviews" },
    ],
  },
  seo: {
    title: "Who We Are: Dentist in Royal Palm Beach - Smiles By Jiveh",
    description: "Award-winning dentistry led by Dr. Farokh Jiveh in Royal Palm Beach and Wellington, FL: lasting relationships, restored health and personalized care.",
  },
};

export const fallbackDoctor: DoctorContent = {
  hero: {
    eyebrow: "Meet Dr. Farokh Jiveh",
    heading: "Excellence begins with a commitment to lifelong learning.",
    text: "Dr. Farokh Jiveh has dedicated his career to the pursuit of excellence in cosmetic, restorative, and comprehensive dentistry.",
    cta: { label: "Book Appointment", href: "/appointment/" },
    image: images.drJiveh,
  },
  story: {
    eyebrow: "Meet Dr. Farokh Jiveh",
    heading: "Personal Story",
    text: rich(
      "For more than two decades, Dr. Jiveh has pursued excellence in cosmetic, restorative, and comprehensive dentistry. After graduating at the top of his class from the **Medical College of Virginia School of Dentistry**, he continued his advanced clinical training by completing a two-year residency in Advanced Education in General Dentistry (AEGD) at the **University of California, San Francisco (UCSF)**, one of the nation’s most respected postgraduate dental programs.",
      "From the very beginning of his career, Dr. Jiveh recognized that mastery in dentistry comes not only from treating patients, but also from continually learning, teaching, and advancing the profession. For more than 15 years, he has educated fellow dentists in cosmetic, implant, and restorative dentistry through continuing education programs and local dental study clubs. Today, he serves as the **Clinical and Course Director at Palm Beach Dental Academy**, where he mentors dentists in advanced clinical techniques and comprehensive patient care.",
      "His commitment to excellence extends beyond the operatory. In 2021, Dr. Jiveh had the privilege of serving as **President of the Florida Academy of Cosmetic Dentistry**, one of the country’s leading organizations dedicated to advancing excellence in cosmetic dentistry. Throughout his career, he has remained deeply involved in organized dentistry, education, and professional leadership.",
      "Recognized by his peers as one of **America’s Top Dentists**, Dr. Jiveh has built a reputation for combining advanced clinical expertise with artistic precision and a deeply personalized approach to patient care. His philosophy is simple: exceptional dentistry should improve not only smiles, but also health, confidence, and quality of life.",
      "Every patient is treated with the same care, respect, and attention to detail that have defined his career for more than 25 years.",
    ),
    image: images.drJivehTreating,
  },
  highlights: {
    heading: "Professional Highlights",
    items: [
      "Graduated at the top of his class from the Medical College of Virginia School of Dentistry",
      "Completed a two-year Advanced Education in General Dentistry (AEGD) residency at the University of California, San Francisco (UCSF)",
      "Clinical and Course Director, Palm Beach Dental Academy",
      "Educator and lecturer in cosmetic, implant, and restorative dentistry for more than 15 years",
      "President, Florida Academy of Cosmetic Dentistry (2021)",
      "Recognized by his peers as one of America's Top Dentists",
      "More than 25 years of clinical experience",
      "Dedicated to comprehensive, conservative, and wellness-focused dentistry",
    ],
  },
  philosophy: {
    eyebrow: "Dr. Jiveh's Philosophy",
    quote:
      "“Dentistry is never just about teeth. It's about restoring health, building confidence, and creating relationships based on trust. Every patient deserves to feel heard, understood, and cared for — and every treatment should be as functional as it is beautiful.”",
  },
  seo: {
    title: "Meet Dr. Farokh Jiveh in Royal Palm Beach - Smiles By Jiveh",
    description: "Dr. Farokh Jiveh has dedicated his career to the pursuit of excellence in cosmetic, restorative, and comprehensive dentistry.",
  },
};

export const fallbackInsurance: InsuranceContent = {
  hero: {
    eyebrow: "Insurance & Payment Options",
    heading: "Making Exceptional Care Accessible",
    text: rich(
      "At Smiles By Jiveh, we believe exceptional dental care should be paired with clarity, flexibility, and a truly personalized experience. By seeing one patient at a time, we are able to give you our full attention, never rush your visit, and provide the level of care and attention to detail that sets our practice apart.",
      "We offer a variety of payment and financing options to help make investing in your smile simple and convenient.",
      "As an out-of-network practice, we are happy to submit insurance claims on your behalf and help you maximize your available benefits. Our team takes care of the details so you can focus on enjoying a comfortable experience and achieving a healthy, confident smile.",
    ),
    cta: { label: "Book An Appointment", href: "/appointment/" },
    images: [images.hygieneVisit],
  },
  philosophy: {
    heading: "Our Insurance Philosophy",
    text: rich(
      "At Smiles By Jiveh, we are intentionally an out-of-network, fee-for-service practice because we believe your treatment should be guided by your individual needs, not the limitations of an insurance plan.",
      "This approach allows us to provide truly personalized care, recommend what is best for your long-term oral health, and dedicate the time and attention every patient deserves. Many of our patients have in network dental benefits available elsewhere, yet choose our practice because they value the exceptional care, individualized attention, and lasting results we provide.",
      "As a courtesy, our knowledgeable team will submit your insurance claims on your behalf and help you maximize your available out-of-network benefits. We handle the paperwork and work directly with your insurance company so you can focus on your smile while we take care of the rest.",
    ),
  },
  payment: {
    heading: "Payment & Financing Options",
    text: "We are committed to making your investment in exceptional dental care as convenient and straightforward as possible.",
    directHeading: "Direct Payment",
    directText: "For your convenience, we accept:",
    methods: [
      { emoji: "💵", label: "Cash" },
      { emoji: "🧾", label: "Personal Checks" },
      { emoji: "💳", label: "Debit Cards" },
      { emoji: "💳", label: "Credit Cards", note: "A 3% processing fee applies to credit card payments." },
    ],
    dueNote: "Payment is due at the time services are rendered unless financial arrangements have been made in advance.",
    financingHeading: "Flexible Financing",
    financingText: "To provide greater flexibility, we offer several financing options that allow you to spread the cost of treatment into comfortable monthly payments.",
    options: [
      {
        icon: "calendar-check",
        title: "Sunbit",
        text: "Sunbit offers fast, simple financing with convenient monthly payment plans and an easy application process.",
        href: "https://apply.sunbit.com/SmilesbyJiveh",
        linkLabel: "Click here to apply →",
      },
      {
        icon: "heart-handshake",
        title: "Cherry",
        text: "Cherry provides flexible monthly payment options, making it easy to begin treatment with payments that fit your budget.",
        href: "https://pay.withcherry.com/smiles-by-jiveh?utm_source=merchant&utm_medium=qr_code_flyer&utm_campaign=v1",
        linkLabel: "Click here to apply →",
      },
      {
        icon: "square-activity",
        title: "CareCredit",
        text: "CareCredit offers convenient financing with low monthly payments, and as a courtesy, we cover the interest on qualifying plans.",
        href: "https://carecredit.com/go/kfr593",
        linkLabel: "Click here to apply →",
      },
    ],
  },
  cta: {
    heading: "A confident smile, made simple.",
    text: rich(
      "Our team will be happy to help you explore these options, answer your questions, and guide you through the application process so you can choose the solution that best fits your needs.",
    ),
    cta: { label: "Book An Appointment", href: "/appointment/" },
    image: images.drJivehTreating,
  },
  seo: {
    title: "Insurance & Payments in Royal Palm Beach - Smiles By Jiveh",
    description: "Out-of-network, fee-for-service care with insurance claims filed for you, plus cash, checks, cards and financing through Sunbit, Cherry and CareCredit.",
  },
};

export const fallbackAppointment: AppointmentContent = {
  heading: "Book An Appointment",
  text: "Our team will get back to you within 24 hours to arrange the best time for you.",
  // "Smiles by Jiveh Main Form" in GoHighLevel, embedded on the old WordPress page.
  ghlFormId: "o5N2Cg1KTnReA0wS8Jh2",
  formNote: "New patients: once you submit this form, we’ll send you a personal link to complete your new patient forms.",
  contactHeading: "Contact Info",
  contactText: "Don’t hesitate to reach out, we’ll answer all questions.",
  seo: {
    title: "Book an Appointment in Royal Palm Beach - Smiles By Jiveh",
    description: "Book an appointment with Smiles By Jiveh in Royal Palm Beach, FL. Our team will get back to you within 24 hours to arrange the best time for you.",
  },
};

/*
 * The old site had no privacy policy page. This draft only describes what the
 * website itself does; the practice should review it (and add its HIPAA Notice
 * of Privacy Practices if it wants it on the site) before launch.
 */
export const fallbackPrivacy: LegalContent = {
  heading: "Privacy Policy",
  updated: "[PLACEHOLDER: effective date, set when the practice approves this policy]",
  body: rich(
    "This policy explains how Smiles By Jiveh (“we”, “us”) handles information collected through this website, smilesbyjiveh.com. It does not replace the Notice of Privacy Practices that covers your dental records, which we provide in the office.",
    "#### Information you send us",
    "When you use our appointment or contact forms, we receive the details you enter: your name, phone number, email address, preferred date and time, the service you are interested in and any comments. We use them only to answer you and to arrange your visit. Please do not include detailed medical information in the form; we will collect what we need privately once we are in touch.",
    "#### How we contact you",
    "If you agree on the form, we may contact you by phone, text message or email about your request and appointment. Message and data rates may apply. You can reply STOP to any text message to opt out, or ask us at any time to stop contacting you.",
    "#### Service providers",
    "Form submissions and website chat messages are delivered to our patient communication system (GoHighLevel / LeadConnector), which stores them on our behalf. We do not sell your information or share it for others’ marketing.",
    "#### Cookies and analytics",
    "This website uses Google Analytics and Google Tag Manager to understand how visitors use the site, and loads Google reviews, Google Maps and YouTube content from those services. These services may set cookies. You can block or delete cookies in your browser settings.",
    "#### Your choices",
    "To ask what information we hold about you, to correct it or to have it deleted, contact us at [admin@smilesbyjiveh.com](mailto:admin@smilesbyjiveh.com) or (561) 798-9997.",
    "#### Contact",
    "Smiles By Jiveh, 11989 Southern Blvd, Royal Palm Beach, FL 33411. Phone (561) 798-9997.",
  ),
  seo: {
    title: "Privacy Policy for smilesbyjiveh.com - Smiles By Jiveh",
    description: "How Smiles By Jiveh handles information sent through smilesbyjiveh.com, including appointment requests, text messages and analytics.",
  },
};
