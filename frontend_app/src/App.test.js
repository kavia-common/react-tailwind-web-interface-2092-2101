import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App smoke tests (Ocean Professional)', () => {
  test('renders navbar brand/logo', () => {
    render(<App />);
    // Brand text
    expect(screen.getByText(/Ocean Pro/i)).toBeInTheDocument();

    // Visually hidden brand label inside logo (sr-only)
    expect(screen.getAllByText(/Ocean Pro/i).length).toBeGreaterThan(0);
  });

  test('renders hero heading and both CTA buttons', () => {
    render(<App />);

    // Main hero heading
    expect(
      screen.getByRole('heading', {
        name: /build modern web uis with clarity and confidence/i
      })
    ).toBeInTheDocument();

    // Primary CTA - "Get Started"
    // Appears twice (Navbar and Hero), but Hero also has it; we assert at least one is present
    const ctaPrimary = screen.getAllByRole('link', { name: /get started/i });
    expect(ctaPrimary.length).toBeGreaterThan(0);

    // Secondary CTA - "View Features"
    expect(
      screen.getByRole('link', { name: /view features/i })
    ).toBeInTheDocument();
  });

  test('dark mode toggle toggles documentElement "dark" class', () => {
    render(<App />);

    const html = document.documentElement;

    // Initially should not have dark class
    expect(html.classList.contains('dark')).toBe(false);

    // Find the dark mode toggle button; it changes label based on state
    // When light mode, the button label should include "Dark"
    const toggleBtn = screen.getByRole('button', {
      name: /activate dark mode|switch to dark mode|dark/i
    });

    fireEvent.click(toggleBtn);
    expect(html.classList.contains('dark')).toBe(true);

    // After toggling, another button label should include "Light"
    const toggleBackBtn = screen.getByRole('button', {
      name: /activate light mode|switch to light mode|light/i
    });

    fireEvent.click(toggleBackBtn);
    expect(html.classList.contains('dark')).toBe(false);
  });

  test('renders footer copyright and links', () => {
    render(<App />);

    // Copyright text (year is dynamic, so we match static parts)
    expect(screen.getByText(/Ocean Pro\. All rights reserved\./i)).toBeInTheDocument();

    // Footer section headers
    expect(screen.getByText(/Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Company/i)).toBeInTheDocument();
    expect(screen.getByText(/Resources/i)).toBeInTheDocument();

    // Some representative footer links
    expect(screen.getByRole('link', { name: /features/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /pricing/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /docs/i })).toBeInTheDocument();

    // Social links by aria-label
    expect(screen.getByRole('link', { name: /twitter/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
  });
});
