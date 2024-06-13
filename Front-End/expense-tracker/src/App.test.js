import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Auth from './Screens/Auth';
import { MemoryRouter } from 'react-router-dom';

describe('Auth Component', () => {
  test('renders username and password input fields', () => {
    render(<Auth />, { wrapper: MemoryRouter });
    const usernameInput = screen.getByLabelText('UserName');
    const passwordInput = screen.getByLabelText('Password');
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('updates state when typing in username and password fields', () => {
    render(<Auth />, { wrapper: MemoryRouter });
    const usernameInput = screen.getByLabelText('UserName');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');
  });

});
