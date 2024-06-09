// tests/main.test.jsx

import React from 'react';
import { act, fireEvent } from '@testing-library/react'; 
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { test, describe, beforeEach, expect, vi } from 'vitest';

vi.mock('react-dom/client', async () => {
  const actual = await vi.importActual('react-dom/client');

  return {
    ...actual,

    createRoot: vi.fn((el) => ({
      render: vi.fn((component) => {
        render(component, { container: el });
      }),
    })),
  };
});

describe('main.tsx', () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    vi.restoreAllMocks();
  });

  test('renders main application without crashing', async () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    expect(document.getElementById('root')).not.toBeNull();

    // Monitor console errors (excluding the deprecation warning)
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation((message) => {
        if (!message.includes('`ReactDOMTestUtils.act` is deprecated')) {
          console.error(message);
        }
      });

    await act(async () => {
      await import('../src/main');
    });

    expect(screen.getByText('Welcome to Keeper App')).toBeInTheDocument();

    // Simulate login to check for the app container
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'jon@doe.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i })); 

    expect(screen.getByTestId('app-container')).toBeInTheDocument();
    expect(consoleError).not.toHaveBeenCalled();
  });
});
