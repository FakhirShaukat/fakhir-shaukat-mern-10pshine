import { render, screen, fireEvent } from "@testing-library/react";
import UpdateNotes from "../../components/EditNotes";

// Mock ReactQuill
vi.mock("react-quill", () => ({
  default: ({ value, onChange }) => (
    <textarea
      data-testid="quill-editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

describe("UPDATE NOTES", () => {
  test("calls onUpdate with correct data when save is clicked", () => {
    const onUpdate = vi.fn();
    const onClose = vi.fn();

    const note = { title: "Old Title", content: "Old Content" };

    render(<UpdateNotes note={note} onUpdate={onUpdate} onClose={onClose} />);

    // Update title
    const titleInput = screen.getByPlaceholderText(/title/i);
    fireEvent.change(titleInput, { target: { value: "New Title" } });

    // Update content
    const quillInput = screen.getByTestId("quill-editor");
    fireEvent.change(quillInput, { target: { value: "New Content" } });

    // Click save
    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    // Assertions
    expect(onUpdate).toHaveBeenCalledWith({ title: "New Title", content: "New Content" });
    expect(onClose).toHaveBeenCalled();
  });
});
