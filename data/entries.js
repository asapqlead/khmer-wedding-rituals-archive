// data/entries.js
// Chronological sequence of traditional Khmer wedding rituals

export const entries = [
  {
    id: "hae-chomnoon",
    order: 1,
    titleKhmer: "កិច្ចហែជំនូន (ហែកូនកំលោះ)",
    titleEn: "Hae Chomnoon",
    translationEn: "Groom's Morning Procession & Fruit Offerings",
    phonetic: "Hae Chomnoon",
    timeOfDay: "ព្រឹកព្រលឹម • 07:00 AM (Dawn)",
    summaryEn: "The groom and his family parade to the bride's home bearing matched pairs of fruit and offerings, formally seeking approval and demonstrating abundance.",
    summaryKhmer: "កូនកំលោះ និងសាច់ញាតិហែជំនូនផ្លែឈើជាគូៗ ឆ្ពោះទៅកាន់គេហដ្ឋានខាងស្រី ដើម្បីសុំការអនុញ្ញាត និងបង្ហាញពីភាពសម្បូរសប្បាយ។",
    participants: [
      { roleKhmer: "កូនកំលោះ", roleEn: "Groom" },
      { roleKhmer: "មេបា / ឪពុកម្តាយទាំងសងខាង", roleEn: "Parents of Both Families" },
      { roleKhmer: "អ្នកផ្លូវ (អ្នកចាត់ចែង)", roleEn: "Neak Phlov (Traditional Matchmaker/Emcee)" },
      { roleKhmer: "កំលោះ និងក្រមុំជំនូន", roleEn: "Fruit Bearers (Relatives & Friends in pairs)" },
      { roleKhmer: "វង់ភ្លេងមហោរី", roleEn: "Mohaori Traditional Musicians" }
    ],
    sacredItems: [
      { nameKhmer: "ផ្លែឈើ ៣៦ ឬ ២៤ មុខ (ជាគូៗ)", nameEn: "36 or 24 Pairs of Fresh Fruits on Silver Trays (Phaan)" },
      { nameKhmer: "ស្លាធម៌ និងម្លូស្លា", nameEn: "Slathor Offerings with Betel Leaf & Areca Nuts" },
      { nameKhmer: "ជ្រូកខ្វៃ និងនំពពក", nameEn: "Roasted Pig & Traditional Ceremonial Rice Cakes" },
      { nameKhmer: "ទឹកអប់ និងផ្កាម្លិះលាងជើង", nameEn: "Silver Basin with Jasmine Water for Foot-Washing" }
    ],
    steps: [
      {
        stepNumber: 1,
        titleKhmer: "ការរៀបចំជួរជំនូនជាគូៗ",
        titleEn: "Forming the Paired Offering Procession",
        detailEn: "Relatives line up in pairs holding silver trays with matched fruits (bananas, pomelos, dragon fruits, coconuts, mangoes). Even numbers (24, 36) are essential.",
        detailKhmer: "សាច់ញាតិតម្រៀបជាគូៗកាន់ពានប្រាក់ដាក់ផ្លែឈើជាគូ។ ចំនួនគូដូចជា ២៤ ឬ ៣៦ មុខ គឺជានិមិត្តរូបដ៏សំខាន់។",
        meaningEn: "Matched pairs of fruits symbolize harmony, fertility, and balance. In Khmer philosophy, duality reflects two families joining as equal partners.",
        meaningKhmer: "ផ្លែឈើជាគូតំណាងឱ្យភាពសុខដុម ភាពសម្បូរសប្បាយ និងតុល្យភាពរវាងគ្រួសារទាំងសងខាង។"
      },
      {
        stepNumber: 2,
        titleKhmer: "ការហែតាមផ្លូវអមដោយភ្លេងហែជំនូន",
        titleEn: "The March Led by Mohaori Music",
        detailEn: "The Neak Phlov leads the procession through the village road, heralded by the rhythmic percussion and flutes of Mohaori wedding musicians.",
        detailKhmer: "អ្នកផ្លូវនាំមុខក្បួនកាត់តាមភូមិ អមដោយសម្លេងភ្លេងការមហោរីយ៉ាងពិរោះរណ្តំ។",
        meaningEn: "The lively music honors the ancestors, announces the union to the village community, and clears away malevolent spirits with joyful vibrations.",
        meaningKhmer: "ភ្លេងការបន្លឺឡើងដើម្បីជម្រាបដូនតា ប្រកាសដល់អ្នកភូមិ និងបណ្តេញឧបទ្រពចង្រៃ។"
      },
      {
        stepNumber: 3,
        titleKhmer: "ពិធីលាងជើងកូនកំលោះនៅមាត់ទ្វារ",
        titleEn: "Washing the Groom's Feet at the Threshold",
        detailEn: "Upon arriving at the bride's gate, a younger sibling or cousin of the bride washes the groom's feet with jasmine flower water.",
        detailKhmer: "ពេលមកដល់មាត់ទ្វារ ប្អូនស្រីឬសាច់ញាតិកូនក្រមុំយកទឹកផ្កាម្លិះមកលាងជើងកូនកំលោះ។",
        meaningEn: "Cleansing the dust of the road signifies purification — leaving outside worldly troubles and entering the new household with pure intentions.",
        meaningKhmer: "ការលាងជើងបញ្ជាក់ពីការជម្រះភាពសៅហ្មងពីពិភពខាងក្រៅ និងចូលក្នុងគ្រួសារដោយចិត្តបរិសុទ្ធ។"
      },
      {
        stepNumber: 4,
        titleKhmer: "ពិធីរាប់ផ្លែឈើ និងឆ្លងជំនូន",
        titleEn: "Counting and Formal Acceptance of the Trays",
        detailEn: "Elders from both sides sit facing each other on woven mats. The Achar and Neak Phlov count the trays and present them to the ancestors.",
        detailKhmer: "ចាស់ទុំទាំងសងខាងអង្គុយទល់មុខគ្នា អាចារ្យ និងអ្នកផ្លូវរាប់ពានផ្លែឈើ និងអុជធូបសុំពរជ័យពីដូនតា។",
        meaningEn: "This confirms the groom's capability and commitment to provide for and cherish the bride and her lineage with respect.",
        meaningKhmer: "បញ្ជាក់ពីការទទួលស្គាល់ និងការសន្យារបស់កូនកំលោះក្នុងការទំនុកបម្រុងភរិយាដោយក្តីគោរព។"
      }
    ],
    regionalNotesEn: "In rural Takeo and Kampong Cham, processions still walk along village canals with banana leaf cones. In urban Phnom Penh, trays are often streamlined to 12 or 24 luxury pairs due to space constraints.",
    regionalNotesKhmer: "នៅខេត្តតាកែវ និងកំពង់ចាម ក្បួនហែនៅតែដើរតាមផ្លូវភូមិយ៉ាងវែង។ នៅរាជធានីភ្នំពេញ គេច្រើនសម្រួលមកត្រឹម ១២ ឬ ២៤ ពាន ដើម្បីសន្សំទីកន្លែង។",
    mediaPlaceholder: {
      type: "photo",
      titleEn: "Archival Photo: Village Fruit Procession (Hae Chomnoon)",
      descriptionEn: "Photograph of the groom's family carrying 36 brass and silver fruit trays along a village lane, led by elder matchmakers in traditional silk sabai.",
      recommendedRatio: "16:9",
      image: "/images/hae-chomnoon/ceremony.jpg"
    }
  },
  {
    id: "sen-pren-may-ba",
    order: 2,
    titleKhmer: "កិច្ចសែនព្រេនមេបា",
    titleEn: "Sen Pren May Ba",
    translationEn: "Honoring the Ancestors & Calling Ancestral Spirits",
    phonetic: "Pithi Sen Pren May Ba",
    timeOfDay: "ព្រឹក • 08:00 AM (Morning)",
    summaryEn: "The bride, groom, and both families gather before the ancestral altar with offerings of roasted meats, fresh fruits, betel, and wine to invite departed ancestors to witness the union, bestow their blessings, and welcome the groom into the lineage.",
    summaryKhmer: "កូនកំលោះ កូនក្រមុំ និងក្រុមគ្រួសារទាំងសងខាងជួបជុំគ្នានៅមុខរានដូនតា ដោយមានគ្រឿងសក្ការបូជា ជ្រូកខ្វៃ ផ្លែឈើ ម្លូស្លា និងស្រា ដើម្បីអញ្ជើញដូនតាចែកឋាន និងមេបាចាស់ទុំឱ្យដឹងឮ ប្រទានពរជ័យ និងទទួលស្គាល់កូនកំលោះជាសមាជិកគ្រួសារថ្មី។",
    participants: [
      { roleKhmer: "កូនកំលោះ និងកូនក្រមុំ", roleEn: "Bride & Groom (kneeling at ancestral altar)" },
      { roleKhmer: "មេបា / ឪពុកម្តាយទាំងសងខាង", roleEn: "Parents & Maternal/Paternal Lineage Elders" },
      { roleKhmer: "លោកអាចារ្យ", roleEn: "Achar (Ceremonial Master invoking spirits)" },
      { roleKhmer: "សាច់ញាតិ និងបុព្វការីជន", roleEn: "Extended Family & Honored Witnesses" }
    ],
    sacredItems: [
      { nameKhmer: "ក្បាលជ្រូក ឬជ្រូកខ្វៃ និងមាន់ស្ងោរមួយគូ", nameEn: "Whole Roasted Pig & Paired Ceremonial Boiled Chickens" },
      { nameKhmer: "ស្លាធម៌ និងបាយសី", nameEn: "Slathor & Tiered Banana-Leaf Bay Sei Shrines" },
      { nameKhmer: "ស្រាស និងតែក្រអូប ៣ កែវ", nameEn: "Three Cups of Sacred Rice Wine & Jasmine Tea" },
      { nameKhmer: "ទៀន ធូប និងម្លូស្លាពានប្រាក់", nameEn: "Beeswax Candles, Incense & Silver Betel Trays" }
    ],
    steps: [
      {
        stepNumber: 1,
        titleKhmer: "ការរៀបចំរានទេវតា និងរានដូនតា",
        titleEn: "Arranging Offerings on the Ancestral Altar",
        detailEn: "Offerings including boiled chickens with feet tucked, roasted pig, matched fruit pairs, rice wine, and betel leaves are arranged systematically facing the ancestral altar.",
        detailKhmer: "គ្រឿងសំណែនមានដូចជា មាន់ស្ងោរបត់ជើង ជ្រូកខ្វៃ ពានផ្លែឈើជាគូ ស្រាស និងម្លូស្លា ត្រូវបានរៀបចំយ៉ាងផ្ចិតផ្ចិតនៅមុខរានដូនតា។",
        meaningEn: "Honors the continuous lineage; in Khmer belief, marriage is not only between two individuals, but a sacred introduction joining two ancestral bloodlines.",
        meaningKhmer: "ការគោរពពូជពង្សវង្សត្រកូល ព្រោះក្នុងជំនឿខ្មែរ អាពាហ៍ពិពាហ៍មិនមែនគ្រាន់តែរវាងមនុស្សពីរនាក់នោះទេ តែជាការផ្សារភ្ជាប់ខ្សែស្រឡាយដូនតាទាំងសងខាង។"
      },
      {
        stepNumber: 2,
        titleKhmer: "អាចារ្យអុជធូបសូត្រហៅដូនតា (បួងសួង)",
        titleEn: "The Achar Invokes the Ancestral Spirits",
        detailEn: "The Achar lights incense sticks and chants ritual invocations, calling the spirits of departed grandparents and ancestors across generations to partake in the banquet.",
        detailKhmer: "លោកអាចារ្យអុជធូបសូត្រធម៌បួងសួង អញ្ជើញវិញ្ញាណក្ខន្ធជីដូនជីតា និងដូនតាជាច្រើនជំនាន់មកទទួលដង្វាយ និងធ្វើជាសាក្សីដឹងឮ។",
        meaningEn: "Affirms filial gratitude (Katannu). Seeking permission and blessings from the departed protects the young couple from spiritual misfortune and ensures family harmony.",
        meaningKhmer: "បង្ហាញពីកតញ្ញូតាធម៌ចំពោះបុព្វការីជន។ ការសុំការអនុញ្ញាត និងពរជ័យពីដូនតាជួយការពារគូស្វាមីភរិយាពីឧបទ្រពចង្រៃ និងនាំមកនូវភាពសុខដុម។"
      },
      {
        stepNumber: 3,
        titleKhmer: "កូនទាំងពីរក្រាបសំពះ និងចាក់ស្រាជូនដូនតា",
        titleEn: "Kneeling, Bowing, and Pouring Ceremonial Rice Wine",
        detailEn: "Holding burning incense between their clasped hands, the bride and groom bow three times. The groom pours rice wine and tea into cups three times as an offering of devotion.",
        detailKhmer: "កូនកំលោះនិងកូនក្រមុំកាន់ធូបក្រាបសំពះ ៣ ដង ហើយកូនកំលោះចាក់ស្រាស និងតែ ៣ ដង ឧទ្ទិសជូនដូនតា និងមេបា។",
        meaningEn: "Pouring libations seals the groom's official introduction and acceptance into the bride's family fold, creating lasting mutual accountability.",
        meaningKhmer: "ការច្រូចស្រាតំណាងឱ្យការប្រគល់ខ្លួន និងការទទួលស្គាល់កូនកំលោះចូលក្នុងត្រកូលខាងស្រីយ៉ាងពេញសិទ្ធិ។"
      },
      {
        stepNumber: 4,
        titleKhmer: "មេបាប្រគល់ពរជ័យ និងចែកម្លូស្លា",
        titleEn: "Elders Imparting Ancestral Blessings",
        detailEn: "Parents and maternal/paternal elders (May Ba) conclude the offering, share betel leaves, and bestow traditional moral advice for building a peaceful, resilient home.",
        detailKhmer: "មាតាបិតា និងចាស់ទុំមេបាទាំងសងខាង ធ្វើពិធីសែនព្រេនរួច ប្រទានពរជ័យ និងផ្តល់ដំបូន្មានល្អៗដល់កូនទាំងពីរក្នុងការកសាងគ្រួសារ។",
        meaningEn: "Consolidates family unity and communal blessing, grounding the newly formed marriage within a strong intergenerational safety net.",
        meaningKhmer: "ពង្រឹងសាមគ្គីភាពក្នុងគ្រួសារ និងការទទួលស្គាល់ពីសហគមន៍ ដោយភ្ជាប់ចំណងស្នេហ៍ទៅនឹងឫសគល់ដូនតាដ៏រឹងមាំ។"
      }
    ],
    regionalNotesEn: "In Kampong Speu and Takeo countryside, the Sen Pren ceremony always requires a pair of boiled chickens with intact feet and beaks for elders to observe auspicious omens. In modern Phnom Penh weddings, this ritual is often held immediately after the fruit counting in the main room before Kat Sork begins.",
    regionalNotesKhmer: "នៅតាមស្រុកស្រែក្នុងខេត្តកំពង់ស្ពឺ និងតាកែវ ពិធីសែនមេបាតម្រូវឱ្យមានមាន់ស្ងោរមួយគូដែលមានជើងនិងចំពុះពេញលេញដើម្បីទស្សន៍ទាយជោគជតារាសី។ នៅរាជធានីភ្នំពេញ ពិធីនេះច្រើនធ្វើឡើងភ្លាមៗបន្ទាប់ពីរាប់ផ្លែឈើរួច នៅបន្ទប់កណ្តាល មុនពេលពិធីកាត់សក់ចាប់ផ្តើម។",
    mediaPlaceholder: {
      type: "photo",
      titleEn: "Archival Photo: Ancestral Offering and Libation (Pithi Sen Pren May Ba)",
      descriptionEn: "Documentary photograph of the bride and groom bowing before the tiered offering altar with roasted pig, slathor, and incense smoke during the ancestral spirit ceremony.",
      recommendedRatio: "16:9",
      image: "/images/sen-pren-may-ba/ceremony.jpg"
    }
  },
  {
    id: "kat-sork",
    order: 3,
    titleKhmer: "កិច្ចកាត់សក់បង្កក់សិរី",
    titleEn: "Kat Sork",
    translationEn: "Symbolic Hair Cutting & Cleansing Rite",
    phonetic: "Pithi Kat Sork",
    timeOfDay: "ព្រឹក • 09:00 AM (Morning)",
    summaryEn: "Performers acting as celestial barbers descend to cut the couple's hair symbolically, purifying them of past bad fortunes and preparing them for a blessed new life.",
    summaryKhmer: "ទេវតាកាត់សក់ (តួកំប្លែង) ចុះពីឋានសួគ៌មកកាត់សក់ និងស្រោចទឹកអប់ជានិមិត្តរូប ដើម្បីជម្រះឧបទ្រពចង្រៃ និងនាំមកនូវសិរីសួស្តី។",
    participants: [
      { roleKhmer: "កូនកំលោះ និងកូនក្រមុំ", roleEn: "Bride & Groom (seated side-by-side)" },
      { roleKhmer: "ទេវតា / អ្នកកាត់សក់ (តួកំប្លែង ២ នាក់)", roleEn: "Two Celestial Barbers (Theatrical Comedians)" },
      { roleKhmer: "មាតាបិតា និងលោកយាយលោកតា", roleEn: "Parents, Grandparents, and Honored Elders" },
      { roleKhmer: "ភ្ញៀវកិត្តិយសទាំងអស់", roleEn: "All Attending Guests" }
    ],
    sacredItems: [
      { nameKhmer: "កន្ត្រៃមាស ប្រាក់ និងសិតសក់", nameEn: "Golden/Silver Scissors and Traditional Comb" },
      { nameKhmer: "ផ្តិលទឹកអប់ផ្កាម្លិះ និងផ្កាឈូក", nameEn: "Silver Bowl with Perfumed Water and Fresh Jasmine/Lotus Petals" },
      { nameKhmer: "កញ្ចក់ឆ្លុះ", nameEn: "Traditional Handheld Mirror" },
      { nameKhmer: "ចានប្រាក់ទទួលកាកសក់", nameEn: "Silver Plate for Symbolic Hair Clippings" }
    ],
    steps: [
      {
        stepNumber: 1,
        titleKhmer: "ទេវតាចុះពីឋានសួគ៌សុំកន្ត្រៃមាស",
        titleEn: "The Celestial Barbers' Theatrical Arrival",
        detailEn: "Two humorous singers portray angels who flew down from Mount Meru searching for fragrant perfume and golden scissors to dress the bride and groom.",
        detailKhmer: "តួកំប្លែងពីរនាក់សម្តែងជាទេវតាចុះពីភ្នំព្រះសុមេរុ ដោយនាំយកកន្ត្រៃមាស និងទឹកអប់ទិព្វមកតុបតែងកូនកំលោះកូនក្រមុំ។",
        meaningEn: "Laughter is medicine. The comedy relaxes the couple, dispels nervous tension, and welcomes auspicious heavenly blessings through joy.",
        meaningKhmer: "សំណើចជួយបន្ធូរភាពតានតឹងរបស់គូស្វាមីភរិយា និងនាំមកនូវសិរីសួស្តីតាមរយៈភាពរីក្រាយ។"
      },
      {
        stepNumber: 2,
        titleKhmer: "ការកាត់សក់ និងសិតសក់ជានិមិត្តរូប",
        titleEn: "Symbolic Snipping and Combing",
        detailEn: "The performers (followed by parents and elders) gently snip the air near the hair or take tiny strand ends, placing them into a silver bowl.",
        detailKhmer: "អ្នកសម្តែង រួមទាំងឪពុកម្តាយ និងចាស់ទុំ យកកន្ត្រៃកាត់ចុងសក់បន្តិច ឬកាត់ខ្យល់ ដាក់ក្នុងចានប្រាក់។",
        meaningEn: "Snipping hair represents severing past ill fortunes, childhood selfishness, and lingering grief, leaving only a clean, virtuous slate for marriage.",
        meaningKhmer: "ការកាត់សក់តំណាងឱ្យការកាត់ផ្តាច់នូវទុក្ខសោក ឧបទ្រពចង្រៃពីអតីតកាល ដើម្បីចាប់ផ្តើមជីវិតថ្មីដ៏ភ្លឺស្វាង។"
      },
      {
        stepNumber: 3,
        titleKhmer: "ការស្រោចទឹកអប់ផ្កាម្លិះ និងឆ្លុះកញ្ចក់",
        titleEn: "Perfuming with Jasmine Water & Mirror Inspection",
        detailEn: "Fragrant floral water is sprayed softly over the couple's hair and shoulders. They are given a mirror to smile at their refreshed selves.",
        detailKhmer: "ទឹកអប់ផ្កាម្លិះត្រូវបានបាញ់ថ្នមៗលើសក់ និងស្មា ហើយកូនទាំងពីរត្រូវបានឱ្យឆ្លុះកញ្ចក់មើលភាពស្រស់ស្អាតរបស់ខ្លួន។",
        meaningEn: "Jasmine perfume sweetens their mutual communication; the mirror reflects self-awareness, honesty, and mutual admiration between partners.",
        meaningKhmer: "ក្លិនក្រអូបតំណាងឱ្យពាក្យសំដីផ្អែមល្ហែម ចំណែកកញ្ចក់ឆ្លុះបញ្ចាំងពីសេចក្តីស្មោះត្រង់ និងការយល់ចិត្តគ្នា។"
      }
    ],
    regionalNotesEn: "In Siem Reap, the performers recite extended improvised rhyming poems (Kae Sar) detailing the virtues of the couple's grandparents. In Battambang, guests often shower the couple with perfumed water drops directly from lotus buds.",
    regionalNotesKhmer: "នៅសៀមរាប អ្នកច្រៀងតែងកំណាព្យចុងជួន (កែសារ) កោតសរសើរគុណដូនតា។ នៅបាត់ដំបង ភ្ញៀវតែងយកទងផ្កាឈូកជ្រលក់ទឹកអប់មកប្រោះលើក្បាលកូនទាំងពីរ។",
    mediaPlaceholder: {
      type: "audio-video",
      titleEn: "Field Audio: Oral Chanting of the Hair Cutting Song (Kae Sar)",
      descriptionEn: "Raw cassette/digital field recording of traditional master singers performing the comedic dialogue and sacred blessings during Pithi Kat Sork.",
      recommendedRatio: "4:3",
      image: "/images/kat-sork/ceremony.jpg"
    }
  },
  {
    id: "chorng-dai",
    order: 4,
    titleKhmer: "កិច្ចចងដៃ (ចងអំបោះក្រហម)",
    titleEn: "Chorng Dai",
    translationEn: "Tying the Sacred Red Thread & Knot Blessing",
    phonetic: "Pithi Chorng Dai",
    timeOfDay: "រសៀល • 02:30 PM (Afternoon)",
    summaryEn: "Every guest steps forward to tie spun red cotton threads onto the wrists of the bride and groom while speaking heartfelt wishes of health, prosperity, and endurance.",
    summaryKhmer: "ភ្ញៀវកិត្តិយស និងញាតិមិត្តទាំងអស់អញ្ជើញមកចងអំបោះក្រហមលើកដៃកូនកំលោះកូនក្រមុំ ព្រមទាំងជូនពរឱ្យមានសុខភាពល្អ និងរកស៊ីមានបាន។",
    participants: [
      { roleKhmer: "កូនកំលោះ និងកូនក្រមុំ", roleEn: "Bride & Groom (hands resting on golden blessing cushion)" },
      { roleKhmer: "ឪពុកម្តាយ និងជីដូនជីតា", roleEn: "Parents and Grandparents (first to tie)" },
      { roleKhmer: "បងប្អូន មិត្តភក្តិ និងភ្ញៀវទាំងអស់", roleEn: "Relatives, Lifelong Friends, and All Guests" }
    ],
    sacredItems: [
      { nameKhmer: "អំបោះក្រហមចងដៃ (កប្បាសវេញ)", nameEn: "Spun Red Cotton Blessing Threads (Ksae Krahom)" },
      { nameKhmer: "ខ្នើយមាសទម្រដៃ", nameEn: "Golden Velvet Blessing Cushion" },
      { nameKhmer: "ទឹកមន្ត និងមែកផ្កាស្លា/ម្លិះ", nameEn: "Holy Water Basin with Jasmine & Areca Leaf Sprig" },
      { nameKhmer: "ស្រោមសំបុត្រអំណោយ", nameEn: "Traditional Blessing Gift Envelopes" }
    ],
    steps: [
      {
        stepNumber: 1,
        titleKhmer: "ការដាក់ដៃលើខ្នើយមាសទន្ទឹមគ្នា",
        titleEn: "Placing Clasped Wrists on the Golden Cushion",
        detailEn: "The bride and groom place their wrists forward, palms open or resting gently on the golden silk pillow, ready to receive touch and prayer.",
        detailKhmer: "កូនទាំងពីរដាក់កដៃទន្ទឹមគ្នាលើខ្នើយសូត្រមាស បើកបាតដៃទទួលពរជ័យ និងការប៉ះពាល់ដោយក្តីស្រឡាញ់ពីមនុស្សជុំវិញ។",
        meaningEn: "Open hands signify readiness to receive ancestral wisdom, community support, and shared blessings without pride.",
        meaningKhmer: "បាតដៃបើកចំហតំណាងឱ្យការត្រៀមខ្លួនទទួលយកដំបូន្មាន ការគាំទ្រពីសហគមន៍ និងការបន្ទាបខ្លួន។"
      },
      {
        stepNumber: 2,
        titleKhmer: "ការចងអំបោះក្រហម និងការប្រោះទឹកមន្ត",
        titleEn: "Tying the Sacred Red Thread & Sprinkling Water",
        detailEn: "Guests tie a red spun cotton string around each wrist with a gentle knot, then lightly sprinkle floral water using a sprig.",
        detailKhmer: "ភ្ញៀវយកអំបោះកប្បាសក្រហមមកចងលើកដៃកូនទាំងពីរ ហើយយកមែកផ្កាជ្រលក់ទឹកមន្តប្រោះតិចៗ។",
        meaningEn: "The red cotton thread represents an unbroken lifetime tether (*Ksae Chamroeun*) of health, safety, and mutual devotion that cannot be frayed by hardships.",
        meaningKhmer: "អំបោះក្រហមតំណាងឱ្យចំណងស្នេហ៍ និងចំណងគ្រួសារដ៏រឹងមាំ ដែលមិនអាចកាត់ផ្តាច់បានដោយឧបសគ្គជីវិត។"
      },
      {
        stepNumber: 3,
        titleKhmer: "ការបន្លឺពាក្យជូនពរ៖ សុខ ចម្រើន មានបាន",
        titleEn: "Whispering the Threefold Blessing (Sokh, Chamroeun, Mean Ban)",
        detailEn: "While tying the knot, each person looks into the couple's eyes and speaks: 'Sokh, Chamroeun, Mean Ban, Rork Siy Mean Kael' (Happiness, Prosperity, Abundance, Enduring Fortune).",
        detailKhmer: "ពេលកំពុងចង ភ្ញៀវសម្លឹងមើលកូនទាំងពីរដោយក្តីមេត្តា ហើយពោលពាក្យ៖ 'សុខ ចម្រើន មានបាន រកស៊ីមានកាល ស្នេហ៍ស្មោះដល់ចាស់កោងខ្នង'។",
        meaningEn: "Spoken intentions spoken with sincere love carry karmic power to protect the couple's new journey together.",
        meaningKhmer: "ពាក្យជូនពរចេញពីចិត្តស្មោះមានឥទ្ធិពលផ្លូវចិត្តយ៉ាងជ្រាលជ្រៅក្នុងការការពារដំណើរជីវិតថ្មីរបស់ពួកគេ។"
      }
    ],
    regionalNotesEn: "According to family elder oral history, the red threads must be kept on the wrists for at least three full days after the wedding before untying naturally, ensuring the blessings sink deep into the couple's spirit.",
    regionalNotesKhmer: "យោងតាមការរៀបរាប់របស់ចាស់ទុំ អំបោះក្រហមនេះត្រូវរក្សាទុកលើកដៃយ៉ាងតិច ៣ ថ្ងៃ មិនត្រូវកាត់ចោលផ្តេសផ្តាសឡើយ ដើម្បីឱ្យពរជ័យជ្រាបចូលក្នុងព្រលឹង។",
    mediaPlaceholder: {
      type: "photo",
      titleEn: "Archival Close-Up: Tying the Red Blessing Thread (Pithi Chorng Dai)",
      descriptionEn: "Intimate close-up photograph of wrinkled grandmother's hands tying the red cotton thread onto the bride's wrist over the golden silk cushion.",
      recommendedRatio: "1:1",
      image: "/images/chorng-dai/ceremony.jpg"
    }
  },
  {
    id: "bongvil-popil",
    order: 5,
    titleKhmer: "កិច្ចបង្វិលពពិល",
    titleEn: "Bongvil Popil",
    translationEn: "Passing of the Sacred Candle Smoke Blessing",
    phonetic: "Pithi Bongvil Popil",
    timeOfDay: "រសៀល • 01:30 PM (Early Afternoon)",
    summaryEn: "Happily married elder couples sit in a circle surrounding the bride and groom, passing lit beeswax candles on sacred leaf-shaped holders to envelop the couple in protective smoke.",
    summaryKhmer: "គូស្វាមីភរិយាចាស់ទុំដែលមានសុភមង្គល អង្គុយព័ទ្ធជុំវិញកូនទាំងពីរ ហើយបង្វិលពពិលដោតទៀនក្រមួនឃ្មុំ ព្រមទាំងបក់ផ្សែងជម្រះឧបទ្រព និងផ្តល់ពរ។",
    participants: [
      { roleKhmer: "កូនកំលោះ និងកូនក្រមុំ", roleEn: "Bride & Groom (seated at center)" },
      { roleKhmer: "គូស្វាមីភរិយាចាស់ទុំ (មានសុភមង្គលគង់វង្ស)", roleEn: "Married Elder Couples (Role Models of Enduring Union)" },
      { roleKhmer: "លោកអាចារ្យ", roleEn: "Achar (Directing the circular flow)" }
    ],
    sacredItems: [
      { nameKhmer: "ពពិលប្រាក់ ឬសំរិទ្ធ ៣ ឬ ៧ (រាងស្លឹកពោធិ៍)", nameEn: "3, 7, or 9 Silver Popil (Bodhi-leaf shaped candle holders)" },
      { nameKhmer: "ទៀនក្រមួនឃ្មុំសុទ្ធ", nameEn: "Pure Natural Beeswax Candles" },
      { nameKhmer: "ស្លឹកម្លូសម្រាប់បក់ផ្សែង", nameEn: "Fresh Betel Leaves for Waving Smoke" }
    ],
    steps: [
      {
        stepNumber: 1,
        titleKhmer: "ការអុជទៀន និងបង្វិលតាមទ្រនិចនាឡិកា ៧ ឬ ៩ ជុំ",
        titleEn: "Clockwise Rotation of the Popil (7 or 9 Rounds)",
        detailEn: "The elders pass the Popil from right hand to right hand in a sun-wise direction (Pradaksina) around the couple exactly 7 or 9 times.",
        detailKhmer: "ចាស់ទុំហុចពពិលពីដៃស្តាំទៅដៃស្តាំតាមទិសទ្រនិចនាឡិកា (ប្រទក្សិណ) ព័ទ្ធជុំវិញកូនទាំងពីរចំនួន ៧ ឬ ៩ ជុំ។",
        meaningEn: "The circle of light symbolizes the continuous cycle of solar energy, wholeness, and the protective embrace of the extended community.",
        meaningKhmer: "រង្វង់ពន្លឺតំណាងឱ្យថាមពលព្រះអាទិត្យ ភាពពេញលេញ និងការការពារយ៉ាងកក់ក្តៅពីសហគមន៍។"
      },
      {
        stepNumber: 2,
        titleKhmer: "ការបក់ផ្សែងទៀនចូលកណ្តាល",
        titleEn: "Waving the Fragrant Smoke Toward the Couple",
        detailEn: "As each elder receives the Popil, they use a fresh betel leaf in their left hand to gently fan the sweet beeswax smoke toward the couple's face and heart.",
        detailKhmer: "ពេលកាន់ពពិល ចាស់ទុំយកស្លឹកម្លូបក់ផ្សែងទៀនក្រមួនឃ្មុំថ្នមៗសំដៅទៅទ្រូង និងផ្ទៃមុខរបស់កូនទាំងពីរ។",
        meaningEn: "The sacred smoke purifies the couple's aura, transferring the moral endurance, patience, and fidelity of the elders into their hearts.",
        meaningKhmer: "ផ្សែងបរិសុទ្ធជួយស្រូបយកឧបទ្រពចង្រៃ និងផ្ទេរនូវភាពអត់ធ្មត់ ក្តីស្រឡាញ់ដ៏គង់វង្សពីចាស់ទុំចូលក្នុងដួងចិត្តកូន។"
      },
      {
        stepNumber: 3,
        titleKhmer: "ការពន្លត់ទៀនដោយស្លឹកម្លូនៅជុំចុងក្រោយ",
        titleEn: "Extinguishing the Flame with Betel Leaf on the Final Round",
        detailEn: "On the final round, the Achar uses the betel leaf to smother the candle flame, allowing a thick plume of holy smoke to rise over the couple.",
        detailKhmer: "នៅជុំចុងក្រោយ លោកអាចារ្យយកស្លឹកម្លូសង្កត់ពន្លត់ភ្លើងទៀន ឱ្យផ្សែងហុយឡើងគ្របដណ្តប់លើកូនទាំងពីរ។",
        meaningEn: "Seals the blessings inside the couple, binding their souls (*Prung*) together before the ancestors.",
        meaningKhmer: "ជាការចងព្រលឹង និងផ្សារភ្ជាប់ពរជ័យឱ្យស្ថិតស្ថេរក្នុងខ្លួនកូនទាំងពីរជានិច្ច។"
      }
    ],
    regionalNotesEn: "Tradition strictly requires that the elders passing the Popil must be happily married living spouses whose first union has remained faithful without divorce. In some rural communities, 9 Popil are used; in city settings, 3 or 7 are standard.",
    regionalNotesKhmer: "ទំនៀមទម្លាប់តម្រូវឱ្យអ្នកបង្វិលពពិលជាគូស្វាមីភរិយាដែលរស់នៅជាមួយគ្នាយ៉ាងសុខសាន្តមិនធ្លាប់បែកបាក់។ នៅតាមស្រុកខ្លះប្រើពពិល ៩ ចំណែកទីក្រុងនិយមប្រើ ៣ ឬ ៧។",
    mediaPlaceholder: {
      type: "photo",
      titleEn: "Archival Photo: Circular Passing of the Sacred Popil",
      descriptionEn: "Documentary photograph showing elders seated in a circle fanning lit Popil candle smoke over the bride and groom's bowed heads.",
      recommendedRatio: "16:9",
      image: "/images/bongvil-popil/ceremony.jpg"
    }
  },
  {
    id: "bach-phka-sla",
    order: 6,
    titleKhmer: "កិច្ចបាចផ្កាស្លា និងចូលបន្ទប់ផ្សំដំណេក",
    titleEn: "Bach Phka Sla",
    translationEn: "Scattering Areca Palm Blossoms & Nuptial Chamber Entrance",
    phonetic: "Pithi Bach Phka Sla",
    timeOfDay: "ល្ងាច • 04:30 PM (Late Afternoon / Sunset)",
    summaryEn: "Fragrant white areca palm blossoms are thrown gently over the newlyweds as showers of fertility, peace, and abundance, concluding with entering the bridal chamber.",
    summaryKhmer: "អាចារ្យ និងភ្ញៀវបាចផ្កាស្លាពណ៌សក្រអូបលើកូនកំលោះកូនក្រមុំ ដើម្បីប្រសិទ្ធពរជ័យ មុនពេលមាតាបិតានាំចូលបន្ទប់ផ្សំដំណេក។",
    participants: [
      { roleKhmer: "លោកអាចារ្យ", roleEn: "Achar" },
      { roleKhmer: "កូនកំលោះ និងកូនក្រមុំ", roleEn: "Bride & Groom" },
      { roleKhmer: "មាតាបិតាទាំងសងខាង", roleEn: "Parents (to escort into the bridal chamber)" },
      { roleKhmer: "ភ្ញៀវកិត្តិយស", roleEn: "All Guests" }
    ],
    sacredItems: [
      { nameKhmer: "ផ្កាស្លាស្រស់ពណ៌ស", nameEn: "Fresh White Areca Palm Blossoms (Phka Sla)" },
      { nameKhmer: "ចានប្រាក់រៀបផ្កា", nameEn: "Silver Offering Bowls" },
      { nameKhmer: "គ្រែផ្សំដំណេកតុបតែងដោយផ្កាម្លិះ", nameEn: "Bridal Bed Adorned with Jasmine Garlands & Betel Trays" }
    ],
    steps: [
      {
        stepNumber: 1,
        titleKhmer: "ការបាចផ្កាស្លាលើក្បាលកូនទាំងពីរ",
        titleEn: "Showering the Couple with Areca Palm Blossoms",
        detailEn: "The Achar and guests scoop handfuls of delicate white areca palm petals and toss them gently over the heads of the bride and groom.",
        detailKhmer: "អាចារ្យ និងភ្ញៀវកិត្តិយសចាប់ផ្កាស្លាពណ៌សក្រអូប បាចថ្នមៗលើក្បាល និងស្មារបស់កូនកំលោះកូនក្រមុំ។",
        meaningEn: "Areca blossoms are ancient Khmer symbols of fertility, purity, and sweetness in life. The gentle shower represents heaven's rain of blessings.",
        meaningKhmer: "ផ្កាស្លាជានិិត្តរូបបុរាណនៃភាពបរិសុទ្ធ ភាពត្រជាក់ត្រជុំ និងការបន្តពូជពង្សវង្សត្រកូលប្រកបដោយសេចក្តីសុខ។"
      },
      {
        stepNumber: 2,
        titleKhmer: "ការនាំកូនចូលបន្ទប់ផ្សំដំណេក (ចូលបន្ទប់)",
        titleEn: "Escorting into the Nuptial Chamber",
        detailEn: "The parents lead the newlyweds by the hand into their newly prepared bridal chamber, imparting final private words of marital wisdom.",
        detailKhmer: "ឪពុកម្តាយកាន់ដៃកូនទាំងពីរនាំចូលក្នុងបន្ទប់ផ្សំដំណេកដែលរៀបចំយ៉ាងស្អាត ហើយផ្តល់ដំបូន្មានចុងក្រោយអំពីជីវិតប្តីប្រពន្ធ។",
        meaningEn: "Marks the threshold into domestic independence, mutual trust, and building a peaceful sanctuary together.",
        meaningKhmer: "ជាការឈានចូលដំណាក់កាលថ្មីនៃភាពម្ចាស់ការលើជីវិតគ្រួសារ ការទុកចិត្តគ្នា និងការកសាងសុភមង្គលរួមគ្នា។"
      }
    ],
    regionalNotesEn: "In some rural areas, a happily married elder woman who has many children and grandchildren is invited to prepare the matrimonial pillows beforehand to transfer good fertility and fortune.",
    regionalNotesKhmer: "នៅតាមស្រុកស្រែ គេតែងអញ្ជើញស្ត្រីចាស់ទុំដែលមានកូនចៅច្រើន និងគ្រួសារសុខសាន្ត មកជួយរៀបចំកម្រាលពូក និងខ្នើយ ដើម្បីផ្ទេរសិរីសួស្តី។",
    mediaPlaceholder: {
      type: "photo",
      titleEn: "Archival Photo: Showering with Areca Palm Flowers (Phka Sla)",
      descriptionEn: "Historic photo showing the white mist of flying areca palm blossoms catching the afternoon sunlight over the smiling bride and groom.",
      recommendedRatio: "16:9",
      image: "/images/bach-phka-sla/ceremony.jpg"
    }
  },
  {
    id: "preah-thong-torng-sbai-neang-neak",
    order: 7,
    titleKhmer: "កិច្ចព្រះថោងតោងស្បៃនាងនាគ",
    titleEn: "Preah Thong Torng Sbai Neang Neak",
    translationEn: "Holding the Bride's Sbai",
    phonetic: "Preah Thong Torng Sbai Neang Neak",
    timeOfDay: "ថ្ងៃត្រង់ • 11:30 AM (Midday)",
    summaryEn: "The couple wears traditional royal silk garments. The groom holds the bride's scarf, reenacting the ancient Khmer origin myth of Prince Preah Thong and the Naga Princess Neang Neak.",
    summaryKhmer: "កូនកំលោះកូនក្រមុំស្លៀកសម្លៀកបំពាក់ប្រពៃណីហូលផាមួង។ កូនកំលោះតោងជាយស្បៃកូនក្រមុំ តាមរឿងព្រេងបុរាណព្រះថោងតោងស្បៃនាងនាគ។",
    participants: [
      { roleKhmer: "កូនកំលោះ និងកូនក្រមុំ", roleEn: "Bride & Groom" },
      { roleKhmer: "លោកអាចារ្យ", roleEn: "Achar (Ceremony Master)" },
      { roleKhmer: "មាតាបិតាទាំងសងខាង", roleEn: "Parents of Bride and Groom" },
      { roleKhmer: "សាច់ញាតិជិតស្និទ្ធ", roleEn: "Close Lineage Elders" }
    ],
    sacredItems: [
      { nameKhmer: "សម្លៀកបំពាក់ក្បិនហូល និងស្បៃមាស", nameEn: "Royal Sampot Chang Kben Silk & Golden Embroidered Sabai" },
      { nameKhmer: "ព្រះខ័នរាជ្យ (ដាវជានិមិត្តរូប)", nameEn: "Sacred Ceremonial Dagger (Symbol of Protection)" },
      { nameKhmer: "ជើងពានប្រាក់ដាក់ទៀន និងស្លាធម៌", nameEn: "Silver Pedestal Tray with Candles & Ancestral Slathor" }
    ],
    steps: [
      {
        stepNumber: 1,
        titleKhmer: "ការគោរពព្រះរតនត្រ័យ និងជម្រាបដូនតា",
        titleEn: "Homage to the Triple Gem and Ancestral Spirits",
        detailEn: "The couple lights three incense sticks and bows three times, honoring the Buddha, Dhamma, Sangha, and their departed ancestors.",
        detailKhmer: "កូនទាំងពីរអុជធូប ៣ សរសៃ និងក្រាបសំពះ ៣ ដង ដើម្បីគោរពព្រះពុទ្ធ ព្រះធម៌ ព្រះសង្ឃ និងដូនតាដែលបានចែកឋាន។",
        meaningEn: "Rooted in Buddhist filial piety (Katannu), a marriage succeeds when founded on humility, gratitude, and moral discipline.",
        meaningKhmer: "បង្កប់នូវគុណធម៌កតញ្ញូ ដោយជឿជាក់ថាអាពាហ៍ពិពាហ៍នឹងគង់វង្សបានអាស្រ័យលើសីលធម៌ និងការដឹងគុណ។"
      },
      {
        stepNumber: 2,
        titleKhmer: "ពិធីកូនកំលោះតោងជាយស្បៃកូនក្រមុំ",
        titleEn: "The Groom Holding the Bride's Sabai (Scarf)",
        detailEn: "The groom grasps the golden tail of the bride's scarf as she leads him gently into the ceremonial room.",
        detailKhmer: "កូនកំលោះកាន់ជាយស្បៃមាសរបស់កូនក្រមុំ ខណៈដែលកូនក្រមុំដើរនាំមុខចូលក្នុងរោងពិធី។",
        meaningEn: "Re-enacts Prince Preah Thong holding Princess Neang Neak's tail to descend into the ocean kingdom, acknowledging the matriarchal reverence in Khmer culture.",
        meaningKhmer: "រំឭករឿងព្រេងព្រះថោងតោងស្បៃនាងនាគចុះឋានភុជង្គនាគ បង្ហាញពីការផ្តល់តម្លៃដល់ស្ត្រីក្នុងសង្គមខ្មែរ។"
      },
      {
        stepNumber: 3,
        titleKhmer: "ការកាន់ព្រះខ័នការពារគ្រួសារ",
        titleEn: "The Handing of the Protective Dagger",
        detailEn: "The Achar places a ceremonial silver dagger (replica of Preah Khan) between the couple's clasped hands.",
        detailKhmer: "លោកអាចារ្យប្រគល់ដាវប្រាក់ជានិមិត្តរូប (ព្រះខ័ន) ឱ្យកូនទាំងពីរកាន់រួមគ្នា។",
        meaningEn: "The dagger symbolizes courage, loyalty, and the husband and wife's shared duty to protect the peace and honor of their home.",
        meaningKhmer: "តំណាងឱ្យភាពក្លាហាន ភាពស្មោះត្រង់ និងកាតព្វកិច្ចរួមគ្នាក្នុងការការពារសេចក្តីសុខក្នុងគ្រួសារ។"
      }
    ],
    regionalNotesEn: "In Southern provinces (Takeo, Kampot), the groom traditionally walks around the altar three times before holding the sabai. In diaspora weddings in France and the US, this remains the most emotional, visually iconic moment of cultural identity.",
    regionalNotesKhmer: "នៅខេត្តតាកែវ និងកំពត កូនកំលោះតែងដើរព័ទ្ធរានពិធី ៣ ជុំសិនមុនតោងស្បៃ។ សម្រាប់ខ្មែរនៅក្រៅប្រទេស នេះជាពិធីដ៏ពិសិដ្ឋបំផុតដើម្បីថែរក្សាអត្តសញ្ញាណជាតិ។",
    mediaPlaceholder: {
      type: "photo",
      titleEn: "Archival Photo: Preah Thong Holding the Sabai Scarf",
      descriptionEn: "Historic family photograph capturing the bride in embroidered silk sabai leading the groom holding her trailing sash into the family home.",
      recommendedRatio: "4:3",
      image: "/images/preah-thong-torng-sbai-neang-neak/ceremony.jpg"
    }
  }
];
