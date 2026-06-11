import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { AssessmentFlow } from './AssessmentFlow';
import { useAssessmentStore } from '@/store/useAssessmentStore';

vi.mock('react-router', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('@/store/useAssessmentStore', () => ({
  useAssessmentStore: vi.fn(),
}));

// Mock QuestionCard so we don't need to test its internals here
vi.mock('./components/QuestionCard', () => ({
  QuestionCard: ({ question, onNext, onAnswer }: any) => (
    <div data-testid="question-card">
      <p>{question.prompt}</p>
      <button onClick={() => onAnswer('mock-answer')}>Answer Mock</button>
      <button onClick={onNext}>Next Mock</button>
    </div>
  ),
}));

describe('AssessmentFlow', () => {
  let storeState: any;

  beforeEach(() => {
    storeState = {
      currentSlideIndex: 0,
      setSlideIndex: vi.fn(),
      answers: {},
      setAnswer: vi.fn(),
      setUserName: vi.fn(),
      setStage: vi.fn(),
      resetAssessment: vi.fn(),
    };

    vi.mocked(useAssessmentStore).mockImplementation((selector: any) => {
      if (typeof selector === 'function') {
        return selector(storeState);
      }
      return storeState;
    });
  });

  it('renders correctly', () => {
    render(<AssessmentFlow />);
    // Check progress
    expect(screen.getByText(/Progress:/)).toBeInTheDocument();
    // Check mocked question card
    expect(screen.getAllByTestId('question-card')[0]).toBeInTheDocument();
    // Check Next/Prev controls
    expect(screen.getByRole('button', { name: /sebelumnya/i })).toBeDisabled();
  });

  it('handles prev/next controls correctly', () => {
    storeState.currentSlideIndex = 1;
    storeState.answers = { "Q-ID-01": "John" }; // So it thinks it's answered and enables Next
    
    const { rerender } = render(<AssessmentFlow />);
    
    // Prev button should be enabled on slide 1
    const prevBtn = screen.getByRole('button', { name: /sebelumnya/i });
    expect(prevBtn).not.toBeDisabled();
    
    fireEvent.click(prevBtn);
    expect(storeState.setSlideIndex).toHaveBeenCalledWith(0);
  });
  
  it('calls setAnswer when answering', () => {
    render(<AssessmentFlow />);
    const buttons = screen.getAllByRole('button', { name: 'Answer Mock' });
    fireEvent.click(buttons[0]);
    // Assuming Q-ID-01 is the first question in v1Bank
    expect(storeState.setAnswer).toHaveBeenCalled();
  });
});

import { fireEvent } from '@testing-library/react';
