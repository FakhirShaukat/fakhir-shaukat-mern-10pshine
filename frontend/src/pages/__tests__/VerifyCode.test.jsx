import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import VerifyCode from "../VerifyCode";
import axios from "axios";
import { vi } from "vitest";

// 🔑 mock axios
vi.mock("axios");

describe("VERIFY CODE", () => {
  beforeEach(() => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    localStorage.setItem("resetEmail", "test@example.com");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  test("verifies reset code", async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: { message: "Code verified" },
    });

    render(
      <BrowserRouter>
        <VerifyCode />
      </BrowserRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText(/6-digit code/i),
      { target: { value: "123456" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: /verify/i })
    );

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });
});
