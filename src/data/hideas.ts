import epSetSetting from "@/assets/ep-set-setting.webp";
import epShulgin from "@/assets/ep-shulgin.webp";
import epBicycleDay from "@/assets/ep-bicycle-day.webp";
import epSantoDaime from "@/assets/ep-santo-daime.webp";
import epDearMom from "@/assets/ep-dear-mom.webp";
import epCacao from "@/assets/ep-cacao.webp";
import epDearDad from "@/assets/ep-dear-dad.webp";
import epNlcBanner from "@/assets/ep-nlc-banner.webp";
import epTogJoy from "@/assets/ep-tog-joy.webp";
import epTogTip from "@/assets/ep-tog-tip.webp";
import teamVictory from "@/assets/team-victory.webp";
import teamSalar from "@/assets/team-salar.webp";
import gal09 from "@/assets/gal-09.webp";
import gal10 from "@/assets/gal-10.webp";
import gal11 from "@/assets/gal-11.webp";
import gal12 from "@/assets/gal-12.webp";
import gal13 from "@/assets/gal-13.webp";
import gal20 from "@/assets/gal-20.webp";
import gal21 from "@/assets/gal-21.webp";
import gal22 from "@/assets/gal-22.webp";

const CDN = "https://hideas.ca/wp-content/uploads";

export type Episode = {
  n: string;
  title: string;
  blurb: string;
  kind: "youtube" | "video";
  src: string; // youtube id or mp4 url
  poster: string;
  link?: string;
};

export const PODCAST_CATEGORIES = [
  "History & Heroes",
  "Token of Gratitude",
  "Nature Loves Courage",
] as const;

export type PodcastCategory = (typeof PODCAST_CATEGORIES)[number];

export const EPISODES: Record<PodcastCategory, Episode[]> = {
  "History & Heroes": [
    {
      n: "01",
      title: "The Importance Of Set, Setting & Sitting In A Hero's Dose Journey",
      blurb:
        "Simple tips that drastically reduce your potential for a bad trip — and why there is no such thing as a bad trip, only a challenging journey.",
      kind: "youtube",
      src: "BcXgWQaxH5k",
      poster: epSetSetting,
      link: "https://hideas.ca/the-importance-of-set-setting-and-sitting-in-a-heros-dose-journey/",
    },
    {
      n: "02",
      title: "Alex & Ann Shulgin — History And Heroes Of Psychedelics",
      blurb:
        "How the synergy between Sasha and Ann Shulgin led to extraordinary contributions to psychopharmacology, freely shared at the cost of their peril.",
      kind: "youtube",
      src: "2q1bIvtZDXA",
      poster: epShulgin,
      link: "https://hideas.ca/alex-and-ann-shulgin-history-and-heroes-of-psychedelics/",
    },
    {
      n: "03",
      title: "Bicycle Day: In Celebration Of Dr Albert Hoffman's Acid Trip",
      blurb:
        "The origin story of Bicycle Day, why it is celebrated, and why riding a bicycle on Bicycle Day is a bad idea.",
      kind: "youtube",
      src: "ui5yPwrg7RE",
      poster: epBicycleDay,
      link: "https://hideas.ca/why-april-19th-is-a-popular-day-to-drop-acid/",
    },
    {
      n: "04",
      title: "Santo Daime — Live Interview With Marina",
      blurb:
        "An Ancestral Medicine Ambassador and facilitator from the Santo Daime, met at a cacao event called The Chocolate Groove.",
      kind: "youtube",
      src: "RzZORVQgQ-k",
      poster: epSantoDaime,
      link: "https://hideas.ca/santo-daime/",
    },
  ],
  "Token of Gratitude": [
    {
      n: "01",
      title: "Token Of Gratitude — Dear Mom",
      blurb:
        "A matchbook postcard, a portion of ceremonial cacao, and one person you are grateful for. The whole assignment, in one sitting.",
      kind: "video",
      src: `${CDN}/2025/04/Mom_2025_04_27_11_27_18.mp4`,
      poster: epDearMom,
      link: "https://hideas.ca/token-of-gratitude-cacao-ceremony-and-creative-event/",
    },
    {
      n: "02",
      title: "The Benefits Of Ceremonial Grade Cacao",
      blurb:
        "Why ceremonial cacao — bliss, energy, focus and superfood — sits at the centre of every Token of Gratitude social.",
      kind: "youtube",
      src: "B5DajzwXDl0",
      poster: epCacao,
      link: "https://hideas.ca/token-of-gratitude-cacao-ceremony-and-creative-event/",
    },
    {
      n: "03",
      title: "Token Of Gratitude — Dear Dad",
      blurb:
        "Creative expression of gratitude: cut, paste, and give it away with an open heart and a warm cup.",
      kind: "youtube",
      src: "VnFceeMo6Ug",
      poster: epDearDad,
      link: "https://hideas.ca/token-of-gratitude-dear-dad",
    },
    {
      n: "04",
      title: "A Junk Journal Present For My Friend Joy",
      blurb:
        "A full scrapbook junk journal made start to finish as a token of gratitude for a friend.",
      kind: "youtube",
      src: "4wL30IgkZ4w",
      poster: epTogJoy,
      link: "https://hideas.ca/token-of-gratitude-cacao-ceremony-and-creative-event/",
    },
    {
      n: "05",
      title: "Beautiful Views, A $10 Tip And Dr Jordan Peterson At Kelowna Airport",
      blurb:
        "Gratitude in the wild — a chance meeting, a small tip, and a reminder that the practice travels with you.",
      kind: "youtube",
      src: "EV9XQ2T5WGw",
      poster: epTogTip,
      link: "https://hideas.ca/token-of-gratitude-cacao-ceremony-and-creative-event/",
    },
  ],

  "Nature Loves Courage": [
    {
      n: "01",
      title: "Nature Loves Courage — Ceremony Banner",
      blurb:
        "A look inside a hosted Nature Loves Courage silent-disco ceremony: meditation, breathwork, cacao, and shared intention.",
      kind: "video",
      src: `${CDN}/2026/03/NLCMarchBanner2.mp4`,
      poster: epNlcBanner,
      link: "https://hideas.ca/nature-loves-courage-ceremony",
    },
  ],
};

export const GALLERY: { src: string; alt: string }[] = [
  { src: gal09, alt: "Ceremonial cacao poured for the circle" },
  { src: gal10, alt: "Cup of ceremonial cacao held in both hands" },
  { src: gal11, alt: "Cacao ceremony table set with craft supplies" },
  { src: gal12, alt: "Participants making tokens of gratitude" },
  { src: gal13, alt: "Hands working on a scrapbook page" },
  { src: gal20, alt: "Aztec-inspired cacao artwork" },
  { src: gal21, alt: "Ancestral cacao illustration" },
  { src: gal22, alt: "Token of Gratitude social in progress" },
];

/* ---------- Events / calendar ---------- */

export type CeremonyEvent = {
  id: string;
  series: "Nature Loves Courage" | "Token of Gratitude" | "Celebration of Light";
  title: string;
  date: string; // ISO date
  time: string;
  city: string;
  place: string;
  seats: string;
  price: string;
  description: string;
  link: string;
};

/** Today's date (YYYY-MM-DD) in America/Vancouver time. */
export function todayInVancouver(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Vancouver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Events dated today or later (Vancouver time), soonest first. */
export function upcomingEvents(list: CeremonyEvent[] = EVENTS, now: Date = new Date()) {
  const today = todayInVancouver(now);
  return list.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}

export const EVENTS: CeremonyEvent[] = [
  {
    id: "dmt-activation-vancouver",
    series: "Celebration of Light",
    title: "DMT Activation Ceremony — Breathwork & Sound Bath",
    date: "2026-10-23",
    time: "5:30 PM – 8:00 PM",
    city: "Vancouver, BC (UBC area)",
    place: "Venue TBD — address shared on confirmation",
    seats: "Limited seats",
    price: "$150",
    link: "https://hideas.ca",
    description:
      "A celebration of light. Arrive at 5:30 to a sound bath. 6:00 opening circle, 6:15 breathwork, 6:30 DMT activation, 7:30 sound bath and journaling, 7:45 closing ceremony and sharing circle. Ends at 8:00.",
  },
  {
    id: "nlc-kelowna",
    series: "Nature Loves Courage",
    title: "Nature Loves Courage — Silent Disco Meditation & Breathwork",
    date: "2026-06-29",
    time: "6:00 PM – 9:30 PM",
    city: "Kelowna, BC",
    place: "Secluded property overlooking the valley (address on confirmation)",
    seats: "8 seats",
    price: "$150",
    description:
      "We'll gather in a private, secluded space surrounded by nature at Poplar Point. You'll sit comfortably, headphones on, gently gazing toward the sky. As the music begins, our guide will lead you through each breath. Guided meditation, breathwork, and cacao bring the circle together. Let yourself relax and travel with a small group of like-minded souls.",
    link: "https://hideas.ca/nature-loves-courage-ceremony",
  },
  {
    id: "tog-vernon",
    series: "Token of Gratitude",
    title: "Token Of Gratitude — Cacao & Creative Social",
    date: "2026-07-11",
    time: "2:00 PM – 5:00 PM",
    city: "Vernon, BC",
    place: "Community studio space",
    seats: "16 seats",
    price: "$45 — kit and cacao included",
    description:
      "Ceremonial cacao paired with a table full of scissors, glue and salvaged paper. You leave with a matchbook postcard and a portion of cacao to hand to someone you are grateful for. That is the whole assignment.",
    link: "https://hideas.ca/token-of-gratitude-cacao-ceremony-and-creative-event/",
  },
  {
    id: "nlc-vancouver",
    series: "Nature Loves Courage",
    title: "Nature Loves Courage — Silent Disco Meditation & Breathwork",
    date: "2026-07-27",
    time: "6:00 PM – 9:30 PM",
    city: "Vancouver, BC",
    place: "Private residence, North Shore (address on confirmation)",
    seats: "10 seats",
    price: "$150",
    description:
      "Whether you seek spiritual growth, mental clarity or emotional healing, you are gently led through the Nature Loves Courage experience by skilled facilitators, so you feel safe, respected and cared for every step of the way.",
    link: "https://hideas.ca/nature-loves-courage-ceremony",
  },
  {
    id: "tog-lakecountry",
    series: "Token of Gratitude",
    title: "Token Of Gratitude — Junk Journal Afternoon",
    date: "2026-08-15",
    time: "1:00 PM – 4:00 PM",
    city: "Lake Country, BC",
    place: "Lakeside garden studio",
    seats: "14 seats",
    price: "$45 — kit and cacao included",
    description:
      "Slow afternoon of cacao, stamps, bone folders and scrap paper. Bring a photo of someone you are grateful for; leave with something made by hand to give away.",
    link: "https://hideas.ca/token-of-gratitude-cacao-ceremony-and-creative-event/",
  },
];

/* ---------- Facilitators ---------- */

export type Facilitator = {
  name: string;
  role: string;
  img: string;
  bio: string[];
  tags: string[];
  links: { label: string; href: string }[];
};

export const FACILITATORS: Facilitator[] = [
  {
    name: "Victory Battle",
    role: "Founder & Ceremony Facilitator",
    img: teamVictory,
    bio: [
      "Victory has spent more than a decade building experiences where the audience is inside the moment rather than watching it. He joined the event production platform Artery in 2018, hosting intimate gatherings out of his Toronto loft studio, and was later chosen as their Event Ambassador.",
      "Before that he designed corporate team-building through The Field Trip Program at Pursuit OCR — stripping away titles and seniority — ran Camp Pursuit for kids across the GTA, co-hosted live charity broadcasts for the Boobie Ball, and built the Dance On Cancer's Grave Relay For Life campaign in memory of his friend Danielle.",
      "Hideas has since relocated from Toronto to British Columbia, where Victory now holds Nature Loves Courage silent-disco meditation and breathwork ceremonies and Token of Gratitude cacao circles in Vancouver and across Central BC, including Kelowna, Vernon and Penticton.",
    ],
    tags: ["Ceremony holder", "Live events", "Broadcast & A/V", "Youth programming"],
    links: [{ label: "victorybattlealive.com", href: "https://victorybattlealive.com/events/" }],
  },
  {
    name: "Salar Salahi",
    role: "Creative Director & Visual Artist",
    img: teamSalar,
    bio: [
      "Salar is a visual artist with over 12 years of experience — film, caricature, photography and collage all live under the same hand, and that is where Hideas visual language comes from.",
      "In 2018 he ran a podcast about plant medicine for 18 episodes, and since then he has been in the discovery of different medicines to heal his own traumas and to help others overcome theirs.",
      "He is currently a student of Human Garage, learning to help himself and the community release tension and trauma held in the body.",
    ],
    tags: ["Visual artist", "Film & collage", "Live caricature", "Human Garage student"],
    links: [
      { label: "salarsalahi.com", href: "https://salarsalahi.com/film" },
      { label: "smileamileart.com", href: "https://smileamileart.com/" },
    ],
  },
];

/* ---------- Socials ---------- */

export const WHATSAPP_NUMBER = "16474581685";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const DISCORD_LINK = "https://discord.gg/hideas";

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/hideas.ca/", handle: "@hideas.ca" },
  { label: "YouTube", href: "https://www.youtube.com/@hideasevents", handle: "Hideas Events" },
  { label: "Discord", href: DISCORD_LINK, handle: "Join the circle" },
  { label: "WhatsApp", href: WHATSAPP_LINK, handle: "(647) 458-1685" },
] as const;

/* ---------- Contact ---------- */

export const CONTACT_EMAIL = "hello@hideas.ca";

/* ---------- Prepare & Integrate ---------- */

export const PREPARE_STEPS: { k: string; title: string; body: string }[] = [
  {
    k: "72h before",
    title: "Lighten the load",
    body: "Ease off alcohol, cannabis, recreational substances and heavy or processed food. Sleep is the most useful thing you can bring.",
  },
  {
    k: "24h before",
    title: "Eat simply",
    body: "Plant-forward, low sugar, no red meat and no caffeine on the day. Drink water. If you take prescribed medication, keep taking it and tell us in your intake.",
  },
  {
    k: "The day of",
    title: "Arrive unhurried",
    body: "Come fasted 3–4 hours before the circle unless we've told you otherwise. Leave 30 minutes of buffer so you're not walking in from traffic.",
  },
  {
    k: "Bring",
    title: "What to pack",
    body: "Comfortable layers, a blanket or shawl, a journal and pen, a water bottle, and one small object for the altar. We supply cushions, tea, cacao and everything for the craft table.",
  },
  {
    k: "In the room",
    title: "What happens",
    body: "Opening gratitude round, guided meditation and breathwork, cacao, and music through individual headphones, followed by sharing and a written intention.",
  },
  {
    k: "After",
    title: "Integration",
    body: "No driving for the rest of the day — arrange a ride. Sleep, walk, hydrate, write. We send an integration note within 48 hours and host a free online integration call the following week, plus the group chat stays open.",
  },
];

/* ---------- Safety ---------- */

export const SAFETY_HARD: string[] = [
  "SSRI, SNRI, MAOI, lithium or tramadol use (tapering must be supervised by your prescriber — never stop on your own)",
  "Pregnancy or breastfeeding",
  "Heart conditions, uncontrolled high or low blood pressure, or a history of stroke",
  "Personal or family history of schizophrenia, psychosis, bipolar I or dissociative disorders",
  "Epilepsy or seizure disorders",
  "Liver or kidney disease, or recent surgery",
];

export const SAFETY_TALK: string[] = [
  "Any prescribed medication at all — bring the full list to your intake",
  "Recent bereavement, acute crisis, or an unmedicated mental-health diagnosis",
  "Eating disorders, diabetes or blood-sugar instability",
  "Under 19, or attending without anyone knowing where you are",
];

export const SAFETY_PROMISE: string[] = [
  "Every seat is screened by a facilitator before it is confirmed — we will refund rather than seat someone unsafely.",
  "A sober facilitator holds the room at all times and a first-aid trained sitter is present.",
  "You can leave, stop, sit out or say no at any point, without explaining yourself.",
  "Consent is explicit: no touch without asking, every time.",
  "Nothing you say in the circle leaves the circle.",
];

/* ---------- FAQ ---------- */

export const FAQ: { q: string; a: string }[] = [
  {
    q: "What does Hideas offer?",
    a: "Hideas only hosts meditation, breathwork, and cacao ceremonies in a silent-disco format. Cacao is a food; no physical products, cartridges, or other substances are sold on this website.",
  },
  {
    q: "I've never done anything like this. Is that okay?",
    a: "Most people in the room are first-timers. There is nothing to perform and no technique to know. We walk through everything out loud before we begin, and you can sit quietly the whole time if that's what you need.",
  },
  {
    q: "What if I get nervous or overwhelmed?",
    a: "Nerves are normal and usually a good sign. A facilitator will check in with you, and you can step into the quiet room, get a blanket, or leave at any moment. Nobody will talk you into staying in something that isn't right for you.",
  },
  {
    q: "Do I have to be sober beforehand?",
    a: "Yes. No alcohol or recreational substances for 24 hours before a circle, and none on the day. Keep taking prescribed medication and disclose it on your intake form so we can screen safely.",
  },
  {
    q: "What does it cost, and what if I can't afford it?",
    a: "Circles run from by-donation up to $150 depending on the format, venue and what's served. A couple of sliding-scale seats are held for every circle — message us privately and we'll sort it out, quietly.",
  },
  {
    q: "How long does it last?",
    a: "Plan for four to five hours door to door. Creative socials run about three. Never book anything straight after — you want an open evening.",
  },
  {
    q: "Can I drive home?",
    a: "No. Arrange a ride, a lift or a place to stay. This is a condition of attending.",
  },
  {
    q: "Can I come with a friend?",
    a: "Yes, and it helps. Each person fills out their own intake form so we can screen individually.",
  },
  {
    q: "Is it religious?",
    a: "No. We borrow ritual structure with credit to the lineages it comes from, but there is no doctrine, no conversion, and no belief required.",
  },
  {
    q: "Do you host private or corporate circles?",
    a: "Yes — private groups, retreats, team days and creative workshops, in your space or ours. Send an enquiry below and we'll build the format with you.",
  },
];

/* ---------- Policy ---------- */

export const POLICY: { k: string; v: string }[] = [
  {
    k: "Screening first",
    v: "A ceremony seat is a request, not a confirmation. We review your intake form and confirm by e-mail within 48 hours. If we can't seat you safely, you're refunded in full.",
  },
  {
    k: "Reschedule free",
    v: "Move to any future circle at no cost up to 7 days before the date. Inside 7 days you can transfer your seat to someone else who completes an intake.",
  },
  {
    k: "Refunds",
    v: "Full refund up to 14 days before. 50% between 14 and 7 days. Inside 7 days the seat is non-refundable but transferable, because the venue, facilitation and refreshments are already paid for.",
  },
  {
    k: "If we cancel",
    v: "Weather, illness or too few registrations — you choose a full refund or a credit toward the next circle.",
  },
];

/* ---------- Testimonials (real quotes only) ---------- */

export type Testimonial = { quote: string; name: string; circle: string };

// Intentionally empty: we only publish real, consented quotes from past circles.
// Add entries here as they come in from the integration follow-up.
export const TESTIMONIALS: Testimonial[] = [];
