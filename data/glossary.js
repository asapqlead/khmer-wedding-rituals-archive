// data/glossary.js
// Cultural terminology dictionary for Khmer wedding traditions

export const CATEGORY_MAP_KM = {
  "All": "ទាំងអស់",
  "Sacred Objects": "គ្រឿងសក្ការៈ",
  "People & Roles": "បុគ្គល និងតួនាទី",
  "Rituals": "កិច្ចពិធី",
  "Attire": "សម្លៀកបំពាក់",
  "Music & Art": "តន្ត្រី និងសិល្បៈ",
  "Mythology & Meaning": "ទេវកថា និងអត្ថន័យ",
};

export const GLOSSARY_CATEGORIES = [
  { id: "All", labelEn: "All", labelKm: "ទាំងអស់" },
  { id: "Sacred Objects", labelEn: "Sacred Objects", labelKm: "គ្រឿងសក្ការៈ" },
  { id: "People & Roles", labelEn: "People & Roles", labelKm: "បុគ្គល និងតួនាទី" },
  { id: "Rituals", labelEn: "Rituals", labelKm: "កិច្ចពិធី" },
  { id: "Attire", labelEn: "Attire", labelKm: "សម្លៀកបំពាក់" },
  { id: "Music & Art", labelEn: "Music & Art", labelKm: "តន្ត្រី និងសិល្បៈ" },
  { id: "Mythology & Meaning", labelEn: "Mythology & Meaning", labelKm: "ទេវកថា និងអត្ថន័យ" },
];

export const glossaryTerms = [
  {
    khmer: "អាចារ្យ",
    romanized: "Achar",
    category: "People & Roles",
    categoryKhmer: "បុគ្គល និងតួនាទី",
    definitionEn: "A respected lay Buddhist ritual master who guides the ceremonies, recites Pali chants, directs the auspicious timing, and ensures proper reverence is observed.",
    definitionKhmer: "គ្រូអាចារ្យដែលជាអ្នកដឹកនាំកិច្ចពិធីប្រពៃណី និងសូត្រធម៌ពាលីប្រសិទ្ធពរជ័យ។"
  },
  {
    khmer: "ពពិល",
    romanized: "Popil",
    category: "Sacred Objects",
    categoryKhmer: "គ្រឿងសក្ការៈ",
    definitionEn: "A sacred ceremonial leaf-shaped candleholder, traditionally made of silver or bronze, holding a beeswax candle. Used in the circular blessing ritual to protect and purify the couple.",
    definitionKhmer: "ជើងដោតទៀនក្រមួនឃ្មុំរាងដូចស្លឹកពោធិ៍ ធ្វើពីប្រាក់ ឬសំរិទ្ធ សម្រាប់ប្រើក្នុងពិធីបង្វិលពពិល។"
  },
  {
    khmer: "អំបោះក្រហមចងដៃ",
    romanized: "Ksae Krahom (Chorng Dai)",
    category: "Sacred Objects",
    categoryKhmer: "គ្រឿងសក្ការៈ",
    definitionEn: "Sacred spun red cotton threads tied around the newlyweds' wrists by guests to convey health, safety, mutual loyalty, and community protection.",
    definitionKhmer: "អំបោះកប្បាសពណ៌ក្រហមសម្រាប់ចងកដៃកូនកំលោះកូនក្រមុំ ដើម្បីប្រសិទ្ធពរជ័យ និងចងចំណងស្នេហ៍។"
  },
  {
    khmer: "អ្នកផ្លូវ",
    romanized: "Neak Phlov",
    category: "People & Roles",
    categoryKhmer: "បុគ្គល និងតួនាទី",
    definitionEn: "The traditional matchmaker and ceremonial master of ceremonies who leads the fruit procession, represents the groom's lineage, and negotiates with the bride's elders.",
    definitionKhmer: "អ្នកចាត់ចែង និងសម្របសម្រួលក្បួនហែជំនូនតំណាងឱ្យខាងប្រុស។"
  },
  {
    khmer: "ស្លាធម៌",
    romanized: "Slathor",
    category: "Sacred Objects",
    categoryKhmer: "គ្រឿងសក្ការៈ",
    definitionEn: "An auspicious ancestral altar offering made from a green banana trunk or coconut decorated with rolled betel leaves, flowers, and incense sticks.",
    definitionKhmer: "គ្រឿងសក្ការបូជាដូនតាធ្វើពីដើមចេក ឬផ្លែដូង តុបតែងដោយម្លូស្លា និងផ្កាស្រស់។"
  },
  {
    khmer: "ស្បៃ និងសំពត់ចងក្បិន",
    romanized: "Sabai & Sampot Chang Kben",
    category: "Attire",
    categoryKhmer: "សម្លៀកបំពាក់",
    definitionEn: "Traditional Khmer royal silk wedding garments. The sabai is an intricately embroidered chest sash, while the chang kben is a draped silk lower garment tucked between the knees.",
    definitionKhmer: "សម្លៀកបំពាក់ប្រពៃណីហូលផាមួង និងស្បៃប៉ាក់ផ្កាពណ៌មាសដ៏ប្រណិត។"
  },
  {
    khmer: "ផ្កាស្លា",
    romanized: "Phka Sla",
    category: "Sacred Objects",
    categoryKhmer: "គ្រឿងសក្ការៈ",
    definitionEn: "Fragrant white blossoms of the areca palm tree, scattered over the couple as an ancient symbol of fertility, peace, and domestic blessing.",
    definitionKhmer: "ផ្កាពណ៌សក្រអូបនៃដើមស្លា ប្រើសម្រាប់បាចប្រសិទ្ធពរជ័យឱ្យមានកូនចៅ និងត្រជាក់ត្រជុំ។"
  },
  {
    khmer: "ភ្លេងមហោរី",
    romanized: "Pleng Mohaori",
    category: "Music & Art",
    categoryKhmer: "តន្ត្រី និងសិល្បៈ",
    definitionEn: "Traditional acoustic Khmer chamber music ensemble featuring tro (bowed lutes), roneat (bamboo xylophone), khloy (flutes), and drums playing ceremonial melodies like Hae Chomnoon, Kat Sork, and Bongvil Popil.",
    definitionKhmer: "វង់ភ្លេងបុរាណខ្មែរដែលប្រគំក្នុងពិធីមង្គលការ ដូចជាបទហែជំនូន បទកាត់សក់ និងបទបង្វិលពពិល។"
  },
  {
    khmer: "រឿងព្រេងព្រះថោងនាងនាគ",
    romanized: "Preah Thong & Neang Neak",
    category: "Mythology & Meaning",
    categoryKhmer: "ទេវកថា និងអត្ថន័យ",
    definitionEn: "The foundational Khmer creation myth where the Indian Prince Preah Thong marries the Dragon Princess Neang Neak, establishing the roots of Khmer culture and marriage traditions.",
    definitionKhmer: "រឿងព្រេងបុរាណខ្មែរនៃការកកើតទឹកដី និងទំនៀមទម្លាប់អាពាហ៍ពិពាហ៍ ដែលរំឭកដល់ការគោរពដឹងគុណស្ត្រី។"
  },
  {
    khmer: "ជំនូន / ពានផ្លែឈើ",
    romanized: "Chomnoon (Phaan)",
    category: "Sacred Objects",
    categoryKhmer: "គ្រឿងសក្ការៈ",
    definitionEn: "Ornate silver pedestal trays filled with paired fruits, desserts, and offerings brought by the groom's procession to honor the bride's parents.",
    definitionKhmer: "ពានប្រាក់ដាក់ផ្លែឈើ និងនំចំណីជាគូៗដែលខាងប្រុសនាំយកមកជូនខាងស្រី។"
  },
  {
    khmer: "ពិធីហែជំនូន",
    romanized: "Hae Chomnoon",
    category: "Rituals",
    categoryKhmer: "កិច្ចពិធី",
    definitionEn: "The morning procession where the groom's family carries paired fruits and offerings to the bride's home, formally seeking matrimonial union.",
    definitionKhmer: "ក្បួនហែផ្លែឈើជាគូៗរបស់កូនកំលោះ និងសាច់ញាតិឆ្ពោះទៅកាន់គេហដ្ឋានខាងស្រី។"
  },
  {
    khmer: "ពិធីសែនព្រេនមេបា",
    romanized: "Pithi Sen Pren May Ba",
    category: "Rituals",
    categoryKhmer: "កិច្ចពិធី",
    definitionEn: "The ancestral homage ritual where the couple presents offerings of food, wine, and betel to invite departed ancestors and lineage elders to witness and bless the marriage.",
    definitionKhmer: "ពិធីសែនដង្វាយ ម្ហូបអាហារ ស្រា និងម្លូស្លា ជូនដូនតាចែកឋាន និងមេបាចាស់ទុំ ដើម្បីសុំពរជ័យ និងសេចក្តីសុខក្នុងគ្រួសារថ្មី។"
  },
  {
    khmer: "ពិធីកាត់សក់បង្កក់សិរី",
    romanized: "Pithi Kat Sork",
    category: "Rituals",
    categoryKhmer: "កិច្ចពិធី",
    definitionEn: "A joyful ritual where comedic celestial barbers symbolically snip hair and perfume the couple to cleanse bad luck and welcome happiness.",
    definitionKhmer: "ពិធីកាត់សក់ជានិមិត្តរូបដើម្បីជម្រះឧបទ្រពចង្រៃ និងនាំមកនូវសិរីសួស្តី។"
  },
  {
    khmer: "ពិធីចងដៃ",
    romanized: "Pithi Chorng Dai",
    category: "Rituals",
    categoryKhmer: "កិច្ចពិធី",
    definitionEn: "The knot blessing ritual where guests tie spun red cotton threads onto the couple's wrists while bestowing heartfelt spoken blessings.",
    definitionKhmer: "ពិធីចងអំបោះក្រហមលើកដៃកូនកំលោះកូនក្រមុំ និងជូនពរឱ្យមានសុខភាពល្អ និងសុភមង្គល។"
  },
  {
    khmer: "ពិធីបង្វិលពពិល",
    romanized: "Pithi Bongvil Popil",
    category: "Rituals",
    categoryKhmer: "កិច្ចពិធី",
    definitionEn: "The sacred passing of lit beeswax candles in a circle to envelop the couple in protective smoke and transfer the elders' enduring virtue.",
    definitionKhmer: "ពិធីបង្វិលពពិល ៧ ឬ ៩ ជុំ និងបក់ផ្សែងទៀនក្រមួនឃ្មុំប្រសិទ្ធពរជ័យដល់គូស្វាមីភរិយា។"
  },
  {
    khmer: "ពិធីបាចផ្កាស្លា",
    romanized: "Pithi Bach Phka Sla",
    category: "Rituals",
    categoryKhmer: "កិច្ចពិធី",
    definitionEn: "The showering of fragrant white areca palm blossoms over the newlyweds to impart fertility, serenity, and domestic prosperity.",
    definitionKhmer: "ការបាចផ្កាស្លាពណ៌សក្រអូបលើកូនទាំងពីរ មុនពេលនាំចូលបន្ទប់ផ្សំដំណេក។"
  },
  {
    khmer: "កិច្ចព្រះថោងតោងស្បៃនាងនាគ",
    romanized: "Preah Thong Torng Sbai Neang Neak",
    category: "Rituals",
    categoryKhmer: "កិច្ចពិធី",
    definitionEn: "The sacred nuptial ritual where the groom holds the tail of the bride's golden sabai as she leads him into the bridal chamber, reenacting the legendary union to honor matrilineal heritage and the bride.",
    definitionKhmer: "កិច្ចពិធីដែលកូនកំលោះតោងជាយស្បៃកូនក្រមុំចូលបន្ទប់ផ្សំដំណេក ជានិមិត្តរូបនៃការគោរពដឹងគុណស្ត្រី និងរំឭករឿងព្រេងព្រះថោងនាងនាគ។"
  }
];
