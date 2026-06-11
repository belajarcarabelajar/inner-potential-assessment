import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Progress } from './progress';

describe('Progress', () => {
  it('renders correctly', () => {
    render(<Progress value={50} data-testid="progress-bar" />);
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
  });

  it('translates the indicator based on value', () => {
    render(<Progress value={75} data-testid="progress-bar" />);
    // The indicator is a child element. We can find it by its style or class.
    const indicator = screen.getByTestId('progress-bar').firstElementChild as HTMLElement;
    expect(indicator).toHaveStyle({ transform: 'translateX(-25%)' });
  });

  it('handles null/undefined value gracefully (treats as 0)', () => {
    render(<Progress value={null} data-testid="progress-bar" />);
    const indicator = screen.getByTestId('progress-bar').firstElementChild as HTMLElement;
    expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' });
  });
});
