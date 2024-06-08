// tests/components/App.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach } from "vitest";
import App from "../../src/components/App/App";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it('should see the text "Welcome to Keeper App" in the DOM', () => {
    expect(screen.getByText("Welcome to Keeper App")).toBeInTheDocument();
  });

  it("should display an error message if typing wrong credentials", () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid@user.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  it("should create a new note", () => {
    // Simulate login
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jon@doe.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    fireEvent.click(screen.getByText("+")); // Click the add note button

    const titleInput = screen.getByPlaceholderText("Title");
    const contentTextarea = screen.getByPlaceholderText("Content");
    const saveButton = screen.getByRole("button", { name: /save/i });

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
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    fireEvent.click(screen.getByText("+")); // Click the add note button

    const titleInput = screen.getByPlaceholderText("Title");
    const contentTextarea = screen.getByPlaceholderText("Content");
    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(contentTextarea, { target: { value: "Test Content" } });
    fireEvent.click(cancelButton);

    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument(); // The add note button should reappear
  });

  it("should edit an existing note", () => {
    // Simulate login
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jon@doe.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    const editButton = screen.getAllByAltText("Edit")[0];
    fireEvent.click(editButton); // Click the edit note button

    const titleInput = screen.getByPlaceholderText("Title");
    const contentTextarea = screen.getByPlaceholderText("Content");
    const saveButton = screen.getByRole("button", { name: /save/i });

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
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    const editButton = screen.getAllByAltText("Edit")[0];
    fireEvent.click(editButton); // Click the edit note button

    const titleInput = screen.getByPlaceholderText("Title");
    const contentTextarea = screen.getByPlaceholderText("Content");
    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    fireEvent.change(titleInput, { target: { value: "Edited Title" } });
    fireEvent.change(contentTextarea, { target: { value: "Edited Content" } });
    fireEvent.click(cancelButton);

    expect(screen.queryByText("Edited Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Edited Content")).not.toBeInTheDocument();
  });

  it("should display profile modal when clicking user name", () => {
    // Simulate login
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jon@doe.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    fireEvent.click(screen.getByText("John Doe")); // Click on the user name

    expect(screen.getByText("Keeper App Account")).toBeInTheDocument();
    expect(screen.getByTestId("modal-user-fullname")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /edit profile/i })
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("modal-logout-btn", { name: /logout/i })
    ).toBeInTheDocument();
  });

  it("should display an error message for invalid profile edit form submission", () => {
    // Simulate login
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jon@doe.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    fireEvent.click(screen.getByText("John Doe")); // Click on the user name
    fireEvent.click(screen.getByRole("button", { name: /edit profile/i })); // Click edit profile button

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "" }, // Clear the full name to make it invalid
    });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    const fullNameInput = screen.getByPlaceholderText("Full Name");
    fireEvent.invalid(fullNameInput); // Trigger invalid event for the Full Name input

    expect(fullNameInput).toBeInvalid();
  });

  it("should edit profile successfully and clear success message after timeout", async () => {
    // Simulate login
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jon@doe.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    fireEvent.click(screen.getByText("John Doe")); // Click on the user name
    fireEvent.click(screen.getByRole("button", { name: /edit profile/i })); // Click edit profile button

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Jon Doe Test Name" }, // Clear the full name to make it invalid
    });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByText("User Updated")).toBeInTheDocument();
    });

    expect(screen.getByText("Return to Keeper App")).toBeInTheDocument();

    // Wait for the timeout and assert the message disappears
    await waitFor(
      () => {
        expect(screen.queryByText("User Updated")).toBeNull();
      },
      { timeout: 3500 }
    ); // Slightly longer than the timeout to ensure it clears
  });

  it("should cancel edit profile operation", async () => {
    // Simulate login
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jon@doe.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    fireEvent.click(screen.getByText("John Doe")); // Click on the user name
    fireEvent.click(screen.getByRole("button", { name: /edit profile/i })); // Click edit profile button

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Jon Doe Test Name" }, // Clear the full name to make it invalid
    });

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    // Wait for the modal to close and the app to return
    await waitFor(() => {
      expect(screen.queryByText("User Updated")).toBeNull(); // The modal should have closed
      expect(screen.getByText("Keeper App")).toBeInTheDocument(); // Check that the app is back
    });
  });

  it("should handle login with existing credentials", () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jon@doe.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.queryByText("Welcome to Keeper App")).not.toBeInTheDocument();
    expect(screen.queryByText("Invalid credentials")).not.toBeInTheDocument();
  });

  it("should register successfully and clear success message after timeout", async () => {
    fireEvent.click(screen.getByText("Not registered? Sign up now!"));

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test123@test123.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Test 123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByText("Registration Successful")).toBeInTheDocument();

    // Wait for the timeout and assert the message disappears
    await waitFor(
      () => {
        expect(screen.queryByText("Registration Successful")).toBeNull();
      },
      { timeout: 3500 }
    ); // Slightly longer than the timeout to ensure it clears
  });

  it("should handle registration with existing email", () => {
    fireEvent.click(screen.getByText("Not registered? Sign up now!"));

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jon@doe.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByText("Email already exists")).toBeInTheDocument();
  });

  it("should cancel registration successfully", () => {
    fireEvent.click(screen.getByText("Not registered? Sign up now!"));

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test123@test123.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Test 123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(screen.getByText("Welcome to Keeper App")).toBeInTheDocument();
  });

  it("should handle deleting a note", () => {
    // Simulate login
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jon@doe.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    const deleteButton = screen.getAllByAltText("Delete")[0];
    fireEvent.click(deleteButton); // Click the delete note button

    expect(screen.queryByText("Note title")).not.toBeInTheDocument(); // Adjust this line based on the actual title of the note being deleted
  });
});
