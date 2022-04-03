import React from 'react';
import Login from 'src/pages/login';
import { render, screen } from '@testing-library/react'

describe('Login', () => {

  it('renders Login', () => {
    render(<Login />)

    const linkElement = screen.getByText(/Incident Management/i);

    expect(linkElement).toBeInTheDocument();
  });
});
