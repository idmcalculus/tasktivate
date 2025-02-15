import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Helper to render <App> with a specific initial route:
const renderWithRoute = (route = '/') => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
};

describe('App Component', () => {
  test('renders without crashing', () => {
    renderWithRoute('/');
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('renders login page on /login route', () => {
    renderWithRoute('/login');
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  test('renders register page on /register route', () => {
    renderWithRoute('/register');
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
  });
});