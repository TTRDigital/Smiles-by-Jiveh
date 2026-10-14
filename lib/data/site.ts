import type { NavLink, SharedSections, SiteSettings, Testimonial } from "../types";
import { images } from "./images.ts";

/* Practice details, menus and the sections every treatment page shares. All editable in /cms > Settings. */

const general: NavLink[] = [
  { label: "What Is General Dentistry", href: "/general-dentistry/" },
  { label: "Dental Cleanings", href: "/dental-cleanings/" },
  { label: "Periodontal Therapy", href: "/gum-therapy/" },
  { label: "Dental Crowns", href: "/dental-crowns/" },
  { label: "Dental Bridges", href: "/dental-bridges/" },
  { label: "Dentures", href: "/dentures/" },
  { label: "Root Canal Treatment", href: "/root-canal-treatment/" },
  { label: "Sleep Apnea Treatment", href: "/sleep-apnea-treatment/" },
  { label: "TMJ Therapy", href: "/tmj-treatment/" },
  { label: "Oral Surgery", href: "/oral-surgery/" },
  { label: "Sedation Dentistry", href: "/sedation-dentistry/" },
];

const cosmetic: NavLink[] = [
  { label: "What Is Cosmetic Dentistry", href: "/cosmetic-dentistry/" },
  { label: "Teeth Whitening", href: "/teeth-whitening-treatment/" },
  { label: "Invisalign", href: "/invisalign/" },
  { label: "Clear Aligner Therapy", href: "/clear-aligners/" },
  { label: "Tooth-Colored Fillings", href: "/tooth-color-fillings/" },
  { label: "Dental Implants", href: "/dental-implants/" },
  { label: "Dental Veneers", href: "/dental-veneers/" },
  { label: "Fotona Laser Dentistry", href: "/laser-dental-treatment/" },
];

const reconstructive: NavLink[] = [
  { label: "What Is Reconstructive Dentistry", href: "/reconstructive-dentistry/" },
  { label: "All-On-X Full Arch Reconstruction", href: "/all-on-x-full-arch-restoration/" },
  { label: "Full Mouth Reconstruction", href: "/full-mouth-reconstruction/" },
  { label: "Worn Teeth Rehabilitation", href: "/worn-teeth-rehabilitation/" },
];

export const fallbackSettings: Omit<SiteSettings, "phoneHref"> = {
  name: "Smiles By Jiveh",
  phone: "(561) 798-9997",
  email: "admin@smilesbyjiveh.com",
  street: "11989 Southern Blvd",
  city: "Royal Palm Beach",
  region: "FL",
  postalCode: "33411",
  hours: [
    { label: "Monday – Thursday", value: "9:00 AM – 5:00 PM (By Appointment Only)" },
    { label: "Friday", value: "Some Morning Hours (By Special Request Only)" },
  ],
  openingHours: ["Mo-Th 09:00-17:00"],
  googleRating: 4.9,
  reviewCount: 111,
  googlePlaceId: "ChIJwdv1-7ov2YgR6C4b_6TXFH4",
  reviewsUrl: "https://search.google.com/local/reviews?placeid=ChIJwdv1-7ov2YgR6C4b_6TXFH4",
  writeReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJwdv1-7ov2YgR6C4b_6TXFH4",
  mapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJwdv1-7ov2YgR6C4b_6TXFH4",
  social: [],
  headerCta: { label: "Book An Appointment", href: "/appointment/" },
  nav: [
    { label: "Home", href: "/" },
    {
      label: "Our Practice",
      href: "/who-we-are/",
      children: [
        { label: "Who We Are", href: "/who-we-are/" },
        { label: "Meet Dr. Jiveh", href: "/meet-dr-jiveh/" },
        { label: "Insurance & Payment Options", href: "/insurance-payment-options/" },
        { label: "Contact", href: "/appointment/" },
      ],
    },
    { label: "General Dentistry", href: "/general-dentistry/", children: general },
    { label: "Cosmetic Dentistry", href: "/cosmetic-dentistry/", children: cosmetic },
    { label: "Reconstructive Dentistry", href: "/reconstructive-dentistry/", children: reconstructive },
  ],
  footerColumns: [
    { title: "General Dentistry", links: general },
    { title: "Cosmetic Dentistry", links: cosmetic },
    { title: "Reconstructive Dentistry", links: reconstructive },
  ],
  copyright: "© {year} Smiles By Jiveh. All rights reserved.",
  credit: { label: "Designed & Developed by TTR Digital Marketing", href: "" },
  reviewsWidgetId: "a8c57d40-6d77-4c71-938a-3cf31e9ecd6f",
  logo: images.logo,
};

export const fallbackShared: SharedSections = {
  whyChooseUs: {
    eyebrow: "Why Choose Us",
    heading: "Why Choose Smiles By Jiveh",
    text: "Elevated, relationship-driven dentistry led by Dr. Farokh Jiveh, proudly serving Wellington, Royal Palm Beach, and surrounding communities since 1997. Below are just a few of the reasons discerning patients continue to choose Smiles By Jiveh for personalized, high-quality dental care.",
    cards: [
      {
        icon: "calendar-check",
        title: "Extensive Experience Since 1997",
        text: "Dr. Farokh Jiveh has been transforming smiles and restoring oral health throughout Palm Beach County and across the country for over 28 years, helping more than 10,000 patients through advanced cosmetic, implant, restorative, and reconstructive dentistry.",
      },
      {
        icon: "heart-handshake",
        title: "Concierge-Level, Patient-Centered Care",
        text: "At Smiles By Jiveh, every patient experience is designed to feel personal, unhurried, and thoughtfully tailored. Our team takes the time to listen, educate, and guide you with clarity, compassion, and exceptional attention to detail.",
      },
      {
        icon: "square-activity",
        title: "Advanced Technology & Precision Dentistry",
        text: "From digital smile design and guided implant treatment to laser dentistry and advanced diagnostics, we utilize leading technology to deliver highly precise, comfortable, and predictable care.",
      },
      {
        icon: "message-circle",
        title: "Complimentary Cosmetic & Restorative Consultations",
        text: "Meet with our team, explore your options, and receive a personalized understanding of your smile goals in a comfortable, no-pressure environment designed around education and trust.",
      },
      {
        icon: "heart-pulse",
        title: "Slow Dentistry Philosophy",
        text: "We intentionally schedule longer appointments to provide thorough examinations, personalized treatment planning, and a calm, elevated experience where your comfort and well-being are never rushed.",
      },
      {
        icon: "badge-check",
        title: "Dentistry Rooted in Total Health",
        text: "We believe oral health is deeply connected to overall wellness. Through advanced periodontal care, salivary and genetic testing, microbiome evaluation, and personalized wellness guidance, our approach supports not only healthier smiles but long-term full-body health and vitality.",
      },
    ],
  },
  process: {
    eyebrow: "Our Process",
    heading: "The Smiles By Jiveh Experience",
    text: "A thoughtful, personalized journey designed around comfort, clarity, trust, and exceptional care — from your first visit through long-term wellness and smile transformation.",
    steps: [
      {
        title: "Complimentary Consultation & Office Experience",
        text: "Begin with a relaxed, no-pressure visit to meet our team, experience the energy of the practice, and explore your goals in a warm, welcoming environment. This is an opportunity to learn more about our philosophy, ask questions, and discover whether Smiles By Jiveh feels like the right home for you.",
      },
      {
        title: "Comprehensive Examination & Personalized Planning",
        text: "Once you feel confident that Smiles By Jiveh is the right home for you, we welcome you as a guest of our practice. Your New Patient Experience includes advanced imaging, periodontal assessment, bite analysis, and our signature 10-point check — all thoughtfully tailored to your goals, lifestyle, and long-term vision for your smile.",
      },
      {
        title: "Elevated, Unhurried Care",
        text: "From preventive dentistry to advanced cosmetic, implant, and reconstructive treatment, every procedure is delivered with precision, artistry, and meticulous attention to detail. Our Slow Dentistry philosophy allows us to provide a calm, comfortable experience where quality, trust, and long-term results are always the priority.",
      },
    ],
    ctas: [
      { label: "Book An Appointment", href: "/appointment/" },
      { label: "(561) 798-9997", href: "tel:5617989997" },
    ],
  },
  testimonials: { eyebrow: "Testimonials", heading: "What Our Patients Say About Their Experience" },
};

/*
 * Google reviews of Smiles by Jiveh (5 stars, most recent first), as shown by
 * the old site's Elfsight reviews widget. Shown when no widget ID is set.
 */
export const fallbackTestimonials: Testimonial[] = [
  {
    name: "Shanice Rogers",
    rating: 5,
    date: "2026-10-04",
    quote:
      "Smile makeover done here transformed appearance. Multiple procedures coordinated well, planning thorough with digital previews, execution required real artistry and skill.",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2xoeU16QlVVM2gwWDBzM2FrNUNOa2h3U25KbmNYYxAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOlhyMzBUU3h0X0s3ak5CNkhwSnJncXc%7C%7C",
  },
  {
    name: "Cathy",
    rating: 5,
    date: "2026-09-21",
    quote:
      "Dr Jiveh and his staff are the absolute BEST in industry.  He is a perfectionist and more quality work cannot be found anywhere else. If you want the best there is, this is your dentist.  I cannot highly recommend him enough!",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT210MU1HcHRObWh2T1VGTldtODBTMVJoVDJreFQxRRAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOmt1MGptNmhvOUFNWm80S1RhT2kxT1E%7C%7C",
  },
  {
    name: "Donna Woldt",
    rating: 5,
    date: "2026-09-16",
    quote:
      "The entire staff at Smiles by Jiveh was friendly and accommodating.  Such a pleasant atmosphere and Dr. Jiveh has mastered his craft. Feel blessed to have received such excellent care.",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2tGSGNVMVhXV2hVYTBOd1ZGZHRMWEp1T1U1S2JtYxAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOkFHcU1XWWhUa0NwVFdtLXJuOU5Kbmc%7C%7C",
  },
  {
    name: "Michelle Barrios",
    rating: 5,
    date: "2026-08-20",
    quote:
      "I decided to write this review after returning from a conference where I took lots of photos and selfies. For the first time in years, I wasn't analyzing or criticizing my teeth in every picture. That’s because of the cosmetic work I recently had done with Dr. Jiveh.\n\nAfter spending 20 years in the dental industry, I knew many of the cosmetic dentists in the area and took my decision seriously. I interviewed several doctors before choosing Dr. Jiveh, and I ultimately felt the most confident in his expertise, artistry, and approach.I was fortunate to be a candidate for no-prep veneers, which allowed me to achieve my desired result without altering my natural teeth. That procedure alone significantly narrowed the list of providers I could consider. One of the things that made him stand out was that he teaches other dentists advanced cosmetic procedures. That gave me additional confidence in his skill level.\n\nWhat I love most is Dr. Jiveh’s work doesn’t all look the same. He designs teeth that complement each person’s face and features. The result looks natural and unique. Beyond his incredible technical skill, Dr. Jiveh has a great personality that makes the entire experience enjoyable. He and his team create a welcoming, comfortable environment, and every step of the process felt easy and stress-free. Cosmetic dentistry is a significant investment, and choosing the right provider matters. If you're considering improving your smile, I can confidently say that Dr. Jiveh delivers exceptional results and a level of care that is truly top-tier. I couldn't be happier with my decision or my new smile.",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT25veFoxUlRVV05RVVRsSlIwdFVVRlZwTkZRMGNHYxAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOnoxZ1RTUWNQUTlJR0tUUFVpNFQ0cGc%7C%7C",
  },
  {
    name: "Lawrence Reid",
    rating: 5,
    date: "2026-07-08",
    quote: "Had another amazing experience by Doctor J and his staff.",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2tSWVJrUjZWVzl1U21sMVRsYzJOR1ZXUzBWc00zYxAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOkRYRkR6VW9uSml1Tlc2NGVWS0VsM3c%7C%7C",
  },
  {
    name: "Melody Haeii",
    rating: 5,
    date: "2026-06-19",
    quote:
      "Absolutely wonderful experience every time I go in.\nDr.Jiveh and his staff are not only professionals but also take a detailed approach regarding every patient.\nI have been coming here for 10 years and will continue to come\nHighly recommend!!",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT25aNFMxbDNUelZzVmsxaFJUaEhkMDVVTlhJMlpHYxAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOnZ4S1l3TzVsVk1hRThHd05UNXI2ZGc%7C%7C",
  },
  {
    name: "Andrea",
    rating: 5,
    date: "2026-06-17",
    quote: "Always a wonderful healthy and happy experience at Smiles by Jiveh",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2w5alRUVXdRbGMxU1ZKRVNreE9USFJOWVhSNU0wRRAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOl9jTTUwQlc1SVJESkxOTHRNYXR5M0E%7C%7C",
  },
  {
    name: "ELIVÂNIA OLIVEIRA",
    rating: 5,
    date: "2026-05-21",
    quote: "Atendimento de muita qualidade visando o conforto e bem estar do paciente.",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2psc1ptbzFNVWxPYUdSVloyNUdUekZTTlZOdVNXYxAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOjlsZmo1MUlOaGRVZ25GTzFSNVNuSWc%7C%7C",
  },
  {
    name: "Linda Somers",
    rating: 5,
    date: "2026-04-28",
    quote:
      "I've always had nothing but the best experience with Dr Jiveh and his staff... it's a beautiful office very clean and comfortable and he does beautiful work he's like an artist of the teeth😁",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2kwM1lVeHhPR3BtT1RCM1ltbDBjbUZLYkc5cWVWRRAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOi03YUxxOGpmOTB3Yml0cmFKbG9qeVE%7C%7C",
  },
  {
    name: "Jack Dempsey",
    rating: 5,
    date: "2026-04-23",
    quote: "The cleaning was outstanding. Very professional and reasonably priced.",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2s1VFNuQXhURGRLVWs1UlkyVjVTVGREWVd0WmQwRRAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOk5TSnAxTDdKUk5RY2V5STdDYWtZd0E%7C%7C",
  },
  {
    name: "Kevin Conway",
    rating: 5,
    date: "2026-02-24",
    quote:
      "Professional care with a personal touch. Recently moved to the area, I had a filling fall out & needed a cleaning as well. Found & booked on Google, and very pleased. Cosmetic dentistry is their specialty and options were discussed but I only needed routine care at the moment, and they were happy to oblige. The entire staff & Dr. J are thorough, caring, generous with advice and truly pleasant. I was happy to find the fees that were charged are very fair as well. Five stars. Myra is a rock star hygienist, and Tammy at the front desk set a very welcoming tone to the experience.",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT25oS01WTjBZVUZTWlVVeWVtWnNXWEZLYkRKV1ozYxAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOnhKMVN0YUFSZUUyemZsWXFKbDJWZ3c%7C%7C",
  },
  {
    name: "Hooman Rafiee",
    rating: 5,
    date: "2026-02-17",
    quote: "Beautiful work, beautiful staff, caring and informative. Thank you for making my smile beautiful too. Keep up the good work",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChdDSUhNMG9nS0VJQ0FnSURCdjU3TTV3RRAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CIHM0ogKEICAgIDBv57M5wE%7C%7C",
  },
  {
    name: "Madame Bridal",
    rating: 5,
    date: "2026-01-28",
    quote:
      'Dr. Jiveh isn’t just my dentist; he has truly become a friend. From the moment you walk into his spotless office, you are enveloped in an aura of love and genuine care that flows from him and his entire team. I used to be a "client," but his gentle approach to dentistry turned me into a lifelong advocate.\n\nYesterday, I had to have a difficult molar extraction that took over an hour. Throughout the entire procedure, Dr. Jiveh and his wonderful assistant treated me with astounding patience and a touch so gentle I felt completely safe. It’s rare to find a place that combines ultimate professionalism with such a soothing, soulful environment. Between the beautiful smiles and the calming music, they turn a difficult procedure into a peaceful experience. Five stars isn\'t enough—Good on you, Dr. Jiveh!',
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2pCcmREWlJaR1JOTFU5TFZrOVRjMWxYYW5OUFNWRRAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOjBrdDZRZGRNLU9LVk9Tc1lXanNPSVE%7C%7C",
  },
  {
    name: "Mark DuBois",
    rating: 5,
    date: "2026-01-27",
    quote:
      "Dr. Jiveh and his staff take excellent care of my wife Lyn and me, doing so for the past decade.  The professional care you find in Dr.  Jiveh's office is superb and difficult to match.  Highest recommendations going out for Dr. Jiveh and his team.",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT21odWRreHdVa0pIUW5kWVVXRnNlVEEwYUhBMmVVRRAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOmhudkxwUkJHQndYUWFseTA0aHA2eUE%7C%7C",
  },
  {
    name: "Felecia Harrell",
    rating: 5,
    date: "2026-01-26",
    quote:
      "I went to Smiles by Jiveh for a consultation today. I was immediately impressed with the ambiance of the dental office. The atmosphere was calm and relaxing, and the staff were friendly,  warm and welcoming. Dr. Jiveh is amazing. He put me at ease from the moment I met him. He examined me efficiently and thoroughly, and explained what he was doing step by step. I'm confident that I made the right choice in choosing Smiles by Jiveh,  and look forward to a beautiful smile after my procedures.",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2xWb2RYQlljRU5IU3pGQlpEZEdSMFpuVlhKV1dWRRAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOlVodXBYcENHSzFBZDdGR0ZnVXJWWVE%7C%7C",
  },
  {
    name: "Elijah Desmond",
    rating: 5,
    date: "2026-01-19",
    quote: "I couldn’t be happier with my new smile 😉 6 star review. Amazing work and amazing team.",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2tGSWIxODFXREp1VFRGMlYzTnJTRmQ0V1cxc09HYxAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOkFIb181WDJuTTF2V3NrSFd4WW1sOGc%7C%7C",
  },
  {
    name: "Kimia Lalezari",
    rating: 5,
    date: "2025-12-23",
    quote:
      "Dr. Jiveh performed a Christmas miracle!! I had an emergency and Dr. Jiveh was able to fit me in to his busy schedule. He is very detail oriented and has amazing bedside manner. His assistant, Sandra and front office, Tammy are kind and professional. I can’t recommend him and his staff enough!",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2tOMmRsa3dVbVJpVm5CUU1HTlFORXhTZVdOWk0xRRAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOkN2dlkwUmRiVnBQMGNQNExSeWNZM1E%7C0dHgIAmi0Y9%7C",
  },
  {
    name: "Ricardo Gonzalez",
    rating: 5,
    date: "2025-12-18",
    quote:
      "Dr Jivah and the team are by far one of the best practices I been to !! They go beyond the call of duty for your smile and highly recommend them for all your Dentristy needs . Office team are super nice and definitely make you feel super comfortable!!",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2tka1FrRjZhMmRGVkdzeU1scGhhRmxyYTB0Uk9FRRAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOkdkQkF6a2dFVGsyMlphaFlra0tROEE%7C0dG4GkrV5Er%7C",
  },
  {
    name: "B Mack",
    rating: 5,
    date: "2025-11-18",
    quote: "Dr. Jiveh is the best Dentist.  My husband and I  have been patients for a number of years.  He is the best dentist!  Barbara and Mike",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT25aclZFVTROM2xZU1hoTE5VTmFaa1ZNWVd4aFowRRAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOnZrVEU4N3lYSXhLNUNaZkVMYWxhZ0E%7C0d6CJmuZ5si%7C",
  },
  {
    name: "Pablo Iza",
    rating: 5,
    date: "2025-11-07",
    quote:
      "I’m a new patient and my first office visit was an  extremely positive experience. In a world where EVERYONE rushes through everything, Dr. Jiveh and his team actually take the time to get to know you and spend time listening to you BEFORE they start to work on your teeth!! They only schedule one patient at a time. They are very detailed in what they are doing and why they are doing it. If you are looking for a dentist I recommend Dr. Jiveh.",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT21ObFVtOTZObHAxZDIxVVFrOVVabFI0VlUweU4zYxAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOmNlUm96Nlp1d21UQk9UZlR4VU0yN3c%7C0d2WqdYQCCX%7C",
  },
  {
    name: "cynthia kuntze",
    rating: 5,
    date: "2025-10-14",
    quote:
      "Dr. Jiveh has helped both of my kids with their smiles and did his absolute best to be sure they were perfect!  He took extra time when there was an issue and stood behind his work.  We all left smiling thanks to him!",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2tGVlRuVXpSelpYYVZsbE4zaGxPRUowVlRWZlIyYxAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOkFVTnUzRzZXaVllN3hlOEJ0VTVfR2c%7C0cvbM8qIDQS%7C",
  },
  {
    name: "Robin Lambro",
    rating: 5,
    date: "2025-10-01",
    quote: "Best dentist in West Palm Beach",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT25CbFVrWm1URkZaYmpock9FWlpWVlpOTkZRMGJVRRAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOnBlUkZmTFFZbjhrOEZZVVZNNFQ0bUE%7C0crKOCMAJx6%7C",
  },
  {
    name: "meira hardoon",
    rating: 5,
    date: "2025-07-14",
    quote:
      "THIS WAS THE BEST DENTIST EXPERIENCE OF MY LIFE. I was literally laughing so hard in the seat while I was getting 5 teeth taking care of. Including a massive cavity filled and rebuilt. The team care here made the time go by so fast. I literally had a fun time at the dentist hahah I wish I took a before and after picture because one of my teeth was cracked in half. Dr. Jiveh built the tooth up from nothing to something 😇  I feel so deeply grateful for this experience. I would 100/10 recommend coming here for those that need a heart led and caring team.  I had the time of my life.\n\nWhen I looked at my tooth after, all I could think about was how this is Dr. Jiveh’s art! He is so talented. He loves what he does and you can feel it so much.\n\nTo give context from where I came from. I hate going to the dentist. Hence I didn’t go for a while and needed a lot of work done. I’m always so scared of the shot and how it reacts with my body because I’m super sensitive. My heart starts racing and I can’t stand the feeling. I told Dr. Jiveh and his team and they were so kind. They listened to all my concerns and truly met with such deep love & presence. They took the time to explain to me what shot would be best so my heart wouldn’t start racing. They put me at ease and kept checking in on me while the work was being done. Thank you thank you thank you!!\n\nBest dentist and team ever 🦷🦷🦷",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT213eVNUbG5NVkJwTWkxM1ZGcG1WRlF0ZG1RMmFFRRAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CAIQACodChtycF9oOmwySTlnMVBpMi13VFpmVFQtdmQ2aEE%7C0cSMIG7F2vV%7C",
  },
  {
    name: "Joe Sheridan",
    rating: 5,
    date: "2025-05-20",
    quote:
      "The staff are on top of it; they pay close attention and they take the time to communicate carefully with you. Dr. Jiveh himself takes the time to listen, understand you, and really give comprehensive care. This has been a welcome experience!",
    url: "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChdDSUhNMG9nS0VQdjZwTy01LWFPWGdRRRAB!2m1!1s0x0:0x7e14d7a4ff1b2ee8!3m1!1s2@1:CIHM0ogKEPv6pO-5-aOXgQE%7CCgwIkLiywQYQiJ6BywM%7C",
  },
];
