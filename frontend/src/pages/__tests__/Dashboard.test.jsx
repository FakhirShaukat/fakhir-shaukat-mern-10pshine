import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Dashboard from "../Dashboard";
import { BrowserRouter } from "react-router-dom";

describe("DASHBOARD PAGE", () => {
  beforeEach(() => {
    // mock logged-in user
    localStorage.setItem(
      "user",
      JSON.stringify({ firstName: "Fakhir", email: "fakhir@test.com" })
    );

    // mock fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { _id: "1", title: "Test Note", content: "Test Content" },
          ]),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  test("renders Dashboard and notes", async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText(/my notes/i)).toBeInTheDocument();

    // async because notes load after fetch
    expect(await screen.findByText("Test Note")).toBeInTheDocument();
    expect(await screen.findByText("Test Content")).toBeInTheDocument();
  });
});
