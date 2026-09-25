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
