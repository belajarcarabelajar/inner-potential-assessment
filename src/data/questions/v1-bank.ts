import { Question } from "@/types/assessment";

export const v1Bank: Question[] = [
  // --- A. Identity Section ---
  {
    id: "Q-ID-01",
    scope: "Identity",
    stage: "all",
    inputType: "text",
    prompt: "Siapa nama kamu?",
    required: true,
  },
  {
    id: "Q-ID-02",
    scope: "Stage",
    stage: "all",
    inputType: "dropdown",
    prompt: "Kamu ingin mengisi assessment sebagai siapa?",
    options: ["Anak", "Remaja", "Dewasa"],
    required: true,
  },
  {
    id: "Q-ID-03",
    scope: "Stage Detail",
    stage: "all",
    inputType: "dropdown",
    prompt: "Pilih kategori spesifik:",
    childOptions: ["Kelas 1–3 SD", "Kelas 4–6 SD"],
    teenOptions: ["SMP", "SMA/SMK", "Gap year"],
    adultOptions: ["Mahasiswa", "Fresh graduate", "Profesional", "Orang tua", "Lainnya"],
    required: true,
  },

  // --- B. Core Question Bank ---
  // Transition 1
  {
    id: "TR-01",
    scope: "Personality Pattern",
    stage: "all",
    inputType: "transition",
    prompt: "Sekarang kita melihat pola perilaku kamu. Jawab berdasarkan kebiasaan yang paling sering terjadi, bukan versi ideal dari diri kamu.",
  },
  {
    id: "Q-01",
    scope: "Personality Pattern",
    stage: "all",
    inputType: "scale-1-5",
    scoringSignal: "Openness / Exploration",
    prompts: {
      child: "Aku suka mencoba kegiatan baru walaupun belum pernah melakukannya.",
      teen: "Saya tertarik mencoba hal baru walaupun belum yakin akan langsung bisa.",
      adult: "Saya cenderung terbuka mencoba pendekatan baru ketika menghadapi situasi baru."
    }
  },
  {
    id: "Q-02",
    scope: "Personality Pattern",
    stage: "all",
    inputType: "scale-1-5",
    scoringSignal: "Conscientiousness / Follow-through",
    prompts: {
      child: "Kalau aku mulai mengerjakan sesuatu, aku berusaha menyelesaikannya sampai selesai.",
      teen: "Kalau saya sudah memulai sesuatu, saya biasanya berusaha menyelesaikannya.",
      adult: "Saya cenderung menyelesaikan komitmen yang sudah saya mulai."
    }
  },
  {
    id: "Q-03",
    scope: "Personality Pattern",
    stage: "all",
    inputType: "tap-card",
    scoringSignal: "Social Energy",
    prompts: {
      child: "Setelah bermain atau belajar bersama banyak orang, biasanya aku merasa...",
      teen: "Setelah berada di situasi sosial yang ramai, biasanya saya merasa...",
      adult: "Setelah berinteraksi dengan banyak orang, biasanya saya merasa..."
    },
    options: ["Lebih berenergi", "Biasa saja", "Butuh waktu sendiri"]
  },

  // Transition 2
  {
    id: "TR-02",
    scope: "Character Strengths",
    stage: "all",
    inputType: "transition",
    prompt: "Sekarang kita melihat hal yang terasa menarik dan cukup alami buat kamu. Tidak ada jawaban benar atau salah.",
  },
  {
    id: "Q-04",
    scope: "Character Strengths",
    stage: "all",
    inputType: "ranking",
    scoringSignal: "Strength Preference",
    prompts: {
      child: "Pilih 3 hal yang paling sering kamu lakukan.",
      teen: "Pilih 3 hal yang paling menggambarkan dirimu.",
      adult: "Pilih 3 kekuatan yang paling sering muncul dalam perilakumu."
    },
    options: ["Ingin tahu", "Berani mencoba", "Peduli", "Jujur", "Suka memimpin", "Teliti", "Kreatif", "Suka membantu"]
  },
  {
    id: "Q-05",
    scope: "Character Strengths",
    stage: "all",
    inputType: "scale-1-5",
    scoringSignal: "Integrity / Authenticity",
    prompts: {
      child: "Aku lebih suka berkata jujur walaupun kadang tidak mudah.",
      teen: "Saya berusaha jujur walaupun situasinya membuat saya tidak nyaman.",
      adult: "Saya cenderung memilih kejujuran meskipun ada konsekuensi yang kurang nyaman."
    }
  },
  {
    id: "Q-06",
    scope: "Interests",
    stage: "all",
    inputType: "ranking",
    scoringSignal: "RIASEC Interest Direction",
    prompts: {
      child: "Pilih 3 kegiatan yang paling kamu suka.",
      teen: "Pilih 3 aktivitas yang paling menarik bagimu.",
      adult: "Pilih 3 aktivitas yang paling membuatmu tertarik."
    },
    options: ["Membuat sesuatu dengan tangan", "Menyelidiki/mencari tahu", "Menggambar/berkreasi", "Membantu orang", "Memimpin/menjual ide", "Mengatur data/daftar"]
  },
  {
    id: "Q-07",
    scope: "Interests",
    stage: "all",
    inputType: "tap-card",
    scoringSignal: "Interest Energy",
    prompts: {
      child: "Saat punya waktu bebas, aku lebih suka...",
      teen: "Saat punya waktu bebas, saya lebih tertarik untuk...",
      adult: "Saat memiliki ruang bebas, saya cenderung memilih aktivitas yang berhubungan dengan..."
    },
    options: ["Membuat atau memperbaiki sesuatu", "Mencari tahu sesuatu", "Membuat karya", "Membantu orang", "Mengajak orang", "Mengatur sesuatu"]
  },
  {
    id: "Q-08",
    scope: "Abilities",
    stage: "all",
    inputType: "scale-1-5",
    scoringSignal: "Learning Ability",
    prompts: {
      child: "Aku bisa memahami hal baru jika diberi contoh yang jelas.",
      teen: "Saya bisa memahami hal baru jika penjelasannya jelas dan saya diberi kesempatan mencoba.",
      adult: "Saya dapat mempelajari kemampuan baru jika prosesnya jelas dan terstruktur."
    }
  },
  {
    id: "Q-09",
    scope: "Abilities",
    stage: "all",
    inputType: "tap-card",
    scoringSignal: "Ability Mode",
    prompts: {
      child: "Aku paling mudah menunjukkan kemampuan saat...",
      teen: "Saya paling mudah menunjukkan kemampuan saat...",
      adult: "Saya biasanya menunjukkan kemampuan terbaik saat..."
    },
    options: ["Menjelaskan ide", "Memecahkan masalah", "Membuat karya", "Mengatur langkah", "Membantu orang", "Mengambil keputusan"]
  },
  {
    id: "Q-10",
    scope: "Skills",
    stage: "all",
    inputType: "ranking",
    scoringSignal: "Current Skill Evidence",
    prompts: {
      child: "Pilih hal yang paling sering kamu lakukan dengan cukup baik.",
      teen: "Pilih kemampuan yang sudah cukup sering kamu gunakan.",
      adult: "Pilih keterampilan yang sudah terlihat dalam aktivitas nyata."
    },
    options: ["Berkomunikasi", "Menulis", "Menghitung", "Menggambar/desain", "Mengorganisasi", "Menganalisis", "Membimbing", "Menggunakan teknologi"]
  },
  {
    id: "Q-11",
    scope: "Skills",
    stage: "all",
    inputType: "scale-1-5",
    scoringSignal: "Skill Confidence",
    prompts: {
      child: "Aku merasa punya hal yang bisa kulakukan lebih baik dari beberapa teman.",
      teen: "Saya merasa punya beberapa kemampuan yang mulai terlihat dibandingkan orang sekitar.",
      adult: "Saya memiliki beberapa keterampilan yang sudah terbukti berguna dalam kehidupan nyata."
    }
  },
  {
    id: "Q-12",
    scope: "Values",
    stage: "all",
    inputType: "ranking",
    scoringSignal: "Value Priority",
    prompts: {
      child: "Pilih 3 hal yang paling penting buat kamu.",
      teen: "Pilih 3 hal yang paling penting dalam hidupmu sekarang.",
      adult: "Pilih 3 nilai yang paling penting dalam hidup dan keputusanmu."
    },
    options: ["Bebas memilih", "Merasa aman", "Menjadi ahli", "Membantu orang", "Diakui", "Punya uang cukup", "Berkarya", "Hidup tenang"]
  },
  {
    id: "Q-13",
    scope: "Values",
    stage: "all",
    inputType: "tap-card",
    scoringSignal: "Value Conflict",
    prompts: {
      child: "Kalau harus memilih, aku lebih suka...",
      teen: "Kalau harus memilih, saya lebih memilih...",
      adult: "Jika harus memilih, saya lebih condong pada..."
    },
    options: ["Kebebasan tapi lebih tidak pasti", "Keamanan tapi lebih terbatas", "Tantangan besar", "Ketenangan stabil"]
  },

  // Transition 3
  {
    id: "TR-03",
    scope: "Motivation",
    stage: "all",
    inputType: "transition",
    prompt: "Sekarang kita melihat apa yang membuat kamu bergerak, yakin, dan mau mencoba. Jawab berdasarkan pengalaman nyata.",
  },
  {
    id: "Q-14",
    scope: "Motivation",
    stage: "all",
    inputType: "scale-1-5",
    scoringSignal: "Autonomy Motivation",
    prompts: {
      child: "Aku lebih semangat kalau boleh memilih cara mengerjakannya.",
      teen: "Saya lebih termotivasi ketika punya ruang untuk memilih cara kerja sendiri.",
      adult: "Motivasi saya meningkat ketika saya memiliki otonomi dalam menentukan pendekatan."
    }
  },
  {
    id: "Q-15",
    scope: "Motivation",
    stage: "all",
    inputType: "tap-card",
    scoringSignal: "Motivation Driver",
    prompts: {
      child: "Aku paling semangat saat...",
      teen: "Saya paling termotivasi saat...",
      adult: "Saya paling terdorong ketika..."
    },
    options: ["Bisa memilih sendiri", "Merasa makin mampu", "Bekerja dengan orang yang cocok", "Ada target jelas", "Ada hasil nyata"]
  },
  {
    id: "Q-16",
    scope: "Self-Efficacy",
    stage: "all",
    inputType: "scale-1-5",
    scoringSignal: "Challenge Confidence",
    prompts: {
      child: "Kalau mendapat tugas sulit, aku percaya bisa belajar pelan-pelan.",
      teen: "Saat menghadapi hal sulit, saya percaya bisa mempelajarinya bertahap.",
      adult: "Saat menghadapi tantangan baru, saya percaya dapat membangun kemampuan secara bertahap."
    }
  },
  {
    id: "Q-17",
    scope: "Self-Efficacy",
    stage: "all",
    inputType: "scale-1-5",
    scoringSignal: "Recovery Confidence",
    prompts: {
      child: "Kalau gagal, aku bisa mencoba lagi setelah menenangkan diri.",
      teen: "Ketika gagal, saya bisa bangkit dan mencoba pendekatan lain.",
      adult: "Ketika mengalami kegagalan, saya mampu memulihkan diri dan menyesuaikan strategi."
    }
  },

  // Transition 4
  {
    id: "TR-04",
    scope: "Energy Pattern",
    stage: "all",
    inputType: "transition",
    prompt: "Sekarang kita melihat cara kamu belajar dan aktivitas yang memengaruhi energi kamu. Pilih jawaban yang paling sering terjadi.",
  },
  {
    id: "Q-18",
    scope: "Energy Pattern",
    stage: "all",
    inputType: "tap-card",
    scoringSignal: "Energy Source",
    prompts: {
      child: "Kegiatan yang paling membuatku bersemangat adalah...",
      teen: "Aktivitas yang paling memberi saya energi adalah...",
      adult: "Saya merasa paling berenergi ketika melakukan aktivitas yang melibatkan..."
    },
    options: ["Bergerak/aksi langsung", "Berpikir mendalam", "Membuat karya", "Bicara dengan orang", "Menyusun rencana", "Membantu orang"]
  },
  {
    id: "Q-19",
    scope: "Energy Pattern",
    stage: "all",
    inputType: "tap-card",
    scoringSignal: "Energy Drain",
    prompts: {
      child: "Aku paling cepat lelah kalau...",
      teen: "Saya paling mudah merasa terkuras saat...",
      adult: "Energi saya paling cepat turun ketika..."
    },
    options: ["Terlalu banyak aturan", "Terlalu banyak orang", "Terlalu banyak ketidakpastian", "Terlalu lama sendiri", "Tugas terlalu berulang", "Tugas tidak jelas"]
  },
  {
    id: "Q-20",
    scope: "Learning Pattern",
    stage: "all",
    inputType: "tap-card",
    scoringSignal: "Learning Mode",
    prompts: {
      child: "Aku paling mudah belajar kalau...",
      teen: "Saya paling mudah memahami sesuatu ketika...",
      adult: "Saya paling efektif belajar ketika..."
    },
    options: ["Melihat contoh", "Mencoba langsung", "Mendengar penjelasan", "Membaca ringkasan", "Berdiskusi", "Mengulang latihan"]
  },
  {
    id: "Q-21",
    scope: "Learning Pattern",
    stage: "all",
    inputType: "scale-1-5",
    scoringSignal: "Practice Persistence",
    prompts: {
      child: "Aku bisa belajar lebih baik kalau diberi waktu latihan.",
      teen: "Saya memahami sesuatu lebih baik setelah latihan beberapa kali.",
      adult: "Pemahaman saya meningkat ketika saya punya ruang untuk praktik dan mengulang."
    }
  },

  // Transition 5
  {
    id: "TR-05",
    scope: "Decision-Making",
    stage: "all",
    inputType: "transition",
    prompt: "Sekarang kita melihat cara kamu memilih, merespons tekanan, dan kembali stabil. Ini bukan diagnosis.",
  },
  {
    id: "Q-22",
    scope: "Decision-Making",
    stage: "all",
    inputType: "tap-card",
    scoringSignal: "Decision Style",
    prompts: {
      child: "Kalau harus memilih, aku biasanya...",
      teen: "Ketika harus mengambil keputusan, saya biasanya...",
      adult: "Saat mengambil keputusan, saya cenderung..."
    },
    options: ["Memikirkan dulu", "Bertanya pada orang lain", "Mengikuti perasaan", "Melihat data/fakta", "Mencoba lalu memperbaiki"]
  },
  {
    id: "Q-23",
    scope: "Decision-Making",
    stage: "all",
    inputType: "scale-1-5",
    scoringSignal: "Decision Confidence",
    prompts: {
      child: "Aku bisa memilih sendiri kalau pilihannya jelas.",
      teen: "Saya bisa mengambil keputusan lebih baik jika pilihan dan risikonya jelas.",
      adult: "Saya lebih percaya diri mengambil keputusan ketika informasi dan konsekuensinya jelas."
    }
  },
  {
    id: "Q-24",
    scope: "Emotional Pattern",
    stage: "all",
    inputType: "tap-card",
    scoringSignal: "Stress Response",
    prompts: {
      child: "Saat merasa tertekan, aku biasanya...",
      teen: "Saat merasa tertekan, saya biasanya...",
      adult: "Ketika berada di bawah tekanan, respons awal saya biasanya..."
    },
    options: ["Diam dulu", "Mencari bantuan", "Langsung bertindak", "Menunda sebentar", "Mencari penjelasan", "Merasa bingung"]
  },
  {
    id: "Q-25",
    scope: "Emotional Pattern",
    stage: "all",
    inputType: "scale-1-5",
    scoringSignal: "Emotional Recovery",
    prompts: {
      child: "Setelah kesal atau kecewa, aku bisa kembali tenang.",
      teen: "Setelah kecewa atau stres, saya bisa kembali stabil.",
      adult: "Setelah mengalami tekanan emosional, saya mampu kembali stabil dalam waktu yang wajar."
    }
  },

  // Transition 6
  {
    id: "TR-06",
    scope: "Social Role",
    stage: "all",
    inputType: "transition",
    prompt: "Sekarang kita melihat lingkungan dan peran sosial yang membuat kamu bekerja lebih baik. Pilih yang paling mendekati.",
  },
  {
    id: "Q-26",
    scope: "Social Role",
    stage: "all",
    inputType: "tap-card",
    scoringSignal: "Group Role",
    prompts: {
      child: "Saat kerja kelompok, aku biasanya...",
      teen: "Dalam kerja kelompok, saya biasanya...",
      adult: "Dalam kerja tim, saya cenderung mengambil peran sebagai..."
    },
    options: ["Pemimpin", "Pemberi ide", "Pengatur tugas", "Pendengar", "Penengah", "Pelaksana utama"]
  },
  {
    id: "Q-27",
    scope: "Social Role",
    stage: "all",
    inputType: "scale-1-5",
    scoringSignal: "Collaboration Fit",
    prompts: {
      child: "Aku bisa bekerja sama kalau orang lain mendengarkan pendapatku.",
      teen: "Saya bisa bekerja sama dengan baik jika komunikasi di kelompok terasa jelas dan saling menghargai.",
      adult: "Saya bekerja lebih efektif dalam tim ketika peran, komunikasi, dan ekspektasi jelas."
    }
  },
  {
    id: "Q-28",
    scope: "Environment Fit",
    stage: "all",
    inputType: "tap-card",
    scoringSignal: "Environment Preference",
    prompts: {
      child: "Aku paling nyaman belajar di tempat yang...",
      teen: "Saya paling nyaman belajar atau bekerja di lingkungan yang...",
      adult: "Saya bekerja paling baik dalam lingkungan yang..."
    },
    options: ["Tenang", "Ramai", "Terstruktur", "Fleksibel", "Banyak arahan", "Banyak kebebasan"]
  },
  {
    id: "Q-29",
    scope: "Environment Fit",
    stage: "all",
    inputType: "tap-card",
    scoringSignal: "Feedback Preference",
    prompts: {
      child: "Aku paling suka diberi masukan dengan cara...",
      teen: "Saya lebih mudah menerima masukan ketika...",
      adult: "Saya paling responsif terhadap umpan balik yang..."
    },
    options: ["Lembut dan mendukung", "Jelas dan langsung", "Pakai contoh", "Diberi waktu memperbaiki", "Dibahas empat mata"]
  },

  // Transition 7
  {
    id: "TR-07",
    scope: "Evidence History",
    stage: "all",
    inputType: "transition",
    prompt: "Sekarang kita melihat bukti dari pengalaman nyata. Bagian ini membantu sistem menghindari kesimpulan yang terlalu cepat.",
  },
  {
    id: "Q-30",
    scope: "Evidence History",
    stage: "all",
    inputType: "ranking",
    scoringSignal: "Real-Life Evidence",
    prompts: {
      child: "Pilih 3 hal yang sering dikatakan orang tentang kamu.",
      teen: "Pilih 3 hal yang sering orang lain lihat dari dirimu.",
      adult: "Pilih 3 pola yang sering muncul dari pengalaman nyata atau feedback orang lain."
    },
    options: ["Cepat paham", "Kreatif", "Bisa dipercaya", "Suka membantu", "Berani tampil", "Teliti", "Punya ide", "Bisa memimpin", "Tekun"]
  },
  {
    id: "Q-31",
    scope: "Evidence History",
    stage: "all",
    inputType: "yes-no",
    scoringSignal: "Repeated Evidence",
    prompts: {
      child: "Pernahkah kamu sering dipuji karena hal yang sama lebih dari satu kali?",
      teen: "Apakah kamu pernah mendapat feedback positif yang sama berulang kali?",
      adult: "Apakah ada pola kekuatan yang berulang dalam pengalaman, pencapaian, atau feedback orang lain?"
    },
    options: ["yes", "no"]
  },
  {
    id: "Q-32",
    scope: "Evidence History",
    stage: "all",
    inputType: "tap-card",
    scoringSignal: "Effortless Strength",
    prompts: {
      child: "Hal yang terasa mudah bagiku, tapi sulit bagi beberapa teman, biasanya berhubungan dengan...",
      teen: "Hal yang terasa cukup natural bagi saya, tapi tidak mudah bagi semua orang, biasanya berhubungan dengan...",
      adult: "Kemampuan yang terasa relatif natural bagi saya, namun tidak selalu mudah bagi orang lain, biasanya berkaitan dengan..."
    },
    options: ["Memahami ide", "Menjelaskan", "Membuat karya", "Mengatur", "Menenangkan orang", "Menyelesaikan masalah", "Mengambil tindakan"]
  }
];
