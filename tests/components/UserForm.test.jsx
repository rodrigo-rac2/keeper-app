// tests/components/UserForm.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import UserForm from "../../src/components/User/UserForm";

describe("UserForm", () => {
  const onSave = vi.fn();
  const onCancel = vi.fn();
  const setErrorMessage = vi.fn();
  const showSuccessMessage = vi.fn();

  it("should display error message when passwords do not match", () => {
    render(
      <UserForm
        onSave={onSave}
        onCancel={onCancel}
        setErrorMessage={setErrorMessage}
        showSuccessMessage={showSuccessMessage}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "email123@email123.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Full Name 123" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "differentpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(setErrorMessage).toHaveBeenCalledWith("Passwords do not match");
  });

  it("should display success message when registration is successful", () => {
    render(
      <UserForm
        onSave={onSave}
        onCancel={onCancel}
        setErrorMessage={setErrorMessage}
        showSuccessMessage={showSuccessMessage}
        successMessage="Registration Successful"
      />
    );

    expect(screen.getByText("Registration Successful")).toBeInTheDocument();
  });

  it("should trigger onCancel when cancel button is clicked", () => {
    render(
      <UserForm
        onSave={onSave}
        onCancel={onCancel}
        setErrorMessage={setErrorMessage}
        showSuccessMessage={showSuccessMessage}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should successfully register a user", async () => {
    render(
      <UserForm
        onSave={onSave}
        onCancel={onCancel}
        setErrorMessage={setErrorMessage}
        showSuccessMessage={showSuccessMessage}
        isEditingProfile={false}
        user={{ email: "test@test.com", fullname: "Test User" }}
        isEditing={true}
      />
    );
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "email123@email123.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Full Name 123" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByText("Registration Successful")).toBeInTheDocument();
    });
  });

  it("should display temporary message on successful registration", async () => {
    render(
      <UserForm
        onSave={onSave}
        onCancel={onCancel}
        setErrorMessage={setErrorMessage}
        showSuccessMessage={showSuccessMessage}
        isEditingProfile={false}
        successMessage="Registration Successful"
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Registration Successful")).toBeInTheDocument();
    });

    expect(screen.getByTestId("confirmation-return-link")).toBeInTheDocument();
    expect(screen.getByTestId("confirmation-return-link")).toHaveTextContent(
      "Return to Login"
    );
  });

  it("should successfully update a user profile", async () => {
    render(
      <UserForm
        onSave={onSave}
        onCancel={onCancel}
        setErrorMessage={setErrorMessage}
        showSuccessMessage={showSuccessMessage}
        isEditingProfile={true}
        user={{ email: "test@test.com", fullname: "Test User" }}
        isEditing={true}
      />
    );
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByText("User Updated")).toBeInTheDocument();
    });
  });

  it("should display temporary message on successful profile edit", async () => {
    render(
      <UserForm
        onSave={onSave}
        onCancel={onCancel}
        setErrorMessage={setErrorMessage}
        showSuccessMessage={showSuccessMessage}
        isEditingProfile={true}
        user={{ email: "test@test.com", fullname: "Test User" }}
        isEditing={true}
        successMessage="User Updated"
      />
    );

    await waitFor(() => {
      expect(screen.getByText("User Updated")).toBeInTheDocument();
    });

    expect(screen.getByTestId("confirmation-return-link")).toBeInTheDocument();
    expect(screen.getByTestId("confirmation-return-link")).toHaveTextContent(
      "Return to Keeper App"
    );
  });

  it("should toggle password visibility in registration form", () => {
    render(
      <UserForm
        onSave={onSave}
        onCancel={onCancel}
        setErrorMessage={setErrorMessage}
        showSuccessMessage={showSuccessMessage}
        isEditingProfile={false}
        user={{ email: "test@test.com", fullname: "Test User" }}
        isEditing={true}
      />
    );

    fireEvent.click(screen.getByTestId("toggle-password-span"));
    expect(screen.getByPlaceholderText("Password").type).toBe("text");

    // toggle password visibility again
    fireEvent.click(screen.getByTestId("toggle-password-span"));
    expect(screen.getByPlaceholderText("Password").type).toBe("password");
  });
});
