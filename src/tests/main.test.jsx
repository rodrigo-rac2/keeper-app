//main.test.tsx

import React from 'react';
import { act } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { test, describe, beforeEach, expect, vi } from 'vitest';

// Correct way to partially mock react-dom/client

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
    // Create and append the root element to the document

    const root = document.createElement('div');

    root.id = 'root';

    document.body.appendChild(root);

    // Ensure the root element exists before importing the main file

    expect(document.getElementById('root')).not.toBeNull();

    // Monitor console errors (excluding the deprecation warning)

    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation((message) => {
        if (!message.includes('`ReactDOMTestUtils.act` is deprecated')) {
          console.error(message);
        }
      });

    // Dynamically import the main file to trigger the render

    await act(async () => {
      await import('../main'); // Adjust path if needed
    });

    // Check for the app container using data-testid

    expect(screen.getByTestId('app-container')).toBeInTheDocument();

    // Check for console errors and warnings

    expect(consoleError).not.toHaveBeenCalled();
  });
});
