// src/pages/__tests__/Login.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../LoginPage";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest"; // <-- use Vitest's mocking functions

describe("LOGIN PAGE", () => {
  let fetchMock;
  let alertMock;

  beforeEach(() => {
    // Mock fetch
    fetchMock = vi.spyOn(global, "fetch");

    // Mock alert
    alertMock = vi.spyOn(global.window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks(); // restore mocks after each test
  });

  test("renders login button and input fields", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("allows typing into email and password fields", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("123456");
  });

  test("calls login API on submit and handles success", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user: { firstName: "Test", email: "test@example.com" },
        token: "fake-token",
      }),
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "http://localhost:5000/api/auth/login",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "test@example.com", password: "123456" }),
        })
      );
      expect(alertMock).toHaveBeenCalledWith("Welcome Test");
    });
  });

  test("displays error if login API fails", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Invalid credentials" }),
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Invalid credentials");
    });
  });
});
