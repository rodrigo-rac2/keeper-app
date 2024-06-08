import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach } from "vitest";
import App from "../App";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it('should see the text "Welcome to Keeper App" in the DOM', () => {
    expect(screen.getByText("Welcome to Keeper App")).toBeInTheDocument();
  });

  it("should create a new note", () => {
    // Simulate login
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jon@doe.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    fireEvent.click(screen.getByText("+")); // Click the add note button

    const titleInput = screen.getByPlaceholderText("Title");
    const contentTextarea = screen.getByPlaceholderText("Content");
    const saveButton = screen.getByRole('button', { name: /save/i });

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(contentTextarea, { target: { value: "Test Content" } });
    fireEvent.click(saveButton);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should cancel note creation", () => {
    // Simulate login
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jon@doe.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    fireEvent.click(screen.getByText("+")); // Click the add note button

    const titleInput = screen.getByPlaceholderText("Title");
    const contentTextarea = screen.getByPlaceholderText("Content");
    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(contentTextarea, { target: { value: "Test Content" } });
    fireEvent.click(cancelButton);

    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument(); // The add note button should reappear
  });

  it("should logout the user", () => {
    // Simulate login
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jon@doe.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    fireEvent.click(screen.getByRole('button', { name: /logout/i })); // Click the logout button

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.queryByText("Keeper App")).not.toBeInTheDocument();
  });

  it("should edit an existing note", () => {
    // Simulate login
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jon@doe.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    const editButton = screen.getAllByAltText("Edit")[0];
    fireEvent.click(editButton); // Click the edit note button

    const titleInput = screen.getByPlaceholderText("Title");
    const contentTextarea = screen.getByPlaceholderText("Content");
    const saveButton = screen.getByRole('button', { name: /save/i });

    fireEvent.change(titleInput, { target: { value: "Edited Title" } });
    fireEvent.change(contentTextarea, { target: { value: "Edited Content" } });
    fireEvent.click(saveButton);

    expect(screen.getByText("Edited Title")).toBeInTheDocument();
    expect(screen.getByText("Edited Content")).toBeInTheDocument();
  });

  it("should cancel editing an existing note", () => {
    // Simulate login
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jon@doe.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    const editButton = screen.getAllByAltText("Edit")[0];
    fireEvent.click(editButton); // Click the edit note button

    const titleInput = screen.getByPlaceholderText("Title");
    const contentTextarea = screen.getByPlaceholderText("Content");
    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    fireEvent.change(titleInput, { target: { value: "Edited Title" } });
    fireEvent.change(contentTextarea, { target: { value: "Edited Content" } });
    fireEvent.click(cancelButton);

    expect(screen.queryByText("Edited Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Edited Content")).not.toBeInTheDocument();
  });
});
