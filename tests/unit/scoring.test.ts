import { describe, it, expect } from 'vitest';
import { evaluateAnswers } from '../../src/data/scoring/scoring-matrix';

describe('Scoring Matrix Logic', () => {
  it('should return default tendencies for empty answers', () => {
    const result = evaluateAnswers({}, 'adult');
    expect(result.tendencies[0].quality).toBe('Low');
    expect(result.dominancePattern).toBe('Autonomous Creator');
  });

  it('should calculate higher evidence quality for complete answers', () => {
    const mockAnswers = {
      "adult-1": "integrity",
      "adult-2": 4
    };
    const result = evaluateAnswers(mockAnswers, 'adult');
    expect(result.tendencies[0].quality).toBe('High');
  });
});
