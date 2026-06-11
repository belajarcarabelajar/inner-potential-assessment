import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StageSelection } from './StageSelection';

// Mock the Zustand store
vi.mock('@/store/useAssessmentStore', () => ({
  useAssessmentStore: vi.fn(),
}));

import { useAssessmentStore } from '@/store/useAssessmentStore';

describe('StageSelection', () => {
  it('renders correctly', () => {
    vi.mocked(useAssessmentStore).mockReturnValue(vi.fn()); // Mock setStage

    render(<StageSelection />);
    expect(screen.getByText('Pilih Kategori')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /anak-anak/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remaja/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /dewasa/i })).toBeInTheDocument();
  });

  it('calls setStage with correct argument when clicked', () => {
    const setStageMock = vi.fn();
    vi.mocked(useAssessmentStore).mockImplementation((selector) => {
      // Mock the store state passed to the selector
      return selector({ setStage: setStageMock } as any);
    });

    render(<StageSelection />);
    
    fireEvent.click(screen.getByRole('button', { name: /anak-anak/i }));
    expect(setStageMock).toHaveBeenCalledWith('child');

    fireEvent.click(screen.getByRole('button', { name: /remaja/i }));
    expect(setStageMock).toHaveBeenCalledWith('teenager');

    fireEvent.click(screen.getByRole('button', { name: /dewasa/i }));
    expect(setStageMock).toHaveBeenCalledWith('adult');
  });
});
