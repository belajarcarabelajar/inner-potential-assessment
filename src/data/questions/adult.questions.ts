import { Question } from "@/types/assessment";

export const adultQuestions: Question[] = [
  {
    id: "adult-1",
    stage: "adult",
    scope: "Values",
    prompt: "Dalam lingkungan kerja, apa yang paling tidak bisa Anda toleransi?",
    helperText: "Pilih nilai yang paling bertentangan dengan prinsip Anda.",
    inputType: "ranking",
    required: true,
    options: [
      { id: "a1-o1", label: "Ketidakjujuran dan politik kantor", value: "integrity", scoringKeys: [{ trait: "value_integrity", weight: 2 }] },
      { id: "a1-o2", label: "Kurangnya kebebasan berkreasi", value: "autonomy", scoringKeys: [{ trait: "value_autonomy", weight: 2 }] },
      { id: "a1-o3", label: "Tidak ada jalur karir yang jelas", value: "growth", scoringKeys: [{ trait: "value_growth", weight: 2 }] }
    ],
    evidenceTags: ["core_values"]
  },
  {
    id: "adult-2",
    stage: "adult",
    scope: "Energy Pattern",
    prompt: "Seberapa cepat energi Anda terkuras saat harus menghadapi konflik langsung?",
    inputType: "scale-1-5",
    required: true,
    options: [
      { id: "a2-o1", label: "Sangat lambat (Saya siap)", value: 1, scoringKeys: [{ trait: "conflict_tolerance", weight: 2 }] },
      { id: "a2-o2", label: "Lambat", value: 2, scoringKeys: [{ trait: "conflict_tolerance", weight: 1 }] },
      { id: "a2-o3", label: "Biasa saja", value: 3, scoringKeys: [{ trait: "conflict_tolerance", weight: 0 }] },
      { id: "a2-o4", label: "Cepat", value: 4, scoringKeys: [{ trait: "conflict_tolerance", weight: -1 }] },
      { id: "a2-o5", label: "Sangat cepat (Saya menghindar)", value: 5, scoringKeys: [{ trait: "conflict_tolerance", weight: -2 }] }
    ],
    evidenceTags: ["energy_conflict"]
  }
];
