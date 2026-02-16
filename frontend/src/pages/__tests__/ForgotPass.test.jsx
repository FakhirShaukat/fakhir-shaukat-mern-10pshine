import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ForgotPassword from "../ForgotPasswordPage";
import { BrowserRouter } from "react-router-dom";

describe("FORGOT PASSWORD", () => {
  test("submits email for reset", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Code sent" }),
      })
    );

    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@email.com" },
    });

    fireEvent.click(screen.getByRole("button"));

    expect(global.fetch).toHaveBeenCalled();
  });
});
