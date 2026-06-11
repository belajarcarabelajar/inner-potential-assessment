export type AssessmentScope = 
  | "Identity"
  | "Stage"
  | "Stage Detail"
  | "Personality Pattern"
  | "Character Strengths"
  | "Interests"
  | "Abilities"
  | "Skills"
  | "Values"
  | "Motivation"
  | "Self-Efficacy"
  | "Energy Pattern"
  | "Learning Pattern"
  | "Decision-Making"
  | "Emotional Pattern"
  | "Social Role"
  | "Environment Fit"
  | "Evidence History"
  | "Transition";

export type EvidenceTag = string;

export type InputType = "scale-1-5" | "yes-no" | "tap-card" | "ranking" | "text" | "dropdown" | "transition" | "swipe-poll";

export type Question = {
  id: string;
  scope: AssessmentScope | string;
  stage: "child" | "teenager" | "adult" | "all";
  prompt?: string;
  prompts?: { child: string; teen: string; adult: string };
  helperText?: string;
  inputType: InputType;
  options?: any[];
  childOptions?: any[];
  teenOptions?: any[];
  adultOptions?: any[];
  scoringSignal?: string;
  evidenceTags?: EvidenceTag[];
  required?: boolean;
};
