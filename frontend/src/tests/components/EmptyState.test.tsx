import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EmptyState } from "@/components/ui/EmptyState";

describe("EmptyState", () => {
  it("renders title and description", () => {
    render(<EmptyState title="No content" description="Try uploading something" />);
    expect(screen.getByText("No content")).toBeInTheDocument();
    expect(screen.getByText("Try uploading something")).toBeInTheDocument();
  });

  it("renders action button when provided", () => {
    const onClick = vi.fn();
    render(<EmptyState title="Empty" action={{ label: "Add Item", onClick }} />);
    const btn = screen.getByRole("button", { name: "Add Item" });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders custom icon", () => {
    render(<EmptyState icon="🎬" title="No videos" />);
    expect(screen.getByText("🎬")).toBeInTheDocument();
  });
});
