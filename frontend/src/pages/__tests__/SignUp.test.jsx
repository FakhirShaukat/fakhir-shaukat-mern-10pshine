import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "../SignUpPage";
import { BrowserRouter } from "react-router-dom";

describe("SIGNUP PAGE", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Signup successful" }),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders signup form", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  test("submits signup form", async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@email.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(global.fetch).toHaveBeenCalled();
  });
});
