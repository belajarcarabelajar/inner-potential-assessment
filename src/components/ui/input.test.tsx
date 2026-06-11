import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Input } from './input';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('handles user input', async () => {
    render(<Input aria-label="test-input" />);
    const input = screen.getByLabelText('test-input');
    await userEvent.type(input, 'hello');
    expect(input).toHaveValue('hello');
  });

  it('can be disabled', () => {
    render(<Input disabled aria-label="test-input" />);
    expect(screen.getByLabelText('test-input')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Input className="custom-input" aria-label="test-input" />);
    expect(screen.getByLabelText('test-input')).toHaveClass('custom-input');
  });
});
