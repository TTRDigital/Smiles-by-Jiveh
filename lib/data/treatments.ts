import type { Treatment } from "../types";
import { rich } from "../rich.ts";
import { images } from "./images.ts";

/*
 * Treatment pages, in menu order within each category. Text is the client's own,
 * copied from the old WordPress pages. Each page is a hero plus blocks rendered by
 * components/sections/Blocks.tsx; edit them in /cms > Treatments.
 */

export const fallbackTreatments: Treatment[] = [
  {
    slug: "general-dentistry",
    title: "General Dentistry",
    category: "general",
    order: 1,
    hero: {
      eyebrow: "General Dentistry",
      heading: "General Dentistry Designed for Lifelong Health",
      text: rich(
        "Exceptional dentistry begins with a healthy foundation. At Smiles By Jiveh, our comprehensive approach to general dentistry focuses on preventing disease, preserving natural teeth, and supporting long-term oral and overall health through personalized, relationship-based care.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.generalHero],
    },
    blocks: [
      {
        _type: "cardsBlock",
        heading: "Prevention is the most beautiful dentistry.",
        text: rich(
          "General dentistry is about much more than routine cleanings and exams. It is the foundation of every healthy smile and the first step toward preventing future dental problems. Through preventive care, comprehensive examinations, advanced diagnostics, periodontal therapy, restorative dentistry, and patient education, we help patients maintain healthy, functional smiles for years to come.",
        ),
        subheading: "Our Comprehensive Approach",
        columns: 4,
        cards: [
          {
            icon: "calendar-check",
            title: "Preventive Dentistry",
            text: "Regular examinations, professional cleanings, digital imaging, and early diagnosis help prevent small concerns from becoming complex problems.",
          },
          {
            icon: "heart-handshake",
            title: "Restorative Dentistry",
            text: "Tooth-colored fillings, dental crowns, bridges, and other restorative treatments rebuild strength, comfort, and function while preserving as much natural tooth structure as possible.",
          },
          {
            icon: "square-activity",
            title: "Periodontal Health",
            text: "Healthy gums are essential to overall health. Through advanced periodontal care and ongoing maintenance, we help protect the foundation of your smile.",
          },
          {
            icon: "message-circle",
            title: "Oral Wellness",
            text: "Using comprehensive evaluations, salivary testing, microbiome analysis, and personalized risk assessment, we focus on supporting both oral and whole-body health.",
          },
        ],
      },
      {
        _type: "detailsBlock",
        eyebrow: "Featured General Dentistry Services",
        items: [
          {
            heading: "Comprehensive Dental Exams",
            body: rich(
              "Our comprehensive dental examinations evaluate your teeth, gums, bite, existing restorations, and overall oral health to identify concerns early and create a personalized plan for maintaining long-term health and function.",
            ),
          },
          {
            heading: "Professional Cleanings",
            body: rich(
              "Professional dental cleanings remove plaque, tartar, and bacterial buildup that brushing and flossing alone cannot eliminate, helping maintain healthy teeth and gums while reducing the risk of future dental problems.",
            ),
          },
          {
            heading: "Tooth-Colored Fillings",
            body: rich(
              "Tooth-colored fillings restore teeth affected by decay or minor damage using natural-looking materials that blend with your smile while helping preserve healthy tooth structure, strength, and comfortable function.",
            ),
          },
          {
            heading: "Dental Crowns",
            body: rich(
              "Custom dental crowns restore strength, shape, and function to teeth that are weakened, fractured, or extensively damaged, while being carefully designed to create a natural and harmonious appearance.",
            ),
          },
          {
            heading: "Dental Bridges",
            body: rich(
              "Dental bridges replace one or more missing teeth to restore comfortable chewing, improve smile appearance, and help maintain proper bite alignment by preventing surrounding teeth from shifting into open spaces.",
            ),
          },
          {
            heading: "Inlays & Onlays",
            body: rich(
              "Inlays and onlays provide a conservative restorative solution for teeth that require more support than a filling but may not need a full crown, preserving healthy tooth structure whenever possible.",
            ),
          },
          {
            heading: "Root Canal Therapy",
            body: rich(
              "Root canal therapy removes infection from inside a damaged tooth, relieves discomfort, and helps preserve the natural tooth so it can continue to function comfortably and remain part of your smile.",
            ),
          },
          {
            heading: "Periodontal Therapy",
            body: rich(
              "Personalized periodontal therapy focuses on reducing harmful bacteria and inflammation beneath the gums, protecting supporting bone and helping create a healthier foundation for your smile and overall wellness.",
            ),
          },
          {
            heading: "Nightguards",
            body: rich(
              "Custom nightguards help protect your teeth, dental restorations, and bite from excessive forces caused by nighttime grinding or clenching, reducing wear and supporting greater long-term comfort and stability.",
            ),
          },
          {
            heading: "Mouthguards",
            body: rich(
              "A custom-made mouthguard provides comfortable, secure protection for your teeth during sports and physical activities, helping reduce the risk of dental injuries, fractures, and damage to your smile.",
            ),
          },
          {
            heading: "Emergency Dentistry",
            body: rich(
              "When unexpected dental pain, damage, or other urgent concerns arise, we provide timely evaluation and personalized care to relieve discomfort, identify the cause, and restore your oral health whenever possible.",
            ),
          },
        ],
      },
      {
        _type: "splitBlock",
        heading: "Why Patients Choose Smiles By Jiveh",
        items: [
          { icon: "check-circle", title: "Personalized Care", text: "Every treatment plan is customized around your individual needs, goals, and long-term health." },
          {
            icon: "check-circle",
            title: "Conservative Philosophy",
            text: "Whenever possible, we preserve healthy tooth structure and recommend the least invasive treatment that will provide lasting results.",
          },
          {
            icon: "check-circle",
            title: "Comprehensive Dentistry",
            text: "From prevention and maintenance to complex restorative treatment, every aspect of your care is coordinated under one philosophy of excellence.",
          },
        ],
        image: images.generalHero,
      },
      { _type: "sharedBlock", kind: "process", hideButtons: true },
      {
        _type: "splitBlock",
        heading: "Healthy smiles begin with exceptional preventive care.",
        text: rich(
          "Whether you are due for a routine dental examination or require restorative treatment, we invite you to experience comprehensive dentistry that is personalized, thoughtful, and designed for lasting health.",
        ),
        ctas: [
          { label: "Book An Appointment", href: "/appointment/" },
          { label: "(561) 798-9997", href: "tel:5617989997" },
        ],
        image: images.generalCta,
      },
    ],
    seo: {
      title: "General Dentistry in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "Exceptional dentistry begins with a healthy foundation. At Smiles By Jiveh, our comprehensive approach to general dentistry focuses on preventing disease…",
    },
  },
  {
    slug: "dental-cleanings",
    title: "Dental Cleanings",
    category: "general",
    order: 2,
    hero: {
      eyebrow: "Dental Cleanings",
      heading: "Dental Cleanings & Periodontal Health",
      text: rich(
        "A healthy mouth is the gateway to a healthier body. At Smiles By Jiveh, dental cleanings and periodontal care are treated as an essential part of your long-term wellness, not simply routine maintenance.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.hygieneVisit],
    },
    blocks: [
      {
        _type: "cardsBlock",
        heading: "The Foundation of Oral & Full-Body Health",
        text: rich(
          "Your gums, teeth, and oral microbiome play a vital role in your overall health. Scientific research continues to demonstrate the connection between periodontal disease and systemic conditions such as cardiovascular disease, diabetes, inflammation, and other chronic health concerns. Every hygiene visit is personalized based on your gum health, inflammation levels, bone support, oral bacteria, medical history, and individual risk factors.",
        ),
        cards: [],
      },
      {
        _type: "cardsBlock",
        heading: "Our Comprehensive Periodontal Approach",
        text: rich("Rather than offering the same cleaning to every patient, we customize your care based on your individual needs."),
        columns: 3,
        cards: [
          {
            icon: "calendar-check",
            title: "Professional Dental Cleanings",
            text: "Gentle removal of plaque, tartar, and bacterial buildup that cannot be eliminated through brushing and flossing alone, helping to maintain healthy teeth and gums.",
          },
          {
            icon: "heart-handshake",
            title: "Comprehensive Periodontal Evaluation",
            text: "A thorough assessment of gum health, pocket depths, bleeding, bone support, inflammation, and early signs of periodontal disease, allowing us to identify concerns before they become more advanced.",
          },
          {
            icon: "square-activity",
            title: "Advanced Diagnostics",
            text: "When appropriate, your care may include salivary testing, microbiome evaluation, genetic risk assessment, and other advanced diagnostic tools that help us personalize treatment and better understand your oral health.",
          },
          {
            icon: "message-circle",
            title: "Precision Periodontal Therapy™",
            text: "For patients with early signs of gum disease or increased bacterial activity, we may recommend our Precision Periodontal Therapy™, a customized take-home periodontal gel designed to reduce harmful bacteria, promote healthier gums, and support long-term periodontal stability between hygiene visits.",
          },
          {
            icon: "message-circle",
            title: "Localized Antimicrobial Therapy",
            text: "When deeper periodontal pockets are present, localized antibiotic therapy such as Arestin® may be placed directly into affected areas to help eliminate harmful bacteria, reduce inflammation, and encourage healing alongside periodontal treatment.",
          },
          {
            icon: "message-circle",
            title: "Personalized Wellness Guidance",
            text: "Every patient receives individualized recommendations for home care, nutrition, oral hygiene, and periodontal maintenance to support both oral health and overall wellness.",
          },
        ],
      },
      {
        _type: "cardsBlock",
        heading: "Benefits of Preventive & Periodontal Care",
        layout: "list",
        columns: 3,
        cards: [
          { icon: "hand-point-right", title: "Prevent gum disease before it progresses." },
          { icon: "hand-point-right", title: "Reduce inflammation and harmful oral bacteria." },
          { icon: "hand-point-right", title: "Preserve your natural teeth and supporting bone." },
          { icon: "hand-point-right", title: "Maintain cosmetic and restorative dental work." },
          { icon: "hand-point-right", title: "Improve breath and overall oral comfort." },
          { icon: "hand-point-right", title: "Detect problems earlier, when treatment is simpler." },
          { icon: "hand-point-right", title: "Support your long-term overall health and well-being." },
        ],
      },
      { _type: "sharedBlock", kind: "whyChooseUs" },
      { _type: "sharedBlock", kind: "process" },
      {
        _type: "splitBlock",
        heading: "Healthy gums. Healthy smile. Healthier you.",
        text: rich(
          "Whether you are due for a routine dental cleaning or require more advanced periodontal therapy, our team is committed to providing thoughtful, personalized care in a calm and welcoming environment. Together, we can protect your smile while supporting your long-term health.",
        ),
        ctas: [{ label: "Schedule Your Preventive Care Consultation", href: "/appointment/" }],
        image: images.hygienistTreating,
      },
    ],
    seo: {
      title: "Dental Cleanings in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "A healthy mouth is the gateway to a healthier body. At Smiles By Jiveh, dental cleanings and periodontal care are treated as an essential part of your…",
    },
  },
  {
    slug: "tooth-color-fillings",
    title: "Tooth-Colored Fillings",
    category: "general",
    order: 3,
    hero: {
      eyebrow: "Tooth-Colored Fillings",
      heading: "Conservative White Fillings Designed to Restore & Preserve Your Smile",
      text: rich(
        "Preserving healthy, natural tooth structure is always a priority. When teeth develop decay, minor fractures, or worn areas that require repair, white composite fillings can often provide a conservative and highly aesthetic solution that blends naturally with your smile.",
        "Using advanced tooth colored composite materials carefully matched to the shade and character of your existing teeth, Dr. Farokh Jiveh restores strength, function, and appearance while creating seamless, natural-looking results without the use of traditional metal fillings.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.crownFillingBeforeAfter, images.fillingsBeforeAfter],
      stacked: true,
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "Strong, Natural Looking White Fillings Designed to Blend Seamlessly with Your Smile",
            body: rich(
              "Modern composite restorations are designed to be both durable and beautifully natural in appearance. Using advanced tooth colored materials, white fillings blend seamlessly with your surrounding teeth while restoring strength, function, and aesthetics in a conservative way that preserves healthy tooth structure. Most patients never notice they are there — they simply feel and function like natural teeth.",
            ),
          },
          {
            heading: "When Might a White Filling Be Needed?",
            body: rich(
              "Teeth with cavities, small fractures, worn areas, leaking older fillings, or sensitivity may require a conservative restoration to prevent further damage. Symptoms such as tooth sensitivity, discomfort when chewing, visible dark areas, or a broken filling should never be ignored, as untreated decay can progress quickly and compromise the health of the tooth.",
            ),
          },
          {
            heading: "Protecting Your Teeth from Cavities & Breakdown",
            body: rich(
              "Preventive care remains one of the most important ways to protect long-term oral health. Regular professional cleanings, thorough examinations, proper brushing and flossing, and dietary awareness all play a critical role in cavity prevention. Certain patients may also be more susceptible to decay due to genetics, oral bacteria, dry mouth, acidity, or lifestyle factors, which is why Dr. Jiveh takes a personalized approach to helping patients maintain healthier teeth for the long term.",
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
          {
            question: "Why choose tooth-colored fillings over metal?",
            answer: "They blend with your natural teeth so no one notices, are highly durable, and bond directly to the tooth structure.",
          },
          { question: "How long do composite fillings last?", answer: "Most composite fillings last 7–10 years or longer with proper care and regular checkups." },
          { question: "Does getting a filling hurt?", answer: "We use local anesthetic so most patients feel little to no discomfort during the procedure." },
          {
            question: "How do I care for a new filling?",
            answer: "Brush and floss as usual. Avoid very hard or sticky foods for the first 24 hours, and report any sharp pain that doesn’t subside.",
          },
          {
            question: "Can I replace old metal fillings with tooth-colored ones?",
            answer: "Yes — many patients choose to replace older silver fillings with cosmetic composite versions for a more natural smile.",
          },
        ],
      },
    ],
    seo: {
      title: "Tooth-Colored Fillings in Royal Palm Beach - Smiles By Jiveh",
      description: "Preserving healthy, natural tooth structure is always a priority. When teeth develop decay, minor fractures, or worn areas that require repair, white…",
    },
  },
  {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    category: "general",
    order: 4,
    hero: {
      eyebrow: "Root Canal Treatment",
      heading: "Modern Root Canal Therapy Designed to Relieve Pain & Preserve Your Tooth",
      text: rich(
        "At Smiles By Jiveh, modern root canal therapy is designed to relieve pain — not create it. Many patients who seek treatment are experiencing severe tooth pain, sensitivity, swelling, or sleepless nights caused by infection deep within the tooth, and often experience tremendous relief once the source of the infection is removed. A root canal carefully cleans and disinfects the inside of the tooth to preserve your natural tooth structure and prevent further infection. Dr. Farokh Jiveh and our team prioritize your comfort with gentle techniques, advanced technology, and sedation options when needed, while more complex cases may be referred to our trusted endodontic specialist to ensure the highest level of care and long-term success.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.rootCanalHero],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "A Gentle, Modern Way to Save a Problem Tooth",
            body: rich(
              "At Smiles By Jiveh, your comfort is just as important as your dental health. If you feel anxious about root canal treatment, we offer gentle techniques, modern technology, and sedation options to help you feel relaxed and comfortable throughout the entire experience.",
            ),
          },
          {
            heading: "What Is a Root Canal?",
            body: rich(
              "A root canal is a conservative procedure designed to save a natural tooth by removing infection or inflammation from inside the tooth, carefully cleaning and disinfecting the area, and sealing it to prevent further infection. Preserving the natural tooth whenever possible is often the healthiest long-term solution.",
            ),
          },
          {
            heading: "The Benefits of Root Canal Treatment",
            body: rich(
              "Root canal therapy is designed to relieve pain, preserve your natural tooth, restore comfortable chewing and function, and help prevent the need for extraction. In many cases, treatment can provide immediate relief from severe discomfort and is completed comfortably in just one or two visits.",
            ),
          },
        ],
      },
      { _type: "sharedBlock", kind: "whyChooseUs" },
      { _type: "sharedBlock", kind: "process" },
    ],
    seo: {
      title: "Root Canal Treatment in Royal Palm Beach - Smiles By Jiveh",
      description: "At Smiles By Jiveh, modern root canal therapy is designed to relieve pain — not create it. Many patients who seek treatment are experiencing severe tooth…",
    },
  },
  {
    slug: "gum-therapy",
    title: "Gum Therapy",
    category: "general",
    order: 5,
    hero: {
      eyebrow: "Gum Therapy",
      heading: "Healthy Gums. Healthy Smile. Healthier Body.",
      text: rich(
        "Modern periodontal therapy is about far more than saving teeth. It is about reducing inflammation, protecting your overall health, and helping you enjoy a lifetime of healthy smiles. At Smiles By Jiveh, we take a comprehensive, science-based approach to periodontal care.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.gumHealth],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "What Is Periodontal Therapy?",
            body: rich(
              "Periodontal therapy is the treatment of gum disease and the harmful bacteria that collect beneath the gums around your teeth. When bacteria remain below the gumline, they can lead to bleeding gums, bad breath, gum recession, bone loss, and eventually tooth loss.",
            ),
          },
          {
            heading: "Why Gum Health Matters to Your Overall Health",
            body: rich(
              "Scientific research has demonstrated a strong connection between periodontal disease and systemic conditions such as heart disease, diabetes, stroke, Alzheimer’s disease, respiratory disease, and pregnancy complications.",
            ),
            image: images.gumHealthBody,
          },
          {
            heading: "How Is Periodontal Disease Treated?",
            body: rich(
              "Treatment often begins with periodontal therapy, commonly called a deep cleaning, which removes bacteria, plaque, and tartar from beneath the gumline. Depending on individual needs, treatment may also include localized antibiotic therapy such as Arestin®, prescription antimicrobial rinses, or systemic antibiotics.",
            ),
          },
          {
            heading: "Advanced Testing for Personalized Periodontal Care",
            body: rich(
              "Through advanced salivary diagnostics, bacterial DNA analysis, and genetic testing, we identify the specific bacteria present and evaluate individual risk for periodontal disease, creating highly personalized treatment plans.",
            ),
            image: images.salivaTesting,
          },
          {
            heading: "Precision Periodontal Therapy with Perio Protect®",
            body: rich(
              "Custom-made trays deliver a prescription antimicrobial gel deep beneath the gums where harmful bacteria live, worn at home for just a few minutes a day to maintain healthier gums between professional visits.",
            ),
            image: images.perioProtect,
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
          {
            question: "What is gum disease?",
            answer: "Gum disease ranges from mild (gingivitis) to advanced (periodontitis) inflammation and infection of the gums and supporting bone.",
          },
          {
            question: "What are the signs I might have gum disease?",
            answer: "Common signs include bleeding when brushing or flossing, red or swollen gums, persistent bad breath, gum recession, or loose teeth.",
          },
          { question: "Is gum therapy painful?", answer: "We use local anesthetic to keep you comfortable. Mild sensitivity for a few days afterward is normal and short-lived." },
          {
            question: "How many visits does gum therapy require?",
            answer: "Mild cases may need only one visit. More advanced disease typically requires 2–4 visits across the mouth.",
          },
          {
            question: "Can gum disease come back after treatment?",
            answer: "Yes if hygiene lapses, but with consistent brushing, flossing, and maintenance cleanings, most patients keep their gums healthy long-term.",
          },
        ],
      },
      { _type: "sharedBlock", kind: "testimonials" },
    ],
    seo: {
      title: "Gum Therapy in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "Modern periodontal therapy is about far more than saving teeth. It is about reducing inflammation, protecting your overall health, and helping you enjoy a…",
    },
  },
  {
    slug: "laser-dental-treatment",
    title: "Laser Dental Treatment",
    category: "general",
    order: 6,
    hero: {
      eyebrow: "Laser Dental Treatment",
      heading: "Fotona® Laser Technology for Health & Rejuvenation",
      text: rich(
        "At Smiles By Jiveh, Dr. Farokh Jiveh uses advanced Fotona® LightWalker® laser technology to provide more comfortable, precise, and minimally invasive care. Laser treatments support gum therapy, facial aesthetics, TMJ therapy, skin rejuvenation, collagen stimulation, and NightLase® therapy for snoring and sleep apnea. This modern approach promotes healthier tissues, faster healing, reduced discomfort, and improved overall wellness.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.laserHero],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "Modern Laser Technology Applied with Precision, Wellness & Aesthetic Care",
            body: rich(
              "At Smiles By Jiveh, Dr. Jiveh utilizes advanced Fotona® LightWalker® laser technology to provide minimally invasive treatments focused on periodontal health, airway wellness, facial aesthetics, and overall patient comfort. Laser dentistry allows many procedures to be performed with less discomfort, reduced inflammation, faster healing, and greater precision compared to traditional methods.",
            ),
          },
          {
            heading: "Laser Therapy for Snoring, Airway & Sleep Wellness",
            body: rich(
              "Fotona NightLase® therapy is a non surgical laser treatment designed to help reduce snoring and improve airway function by gently tightening and strengthening the soft tissues of the throat and palate. Treatments are comfortable, require no downtime or anesthesia, and are performed in a series of short in office visits. Many patients notice improvement in snoring, sleep quality, and nighttime breathing after only a few sessions.",
            ),
          },
          {
            heading: "Advanced Laser Aesthetics & Periodontal Therapy",
            body: rich(
              "Fotona laser technology is also used for periodontal therapy, laser bacterial reduction, gum contouring, facial rejuvenation, collagen stimulation, and LipLase® treatments for naturally enhanced lips and facial aesthetics. Unlike traditional injectable approaches, LipLase stimulates your body’s own collagen production to create subtle, natural looking enhancement and rejuvenation while supporting healthier tissue quality and overall smile aesthetics.",
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
          {
            question: "Are laser dental treatments safe?",
            answer: "Yes. Laser treatments are well-established, FDA-cleared, and performed under careful protocols for safety and comfort.",
          },
          {
            question: "Does laser treatment hurt?",
            answer: "Most laser treatments use local anesthetic and are very well tolerated. You may feel mild warmth but generally no pain.",
          },
          {
            question: "How many sessions will I need?",
            answer: "It depends on the treatment — snoring/sleep apnea typically takes 1–3 sessions and LipLase can show results after a single visit.",
          },
          { question: "Is there any downtime?", answer: "Most patients return to normal activity immediately. Some mild swelling or tenderness is normal for a day or two." },
          { question: "When will I see results?", answer: "Snoring often improves after the first session. LipLase results appear in 3–4 weeks as the treated tissue responds." },
        ],
      },
      { _type: "sharedBlock", kind: "testimonials" },
    ],
    seo: {
      title: "Laser Dental Treatment in Royal Palm Beach - Smiles By Jiveh",
      description: "At Smiles By Jiveh, Dr. Farokh Jiveh uses advanced Fotona® LightWalker® laser technology to provide more comfortable, precise, and minimally invasive…",
    },
  },
  {
    slug: "oral-surgery",
    title: "Oral Surgery",
    category: "general",
    order: 7,
    hero: {
      eyebrow: "Oral Surgery",
      heading: "Advanced Oral Surgery In-House — With Trusted Specialists for Complex Cases",
      text: rich(
        "At Smiles By Jiveh, Dr. Jiveh is highly trained in performing many oral surgery procedures comfortably and predictably within the practice. For more advanced or complex surgical cases, we also work closely with an experienced specialist on-site to provide seamless, comprehensive care.",
        "In situations requiring highly specialized treatment, Dr. Jiveh collaborates locally with some of the country’s leading oral surgeons and surgical specialists to ensure every patient receives the highest level of expertise, precision, and personalized care possible.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.oralSurgeryHero],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "A Personalized & Coordinated Approach to Oral Surgery",
            body: rich(
              "Dr. Jiveh is highly trained in performing many oral surgery procedures comfortably and predictably within the practice. For more advanced or complex cases, we collaborate closely with trusted surgical specialists and leading oral surgeons to ensure every patient receives the highest level of care, precision, and expertise.",
            ),
          },
          {
            heading: "What Does Oral Surgery Include?",
            body: rich(
              "Oral surgery may include tooth extractions, implant placement, bone grafting, periodontal procedures, and other advanced treatments that extend beyond traditional dental care. Every case is carefully evaluated and thoughtfully coordinated to determine the most appropriate treatment approach for your individual needs.",
            ),
          },
          {
            heading: "The Benefits of a Coordinated Surgical Experience",
            body: rich(
              "Having one trusted dental home oversee your treatment creates a more seamless and comfortable experience from start to finish. Dr. Jiveh personally coordinates treatment planning, communication with specialists, and follow-up care to ensure continuity, clarity, and the best possible long-term outcome for your health, comfort, and smile.",
            ),
          },
        ],
      },
      { _type: "sharedBlock", kind: "whyChooseUs" },
      { _type: "sharedBlock", kind: "process" },
    ],
    seo: {
      title: "Oral Surgery in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "At Smiles By Jiveh, Dr. Jiveh is highly trained in performing many oral surgery procedures comfortably and predictably within the practice. For more…",
    },
  },
  {
    slug: "sedation-dentistry",
    title: "Sedation Dentistry",
    category: "general",
    order: 8,
    hero: {
      eyebrow: "Sedation Dentistry",
      heading: "Reduce Dental Anxiety with Safe, Effective Sedation",
      text: rich(
        "At Smiles By Jiveh, we understand that dental anxiety can prevent patients from getting the care they need. Our team provides a calm, supportive, and judgment-free environment focused on your comfort. With gentle techniques and safe sedation options, including simple oral sedation, we help patients feel relaxed and at ease, creating a more comfortable and positive dental experience.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.sedationHero],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "A Calm, Comfortable Dental Experience",
            body: rich(
              "At Smiles By Jiveh, your comfort is always a priority. Since 1997, Dr. Farokh Jiveh and our team have helped thousands of patients feel relaxed, cared for, and at ease through gentle, compassionate dentistry.",
            ),
          },
          {
            heading: "What Is Sedation Dentistry?",
            body: rich(
              "We offer safe oral conscious sedation to help patients feel deeply relaxed during treatment. In many cases, sedation is as simple as taking a prescribed pill before your appointment so you can enjoy a calm, stress-free experience.",
            ),
          },
          {
            heading: "The Benefits of Sedation Dentistry",
            body: rich(
              "Oral sedation can help reduce dental anxiety, make longer procedures feel easier, and allow patients to receive the care they need in a more comfortable and relaxed environment.",
            ),
          },
        ],
      },
      { _type: "sharedBlock", kind: "whyChooseUs" },
      { _type: "sharedBlock", kind: "process" },
    ],
    seo: {
      title: "Sedation Dentistry in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "At Smiles By Jiveh, we understand that dental anxiety can prevent patients from getting the care they need. Our team provides a calm, supportive, and…",
    },
  },
  {
    slug: "sleep-apnea-treatment",
    title: "Sleep Apnea Treatment",
    category: "general",
    order: 9,
    hero: {
      eyebrow: "Sleep Apnea Treatment",
      heading: "Restful Sleep, Better Breathing & Improved Overall Health",
      text: rich(
        "At Smiles By Jiveh, Dr. Farokh Jiveh evaluates sleep and airway health as part of comprehensive dental care. Conditions like snoring, clenching, and sleep apnea can impact oral and overall health. Using advanced diagnostics, custom oral appliances, and Fotona® NightLase® therapy, treatment focuses on improving airflow, reducing snoring, supporting healthier sleep, and enhancing long-term wellness and quality of life.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.sleepApneaHero],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "Sleep Apnea Is Serious — But Modern Treatment Can Be Simpler Than You Think",
            body: rich(
              "Sleep apnea is a serious medical condition in which breathing repeatedly becomes restricted or interrupted during sleep, often due to airway collapse and relaxation of the throat muscles. Many patients are unaware they suffer from sleep apnea because it occurs while they are asleep, yet the effects can significantly impact energy, concentration, mood, oral health, and long term overall wellness.",
              "At Smiles By Jiveh, airway and sleep evaluations are an important part of our comprehensive examination process because untreated sleep apnea has been strongly associated with cardiovascular disease, high blood pressure, diabetes, chronic inflammation, fatigue, anxiety, depression, brain fog, and reduced quality of life.",
            ),
          },
          {
            heading: "What Are the Symptoms of Sleep Apnea?",
            body: rich(
              "Common symptoms of sleep apnea may include loud snoring, interrupted breathing during sleep, waking up choking or gasping for air, daytime exhaustion, headaches, poor concentration, clenching or grinding of teeth, dry mouth, acid reflux, and feeling unrefreshed even after a full night’s sleep. Many patients are surprised to learn that chronic fatigue, low energy, irritability, and difficulty focusing may actually be connected to poor airway health and disrupted sleep patterns.",
              "To help properly diagnose airway disorders, our office can provide convenient at home sleep studies when appropriate, allowing patients to better understand the quality of their sleep and oxygen levels before beginning treatment.",
            ),
          },
          {
            heading: "Why Is Sleep Apnea Dangerous?",
            body: rich(
              "When sleep apnea goes untreated, the body experiences repeated oxygen deprivation and interrupted sleep cycles throughout the night. Over time, this chronic stress on the body can increase the risk of serious systemic health conditions including heart disease, stroke, elevated blood pressure, diabetes, memory impairment, metabolic dysfunction, and excessive daytime fatigue that may even contribute to driving or workplace accidents.",
              "Dr. Jiveh works closely with local physicians and sleep specialists to help coordinate comprehensive care for patients suffering from sleep apnea. In many cases, medical insurance may also be utilized to help cover portions of sleep studies and sleep apnea treatment, helping patients access the care they need to improve both sleep quality and overall health.",
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
          {
            question: "What is sleep apnea?",
            answer: "Sleep apnea is a disorder where you repeatedly stop breathing during the night, often dozens or hundreds of times — usually due to throat muscle relaxation.",
          },
          {
            question: "What are the warning signs?",
            answer: "Heavy snoring, choking sensations during sleep, heartburn at night, and waking up unrefreshed are all common indicators.",
          },
          {
            question: "How is sleep apnea treated?",
            answer: "Treatment options include oral appliances, laser treatment of the uvula and soft palate, and lifestyle changes — we’ll recommend the best fit for your case.",
          },
          {
            question: "Why should I treat sleep apnea?",
            answer: "Untreated sleep apnea raises blood pressure and heart attack risk, and chronic exhaustion can lead to accidents. Treatment dramatically reduces these risks.",
          },
          { question: "Will I need a sleep study?", answer: "Often yes. We work with sleep medicine specialists to confirm diagnosis and severity before recommending treatment." },
        ],
      },
    ],
    seo: {
      title: "Sleep Apnea Treatment in Royal Palm Beach - Smiles By Jiveh",
      description: "At Smiles By Jiveh, Dr. Farokh Jiveh evaluates sleep and airway health as part of comprehensive dental care. Conditions like snoring, clenching, and sleep…",
    },
  },
  {
    slug: "tmj-treatment",
    title: "TMJ treatment",
    category: "general",
    order: 10,
    hero: {
      eyebrow: "TMJ Therapy",
      heading: "Do you experience jaw pain when chewing, yawning, or opening your mouth?",
      text: rich(
        "If your jaw hurts, clicks, locks, or feels sore during everyday activities like eating or yawning, you may be experiencing TMJ disorder (TMD). The good news is that many cases can be treated quickly and comfortably with a custom-made oral appliance that helps relieve pressure on the jaw joint, allowing it to heal naturally. For most patients, relief is simple, non-invasive, and highly effective.",
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
            heading: "Advanced TMJ Care When You Need It",
            body: rich(
              "While the majority of TMJ disorders respond well to conservative treatment with a custom appliance, more complex cases may require additional evaluation. If needed, we’ll perform a comprehensive assessment and coordinate your care with trusted TMJ specialists who focus exclusively on advanced jaw joint disorders.",
            ),
          },
        ],
      },
      { _type: "sharedBlock", kind: "whyChooseUs" },
      { _type: "sharedBlock", kind: "process" },
      { _type: "sharedBlock", kind: "testimonials" },
    ],
    seo: {
      title: "TMJ Treatment in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "If your jaw hurts, clicks, locks, or feels sore during everyday activities like eating or yawning, you may be experiencing TMJ disorder (TMD). The good…",
    },
  },
  {
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    category: "cosmetic",
    order: 11,
    hero: {
      eyebrow: "Cosmetic Dentistry",
      heading: "Achieve Your Best Smile Through Comprehensive Cosmetic & Restorative Dentistry",
      text: rich(
        "At Smiles By Jiveh, cosmetic dentistry is approached through a comprehensive blend of aesthetics, function, health, and long-term stability. Since 1997, Dr. Farokh Jiveh and our experienced team have helped patients throughout Palm Beach County achieve naturally beautiful smiles through advanced cosmetic, restorative, and reconstructive dentistry.",
        "From porcelain veneers, crowns, implants, and smile design to gum therapy and full mouth rehabilitation, every treatment is thoughtfully tailored to enhance not only the appearance of your smile, but also the health, comfort, and long-term function behind it.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.serviceCosmetic],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "What Separates Smiles By Jiveh",
            body: rich(
              "Exceptional cosmetic dentistry is about far more than creating beautiful teeth. It requires understanding how aesthetics, function, periodontal health, and long-term stability work together to create a smile that is both beautiful and built to last.",
              "At Smiles By Jiveh, we believe exceptional dentistry cannot be rushed. We intentionally care for fewer patients each day, allowing Dr. Farokh Jiveh to devote his complete attention to every appointment. Unlike many busy practices, he never leaves one restorative patient to treat another. From the moment your visit begins until your treatment is complete, you have his full focus, thoughtful communication, and undivided attention. This personalized approach allows us to better understand your goals, answer your questions, and create treatment plans that prioritize long-term health, function, and naturally beautiful results.",
              "With more than 25 years of clinical experience, Dr. Farokh Jiveh has devoted his career to comprehensive cosmetic, restorative, and implant dentistry. For over 15 years, he has mentored and taught fellow dentists in advanced cosmetic and restorative techniques as the Clinical and Course Director at Palm Beach Dental Academy. His leadership as President of the Florida Academy of Cosmetic Dentistry and recognition as one of America’s Top Dentists reflect his lifelong commitment to clinical excellence and continuing education.",
              "Whether your treatment includes porcelain veneers, No-Prep veneers, professional whitening, cosmetic bonding, porcelain crowns, implant restorations, Invisalign®, gum recontouring, or full-mouth rehabilitation, every recommendation is made with one goal in mind: to create a smile that is naturally beautiful, exceptionally functional, and healthy for years to come.",
            ),
          },
          {
            heading: "What Does Cosmetic Dentistry Include?",
            body: rich(
              "Cosmetic dentistry includes treatments that improve the appearance, function, and long-term health of your smile. At Smiles By Jiveh, every smile begins with a comprehensive evaluation of your teeth, bite, gums, facial balance, and overall oral health before any cosmetic treatment is recommended.",
              "Depending on your needs, treatment may include porcelain veneers, No-Prep veneers, professional whitening, cosmetic bonding, porcelain crowns, dental implants, clear aligner therapy, periodontal therapy, gum contouring, or complete smile rehabilitation.",
              "Our philosophy is simple: beautiful dentistry should never compromise healthy dentistry. Every smile we create is designed to look natural, function comfortably, and support your oral health for decades to come.",
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
          {
            question: "What cosmetic treatments do you offer?",
            answer: "We offer veneers, professional teeth whitening, All-on-4 teeth-in-a-day, Invisalign, laser treatments, gum therapy, dental bonding, crowns, and implants.",
          },
          {
            question: "How long do cosmetic results last?",
            answer:
              "Most cosmetic treatments last many years with proper care. Veneers and crowns commonly last 10–15+ years, while whitening typically needs touch-ups every 6–18 months.",
          },
          {
            question: "Is cosmetic dentistry painful?",
            answer: "Most procedures use local anesthesia and are very comfortable. We also offer sedation options for anxious patients.",
          },
          {
            question: "How much does cosmetic dentistry cost?",
            answer: "Costs vary by procedure. We provide a clear estimate at your complimentary consultation and offer flexible options to fit your budget.",
          },
          { question: "Do you offer a guarantee?", answer: "Yes — our Satisfaction Guarantee covers our treatments as long as you follow our aftercare recommendations." },
        ],
      },
      {
        _type: "splitBlock",
        heading: "Healthy smiles begin with exceptional preventive care.",
        text: rich(
          "Whether you are due for a routine dental examination or require restorative treatment, we invite you to experience comprehensive dentistry that is personalized, thoughtful, and designed for lasting health.",
        ),
        ctas: [
          { label: "Book An Appointment", href: "/appointment/" },
          { label: "(561) 798-9997", href: "tel:5617989997" },
        ],
        image: images.cosmeticCta,
      },
    ],
    seo: {
      title: "Cosmetic Dentistry in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "At Smiles By Jiveh, cosmetic dentistry is approached through a comprehensive blend of aesthetics, function, health, and long-term stability. Since 1997…",
    },
  },
  {
    slug: "teeth-whitening-treatment",
    title: "Teeth Whitening Treatment",
    category: "cosmetic",
    order: 12,
    hero: {
      eyebrow: "Teeth Whitening Treatment",
      heading: "Brighten Your Smile with Professional Whitening Solutions",
      text: rich(
        "Coffee, tea, wine, smoking, and everyday habits can gradually stain teeth over time. At Smiles By Jiveh, we offer professional whitening solutions to safely brighten your smile, including in-office Zoom whitening, custom take-home whitening trays, and Opalescence Go for a simple, effective, low-sensitivity option. Each treatment is designed to deliver natural-looking, confident results.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.whiteningHero],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "A Personalized, Professional Approach to Whitening Your Smile",
            body: rich(
              "At Smiles By Jiveh, we offer several whitening options tailored to your lifestyle, goals, and level of sensitivity. Whether you choose in-office Zoom whitening for immediate results, custom-designed whitening trays created from a digital scan of your smile, or convenient Opalescence Go disposable trays for at-home use, our goal is to help you achieve a brighter, more refreshed smile comfortably and safely.",
            ),
          },
          {
            heading: "What Is Professional Teeth Whitening?",
            body: rich(
              "Professional whitening uses carefully formulated whitening materials designed to brighten teeth more effectively and predictably than over-the-counter products. Unlike generic store-bought systems, our whitening options are selected and supervised to maximize results while minimizing sensitivity and protecting the surrounding tissues.",
            ),
          },
          {
            heading: "The Benefits of Professional Whitening",
            body: rich(
              "Professional whitening can noticeably brighten your smile, refresh your appearance, and boost confidence with safer, longer-lasting results. With customized treatment options and professional guidance from Dr. Jiveh and our team, patients can achieve natural-looking whitening results in a way that best fits their comfort, schedule, and lifestyle.",
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
          { question: "How long does whitening last?", answer: "Usually 6 to 18 months, depending on coffee, tea, wine, smoking, and maintenance." },
          { question: "Is whitening safe?", answer: "Yes, when done professionally with gum protection and proper gel strength." },
          { question: "Will it cause sensitivity?", answer: "Sometimes, typically 24 to 72 hours. We can adjust the plan for sensitive teeth." },
          { question: "Does it work on crowns or fillings?", answer: "No. Whitening only changes natural enamel. We’ll plan shade matching if you have restorations." },
          {
            question: "In-office vs. take-home trays?",
            answer: "In-office provides fastest results in one visit; custom take-home trays let you whiten gradually at home. We’ll recommend the right option for your goals.",
          },
        ],
      },
      { _type: "sharedBlock", kind: "testimonials" },
    ],
    seo: {
      title: "Teeth Whitening in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "Coffee, tea, wine, smoking, and everyday habits can gradually stain teeth over time. At Smiles By Jiveh, we offer professional whitening solutions to…",
    },
  },
  {
    slug: "dental-veneers",
    title: "Dental Veneers",
    category: "cosmetic",
    order: 13,
    hero: {
      eyebrow: "Dental Veneers",
      heading: "Beautiful Smiles. Thoughtfully Designed. Conservatively Crafted.",
      text: rich(
        "Porcelain veneers are one of the signature treatments at Smiles By Jiveh. Whether enhancing a single tooth or creating a complete smile makeover, Dr. Farokh Jiveh combines artistic smile design with advanced cosmetic dentistry to create results that are natural, healthy, and designed to last.",
        "One of our specialties is offering both traditional porcelain veneers and No-Prep veneers, allowing treatment to be customized to each patient’s smile, facial features, bite, and long-term goals.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.compare1, images.compare2, images.compare3, images.compare4],
      mobileImages: [images.veneersMobile2, images.veneersMobile1, images.veneersMobile3, images.veneersMobile4],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "What Are Dental Veneers?",
            body: rich(
              "Dental veneers are ultra-thin, custom-crafted porcelain restorations that are bonded to the front surfaces of the teeth to improve their color, shape, size, symmetry, and overall appearance. Veneers are one of the most effective cosmetic dentistry treatments for creating a naturally beautiful smile while maintaining excellent function and long-term oral health.",
              "Each veneer is individually designed to complement your facial features, smile, and personality, creating results that look refined, balanced, and never artificial.",
            ),
          },
          {
            heading: "Traditional Porcelain Veneers",
            body: rich(
              "Traditional porcelain veneers are ideal when teeth require reshaping, correcting existing restorations, improving alignment, or making more significant cosmetic changes. A small amount of enamel is carefully refined to create the ideal foundation for the porcelain veneer, allowing exceptional aesthetics, strength, and long-term stability.",
              "This approach provides remarkable flexibility for patients seeking dramatic smile transformations while maintaining a natural appearance.",
            ),
          },
          {
            heading: "No-Prep Veneers",
            body: rich(
              "No-Prep veneers are one of Dr. Jiveh’s areas of expertise and represent one of the most conservative approaches to cosmetic dentistry.",
              "For carefully selected patients, these ultra-thin porcelain veneers can often be placed without preparing the natural teeth, preserving their original structure while enhancing color, shape, proportion, and symmetry.",
              "Not every patient is a candidate for No-Prep veneers, but when appropriate, they offer an elegant, minimally invasive solution that beautifully enhances the smile while maintaining the integrity of the natural teeth.",
            ),
          },
          {
            heading: "What Can Veneers Correct?",
            body: rich(
              "Porcelain veneers can beautifully correct many cosmetic concerns, including:",
              "- Chipped or worn teeth",
              "- Discolored or stained teeth",
              "- Small spaces between teeth",
              "- Uneven or misshapen teeth",
              "- Minor crowding or irregular alignment",
              "- Teeth affected by enamel wear",
              "- Smile symmetry and overall facial harmony",
              "Whether you need one veneer or a complete smile makeover, every treatment plan is customized to achieve results that are healthy, functional, and naturally beautiful.",
            ),
          },
        ],
      },
      {
        _type: "splitBlock",
        heading: "Why Choose Smiles By Jiveh for Veneers?",
        text: rich(
          "Creating exceptional veneers requires far more than placing porcelain.",
          "With more than 25 years of experience in cosmetic and restorative dentistry, Dr. Farokh Jiveh has spent over 15 years teaching advanced cosmetic techniques to fellow dentists as the Clinical and Course Director at Palm Beach Dental Academy.",
          "Every veneer case begins with careful smile analysis, facial evaluation, bite assessment, and comprehensive treatment planning. By offering both traditional porcelain veneers and No-Prep veneers, we are able to recommend the most conservative and appropriate treatment for each individual patient rather than relying on a single approach.",
          "Our philosophy is simple: preserve whenever possible, personalize always, and create smiles that remain beautiful for years to come.",
        ),
        image: images.baPortraitCurly,
      },
      { _type: "sharedBlock", kind: "process" },
      {
        _type: "faqBlock",
        eyebrow: "Common Questions",
        heading: "Frequently Asked Questions",
        items: [
          { question: "How long do veneers last?", answer: "Quality porcelain veneers typically last 10–15 years or longer with proper care." },
          {
            question: "Will my veneers look natural?",
            answer: "Yes. We custom-craft each veneer to match the size, shape, and color of your natural teeth for a seamless result.",
          },
          {
            question: "How many visits does the process take?",
            answer: "Most veneer cases are completed in two visits — one for preparation and impressions, another to bond the finished veneers.",
          },
          { question: "Will the procedure hurt?", answer: "With local anesthetic, the process is very comfortable. Mild sensitivity for a few days afterward is normal." },
          { question: "How do I take care of veneers?", answer: "Brush and floss normally, keep up with regular cleanings, and avoid biting hard items like ice or pen tips." },
        ],
      },
    ],
    seo: {
      title: "Dental Veneers in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "Porcelain veneers are one of the signature treatments at Smiles By Jiveh. Whether enhancing a single tooth or creating a complete smile makeover, Dr.…",
    },
  },
  {
    slug: "smile-makeovers",
    title: "Smile Makeovers",
    category: "cosmetic",
    order: 14,
    hero: {
      heading: "We Can Design Your New Beautiful Smile",
      text: rich(
        "Every smile is unique, which is why we offer a full range of cosmetic dentistry solutions designed specifically for you. Your smile enhancement may be as simple as gentle tooth contouring and reshaping, professional teeth whitening, or cosmetic bonding. For patients seeking a more dramatic transformation, we also provide porcelain veneers, complete smile makeovers, and full mouth reconstruction.",
        "Dr. Jiveh combines artistic vision with advanced digital technology to create a smile that complements your facial features, personality, and goals. Using state of the art digital smile design, photography, and advanced imaging, you can preview your potential new smile before treatment even begins. Every detail is carefully customized to ensure your final result looks natural, functions beautifully, and gives you the confidence to smile for years to come.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.smileMakeoverHero],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "A Fully Customized Smile Designed Around You",
            body: rich(
              "No two smiles are alike, and neither are the people behind them. Every smile makeover begins with a comprehensive facial aesthetic evaluation, where Dr. Jiveh carefully considers the shape of your face, your smile line, lip position, facial proportions, personality, and cosmetic goals. Rather than creating a one size fits all smile, every detail is thoughtfully designed to complement your natural features and enhance your overall appearance.",
              "Your treatment may be as conservative as tooth reshaping, cosmetic bonding, or professional teeth whitening, or it may include advanced smile enhancement with beautifully crafted composite resin restorations or porcelain veneers. As an expert in minimally invasive cosmetic dentistry, Dr. Jiveh combines artistic vision with state of the art materials and techniques to create smiles that are natural, balanced, and uniquely yours.",
              "The result is a smile that not only looks beautiful but also feels authentic, functions comfortably, and reflects the very best version of you.",
            ),
          },
          {
            heading: "What Will My New Smile Look Like?",
            body: rich(
              "Some call it Digital Smile Design. One of the most exciting parts of your smile makeover is that you can preview your new smile before treatment even begins. Using advanced digital photography, facial analysis, and smile design technology, Dr. Jiveh creates a customized digital preview that shows how your new smile can complement your facial features and enhance your overall appearance.",
              "This digital design becomes the blueprint for your smile transformation. It allows you to provide feedback, make refinements, and feel confident in the direction of your treatment before any porcelain veneers, composite bonding, or restorations are created.",
              "Once your design is finalized, we partner with one of the nation’s premier cosmetic dental laboratories to meticulously handcraft your new smile. Every restoration is fabricated to closely match the approved digital design, combining artistic craftsmanship with exceptional precision to create a smile that looks natural, feels comfortable, and is uniquely yours.",
            ),
          },
          {
            heading: "What’s Included in Your Smile Makeover?",
            body: rich(
              "A smile makeover is never a one size fits all treatment. Every smile is carefully customized to your goals, oral health, and facial aesthetics. Depending on your needs, your treatment may include simple tooth contouring and reshaping, professional teeth whitening, clear aligner therapy such as Invisalign, cosmetic bonding, porcelain veneers, dental implants, or even a complete full mouth reconstruction.",
              "At our practice, every smile makeover begins with one important principle: beautiful smiles must also function beautifully. While creating a stunning smile is our goal, we believe that long lasting results begin with a healthy bite and proper function. By carefully evaluating how your teeth fit together, your jaw movements, and your overall oral health, Dr. Jiveh designs a smile that is not only naturally beautiful but also comfortable, durable, and built to last.",
              "Whether your treatment involves one procedure or several, every detail is thoughtfully planned to create a smile that enhances your appearance, restores confidence, and provides lasting health and function for many years to come.",
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
          {
            question: "What is Digital Smile Design?",
            answer: "DSD uses digital photos and computer imaging to design your ideal smile. You can preview the result before any treatment begins.",
          },
          {
            question: "How long does a smile makeover take?",
            answer: "Many of our smile design procedures can be completed in just one appointment, while others may require a few visits over a few weeks.",
          },
          {
            question: "What does a smile makeover include?",
            answer: "Treatments may include porcelain crowns, Invisalign, veneers, dental bonding, implants, whitening, or any combination tailored to your goals.",
          },
          {
            question: "Will I see what my new smile looks like before treatment?",
            answer: "Yes. With DSD plus a wax mold, you get both a digital preview and a physical representation of your future smile.",
          },
          {
            question: "Do you offer a free consultation?",
            answer:
              "Yes. Your Complimentary Cosmetic & Restorative Dentistry Consultation includes meeting our team, an explanation of our process, and answers to your questions.",
          },
        ],
      },
      { _type: "sharedBlock", kind: "testimonials" },
    ],
    seo: {
      title: "Smile Makeovers in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "Every smile is unique, which is why we offer a full range of cosmetic dentistry solutions designed specifically for you. Your smile enhancement may be as…",
    },
  },
  {
    slug: "invisalign",
    title: "Invisalign",
    category: "cosmetic",
    order: 15,
    hero: {
      eyebrow: "Invisalign",
      heading: "Straighten Your Smile Comfortably & Discreetly with Invisalign®",
      text: rich(
        "Invisalign® offers a modern, discreet way to straighten your teeth without the appearance of traditional braces. Using a series of custom-crafted clear aligners, Invisalign gently moves your teeth into healthier alignment while fitting comfortably and seamlessly into your everyday life.",
        "Dr. Jiveh carefully designs every Invisalign treatment plan with a comprehensive approach focused not only on aesthetics, but also on bite function, comfort, balance, and long-term oral health, creating smiles that feel as beautiful as they look.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.invisalignHero],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "The Clear, Comfortable Alternative to Traditional Braces",
            body: rich(
              "Dr. Jiveh uses Invisalign® to help patients achieve healthier, more beautifully aligned smiles with comfort, discretion, and minimal interruption to everyday life. Unlike traditional braces, Invisalign uses virtually invisible custom aligners that fit comfortably and can be removed for eating, brushing, flossing, and important social or professional moments.",
            ),
          },
          {
            heading: "The Benefits of Invisalign®",
            body: rich(
              "Invisalign offers a more comfortable and aesthetic orthodontic experience without metal wires or brackets. Because the aligners are removable, patients can continue enjoying their normal lifestyle while maintaining better oral hygiene throughout treatment. Invisalign can improve smile aesthetics, bite function, crowding, spacing, and overall long-term dental health in a more discreet and convenient way.",
            ),
          },
          {
            heading: "Invisalign® for Children, Teens & Adults",
            body: rich(
              "Invisalign treatment can be customized for patients of all ages. Invisalign First® helps guide proper growth and development in children while creating a healthier foundation for the future smile. Invisalign Teen® allows teenagers to straighten their teeth comfortably and confidently without affecting sports, school, or social activities. For adults, Invisalign provides a sophisticated and discreet option for improving smile alignment at any stage of life.",
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
          { question: "How long does Invisalign treatment take?", answer: "Most adult treatments take 12–18 months, though simpler cases can finish in as little as 6 months." },
          { question: "Are Invisalign aligners really invisible?", answer: "They’re very nearly so — clear plastic that hugs your teeth makes them hard to spot, even up close." },
          {
            question: "Can I eat with Invisalign?",
            answer: "You remove your aligners to eat, drink anything other than water, brush, and floss — so there are no food restrictions.",
          },
          {
            question: "How often do I need to wear my aligners?",
            answer: "For best results, wear them 20–22 hours a day, switching to a new set every 1–2 weeks per Dr. Jiveh’s plan.",
          },
          {
            question: "Is Invisalign suitable for teens and kids?",
            answer: "Yes. Invisalign Teen and Invisalign First are designed specifically for younger patients and growing smiles.",
          },
        ],
      },
    ],
    seo: {
      title: "Invisalign in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "Invisalign® offers a modern, discreet way to straighten your teeth without the appearance of traditional braces. Using a series of custom-crafted clear…",
    },
  },
  {
    slug: "clear-aligners",
    title: "Clear Aligners",
    category: "cosmetic",
    order: 16,
    hero: {
      eyebrow: "Clear Aligners",
      heading: "Comfortable, Nearly Invisible Orthodontic Treatment",
      text: rich(
        "At Smiles By Jiveh, SimplyClear® offers a modern, comfortable way to straighten your teeth without the appearance or inconvenience of traditional braces. Using custom-crafted clear aligners, treatment is designed to fit seamlessly into your lifestyle while improving the health, balance, and aesthetics of your smile. This is an alternative choice to Invisalign.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.serviceAlignment],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "What Are the Benefits of SimplyClear®?",
            body: rich(
              "SimplyClear aligners are removable, comfortable, and virtually invisible, allowing patients to straighten their teeth with minimal interruption to everyday life. Without metal brackets or wires, patients can continue eating the foods they enjoy while maintaining normal brushing and flossing routines throughout treatment.",
            ),
          },
          {
            heading: "How Do Clear Aligners Work?",
            body: rich(
              "Each set of aligners is designed to make small changes to the alignment of your teeth. As you switch sets every couple of weeks, your teeth gradually and gently move to their proper positions. Regular check-ins with our office ensure your smile is progressing as planned.",
            ),
          },
          {
            heading: "What Issues Can Clear Aligners Fix?",
            body: rich(
              "Clear aligners can treat the same issues normally addressed with braces, including crowded teeth, crooked teeth, gapped or spaced teeth, and certain bite problems like overbite, open bite, underbite, or crossbite.",
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
          {
            question: "Are clear aligners painful?",
            answer: "Mild pressure is normal for a day or two after switching to a new set — most patients describe it as a tight feeling, not pain.",
          },
          { question: "How long do I wear each set of aligners?", answer: "Typically you switch sets every 1–2 weeks, wearing each set 20+ hours a day for best results." },
          {
            question: "Can I eat and drink with my aligners in?",
            answer: "Remove them before eating or drinking anything besides water. This protects the aligners and keeps your teeth healthy.",
          },
          {
            question: "How is treatment monitored?",
            answer: "You’ll visit our office on a regular basis during treatment so we can confirm your smile is progressing as planned.",
          },
          {
            question: "Are clear aligners the same as Invisalign?",
            answer: "Invisalign is one well-known brand of clear aligners. We’ll recommend the best option for your specific case at your consultation.",
          },
        ],
      },
    ],
    seo: {
      title: "Clear Aligners in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "At Smiles By Jiveh, SimplyClear® offers a modern, comfortable way to straighten your teeth without the appearance or inconvenience of traditional braces.…",
    },
  },
  {
    slug: "reconstructive-dentistry",
    title: "Reconstructive Dentistry",
    category: "restorative",
    order: 17,
    hero: {
      eyebrow: "Reconstructive Dentistry",
      heading: "Comprehensive Full Mouth Rehabilitation Designed to Restore Health, Function & Confidence",
      text: rich(
        "For patients with severely worn, broken, collapsing, or failing dentition, full mouth reconstruction can be one of the most life-changing treatments in modern dentistry. Years of grinding, acid erosion, fractured teeth, missing teeth, bite collapse, periodontal disease, and failing dentistry can dramatically affect not only the smile but also comfort, chewing ability, TMJ health, facial support, speech, confidence, and overall quality of life.",
        "At Smiles By Jiveh, Dr. Farokh Jiveh focuses extensively on comprehensive reconstructive dentistry and full mouth rehabilitation. Through advanced diagnostics, digital planning, bite analysis, airway evaluation, periodontal therapy, implant dentistry, and highly aesthetic restorative techniques, treatment is carefully designed to rebuild the smile in a healthy, stable, and functional way while preserving as much natural structure as possible.",
        "Dr. Jiveh is also actively involved in teaching and mentoring other dentists in the principles of comprehensive smile reconstruction, occlusion, and restorative treatment planning through his educational programs and advanced cosmetic dentistry training. His philosophy centers around creating restorations that are not only beautiful but also biologically healthy, structurally stable, and designed for long-term success.",
        "For many patients suffering from worn dentition or years of dental breakdown, reconstructive dentistry offers far more than a cosmetic improvement alone — it can restore comfort, confidence, function, facial support, and an entirely renewed quality of life.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.baSmileStack],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "Full Mouth Reconstruction & Worn Teeth Rehabilitation",
            body: rich(
              "For patients suffering from severely worn, broken, failing, or collapsing teeth, full mouth reconstruction can completely restore comfort, function, aesthetics, and quality of life. Through a comprehensive and highly methodical approach, worn dentition can often be rebuilt in a way that recreates a healthy bite, restores proper function, protects the teeth from further breakdown, and brings back a confident, natural-looking smile.",
              "Dr. Farokh Jiveh has spent more than 20 years focusing extensively on full mouth rehabilitation and worn dentition treatment. His philosophy centers around carefully rebuilding the smile in a precise, systematic, and conservative manner using advanced diagnostics, bite analysis, digital planning, and comprehensive restorative techniques. Dr. Jiveh also teaches these principles in his educational programs, mentoring other dentists on how to properly diagnose, prepare, and restore complex reconstructive cases.",
            ),
          },
          {
            heading: "What Does Reconstructive Dentistry Include?",
            body: rich(
              "Reconstructive dentistry may include a combination of crowns, veneers, implants, bridges, periodontal therapy, bite rehabilitation, TMJ therapy, and full mouth restoration techniques working together to restore the health, stability, structure, and appearance of the smile. Every treatment plan is highly individualized and designed around long-term function, comfort, aesthetics, and overall oral wellness.",
            ),
          },
          {
            heading: "Comprehensive Care Designed for Long-Term Success",
            body: rich(
              "At Smiles By Jiveh, full mouth rehabilitation is approached with extensive planning, communication, and attention to detail at every step. Our goal is not simply to improve appearance alone, but to create stable, healthy, functional dentistry that patients can feel confident in for years to come. Through comprehensive examinations, advanced technology, and relationship-driven care, we strive to provide an elevated experience focused on long-term success and patient satisfaction.",
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
          {
            question: "What is reconstructive dentistry?",
            answer:
              "Reconstructive dentistry rebuilds and restores damaged, worn, or missing teeth using a combination of treatments such as implants, crowns, bridges, and veneers.",
          },
          {
            question: "How is it different from cosmetic dentistry?",
            answer:
              "Cosmetic dentistry focuses on the appearance of your smile, while reconstructive dentistry addresses function, structure, and health — often with cosmetic benefits as well.",
          },
          {
            question: "How long does treatment take?",
            answer: "Treatment plans vary. Simple cases may finish in a few visits; full-mouth reconstruction often takes several months to a year.",
          },
          {
            question: "Will I need multiple procedures?",
            answer: "Most patients benefit from a combination of treatments — we’ll outline a personalized plan at your consultation.",
          },
          {
            question: "Do you offer a satisfaction guarantee?",
            answer: "Yes — all our treatments are backed by our Satisfaction Guarantee when you follow aftercare recommendations.",
          },
        ],
      },
    ],
    seo: {
      title: "Reconstructive Dentist in Royal Palm Beach - Smiles By Jiveh",
      description: "For patients with severely worn, broken, collapsing, or failing dentition, full mouth reconstruction can be one of the most life-changing treatments in…",
    },
  },
  {
    slug: "dental-implants",
    title: "Dental Implants",
    category: "restorative",
    order: 18,
    hero: {
      eyebrow: "Dental Implants",
      heading: "Advanced Implant Dentistry for Long-Term Function, Health & Confidence",
      text: rich(
        "Dental implants are the gold standard for replacing missing teeth, restoring function, comfort, aesthetics, and confidence while preserving long-term oral health. At Smiles By Jiveh, Dr. Farokh Jiveh uses advanced CBCT imaging, digital scanning, and guided surgical technology for precise, minimally invasive implant treatment. Complex cases are managed collaboratively with experienced specialists for seamless, personalized care.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.implantModel],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "Permanent, Natural Looking Tooth Replacement Designed for Long-Term Health & Confidence",
            body: rich(
              "Dental implants are considered the gold standard for replacing missing teeth because they are designed to look, feel, and function as closely as possible to natural teeth. Whether replacing a single tooth, multiple teeth, or supporting a full arch restoration, implants provide a stable, long-term solution that restores confidence, comfort, aesthetics, and oral function.",
            ),
          },
          {
            heading: "What Is a Dental Implant?",
            body: rich(
              "A dental implant is a small titanium replacement root that is precisely placed into the jawbone to support a natural looking restoration above the gums. Through the combination of CBCT three dimensional imaging, advanced digital scanning, and computerized guided implant technology, treatment can now be planned with exceptional precision for improved comfort, accuracy, and long-term predictability. Once healing is complete, a custom restoration is created to blend beautifully with your natural smile.",
            ),
          },
          {
            heading: "The Benefits of Dental Implants",
            body: rich(
              "Dental implants provide one of the most stable and comfortable tooth replacement options available in modern dentistry. Unlike removable appliances, implants are fixed securely in place and allow patients to eat, smile, brush, and floss with confidence while helping preserve bone and surrounding teeth. Dr. Farokh Jiveh also works closely with experienced implant specialists within the practice for more advanced or complex cases, ensuring every patient receives highly personalized and comprehensive care with the highest level of precision and comfort possible.",
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
          { question: "How long do dental implants last?", answer: "With good oral hygiene and regular checkups, dental implants can last a lifetime." },
          {
            question: "Is the implant procedure painful?",
            answer: "Most patients describe the procedure as comparable to a simple extraction. Anesthesia and sedation keep you comfortable.",
          },
          {
            question: "How long does the full process take?",
            answer: "From placement to final crown is typically 3–6 months while the implant fuses to the jawbone, though All-on-4 can deliver new teeth in a day.",
          },
          {
            question: "Am I a candidate for dental implants?",
            answer: "Most adults with good oral health and sufficient jawbone are candidates. If bone has been lost, grafting can often restore enough support.",
          },
          {
            question: "Implants vs bridges or dentures?",
            answer:
              "Implants are typically the most permanent, natural-feeling option and don’t rely on neighboring teeth for support. We’ll review the right choice at your consultation.",
          },
        ],
      },
    ],
    seo: {
      title: "Dental Implants in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "Dental implants are the gold standard for replacing missing teeth, restoring function, comfort, aesthetics, and confidence while preserving long-term oral…",
    },
  },
  {
    slug: "all-on-x-full-arch-restoration",
    title: "All on X Full Arch Restoration",
    category: "restorative",
    order: 19,
    hero: {
      eyebrow: "All-on-X Full Arch Implant Dentistry",
      heading: "A Life-Changing Smile. A Second Chance. Often in Just One Day.",
      text: rich(
        "For patients living with failing, broken, severely worn, or hopeless teeth, All-on-X Full Arch Implant Dentistry offers an opportunity to completely transform their smile, and their life. Using strategically placed dental implants, an entire upper or lower arch of teeth can often be replaced with a beautiful, fixed set of natural-looking teeth in as little as one day.",
        "At Smiles By Jiveh, Dr. Farokh Jiveh combines advanced digital imaging, CBCT 3D technology, virtual treatment planning, and close collaboration with experienced implant surgeons and master dental laboratories to create smiles that are healthy, functional, beautiful, and built to last.",
        "For many patients, All-on-X isn’t simply replacing teeth, it’s reclaiming their confidence, restoring their ability to eat comfortably, smile freely, and enjoy life again.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.baAllOnXWoman, images.baAllOnXMan],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "A Life-Changing Way to Restore Your Smile, Health & Confidence",
            body: rich(
              "Many patients spend years living with failing dental work, advanced gum disease, broken teeth, chronic infections, missing teeth, or dentures that no longer fit comfortably. Others have simply delayed treatment because they felt embarrassed, overwhelmed, or believed there were no good solutions.",
              "All-on-X Full Arch Implant Dentistry gives these patients a second chance.",
              "Instead of continuing to repair teeth with a poor long-term prognosis, hopeless teeth can be gently removed and replaced with a fixed, full-arch implant restoration designed to look, feel, and function like natural teeth. For many patients, a brand-new smile can be delivered the same day or within 24 hours.",
              "Beyond creating a beautiful smile, treatment restores chewing ability, speech, facial support, comfort, and self-confidence—often creating one of the most rewarding transformations in modern dentistry.",
            ),
          },
          {
            heading: "What Is All-on-X Full Arch Treatment?",
            body: rich(
              "All-on-X is an advanced form of implant dentistry that replaces an entire upper or lower arch using a carefully planned number of dental implants to support a permanently fixed prosthesis.",
              "Rather than replacing teeth one at a time, strategically positioned implants provide exceptional stability while supporting a full arch of custom-designed teeth that are crafted to complement your facial features, smile, and bite. Every case is meticulously planned using:",
              "- CBCT 3D imaging",
              "- Digital intraoral scanning",
              "- Virtual implant planning",
              "- Guided surgical technology",
              "- Advanced smile design",
              "- Precision laboratory",
              "**fabrication**",
              "This comprehensive planning creates highly predictable, long-lasting, and natural-looking results.",
            ),
          },
          {
            heading: "What Are the Benefits of All-on-X?",
            body: rich(
              "All-on-X Full Arch Implant Dentistry can dramatically improve nearly every aspect of a patient’s daily life by allowing them to:",
              "- Eat comfortably again without loose dentures",
              "- Smile confidently in social and professional settings",
              "- Speak naturally and clearly",
              "- Restore youthful facial support",
              "- Eliminate failing, infected, or hopeless teeth",
              "- Improve comfort, function, and overall quality of life",
              "- Enjoy a fixed, permanent solution designed for long-term success",
              "Patients frequently tell us the transformation goes far beyond their smile. They describe feeling healthier, more confident, younger, and finally able to enjoy life without constantly thinking about their teeth.",
              "At Smiles By Jiveh, our philosophy is simple: we don’t just replace teeth—we restore lives.",
              "Through advanced implant dentistry, comprehensive planning, and highly personalized care, we help patients overcome years of neglect, dental disease, or failing dentistry with a healthy, functional smile they can be proud of for years to come.",
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
          {
            question: "Can the entire procedure really be done in one day?",
            answer: "Yes. We place 4 implants and attach a full set of permanent teeth in a single visit, so you leave with a complete smile.",
          },
          { question: "How long do All-on-4 implants last?", answer: "With proper care and regular checkups, All-on-4 implants can last a lifetime." },
          {
            question: "Is the procedure painful?",
            answer: "Anesthesia and sedation keep you comfortable. Most patients report only mild discomfort during recovery, easily managed with medication.",
          },
          {
            question: "How do I care for All-on-4 teeth?",
            answer: "Brush and floss as you would natural teeth — no removal or soaking required. Regular dental cleanings keep everything healthy.",
          },
          {
            question: "Am I a candidate for All-on-4?",
            answer: "Most adults missing many teeth or with failing teeth are candidates. We’ll evaluate your jawbone and overall health at your consultation.",
          },
        ],
      },
    ],
    seo: {
      title: "All-on-X Implants in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "For patients living with failing, broken, severely worn, or hopeless teeth, All-on-X Full Arch Implant Dentistry offers an opportunity to completely…",
    },
  },
  {
    slug: "dental-crowns",
    title: "Dental Crowns",
    category: "restorative",
    order: 20,
    hero: {
      eyebrow: "Dental Crowns",
      heading: "Custom Dental Crowns Designed to Restore & Protect",
      text: rich(
        "Dr. Jiveh believes in preserving healthy, natural tooth structure whenever possible. However, in situations where a tooth has a very large failing filling, recurrent decay, structural fractures, leaking restorations, or a damaged existing crown, a custom dental crown may become necessary to properly strengthen and protect the tooth for long-term stability.",
        "A dental crown is a custom-crafted porcelain restoration designed to restore the shape, strength, function, and aesthetics of a compromised tooth while helping prevent further breakdown. Every restoration at Smiles By Jiveh is thoughtfully designed using high-quality materials selected for their beauty, durability, precision, and long-term performance — creating results that feel natural, refined, and lasting.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.crownsHero],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "A Conservative Approach to Restoring & Protecting Your Teeth",
            body: rich(
              "At Smiles By Jiveh, our philosophy is always centered on preserving as much healthy, natural tooth structure as possible. However, when a tooth has significant decay, fractures, failing restorations, or structural weakness, a custom porcelain crown may become the most predictable and long-lasting solution to properly protect and restore the tooth.",
              "Using advanced digital technology and high-quality ceramic materials, Dr. Farokh Jiveh carefully prepares the tooth, designs a custom restoration, and places temporary protection while your final crown is meticulously crafted. Today’s porcelain crowns are exceptionally strong, natural-looking, and virtually indistinguishable from healthy natural teeth.",
            ),
          },
          {
            heading: "What Is a Dental Crown?",
            body: rich(
              "A dental crown is a custom porcelain restoration designed to fully cover and protect a weakened or compromised tooth. By restoring the tooth’s shape, strength, function, and aesthetics, a crown acts as a protective outer layer that helps prevent further fracture or breakdown while preserving the integrity of the remaining tooth structure.",
            ),
          },
          {
            heading: "The Benefits of Modern Porcelain Crowns",
            body: rich(
              "Dental crowns are often recommended for teeth with large failing fillings, fractures, recurrent decay, root canal treatment, or significant structural damage that cannot be predictably restored with a more conservative restoration alone. In many cases, a crown provides the strongest and most long-term solution for restoring comfort, function, durability, and aesthetics — allowing the tooth to look, feel, and function naturally once again.",
            ),
          },
        ],
      },
      { _type: "sharedBlock", kind: "whyChooseUs" },
      { _type: "sharedBlock", kind: "process" },
    ],
    seo: {
      title: "Dental Crowns in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "Dr. Jiveh believes in preserving healthy, natural tooth structure whenever possible. However, in situations where a tooth has a very large failing…",
    },
  },
  {
    slug: "dental-bridges",
    title: "Dental Bridges",
    category: "restorative",
    order: 21,
    hero: {
      eyebrow: "Dental Bridges",
      heading: "We Can Close the Gap & Restore Your Beautiful Smile",
      text: rich(
        "Restore your smile with a solution designed to improve function, appearance, and confidence. At Smiles By Jiveh, we carefully evaluate every patient to determine whether a dental bridge or a dental implant is the healthiest long-term solution.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.bridgesHero],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "A natural-looking way to bridge the gap and restore confidence",
            body: rich(
              "If you have a missing tooth, our expert dentist and team at Smiles By Jiveh can close the gap with a dental bridge that blends seamlessly with your natural smile.",
            ),
          },
          {
            heading: "What Is a Dental Bridge?",
            body: rich(
              "Sometimes called a “fixed partial denture,” a bridge replaces missing teeth with artificial teeth and “bridges” the gap where one or more teeth used to be. Bridges are made from gold, alloys, porcelain — or a combination of materials — to match your natural teeth. A fixed bridge is attached to surrounding teeth for support and can only be removed by a dentist. A traditional bridge replaces one or more teeth with solid, stable dental crowns, and we can even attach your bridge to dental implants.",
            ),
          },
          {
            heading: "What Are the Benefits of Dental Bridges?",
            body: rich(
              "A bridge restores normal biting and chewing, prevents bone loss and tooth shifting, recovers your facial structure, and looks just like a natural crown or implant — restoring both function and confidence for the long term.",
            ),
          },
        ],
      },
      { _type: "sharedBlock", kind: "whyChooseUs" },
      { _type: "sharedBlock", kind: "process" },
      {
        _type: "faqBlock",
        eyebrow: "Common Questions",
        heading: "Frequently Asked Questions About Dental Bridges",
        items: [
          {
            question: "What is a dental bridge?",
            answer:
              "A dental bridge is a fixed restoration used to replace one or more missing teeth by attaching an artificial tooth to the natural teeth on either side of the space. A bridge restores your ability to chew comfortably, improves aesthetics, helps maintain proper bite alignment, and prevents neighboring teeth from shifting into the empty space.",
          },
          {
            question: "Are dental bridges still the best option?",
            answer:
              "Dental bridges remain an excellent treatment in carefully selected situations. However, with today’s advancements in dental implant technology, bridges are recommended less frequently than in the past. Unlike a traditional bridge, which typically requires preparing the healthy teeth on either side of the missing tooth, a dental implant replaces the missing tooth independently and helps preserve surrounding bone and adjacent teeth. We always recommend the treatment that offers the healthiest, most conservative, and longest-lasting outcome for each patient.",
          },
          {
            question: "How do I know whether I need a bridge or a dental implant?",
            answer:
              "Every smile is unique. During your consultation, Dr. Jiveh will evaluate your oral health, bone support, neighboring teeth, bite, medical history, and long-term goals before recommending treatment. There is no one-size-fits-all solution, only the treatment that is right for you.",
          },
        ],
      },
    ],
    seo: {
      title: "Dental Bridges in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "Restore your smile with a solution designed to improve function, appearance, and confidence. At Smiles By Jiveh, we carefully evaluate every patient to…",
    },
  },
  {
    slug: "dentures",
    title: "Dentures",
    category: "restorative",
    order: 22,
    hero: {
      eyebrow: "Dentures",
      heading: "Dentures: A Practical, Lasting Solution to Replace Missing Teeth",
      text: rich(
        "For patients who do not qualify for dental implants, dentures are the next best thing! At Smiles By Jiveh, our top priority is helping every patient achieve their healthiest, most confident smile. For patients missing teeth, beautifully designed dentures can restore comfort, function, and appearance, helping you smile confidently again while making it easier to eat, speak, and enjoy daily life.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.denturesHero],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "Dentures — A Personalized Solution for Restoring Your Smile & Quality of Life",
            body: rich(
              "Our goal is always to help patients restore confidence, comfort, function, and quality of life through personalized, thoughtful care. While modern dental implants have transformed the way we replace missing teeth and, in many cases, have reduced the need for traditional dentures, not every patient is an ideal candidate for implant treatment due to anatomical, medical, financial, or personal considerations.",
              "For these patients, beautifully crafted dentures can still provide an effective, comfortable, and life-enhancing solution for restoring the smile and improving everyday function. Modern dentures are designed with greater precision, aesthetics, and comfort than ever before — helping patients eat, speak, and smile with renewed confidence.",
            ),
          },
          {
            heading: "What Are Dentures?",
            body: rich(
              "Dentures are custom-designed removable restorations created to replace missing teeth and surrounding oral structures. Depending on your individual needs, dentures may replace a few missing teeth or a full arch while restoring facial support, oral function, and overall aesthetics.",
              "At Smiles By Jiveh, every denture is carefully designed with attention to fit, comfort, function, and natural appearance, allowing patients to achieve a smile that feels both functional and aesthetically refined.",
            ),
          },
          {
            heading: "The Benefits of Modern Dentures",
            body: rich(
              "For patients who are not candidates for implant treatment, dentures can provide a highly practical and predictable way to restore everyday comfort and confidence. Modern dentures help improve chewing ability, speech, facial support, and overall smile aesthetics while enhancing quality of life and social confidence.",
              "Dr. Farokh Jiveh takes a personalized, comprehensive approach to every restorative case, helping patients understand all available options and guiding them toward the solution best suited for their health, lifestyle, and long-term goals.",
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
          {
            question: "How long does it take to get used to new dentures?",
            answer: "Most patients adapt within a few weeks. Eating soft foods at first and practicing speaking helps speed up the adjustment.",
          },
          {
            question: "How do I care for my dentures?",
            answer: "Rinse after meals, brush daily with a denture brush and non-abrasive cleaner, and soak them overnight in a denture solution.",
          },
          {
            question: "Will dentures change how I look?",
            answer:
              "Today’s dentures are designed to closely resemble natural teeth and support your facial structure, so most patients look like themselves — only with a complete smile.",
          },
          {
            question: "Can I eat normally with dentures?",
            answer: "Yes. Start with softer foods and cut things into smaller pieces as you adjust. Most patients eventually eat most of the foods they enjoyed before.",
          },
          {
            question: "How long do dentures last?",
            answer: "Most dentures last 5 to 10 years before they need adjustment or replacement, since your mouth changes shape over time.",
          },
        ],
      },
    ],
    seo: {
      title: "Dentures in Royal Palm Beach, FL - Smiles By Jiveh",
      description: "For patients who do not qualify for dental implants, dentures are the next best thing! At Smiles By Jiveh, our top priority is helping every patient…",
    },
  },
  {
    slug: "full-mouth-reconstruction",
    title: "Full Mouth Reconstruction",
    category: "restorative",
    order: 23,
    hero: {
      eyebrow: "Full Mouth Reconstruction",
      heading: "Rebuilding Health, Function & Confidence",
      text: rich(
        "When teeth become worn, broken, failing, or missing, everyday activities like eating, smiling, and speaking can become frustrating. Full mouth reconstruction is designed to restore your entire smile, not just individual teeth, so you can regain comfort, function, confidence, and long-term oral health.",
        "At Smiles By Jiveh, Dr. Farokh Jiveh combines advanced diagnostics, digital technology, comprehensive bite analysis, and aesthetic smile design to rebuild your smile in a healthy, predictable, and conservative way. With more than 20 years of experience in complex restorative dentistry, every treatment plan is customized to create results that are beautiful, functional, and built to last.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.baFullMouthGrid, images.baPortrait, images.baFrontTeeth],
    },
    blocks: [
      { _type: "sharedBlock", kind: "process" },
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "A Comprehensive, Methodical Approach to Rebuilding Your Smile",
            body: rich(
              "Full mouth reconstruction is about much more than replacing damaged teeth. It begins by identifying why the teeth have broken down in the first place. Years of grinding, clenching, acid erosion, missing teeth, periodontal disease, trauma, or an unstable bite can gradually lead to worn teeth, fractured restorations, jaw discomfort, and loss of function.",
              "Before any treatment begins, Dr. Jiveh performs a comprehensive evaluation of your teeth, gums, bite, jaw joints, airway, and facial support. By understanding the complete picture, we can create a treatment plan that restores not only your smile, but also the health and stability of your entire bite.",
            ),
          },
          {
            heading: "What’s Our Process?",
            body: rich(
              "Every reconstruction begins with careful planning.",
              "Using digital scans, photography, CBCT imaging, bite analysis, and detailed records, Dr. Jiveh studies your smile from every angle before treatment begins. Diagnostic smile designs and laboratory mock-ups are often created so you can preview your future smile and ensure that aesthetics, function, and comfort are carefully planned before any final restorations are made.",
              "Because every patient is unique, treatment is often completed in carefully planned phases. This allows for proper healing, precise adjustments, and the most predictable long-term results.",
            ),
          },
          {
            heading: "What Treatments Are Available?",
            body: rich(
              "Depending on your needs, full mouth reconstruction may include a combination of:",
              "- Ceramic crowns",
              "- Porcelain veneers",
              "- Dental implants",
              "- Bridges",
              "- Periodontal therapy",
              "- Bite rehabilitation",
              "- TMJ therapy",
              "- Inlays and onlays",
              "- Gum contouring",
              "- Implant-supported restorations",
              "Every recommendation is tailored to your individual goals and oral health needs.",
              "Rather than simply repairing one tooth at a time, our philosophy is to rebuild your smile as a complete system, creating harmony between the teeth, gums, bite, muscles, and jaw joints. The result is dentistry that not only looks beautiful but also feels comfortable, functions naturally, and is designed to serve you well for many years to come.",
            ),
          },
        ],
      },
      { _type: "sharedBlock", kind: "whyChooseUs" },
      {
        _type: "faqBlock",
        eyebrow: "Common Questions",
        heading: "Frequently Asked Questions",
        items: [
          {
            question: "When is full-mouth reconstruction needed?",
            answer:
              "It’s often needed after extensive decay, trauma, erosion, severe wear from grinding, or multiple missing teeth — situations where individual fixes wouldn’t restore proper function.",
          },
          {
            question: "How long does full-mouth reconstruction take?",
            answer: "Most plans take several months to a year or more, depending on the procedures involved and your healing time.",
          },
          {
            question: "What treatments are part of a full-mouth reconstruction?",
            answer: "Cleanings, periodontal care, gum and tooth contouring, crowns, bridges, veneers, inlays/onlays, and implants are common components.",
          },
          {
            question: "Will I be without teeth during treatment?",
            answer: "No. We sequence treatment so you always have functional, attractive teeth — with temporaries when needed.",
          },
          {
            question: "How do I know what I need?",
            answer: "Dr. Jiveh’s thorough exam and digital imaging guide a personalized plan. We’ll explain every step before treatment begins.",
          },
        ],
      },
    ],
    seo: {
      title: "Full Mouth Restoration in Royal Palm Beach - Smiles By Jiveh",
      description: "When teeth become worn, broken, failing, or missing, everyday activities like eating, smiling, and speaking can become frustrating. Full mouth…",
    },
  },
  {
    slug: "worn-teeth-rehabilitation",
    title: "Worn Teeth Rehabilitation",
    category: "restorative",
    order: 24,
    hero: {
      eyebrow: "Worn Teeth Rehabilitation",
      heading: "Do You Feel Like You’re Going to the Dentist for the Same Teeth Over and Over Again?",
      text: rich(
        "If you’ve spent years replacing broken fillings, cracked teeth, fractured crowns, or repairing the same teeth repeatedly, the problem may not be your teeth; it may be your bite.",
        "When restorations are placed into an unstable or unbalanced bite, excessive forces continue to stress your teeth, causing them to crack, wear down, and fail over time. Rather than simply replacing another filling or crown, it’s important to understand why your teeth keep breaking.",
        "At Smiles By Jiveh, Dr. Farokh Jiveh looks beyond the damaged tooth to identify the underlying cause. Using advanced diagnostics and comprehensive bite analysis, he develops a personalized treatment plan that restores balance, protects your teeth, and creates long-term stability.",
      ),
      cta: { label: "Book An Appointment", href: "/appointment/" },
      images: [images.wornTeethBeforeAfter],
    },
    blocks: [
      {
        _type: "detailsBlock",
        eyebrow: "Details",
        items: [
          {
            heading: "Rebuilding the Smile After Years of Wear, Grinding & Bite Collapse",
            body: rich(
              "Years of grinding, clenching, acid erosion, and bite imbalance can gradually wear down your teeth, changing not only your smile but also the way your bite functions. As teeth shorten over time, many patients experience jaw discomfort, headaches, tooth sensitivity, fractured restorations, difficulty chewing, and even an aged appearance as facial support begins to collapse.",
              "Our goal isn’t simply to restore worn teeth, it’s to rebuild a healthy, functional bite that allows your restorations to last for years.",
            ),
          },
          {
            heading: "Understanding Why Teeth Wear Down",
            body: rich(
              "Most patients experience one or more forms of tooth wear:",
              "- Grinding and clenching (attrition): Tooth-to-tooth wear that gradually shortens and flattens the teeth.",
              "- Acid erosion: Enamel loss caused by acidic foods, beverages, acid reflux, or certain medical conditions.",
              "- Abrasion: Wear caused by aggressive brushing or improper brushing techniques, often near the gumline.",
              "Identifying the cause of the wear is the first step toward preventing it from happening again.",
            ),
          },
          {
            heading: "Comprehensive Treatment Designed to Last",
            body: rich(
              "Depending on the severity of wear and bite collapse, treatment may include:",
              "- Composite bonding",
              "- Porcelain veneers",
              "- Ceramic crowns",
              "- Bite rehabilitation",
              "- Periodontal therapy",
              "- Implant dentistry",
              "- Full-mouth reconstruction",
              "Every treatment plan is designed to restore proper function, improve comfort, enhance aesthetics, and provide long-term stability.",
              "To protect your investment, Dr. Jiveh also designs customized bite appliances and occlusal therapies that help reduce stress on the teeth, muscles, and jaw joints while minimizing future wear and fracture.",
            ),
          },
          {
            heading: "Our Philosophy",
            body: rich(
              "We don’t just replace broken teeth.",
              "We identify why they’re breaking, restore the bite correctly, and help you keep your smile healthy for decades to come.",
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
          {
            question: "What causes tooth wear?",
            answer: "The main causes are grinding/clenching (attrition), aggressive brushing (abrasion), and acidic foods or reflux (erosion). Many patients experience a mix.",
          },
          { question: "Is tooth wear serious?", answer: "It can be. Beyond aesthetics, untreated wear can lead to TMD, sensitivity, and structural damage to teeth." },
          {
            question: "How are worn teeth treated?",
            answer: "Treatments include composite bonding, cosmetic contouring, crowns, and customized mouth appliances. Severe cases may need orthognathic surgery.",
          },
          {
            question: "Can I prevent further wear?",
            answer: "Yes. Customized night guards, improved brushing technique, and managing reflux all help. We’ll recommend the right protective approach for you.",
          },
          { question: "Will treatment improve how my teeth look?", answer: "Yes — most patients are amazed at how restored, even teeth look and feel after rehabilitation." },
        ],
      },
    ],
    seo: {
      title: "Worn Teeth Treatment in Royal Palm Beach - Smiles By Jiveh",
      description: "If you’ve spent years replacing broken fillings, cracked teeth, fractured crowns, or repairing the same teeth repeatedly, the problem may not be your…",
    },
  },
];
