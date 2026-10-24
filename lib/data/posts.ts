import type { Post } from "../types";
import { rich } from "../rich.ts";
import { images } from "./images.ts";

/*
 * Built-in blog posts, like the built-in pages: a post published in /cms with
 * the same URL overrides one of these field by field, and a new CMS post is
 * added next to them (getPosts in lib/content.ts). The first two posts are
 * drafts of Oct 22, 2026 for Kia and then Dr. Jiveh to approve before the
 * blog goes live; the texts follow the client-brain rules (private, fee for
 * service practice named early; no prices, promises or comparisons).
 */

/**
 * Who writes the posts, in the words of /meet-dr-jiveh/ (lib/data/pages.ts).
 * That page states no degree, so the byline is the name alone. Put "DDS" (or
 * whatever Dr. Jiveh confirms) in credentials and the byline becomes
 * "By Dr. Farokh Jiveh, DDS".
 */
export const postAuthor = {
  name: "Dr. Farokh Jiveh",
  credentials: "",
  jobTitle: "Dentist",
  /** Under the name in the byline and the author card, as the practice describes itself. */
  role: "Cosmetic, General & Implant Dentistry",
  path: "/meet-dr-jiveh/",
  image: images.drJiveh,
  bio: "Dr. Farokh Jiveh has dedicated his career to the pursuit of excellence in cosmetic, restorative, and comprehensive dentistry. Today, he serves as the Clinical and Course Director at Palm Beach Dental Academy, where he mentors dentists in advanced clinical techniques and comprehensive patient care.",
};

export const fallbackPosts: Post[] = [
  {
    slug: "all-on-x-process-what-to-expect",
    title: "The All-on-X Process: What to Expect From Your First Visit to Your Final Teeth",
    excerpt: "Dr. Farokh Jiveh walks through All-on-X full arch implant treatment step by step: the consultation, planning, surgery day, healing and your final teeth.",
    date: "2026-10-23",
    author: postAuthor.name,
    category: "Dental Implants",
    service: "/all-on-x-full-arch-restoration/",
    image: images.implantModel,
    body: rich(
      "[All-on-X](/all-on-x-full-arch-restoration/) replaces a full upper or lower set of failing or missing teeth with a fixed bridge held by four or more dental implants. The All-on-X process moves through five stages: a consultation with a 3D scan, digital planning, the surgery day, a healing period of several months, and your final teeth. How long each stage takes depends on your bone, your health and your goals.",
      "## What is All-on-X, in plain words?",
      "All-on-X is a way to rebuild a whole arch of teeth on a small number of implants. The X stands for the number of implants, usually four to six, chosen to suit your jaw.",
      "A [dental implant](/dental-implants/) is a small titanium post that takes the place of a tooth root. In a full arch case the implants work as a team. The two front implants stand upright, and the two back implants are usually tilted, up to about 45 degrees, so they can use the bone you have and stay clear of the sinus above and the nerve in the lower jaw. That is why many patients once told they had too little bone can still be treated without grafting, although some cases need it. On top of the implants sits a fixed bridge of new teeth that only a dentist removes.",
      "## What happens at the first visit?",
      "Your first visit is a conversation, not a procedure. We start with what bothers you day to day: teeth that keep breaking, a denture that moves when you eat, or infections that keep coming back. I also want to know your medical history and the medicines you take, because healing matters as much as the surgery itself.",
      "Then we gather what a good plan needs. A CBCT scan gives a 3D picture of your jaw, so we can measure the bone and see exactly where the sinus and the nerve sit. A digital scan and photographs record your teeth, gums, bite and face. If you still have some teeth, we talk honestly about which can be kept and which cannot, because All-on-X is only right when the remaining teeth have a poor long-term outlook.",
      "Smiles By Jiveh is a private, fee for service practice, so before anything is scheduled you receive a written plan with the stages, the fees and the [payment and financing options](/insurance-payment-options/). We are out of network with insurance, and we submit claims on your behalf.",
      "## How is the treatment planned before surgery day?",
      "Most of the work happens before you sit in the chair. Using your scan, we plan each implant on the computer: its position, its depth and the angle of the back implants. From that plan a surgical guide can be made that steers each implant into its planned position.",
      "At the same time, the dental laboratory starts designing your new teeth: their shape, length and color, and how they support your lips and cheeks. You see this design before surgery, and your opinion shapes it.",
      "We also decide how you will be kept comfortable. Surgery is done with local anesthesia, and we offer [oral conscious sedation](/sedation-dentistry/) for patients who are anxious or would rather remember very little of the day. Depending on your case, your implants are placed in collaboration with experienced implant surgeons, the way our practice works on every implant case. Either way, I plan the case with them and I design, fit and look after your new teeth.",
      "## What happens on surgery day?",
      "Any remaining teeth that cannot be kept are removed, the gums and bone are shaped, and the implants are placed according to the plan. Each implant is tested for stability as it goes in. If the implants are firm enough, a fixed temporary bridge is attached the same day, so you go home with teeth. If a stability reading is lower than we want, it is safer to let the implants heal first, and you wear a removable healing denture in the meantime.",
      "Plan to spend most of the day with us; with sedation, someone needs to drive you home. The temporary bridge is usually made of acrylic, lighter than your final teeth, so we ask you to protect it while the implants heal.",
      "## What does recovery feel like in the first two weeks?",
      "Some swelling, bruising and soreness is normal, usually most noticeable in the first few days. Most people manage it with over-the-counter pain relief and feel like themselves again within about a week. Plan for two or three quiet days, and skip strenuous exercise for at least the first 48 hours.",
      "Food stays soft for a while: eggs, yogurt, soups and fish. We see you for follow-up visits to check that the implants are stable and the gums are healing well. Call us right away if you notice a fever, pus, bleeding that does not stop, or pain that medicine does not relieve.",
      "## Why is there a waiting period before the final teeth?",
      "Because the bone needs time to grow onto the implants. This process is called osseointegration, and it is what makes an implant stable for the long term. It usually takes about three to six months, and longer when bone grafting was part of your plan. During this time you wear the temporary bridge, keep to softer foods and come in for checks. Living with the temporary teeth also tells us what to refine in the final design.",
      "## What are the final teeth like, and how do you care for them?",
      "Once the implants have fused and the gums have matured, we take new scans and impressions, and the laboratory crafts your final bridge from a stronger material, built to the design we refined together. We try it in, adjust the bite and then secure it to the implants.",
      "Caring for All-on-X is close to caring for natural teeth, with one difference: you clean under the bridge as well as around it. A soft toothbrush, a non-abrasive toothpaste, floss threaders or small interdental brushes, and a water flosser all help. You still need regular professional cleanings, and from time to time the bridge is removed in the office for a deeper clean. If you clench or grind, we may recommend a night guard.",
      "Implants can serve you for many years with good care; the teeth on top may need refreshing in time.",
      "## Who is a good candidate, and who should wait?",
      "The main requirement is enough healthy bone, or the willingness to have grafting where bone has been lost. Gum disease needs treating first, because untreated gum disease puts implants at risk. Smoking and vaping slow healing, as do unmanaged diabetes and some medicines, so we talk about them openly in planning. What matters most is your general health, not your age.",
      "If implants are not right for you, well made [dentures](/dentures/) remain a sound way to restore your smile.",
      "## Frequently asked questions",
      "**Will I be without teeth at any point?**\nUsually not. When the implants are stable enough on surgery day, a fixed temporary bridge goes on the same day. When they are not, you wear a healing denture until they are ready.",
      "**Does All-on-X hurt?**\nLocal anesthesia is used for the procedure, and sedation is available if you want it. Afterward, some soreness, swelling and bruising is expected for a few days, and most patients manage it with over-the-counter pain relief. Everyone heals a little differently.",
      "**Does insurance cover All-on-X?**\nWe are a private, fee for service practice and out of network with insurance. We submit claims for you so you can use any out-of-network benefits, and we offer financing through Sunbit, Cherry and CareCredit.",
      "**I was told I do not have enough bone. Is All-on-X still possible?**\nOften, yes. Tilting the back implants makes use of the bone you have and can avoid grafting, and when grafting is needed it adds healing time rather than ruling you out. Your CBCT scan gives the real answer.",
      "## Ready to talk it through?",
      "If you live in Royal Palm Beach, Wellington or the western communities and you are tired of patching the same failing teeth, we would be glad to meet you. A complimentary consultation gives you a clear picture of your options, with no pressure and one patient at a time. [Book an appointment](/appointment/) or call (561) 798-9997.",
    ),
    figures: [
      { before: "What happens at the first visit?", image: images.teamGroup, caption: "Dr. Jiveh and the Smiles By Jiveh team in Royal Palm Beach. The first visit is a conversation, not a procedure." },
      { before: "What happens on surgery day?", image: images.drJivehTreating, caption: "Dr. Jiveh at work. Each implant is placed to the plan made from your scan." },
      {
        before: "What are the final teeth like, and how do you care for them?",
        image: images.baAllOnXWoman,
        caption: "Before and after: a full arch of failing teeth replaced with fixed teeth on implants.",
      },
    ],
    steps: {
      heading: "The five stages at a glance",
      items: [
        { title: "Consultation and 3D scan", text: "A conversation about what bothers you and your health history, then a CBCT scan, photos and a digital scan." },
        { title: "Digital planning", text: "Each implant is planned on the computer, and the laboratory designs your new teeth with you." },
        { title: "Surgery day", text: "The implants are placed to the plan. When they are stable enough, a fixed temporary bridge goes on the same day." },
        { title: "Healing, about three to six months", text: "The bone grows onto the implants while you wear the temporary bridge and come in for checks." },
        { title: "Your final teeth", text: "New scans, a final bridge in a stronger material, tried in, adjusted and secured." },
      ],
    },
    ctaText: "Tired of patching the same failing teeth? See what All-on-X would involve for you at a complimentary consultation.",
    seo: { title: "All-on-X Process in Royal Palm Beach, FL - Smiles By Jiveh", description: "Dr. Farokh Jiveh walks through All-on-X full arch implant treatment step by step: the consultation, planning, surgery day, healing and your final teeth." },
  },
  {
    slug: "do-veneers-damage-your-teeth",
    title: "Do Veneers Ruin Your Natural Teeth? What Really Happens Under Porcelain",
    excerpt: "Dr. Farokh Jiveh explains what happens to your natural teeth under porcelain veneers, who fits no-prep veneers, and how to protect your enamel for life.",
    date: "2026-10-23",
    author: postAuthor.name,
    category: "Cosmetic Dentistry",
    service: "/dental-veneers/",
    image: images.serviceVeneers,
    body: rich(
      "Veneers do not ruin healthy teeth when they are planned conservatively and looked after well. A traditional [porcelain veneer](/dental-veneers/) does remove a thin layer of enamel, and that step cannot be undone, which is why the question deserves a straight answer. The tooth underneath stays alive and can still get a cavity, so the planning and your daily care decide the outcome.",
      "## What actually happens to a tooth when it gets a veneer?",
      "A veneer is a thin shell of porcelain bonded to the front surface of a tooth. It changes the color, shape, length or spacing you see when you smile, and it covers only the front, not the whole tooth. That is the key difference from a crown, which wraps around the entire tooth and needs far more reshaping.",
      "The dramatically shaved down \"pegs\" that circulate on social media are usually teeth prepared for crowns, or teeth prepared far more aggressively than a veneer requires. Neither is what a well planned veneer looks like. Under a conservative veneer, the tooth keeps its nerve, its root and most of its enamel. It is still your tooth, with a new face.",
      "## How much enamel is removed, and can it be reversed?",
      "For a traditional porcelain veneer, a small amount of enamel is removed from the front and the edges of the tooth so the porcelain can sit flush and bond well. Because enamel does not grow back, this step is not reversible: a tooth prepared for a veneer will always need a veneer or another restoration.",
      "That is why I plan every case to stay within enamel. Porcelain bonds most strongly to enamel, and preparations kept in enamel are far less likely to leave a tooth sensitive afterward. In many cases what a tooth needs is not a full preparation at all, only a light recontouring of the surface.",
      "## Who can have no-prep veneers, and who should not?",
      "No-prep veneers add porcelain without reshaping the tooth, or with almost none. They work best when there is room for the added thickness: small teeth, teeth with spaces between them, teeth that lean slightly inward, and smiles that need only a modest change in color, about one or two shades. A dentist who has placed many of these recognizes the candidates quickly, and the laboratory confirms it on a model of your teeth before anything is decided.",
      "They are a poor fit when teeth are crowded, flared forward or already full in size, because adding porcelain where there is no room makes teeth look bulky and thick at the gumline. They also struggle with very dark teeth, since very thin porcelain cannot hide deep color on its own. In those situations a minimal-prep veneer, which still stays entirely in enamel, usually gives a slimmer and more natural result. And some patients do better with no veneers at all, which brings us to the next question.",
      "## Is there a gentler option than veneers for my concern?",
      "Often, yes, and a cosmetic dentist should say so. If color is the only issue, [professional whitening](/teeth-whitening-treatment/) changes it without removing any enamel. If crowding or spacing is the issue, moving the teeth with [Invisalign or clear aligners](/invisalign/) treats the cause, and sometimes removes the need for veneers altogether. Small chips and uneven edges can often be repaired with bonding.",
      "In a [smile makeover](/smile-makeovers/) these tools are combined: aligning first, whitening next, and then placing fewer or thinner veneers only where they are truly needed. The goal is the smile you want with the least change to your natural teeth.",
      "## Can the tooth under a veneer still decay?",
      "Yes. A veneer protects the surface it covers, but the tooth is still a living tooth, and you can still get a cavity under or around a veneer, most often at the edge where the porcelain meets the tooth near the gumline. Gum disease can also develop around veneered teeth, exactly as it does around natural teeth.",
      "This is why veneers are only placed on healthy teeth and gums, and any decay or gum disease is treated first. Afterward the recipe is simple: brush twice a day with a soft brush and a non-abrasive fluoride toothpaste, clean between your teeth every day, and keep your regular cleanings and exams so we can check the margins while they are easy to care for.",
      "## Will veneers make my teeth sensitive or weak?",
      "Some sensitivity to hot and cold can occur after enamel is reshaped, and it usually settles. Keeping the preparation in enamel is the best way to prevent it. A veneer can chip, crack or come loose over time, especially if you bite your nails, chew ice, open packages with your teeth or grind at night. If you clench or grind, or have a deep bite, veneers may not be the right choice, or they may need a night guard to protect them. We assess that before we recommend anything.",
      "## How long do veneers last, and what happens then?",
      "With proper care, porcelain veneers last on average 10 to 15 years, and often longer. When one eventually chips or the gumline changes, it is replaced, and because the original preparation stayed in enamel, the replacement is planned to preserve what is there. A well planned veneer is a long relationship with your dentist rather than a one-time purchase, and the conservative choices made on day one keep every later chapter simple.",
      "## Frequently asked questions",
      "**Are veneers the same as crowns?**\nNo. A veneer covers the front surface of a tooth, while a crown covers the entire tooth and needs much more reshaping. That is why veneers are the more conservative choice when the back and sides of the tooth are healthy.",
      "**Can I whiten my veneers later?**\nNo. Whitening products do not change porcelain, and some can scratch it. If you want a brighter smile, we whiten first and then match the veneers to your new shade.",
      "**If I remove no-prep veneers, are my teeth back to normal?**\nSometimes, but not always. Even when a tooth was not prepared, taking a bonded veneer off can remove a little enamel, so no-prep is best thought of as very conservative rather than fully reversible.",
      "**How many veneers will I need?**\nIt depends on what shows when you smile and what we are correcting. Some patients need one veneer to match a chipped tooth; others choose a set across the teeth that show when they smile, for symmetry. A digital preview helps you see the difference before deciding.",
      "**Does insurance cover veneers?**\nUsually not, because veneers are considered cosmetic. Smiles By Jiveh is a private, fee for service practice, and we offer [financing options](/insurance-payment-options/) so you can plan the investment comfortably.",
      "## A smile that is still yours",
      "If you have been putting off veneers because you were afraid of what they would do to your teeth, come and talk with us in Royal Palm Beach. A complimentary consultation includes a careful look at your teeth, bite and gums, and an honest answer about whether veneers, no-prep veneers or a gentler option fits you best. [Book your appointment](/appointment/) or call (561) 798-9997.",
    ),
    figures: [
      { before: "Who can have no-prep veneers, and who should not?", image: images.compare2, caption: "Porcelain veneers by Dr. Jiveh: the same smile before and after." },
      {
        before: "Is there a gentler option than veneers for my concern?",
        image: images.whiteningHero,
        caption: "Professional whitening in the office changes the color of teeth without removing any enamel.",
      },
      {
        before: "Can the tooth under a veneer still decay?",
        image: images.hygieneVisit,
        caption: "Regular cleanings and exams let us check the edges of every veneer while they are easy to care for.",
      },
    ],
    facts: {
      heading: "Quick facts",
      items: [
        { label: "What a veneer covers", value: "The front surface of the tooth only" },
        { label: "Enamel removed", value: "A thin layer for a traditional veneer, kept within enamel" },
        { label: "Reversible?", value: "No. Enamel does not grow back" },
        { label: "No-prep veneers", value: "For small teeth, spaces and modest color changes" },
        { label: "Can the tooth still decay?", value: "Yes, so cleanings and exams continue" },
        { label: "Average lifespan", value: "10 to 15 years with proper care" },
      ],
    },
    ctaText: "Not sure whether veneers, no-prep veneers or a gentler option fits you? Ask Dr. Jiveh at a complimentary consultation.",
    seo: { title: "Do Veneers Damage Teeth? Royal Palm Beach - Smiles By Jiveh", description: "Dr. Farokh Jiveh explains what happens to your natural teeth under porcelain veneers, who fits no-prep veneers, and how to protect your enamel for life." },
  },
];
