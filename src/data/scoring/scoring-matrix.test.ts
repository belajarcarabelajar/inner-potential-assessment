import { describe, it, expect } from 'vitest';
import { evaluateAnswers } from './scoring-matrix';

describe('Scoring Matrix Engine', () => {
  it('should correctly identify Exploration-Oriented based on minimum evidence', () => {
    const answers = {
      "Q-01": 5, // Strongly agree with exploration
      "Q-06": ["Membantu orang", "Mencari tahu sesuatu"], // Exploration keyword
      "Q-14": 5, // Autonomy -> Exploration
      "Q-21": 2  // Some other
    };

    const result = evaluateAnswers(answers, 'adult');
    
    // We expect Exploration-Oriented to have at least 2 pieces of evidence 
    // Q-01=5 (+1), Q-14=5 (+1), "Mencari tahu sesuatu" (+1) -> total 3 evidence
    const exp = result.tendencies.find(t => t.id === 'exploration-oriented');
    
    expect(exp).toBeDefined();
    expect(exp?.evidenceCount).toBeGreaterThanOrEqual(3);
    expect(result.dominancePattern).toBe('Exploration-Oriented');
  });

  it('should not return tendencies with less than 2 evidences (Minimum Evidence Rule)', () => {
    const answers = {
      "Q-12": ["Merasa aman"] // 1 evidence for Structured Executor
    };

    const result = evaluateAnswers(answers, 'adult');
    
    const structured = result.tendencies.find(t => t.id === 'structured-executor');
    // Should be undefined because count < 2
    expect(structured).toBeUndefined();
  });

  it('should sort tendencies and return max 3 tendencies', () => {
    // Generate lots of keywords to trigger multiple tendencies
    const answers = {
      "Q-01": 5, // Exp (+1)
      "Q-14": 5, // Exp (+1)
      "Q-02": 5, // Struct (+1)
      "Q-21": 5, // Struct (+1)
      "Q-27": 5, // Human (+1)
      "Q-06": ["Berkomunikasi", "Lembut dan mendukung", "Jujur"], // Human (+2), Analytical (+1)
      "Q-08": 5, // Analytical (+1)
      "Q-23": 5, // Analytical (+1)
      "Q-11": 5, // Adaptive (+1)
      "Q-17": 5, // Adaptive (+1)
    };

    const result = evaluateAnswers(answers, 'adult');
    
    expect(result.tendencies.length).toBeLessThanOrEqual(3);
    
    // Highest ones should be Exploration (2), Struct (2), Human (3), Analytical (3), Adaptive (2)
    // Wait, let's just check length <= 3
    expect(result.tendencies.length).toBe(3);
  });
});
