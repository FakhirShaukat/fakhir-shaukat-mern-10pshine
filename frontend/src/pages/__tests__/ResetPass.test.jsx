import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import ResetPassword from "../ResetPassword";
import { vi } from "vitest";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

// Mock axios
vi.mock("axios");

describe("RESET PASSWORD", () => {
  beforeEach(() => {
    localStorage.setItem("resetEmail", "test@example.com");
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("resets password successfully", async () => {
    // Mock axios response
    axios.post.mockResolvedValueOnce({
      data: { message: "Password reset successful!" },
      status: 200,
    });

    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    // Fill new password and confirm password
    fireEvent.change(screen.getByPlaceholderText(/enter new password/i), {
      target: { value: "newpassword123" },
    });

    fireEvent.change(screen.getByPlaceholderText(/confirm new password/i), {
      target: { value: "newpassword123" },
    });

    // Click reset button
    fireEvent.click(screen.getByRole("button", { name: /reset password/i }));

    // Wait for axios call
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5000/api/auth/reset-password",
        { email: "test@example.com", newPassword: "newpassword123" }
      );
    });

    // Message is displayed
    expect(await screen.findByText(/password reset successful/i)).toBeInTheDocument();

    // Email removed from localStorage
    expect(localStorage.getItem("resetEmail")).toBeNull();
  });
});
