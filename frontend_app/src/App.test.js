import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

describe('App smoke tests (Ocean Professional)', () => {
  test('renders navbar brand/logo scoped to banner', () => {
    render(<App />);
    // Scope to the banner/header landmark (Navbar is rendered inside header)
    const banner = screen.getByRole('banner');
    // Brand text within banner (specifically the visible brand span, avoid sr-only duplicate)
    expect(within(banner).getByText(/Ocean Pro/i, { selector: 'span' })).toBeInTheDocument();
    // Visually hidden brand label or other repeated brand instances still present within banner
    expect(within(banner).getAllByText(/Ocean Pro/i).length).toBeGreaterThan(0);
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

    // Use an unambiguous selector: locate all buttons that could toggle dark mode and click the first
    const darkButtons = screen.getAllByRole('button', {
      name: /activate dark mode|switch to dark mode|dark/i
    });
    fireEvent.click(darkButtons[0]);

    expect(html.classList.contains('dark')).toBe(true);

    // Toggle back to light using similarly broad selector
    const lightButtons = screen.getAllByRole('button', {
      name: /activate light mode|switch to light mode|light/i
    });
    fireEvent.click(lightButtons[0]);

    expect(html.classList.contains('dark')).toBe(false);
  });

  test('renders footer copyright and links scoped to contentinfo', () => {
    render(<App />);

    // Scope to footer/contentinfo landmark
    const footer = screen.getByRole('contentinfo');

    // Copyright text (year is dynamic, so we match static parts)
    expect(within(footer).getByText(/Ocean Pro\. All rights reserved\./i)).toBeInTheDocument();

    // Footer section headers
    expect(within(footer).getByText(/Product/i)).toBeInTheDocument();
    expect(within(footer).getByText(/Company/i)).toBeInTheDocument();
    expect(within(footer).getByText(/Resources/i)).toBeInTheDocument();

    // Some representative footer links
    expect(within(footer).getByRole('link', { name: /features/i })).toBeInTheDocument();
    expect(within(footer).getByRole('link', { name: /pricing/i })).toBeInTheDocument();
    expect(within(footer).getByRole('link', { name: /docs/i })).toBeInTheDocument();

    // Social links by aria-label
    expect(within(footer).getByRole('link', { name: /twitter/i })).toBeInTheDocument();
    expect(within(footer).getByRole('link', { name: /github/i })).toBeInTheDocument();
    expect(within(footer).getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
  });
});
