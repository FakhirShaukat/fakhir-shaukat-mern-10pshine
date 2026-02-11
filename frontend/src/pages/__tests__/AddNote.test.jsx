import { render, screen, fireEvent } from "@testing-library/react";
import AddNotes from "../../components/AddNotes";

// ✅ Mock ReactQuill correctly for Vitest
vi.mock("react-quill", () => ({
  default: ({ value, onChange }) => (
    <textarea
      data-testid="quill-editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

describe("ADD NOTES", () => {
  test("calls onSave with correct data when save is clicked", () => {
    const onSave = vi.fn();
    const onClose = vi.fn();

    render(<AddNotes onSave={onSave} onClose={onClose} />);

    // Enter title
    const titleInput = screen.getByPlaceholderText(/title/i);
    fireEvent.change(titleInput, { target: { value: "Test Title" } });

    // Enter content in mocked ReactQuill
    const quillInput = screen.getByTestId("quill-editor");
    fireEvent.change(quillInput, { target: { value: "Test Content" } });

    // Click save
    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    // Assertions
    expect(onSave).toHaveBeenCalledWith({ title: "Test Title", content: "Test Content" });
    expect(onClose).toHaveBeenCalled();
  });
});
