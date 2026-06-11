import { Question } from "@/types/assessment";

export const teenQuestions: Question[] = [
  {
    id: "teen-1",
    stage: "teenager",
    scope: "Motivation",
    prompt: "Apa yang membuatmu paling semangat saat mengerjakan tugas sekolah atau proyek?",
    inputType: "swipe-poll",
    required: true,
    options: [
      { id: "t1-o1", label: "Mendapat nilai yang bagus", value: "grades", scoringKeys: [{ trait: "extrinsic_reward", weight: 1 }] },
      { id: "t1-o2", label: "Mempelajari hal yang benar-benar baru", value: "curiosity", scoringKeys: [{ trait: "intrinsic_curiosity", weight: 1 }] },
      { id: "t1-o3", label: "Bekerja sama dengan teman-teman", value: "social", scoringKeys: [{ trait: "social_driven", weight: 1 }] }
    ],
    evidenceTags: ["motivation_extrinsic", "motivation_intrinsic", "motivation_social"]
  },
  {
    id: "teen-2",
    stage: "teenager",
    scope: "Personality Pattern",
    prompt: "Apakah kamu merasa lebih bersemangat setelah berkumpul dengan banyak orang?",
    inputType: "yes-no",
    required: true,
    options: [
      { id: "t2-y", label: "Ya", value: true, scoringKeys: [{ trait: "extroversion", weight: 1 }] },
      { id: "t2-n", label: "Tidak", value: false, scoringKeys: [{ trait: "introversion", weight: 1 }] }
    ],
    evidenceTags: ["social_energy"]
  }
];
