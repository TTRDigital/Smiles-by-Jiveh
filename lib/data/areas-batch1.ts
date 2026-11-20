import type { Block, Treatment } from "../types";
import type { IconName } from "../icons.ts";
import { rich } from "../rich.ts";
import { images } from "./images.ts";

/*
 * Content batch 1 (TTR-2487 / TTR-2488, Nov 20, 2026): four service area pages for Royal Palm Beach and Wellington,
 * on topics where AI assistants do not name the practice yet: dental crowns, dental bridges, dentures and implant-supported
 * dentures, tooth-colored fillings.
 * Same rules and look as areas.ts and areas-more.ts: only facts already on this site or in the practice's brain, the approved
 * insurance line word for word, no prices, no promised results or timelines, no health or money claims, no claim that one
 * treatment is better than another, no patient stories. Written in Dr. Jiveh's own approach: conservative, least invasive first.
 * DRAFTS FOR REVIEW: nothing goes live until Kia approves and Dr. Jiveh approves in writing.
 */

const book = { label: "Book An Appointment", href: "/appointment/" };
const AREAS = ["Royal Palm Beach", "Wellington", "Palm Beach County", "The Western Communities"];
const APPROVED_LINE = "Smiles By Jiveh is private, fee for service and out of network with insurance.";
const PHILOSOPHY = "Our philosophy is to always explore the least invasive options first, preserving as much natural tooth structure as possible.";

const card = (title: string, text: string, href: string, icon: IconName) => ({ title, text, href, icon });
const prose = (heading: string, eyebrow: string, ...lines: string[]): Block => ({ _type: "proseBlock", eyebrow, heading, text: rich(...lines) });
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

const insuranceFaq = { question: "Do you take dental insurance?", answer: `${APPROVED_LINE} We explain your options and what to expect at your visit, so you can decide with full information.` };
const whereFaq = { question: "Where is your office?", answer: "Our office is at 11989 Southern Blvd, Royal Palm Beach, FL 33411. Many of our patients come from Wellington and nearby communities. We see patients Monday through Thursday, 9:00 AM to 5:00 PM, by appointment." };

export const batch1Pages: Treatment[] = [
  /* ------------------------------------------------------------------ Dental crowns */
  {
    slug: "dental-crowns-royal-palm-beach-wellington",
    layout: "area",
    title: "Dental Crowns in Royal Palm Beach and Wellington",
    category: "restorative",
    order: 41,
    hero: {
      eyebrow: "Royal Palm Beach and Wellington",
      heading: "Dental Crowns for Royal Palm Beach and Wellington Patients",
      text: rich(
        "When a tooth is too weak or damaged for a filling alone, a custom porcelain crown can restore its shape, strength, function and appearance. Dr. Farokh Jiveh recommends a crown only when a more conservative repair is not enough.",
        APPROVED_LINE,
      ),
      cta: book,
      images: [images.crownsHero],
    },
    blocks: [
      stats(),
      {
        _type: "imageCardsBlock",
        eyebrow: "Restoring Teeth",
        heading: "The Least Invasive Repair That Fits Your Tooth",
        text: "We look at how much healthy tooth remains, then recommend the repair that keeps the most of it.",
        columns: 3,
        cards: [
          card("Tooth-Colored Fillings", "For smaller areas of decay, wear or minor fractures.", "/tooth-colored-fillings-royal-palm-beach-wellington/", "sparkle"),
          card("Dental Crowns", "For a tooth with a large failing filling, a fracture or recurrent decay.", "/dental-crowns/", "shield-check"),
          card("Dental Bridges", "When a tooth is missing and the teeth beside it may support a bridge.", "/dental-bridges-royal-palm-beach-wellington/", "puzzle"),
        ],
      },
      prose(
        "When a Crown May Be Needed", "Is a Crown Right for You?",
        `Dr. Jiveh believes in preserving healthy, natural tooth structure whenever possible. ${PHILOSOPHY}`,
        "A crown may become necessary when a tooth has:",
        "- A very large filling that is failing or leaking",
        "- Decay that has returned around an older restoration",
        "- A fracture or significant structural weakness",
        "- A damaged existing crown",
        "- Had root canal treatment and needs protection",
        "If the damage is small, a [tooth-colored filling](/tooth-colored-fillings-royal-palm-beach-wellington/) may be enough. Dr. Jiveh will tell you what he sees and why he recommends one option over another for your tooth.",
      ),
      {
        _type: "featureBlock",
        eyebrow: "What To Expect",
        heading: "How Your Crown Is Made",
        text: rich(
          "A dental crown is a custom porcelain restoration that fully covers and protects a weakened tooth. Using advanced digital technology and high-quality ceramic materials, Dr. Jiveh carefully prepares the tooth, designs your custom restoration and places temporary protection while your final crown is crafted.",
          "Every crown is designed for its shape, its fit with your bite and its natural appearance. Read more on our [dental crowns page](/dental-crowns/).",
        ),
        bullets: ["A careful evaluation of the tooth and your bite", "Digital design and high-quality ceramic materials", "Temporary protection while your final crown is made"],
        image: images.drJivehTreating,
        ctas: [{ label: "Dental Crowns Details", href: "/dental-crowns/" }],
      },
      prose(
        "Caring for Your Crown", "Long-Term Care",
        "The tooth under a crown is still a living tooth, so daily care still matters. Brush and floss around your crown as you would your natural teeth, and keep your regular cleanings and checkups so we can check the crown, the gums around it and your bite.",
        "If you clench or grind your teeth, ask us about a [custom night guard](/night-guards-sports-guards/). If several teeth are worn or damaged, a complete plan may fit you better: read about [smile rehabilitation](/smile-rehabilitation-palm-beach-county/).",
      ),
      doctor("Restorative Dentistry Planned With Care", "Dr. Jiveh cares for patients from Royal Palm Beach and Wellington, and he mentors other dentists in restorative care."),
      location("Crowns at Our Royal Palm Beach Office", "Patients from Wellington and across Palm Beach County visit us."),
      faq([
        { question: "When does a tooth need a crown instead of a filling?", answer: "A crown may be needed when a tooth has a very large failing filling, recurrent decay, a fracture or a damaged existing crown. When the damage is small, a tooth-colored filling is often enough. Dr. Jiveh always explores the least invasive option first." },
        { question: "What is a dental crown made of?", answer: "At Smiles By Jiveh, crowns are custom porcelain restorations made from high-quality ceramic materials, designed to look natural and fit your bite." },
        { question: "Will I have a temporary crown?", answer: "Yes. After the tooth is prepared, temporary protection is placed while your final crown is crafted." },
        { question: "Does a crowned tooth still need care?", answer: "Yes. The tooth underneath is still a living tooth. Brush and floss around it and keep your regular checkups." },
        { question: "Do I need a crown after a root canal?", answer: "Teeth that have had root canal treatment often need a crown to protect them. Dr. Jiveh will explain what he recommends for your tooth." },
        insuranceFaq,
        whereFaq,
      ]),
      { _type: "sharedBlock", kind: "testimonials" },
      band("Questions About a Crown?", "Book a visit and Dr. Jiveh will explain your options for the tooth."),
    ],
    seo: {
      title: "Dental Crowns in Royal Palm Beach and Wellington - Smiles By Jiveh",
      description: "Custom porcelain dental crowns for Royal Palm Beach and Wellington, FL patients. Dr. Farokh Jiveh explores the least invasive options first. Book a visit.",
    },
  },

  /* ------------------------------------------------------------------ Dental bridges */
  {
    slug: "dental-bridges-royal-palm-beach-wellington",
    layout: "area",
    title: "Dental Bridges in Royal Palm Beach and Wellington",
    category: "restorative",
    order: 42,
    hero: {
      eyebrow: "Royal Palm Beach and Wellington",
      heading: "Dental Bridges for Royal Palm Beach and Wellington Patients",
      text: rich(
        "A dental bridge replaces one or more missing teeth by joining an artificial tooth to the teeth beside the gap. Dr. Farokh Jiveh evaluates every patient to decide whether a bridge or a dental implant is the healthiest long-term solution for them.",
        APPROVED_LINE,
      ),
      cta: book,
      images: [images.bridgesHero],
    },
    blocks: [
      stats(),
      {
        _type: "imageCardsBlock",
        eyebrow: "Replacing a Missing Tooth",
        heading: "Your Options for Closing the Gap",
        text: "There is no one-size-fits-all solution, only the treatment that is right for you.",
        columns: 3,
        cards: [
          card("Traditional Bridge", "An artificial tooth supported by crowns on the teeth beside the gap.", "/dental-bridges/", "puzzle"),
          card("Implant-Supported Bridge", "A bridge attached to dental implants instead of natural teeth.", "/dental-implants-royal-palm-beach-wellington/", "layers"),
          card("Single Dental Implant", "Replaces one tooth on its own, without preparing neighboring teeth.", "/dental-implants/", "badge-check"),
        ],
      },
      prose(
        "What a Dental Bridge Is", "The Basics",
        "Sometimes called a fixed partial denture, a bridge replaces missing teeth with artificial teeth and bridges the gap where one or more teeth used to be. A fixed bridge is attached to the surrounding teeth for support and can only be removed by a dentist.",
        "A traditional bridge uses crowns on the teeth on either side of the gap to hold the replacement tooth. A bridge can also be attached to dental implants. Bridges can be made from porcelain, gold, alloys or a combination of materials, chosen to match your natural teeth.",
        "#### Bridge or implant?",
        `${PHILOSOPHY} A traditional bridge usually requires preparing the healthy teeth on either side of the missing tooth, while a dental implant replaces the missing tooth on its own. That is why, with today's implant technology, bridges are recommended less often than in the past. They remain a good treatment in carefully selected situations, and Dr. Jiveh will explain which option suits your mouth.`,
      ),
      {
        _type: "featureBlock",
        eyebrow: "Your Evaluation",
        heading: "A Recommendation Made for You",
        text: rich(
          "At your visit, Dr. Jiveh looks at your oral health, bone support, the neighboring teeth, your bite, your medical history and your long-term goals before he recommends treatment.",
          "He explains what he sees in plain language and walks you through each option, including [dental implants](/dental-implants-royal-palm-beach-wellington/), so you can decide with full information. Read more on our [dental bridges page](/dental-bridges/).",
        ),
        bullets: ["A full look at your teeth, gums, bone and bite", "Every option explained, with no pressure", "A plan built around your health and goals"],
        image: images.homeConsultation,
        reverse: true,
        ctas: [{ label: "Dental Bridges Details", href: "/dental-bridges/" }],
      },
      prose(
        "Caring for a Bridge", "Long-Term Care",
        "A bridge needs daily care to keep the supporting teeth and gums healthy. Brush twice a day, clean under the replacement tooth as our team shows you, and keep your regular cleanings and checkups so Dr. Jiveh can check the bridge and the teeth that hold it.",
        "If you are missing several teeth, read about [dentures and implant-supported dentures](/dentures-implant-supported-dentures-royal-palm-beach-wellington/) or [All-on-X full arch implants](/all-on-x-wellington-palm-beach-county/).",
      ),
      doctor("Tooth Replacement Planned With Care", "Dr. Jiveh cares for patients from Royal Palm Beach and Wellington, and he mentors other dentists in implant and restorative care."),
      location("Bridges at Our Royal Palm Beach Office", "Patients from Wellington and across Palm Beach County visit us."),
      faq([
        { question: "What is a dental bridge?", answer: "A dental bridge is a fixed restoration that replaces one or more missing teeth by attaching an artificial tooth to the teeth on either side of the space, or to dental implants." },
        { question: "Is a bridge or an implant better for me?", answer: "It depends on your oral health, bone support, neighboring teeth, bite, medical history and goals. A traditional bridge usually requires preparing the teeth beside the gap, while an implant replaces the tooth on its own. Dr. Jiveh explains both and recommends what fits you." },
        { question: "Can a bridge be attached to implants?", answer: "Yes. A bridge can be supported by dental implants instead of natural teeth. Dr. Jiveh will tell you whether that suits your case." },
        { question: "Can I take a fixed bridge out?", answer: "No. A fixed bridge is attached to the supporting teeth or implants and can only be removed by a dentist." },
        { question: "What are bridges made of?", answer: "Bridges can be made from porcelain, gold, alloys or a combination of materials, chosen to match your natural teeth." },
        insuranceFaq,
        whereFaq,
      ]),
      { _type: "sharedBlock", kind: "testimonials" },
      band("Questions About a Missing Tooth?", "Book a visit and Dr. Jiveh will explain your options."),
    ],
    seo: {
      title: "Dental Bridges in Royal Palm Beach and Wellington - Smiles By Jiveh",
      description: "Dental bridges for Royal Palm Beach and Wellington, FL patients. Dr. Farokh Jiveh explains bridges and implants so you can choose what fits you. Book a visit.",
    },
  },

  /* ------------------------------------------------------------------ Dentures and implant-supported dentures */
  {
    slug: "dentures-implant-supported-dentures-royal-palm-beach-wellington",
    layout: "area",
    title: "Dentures and Implant-Supported Dentures in Royal Palm Beach and Wellington",
    category: "restorative",
    order: 43,
    hero: {
      eyebrow: "Royal Palm Beach and Wellington",
      heading: "Dentures and Implant-Supported Dentures for Royal Palm Beach and Wellington",
      text: rich(
        "For patients missing some or all of their teeth, well-designed dentures can restore comfort, function and appearance. Dr. Farokh Jiveh explains traditional dentures, implant-supported dentures and fixed options, so you can choose what fits your health, lifestyle and goals.",
        APPROVED_LINE,
      ),
      cta: book,
      images: [images.denturesHero],
    },
    blocks: [
      stats(),
      {
        _type: "imageCardsBlock",
        eyebrow: "Your Options",
        heading: "Ways to Replace Many Missing Teeth",
        text: "The right choice depends on how many teeth you are missing and the health of your bone and gums.",
        columns: 3,
        cards: [
          card("Dentures", "Custom removable dentures for a few missing teeth or a full arch.", "/dentures/", "smile"),
          card("Implant-Supported Dentures", "Dentures held in place by dental implants.", "/dental-implants-royal-palm-beach-wellington/", "layers"),
          card("All-on-X Full Arch", "A fixed full arch of teeth supported by a few implants.", "/all-on-x-wellington-palm-beach-county/", "badge-check"),
        ],
      },
      prose(
        "Traditional Dentures", "Removable Dentures",
        "Dentures are custom-designed removable restorations that replace missing teeth and the surrounding oral structures. Depending on your needs, a denture may replace a few missing teeth or a full arch, and it helps restore facial support, chewing, speech and the look of your smile.",
        "Modern dental implants have changed the way we replace missing teeth, but not every patient is an ideal candidate for implant treatment, for anatomical, medical, financial or personal reasons. For these patients, beautifully crafted dentures can still be an effective, comfortable solution. Every denture at Smiles By Jiveh is designed with attention to fit, comfort, function and a natural appearance.",
      ),
      prose(
        "Implant-Supported Dentures", "Dentures on Implants",
        "An implant-supported denture is held in place by dental implants placed in the jawbone, rather than resting on the gums alone. Patients who find a traditional denture loose or uncomfortable often ask about this option.",
        "Implants need enough healthy jawbone, so Dr. Jiveh evaluates your bone and overall health with advanced 3D imaging first. If bone has been lost, grafting can often restore enough support. Anesthesia and sedation are available to keep you comfortable during implant treatment.",
        "If you would prefer teeth that are fixed in place and do not come out, ask about [All-on-X full arch implants](/all-on-x-wellington-palm-beach-county/). We do not push one option over another: we explain each one and recommend what fits you.",
      ),
      {
        _type: "featureBlock",
        eyebrow: "Your Consultation",
        heading: "All Your Options, Explained",
        text: rich(
          "Dr. Farokh Jiveh takes a personalized, comprehensive approach to every restorative case. At your visit he reviews your teeth, gums, jawbone and health history, listens to what matters to you and explains each option in plain language.",
          "Read more about [dentures](/dentures/), [dental implants](/dental-implants-royal-palm-beach-wellington/) and [All-on-X](/all-on-x-full-arch-restoration/).",
        ),
        bullets: ["Traditional, implant-supported and fixed options", "3D imaging to evaluate your jawbone", "A plan that fits your health, lifestyle and goals"],
        image: images.implantModel,
        ctas: [{ label: "Dentures Details", href: "/dentures/" }],
      },
      prose(
        "Caring for Your Dentures", "Daily Care",
        "- Rinse your dentures after meals",
        "- Brush them daily with a denture brush and a non-abrasive cleaner",
        "- Soak them overnight in a denture solution",
        "- Keep your regular checkups, because your mouth changes shape over time and dentures may need adjustment",
        "With implant-supported dentures, the gums and the implants also need daily cleaning and regular checkups. Our team will show you how.",
      ),
      doctor("Restoring Smiles With Care", "Dr. Jiveh cares for patients from Royal Palm Beach and Wellington, and he mentors other dentists in implant and restorative care."),
      location("Dentures at Our Royal Palm Beach Office", "Patients from Wellington and across Palm Beach County visit us."),
      faq([
        { question: "What is the difference between dentures and implant-supported dentures?", answer: "Traditional dentures rest on the gums and are removable. Implant-supported dentures are held in place by dental implants placed in the jawbone. Dr. Jiveh explains both so you can choose what fits you." },
        { question: "Am I a candidate for implant-supported dentures?", answer: "Implants need enough healthy jawbone and good overall health. Dr. Jiveh evaluates your bone with 3D imaging at your consultation. If bone has been lost, grafting can often restore enough support." },
        { question: "What is the difference between implant-supported dentures and All-on-X?", answer: "Implant-supported dentures are held by implants, while All-on-X is a full arch of fixed teeth on a few implants that only a dentist removes. We explain both at your visit." },
        { question: "How do I care for my dentures?", answer: "Rinse them after meals, brush them daily with a denture brush and a non-abrasive cleaner, and soak them overnight in a denture solution. Keep your regular checkups so we can check the fit." },
        { question: "Will my dentures need adjusting?", answer: "Your mouth changes shape over time, so dentures may need adjustment or replacement. Regular checkups let us check the fit." },
        insuranceFaq,
        whereFaq,
      ]),
      { _type: "sharedBlock", kind: "testimonials" },
      band("Questions About Dentures?", "Book a visit and Dr. Jiveh will explain your options."),
    ],
    seo: {
      title: "Dentures in Royal Palm Beach and Wellington - Smiles By Jiveh",
      description: "Dentures and implant-supported dentures for Royal Palm Beach and Wellington, FL. Dr. Farokh Jiveh explains each option so you can choose. Book a visit.",
    },
  },

  /* ------------------------------------------------------------------ Tooth-colored fillings */
  {
    slug: "tooth-colored-fillings-royal-palm-beach-wellington",
    layout: "area",
    title: "Tooth-Colored Fillings in Royal Palm Beach and Wellington",
    category: "general",
    order: 44,
    hero: {
      eyebrow: "Royal Palm Beach and Wellington",
      heading: "Tooth-Colored Fillings for Royal Palm Beach and Wellington Patients",
      text: rich(
        "When a tooth has decay, a minor fracture or a worn area, a white composite filling can repair it conservatively and blend with your smile. Dr. Farokh Jiveh matches each filling to the shade and character of your natural teeth.",
        APPROVED_LINE,
      ),
      cta: book,
      images: [images.hygienistTreating],
    },
    blocks: [
      stats(),
      {
        _type: "imageCardsBlock",
        eyebrow: "Repairing Teeth",
        heading: "Conservative Care for Damaged Teeth",
        text: "We repair what needs repair and keep as much healthy tooth as we can.",
        columns: 3,
        cards: [
          card("Tooth-Colored Fillings", "White composite fillings for decay, minor fractures and worn areas.", "/tooth-color-fillings/", "sparkle"),
          card("Dental Crowns", "For a tooth too weak or damaged for a filling alone.", "/dental-crowns-royal-palm-beach-wellington/", "shield-check"),
          card("Exams and Cleanings", "Regular visits help find small concerns early.", "/dental-cleanings/", "stethoscope"),
        ],
      },
      prose(
        "When a Filling May Be Needed", "Know the Signs",
        `Preserving healthy, natural tooth structure is always a priority. ${PHILOSOPHY}`,
        "A conservative filling may be needed for:",
        "- A cavity",
        "- A small fracture or chip",
        "- A worn area of a tooth",
        "- An older filling that is leaking or broken",
        "Tooth sensitivity, discomfort when chewing, visible dark areas or a broken filling are worth mentioning at your visit. Untreated decay can progress, so it is best to have it checked.",
      ),
      {
        _type: "featureBlock",
        eyebrow: "Natural Looking Repairs",
        heading: "Matched to Your Own Teeth",
        text: rich(
          "Using advanced tooth-colored composite materials, carefully matched to the shade and character of your existing teeth, Dr. Jiveh restores strength, function and appearance without traditional metal fillings. Composite bonds directly to the tooth, which supports a conservative repair.",
          "We use local anesthetic for your comfort. Read more on our [tooth-colored fillings page](/tooth-color-fillings/).",
        ),
        bullets: ["Shade-matched composite materials", "A conservative repair that keeps healthy tooth", "Local anesthetic for your comfort"],
        image: images.drJivehTreating,
        reverse: true,
        ctas: [{ label: "Fillings Details", href: "/tooth-color-fillings/" }],
      },
      prose(
        "Protecting Your Teeth From Cavities", "Prevention",
        "Prevention is one of the most important ways to protect your teeth. Regular professional cleanings, thorough examinations, good brushing and flossing, and awareness of what you eat and drink all play a part.",
        "Some patients are more prone to decay because of genetics, oral bacteria, dry mouth, acidity or lifestyle, which is why Dr. Jiveh takes a personal approach to prevention. Some patients choose saliva and genetic testing to help personalize their care. Read about [dental cleanings](/dental-cleanings/) and your [first visit](/new-patient-health-evaluation/).",
        "When a tooth has too much damage for a filling, a [dental crown](/dental-crowns-royal-palm-beach-wellington/) may be needed to protect it.",
      ),
      doctor("Conservative Dentistry From an Educator", "Dr. Jiveh cares for patients from Royal Palm Beach and Wellington, and he mentors other dentists in advanced clinical techniques."),
      location("Fillings at Our Royal Palm Beach Office", "Patients from Wellington and across Palm Beach County visit us."),
      faq([
        { question: "What is a tooth-colored filling?", answer: "It is a white composite filling, matched to the shade of your natural teeth, used to repair decay, minor fractures and worn areas." },
        { question: "Does getting a filling hurt?", answer: "We use local anesthetic for your comfort during the procedure. Tell us if you feel nervous so we can help you feel at ease." },
        { question: "How do I care for a new filling?", answer: "Brush and floss as usual. Avoid very hard or sticky foods for the first 24 hours, and tell us about any sharp pain that does not go away." },
        { question: "Can older metal fillings be replaced with tooth-colored ones?", answer: "Some patients ask to replace older silver fillings with tooth-colored ones for appearance. Dr. Jiveh checks each filling and explains whether replacing it makes sense for that tooth." },
        { question: "When is a crown needed instead of a filling?", answer: "When a tooth has a very large failing filling, a fracture or significant structural weakness, a crown may be needed to protect it. Dr. Jiveh always explores the least invasive option first." },
        insuranceFaq,
        whereFaq,
      ]),
      { _type: "sharedBlock", kind: "testimonials" },
      band("Questions About a Tooth?", "Book a visit and Dr. Jiveh will check it and explain your options."),
    ],
    seo: {
      title: "Tooth-Colored Fillings in Royal Palm Beach and Wellington - Smiles By Jiveh",
      description: "Tooth-colored composite fillings for Royal Palm Beach and Wellington, FL. Dr. Farokh Jiveh repairs teeth conservatively, least invasive first. Book a visit.",
    },
  },
];
