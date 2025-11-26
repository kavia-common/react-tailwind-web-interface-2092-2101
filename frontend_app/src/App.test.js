import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero title', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /build fast, look professional\./i });
  expect(heading).toBeInTheDocument();
});
