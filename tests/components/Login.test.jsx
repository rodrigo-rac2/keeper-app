// test/components/Login.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import App from "../../src/components/App/App";
import Login from "../../src/components/MainPage/Login/Login";

describe("Login", () => {
  const onLogin = vi.fn();
  const onRegister = vi.fn();

  it("should login the user", () => {
    render(<App />);
    // Simulate login
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jon@doe.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.queryByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Keeper App")).toBeInTheDocument();
  });

  it("should logout the user", () => {
    render(<App />);
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

  it("should display an error message for invalid credentials", () => {
    render(<Login onLogin={onLogin} onRegister={onRegister} errorMessage="Invalid credentials" />);
    
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid@user.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  it("should trigger onRegister when register link is clicked", () => {
    render(<Login onLogin={onLogin} onRegister={onRegister} />);
    
    fireEvent.click(screen.getByText("Not registered? Sign up now!"));

    expect(onRegister).toHaveBeenCalledTimes(1);
  });

  it("should toggle password visibility", () => {
    render(<Login onLogin={onLogin} onRegister={onRegister} />);
    
    fireEvent.click(screen.getByTestId("toggle-password-span"));
    expect(screen.getByPlaceholderText("Password").type).toBe("text");

    // toggle password visibility again
    fireEvent.click(screen.getByTestId("toggle-password-span"));
    expect(screen.getByPlaceholderText("Password").type).toBe("password");
  });
});
