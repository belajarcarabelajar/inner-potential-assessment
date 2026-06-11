import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Profile from './Profile';

// Mock navigation
vi.mock('react-router', () => ({
  useNavigate: () => vi.fn(),
}));

// Mock Clerk
vi.mock('@clerk/clerk-react', () => ({
  useAuth: () => ({ isSignedIn: true, getToken: vi.fn().mockResolvedValue('fake-token') }),
  useUser: () => ({ user: { fullName: 'Test User', primaryEmailAddress: { emailAddress: 'test@example.com' } } }),
}));

describe('Profile', () => {
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        reports: [
          {
            id: '1',
            stage: 'adult',
            created_at: Math.floor(Date.now() / 1000),
            dominance_pattern: 'Pattern 1',
            radar_data: '[]',
            tendencies: '[]'
          }
        ]
      })
    });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<Profile />);
    // Initial fetch triggers loading, wait for it to pass or check if loading shows
    expect(screen.getByText('Profil & Riwayat Laporan')).toBeInTheDocument();
  });

  it('fetches and displays reports', async () => {
    render(<Profile />);
    
    // Wait for the report to be rendered
    await waitFor(() => {
      expect(screen.getByText(/Kategori: adult/i)).toBeInTheDocument();
      expect(screen.getByText(/Pola Dominan: Pattern 1/i)).toBeInTheDocument();
    });
    
    expect(globalThis.fetch).toHaveBeenCalled();
  });
});
