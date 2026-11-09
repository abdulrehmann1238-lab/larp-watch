export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Technology & Preservation' | 'Watch Catalog' | 'Legal & Privacy';
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is LARP?',
    answer: 'LARP is an ultra-premium AI luxury watch transformation platform. It enables horology enthusiasts, collectors, and creators to upload an ordinary photograph of their wrist, detect the timepiece currently worn, match it with genuine luxury reference pieces, and seamlessly replace it with photorealistic high-horology watches while preserving the original photograph’s exact skin texture, lighting, clothing, and background.'
  },
  {
    id: 'faq-2',
    category: 'Technology & Preservation',
    question: 'How does watch identification work?',
    answer: 'When a photograph is uploaded, LARP runs a multi-stage visual recognition pipeline. It segments the wrist anatomy, isolates the watch bezel and dial boundaries, analyzes indices, complications, lugs, and case proportions, and computes a visual similarity match against an authentic catalog of luxury reference models.'
  },
  {
    id: 'faq-3',
    category: 'Watch Catalog',
    question: 'Can LARP recognize replica watches?',
    answer: 'LARP analyzes the visual geometry and dial layout of any timepiece on the wrist. While it identifies aesthetic similarities to iconic models (such as case shape and dial markings), it is an imaging platform, not a physical anti-counterfeit laboratory. It provides visual inspiration rather than physical authentication.'
  },
  {
    id: 'faq-4',
    category: 'Watch Catalog',
    question: 'How accurate are the watch matches?',
    answer: 'Matches are ranked with confidence metrics based on bezel curvature, dial sub-register placement, lug width, and bracelet linkage. In this demonstration, our curated database maps the closest genuine luxury reference number alongside detailed horological specifications.'
  },
  {
    id: 'faq-5',
    category: 'Technology & Preservation',
    question: 'Does LARP change the original wrist photograph?',
    answer: 'Strictly no. Only the watch itself is digitally transformed. Your hand anatomy, bone structure, wrist circumference, sleeves, jacket fabrics, cuff links, background environment, and camera depth-of-field remain 100% untouched.'
  },
  {
    id: 'faq-6',
    category: 'Technology & Preservation',
    question: 'Are skin tone and tattoos preserved?',
    answer: 'Yes, with absolute photographic fidelity. Melanin pigmentation, natural epidermal texture, pore details, veins, scars, and wrist tattoos are preserved completely, ensuring the transformed photograph looks completely indistinguishable from real life.'
  },
  {
    id: 'faq-7',
    category: 'Watch Catalog',
    question: 'Can I choose a different watch?',
    answer: 'Absolutely. While the system suggests the closest matching reference to your existing timepiece, you are free to explore our entire catalog of Swiss horology, from iconic sports chronographs like the Daytona and Speedmaster to grand complications from Patek Philippe, Audemars Piguet, and Blancpain.'
  },
  {
    id: 'faq-8',
    category: 'Watch Catalog',
    question: 'Can I customize the dial and bracelet?',
    answer: 'Yes. In the Watch Configuration studio, you can select alternative manufacturer-authentic dial colors (such as Sunburst Blue, Champagne, Olive Green, or Piano White), case materials (Oystersteel, Rose Gold, Platinum), and bracelet configurations (Oyster, Jubilee, Alligator leather, or Rubber).'
  },
  {
    id: 'faq-9',
    category: 'Technology & Preservation',
    question: 'What image formats are supported?',
    answer: 'LARP supports standard JPEG, PNG, HEIC, and WebP uploads up to 25MB. For optimal results, we recommend well-lit photos captured in natural daylight or ambient indoor lighting with the wrist held in a natural posture.'
  },
  {
    id: 'faq-10',
    category: 'Technology & Preservation',
    question: 'Can I download high-resolution images?',
    answer: 'Yes. In the Export studio, you can choose between Standard (1080p), High-Resolution (4K, 300 DPI), and Master Grade (8K) outputs in lossless PNG or optimized JPG format, ready for editorial portfolios or personal collections.'
  },
  {
    id: 'faq-11',
    category: 'Legal & Privacy',
    question: 'Does LARP authenticate physical watches?',
    answer: 'No. LARP is a creative digital imaging and simulation software. It does not provide certificates of authenticity, appraisal valuations, or physical ownership verification. No output should be submitted as physical proof of ownership.'
  },
  {
    id: 'faq-12',
    category: 'Legal & Privacy',
    question: 'Are transformed photographs digitally modified?',
    answer: 'Yes. All generated photographs are digital transformations. Each export includes optional cryptographic metadata and subtle watermark disclosures indicating that the image was created using LARP digital horological synthesis.'
  },
  {
    id: 'faq-13',
    category: 'General',
    question: 'Which subscription plans are available?',
    answer: 'We offer three tiers: Explore (Free - 3 transformations/mo), Discover (Premium - $29/mo for 25 high-res 4K transformations and full catalog), and Experience (Elite - $79/mo for unlimited 8K transformations and bespoke historical archive access).'
  },
  {
    id: 'faq-14',
    category: 'Legal & Privacy',
    question: 'How is my uploaded photograph handled?',
    answer: 'In this demonstration, all image uploads and preview processing operate entirely within your local browser sandbox via secure object URLs. Your personal wrist photographs and identity details are never transmitted or stored on external servers.'
  }
];

