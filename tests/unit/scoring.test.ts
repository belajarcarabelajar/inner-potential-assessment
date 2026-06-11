/**
 * tests/unit/scoring.test.ts
 *
 * Integration-level sanity check for the scoring pipeline.
 * These tests import from the public path (as application code would) and
 * verify end-to-end correctness from raw answers to final DashboardResult.
 *
 * Complements the fine-grained unit tests co-located with the source file at
 * src/data/scoring/scoring-matrix.test.ts.
 */

import { describe, it, expect } from 'vitest';
import { evaluateAnswers } from '../../src/data/scoring/scoring-matrix';

describe('Scoring pipeline – integration', () => {
  it('returns a structurally valid DashboardResult for the "adult" stage', () => {
    const result = evaluateAnswers({}, 'adult');
    expect(result).toMatchObject({
      dominancePattern: expect.any(String),
      radarData: expect.arrayContaining([
        expect.objectContaining({ subject: expect.any(String), A: expect.any(Number), fullMark: 100 }),
      ]),
      tendencies: expect.any(Array),
    });
  });

  it('returns a structurally valid DashboardResult for the "teenager" stage', () => {
    const result = evaluateAnswers({}, 'teenager');
    expect(result).toMatchObject({
      dominancePattern: expect.any(String),
      radarData: expect.any(Array),
      tendencies: expect.any(Array),
    });
  });

  it('produces "Balanced Individual" pattern with no answers across all stages', () => {
    for (const stage of ['child', 'teenager', 'adult']) {
      expect(evaluateAnswers({}, stage).dominancePattern).toBe('Balanced Individual');
    }
  });

  it('full adult answer set produces a Human-Centered dominant pattern', () => {
    const answers = {
      q1: 'Berkomunikasi',
      q2: 'Peduli',
      q3: 'Membimbing',
      q4: 'Membantu orang',
      q5: 'Pendengar',
    };
    const result = evaluateAnswers(answers, 'adult');
    expect(result.dominancePattern).toBe('Human-Centered Contributor');
    expect(result.tendencies[0].id).toBe('human-centered-contributor');
    expect(result.tendencies[0].quality).toBe('High');
  });

  it('radarData length equals exactly 6 (one entry per scoring category)', () => {
    expect(evaluateAnswers({}, 'adult').radarData).toHaveLength(6);
  });

  it('all radarData A values are within [20, 100]', () => {
    const bigAnswers = {
      q1: 'Berkomunikasi', q2: 'Peduli', q3: 'Membimbing',
      q4: 'Membantu orang', q5: 'Pendengar', q6: 'Penengah',
      q7: 'Lembut dan mendukung', q8: 'Menenangkan orang',
    };
    const result = evaluateAnswers(bigAnswers, 'adult');
    result.radarData.forEach(entry => {
      expect(entry.A).toBeGreaterThanOrEqual(20);
      expect(entry.A).toBeLessThanOrEqual(100);
    });
  });
});
