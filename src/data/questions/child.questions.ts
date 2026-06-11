import { Question } from "@/types/assessment";

export const childQuestions: Question[] = [
  {
    id: "child-1",
    stage: "child",
    scope: "Interests",
    prompt: "Apa yang paling kamu suka lakukan saat waktu luang?",
    helperText: "Pilih satu yang paling sering kamu lakukan.",
    inputType: "tap-card",
    required: true,
    options: [
      { id: "c1-o1", label: "Menggambar atau mewarnai", value: "art", scoringKeys: [{ trait: "creative", weight: 1 }] },
      { id: "c1-o2", label: "Bermain balok atau lego", value: "build", scoringKeys: [{ trait: "analytical", weight: 1 }] },
      { id: "c1-o3", label: "Membaca buku cerita", value: "read", scoringKeys: [{ trait: "verbal", weight: 1 }] },
      { id: "c1-o4", label: "Berlari dan olahraga", value: "sport", scoringKeys: [{ trait: "kinesthetic", weight: 1 }] }
    ],
    evidenceTags: ["interest_art", "interest_build", "interest_read", "interest_sport"]
  },
  {
    id: "child-2",
    stage: "child",
    scope: "Self-Efficacy",
    prompt: "Seberapa yakin kamu bisa belajar hal baru seperti naik sepeda?",
    inputType: "scale-1-5",
    required: true,
    options: [
      { id: "c2-o1", label: "Sangat tidak yakin", value: 1, scoringKeys: [{ trait: "confidence", weight: -2 }] },
      { id: "c2-o2", label: "Kurang yakin", value: 2, scoringKeys: [{ trait: "confidence", weight: -1 }] },
      { id: "c2-o3", label: "Biasa saja", value: 3, scoringKeys: [{ trait: "confidence", weight: 0 }] },
      { id: "c2-o4", label: "Yakin", value: 4, scoringKeys: [{ trait: "confidence", weight: 1 }] },
      { id: "c2-o5", label: "Sangat yakin", value: 5, scoringKeys: [{ trait: "confidence", weight: 2 }] }
    ],
    evidenceTags: ["confidence_learning"]
  }
];
