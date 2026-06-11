import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Slider } from './slider';

describe('Slider', () => {
  it('renders correctly', () => {
    // Radix slider renders a container with role="slider"
    render(<Slider defaultValue={[50]} max={100} step={1} aria-label="test-slider" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('sets initial value correctly', () => {
    render(<Slider defaultValue={[75]} max={100} step={1} aria-label="test-slider" />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '75');
  });

  it('can be disabled', () => {
    render(<Slider defaultValue={[50]} disabled aria-label="test-slider" />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('data-disabled');
  });
});
