import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const mockToggleTheme = vi.fn();

vi.mock("@/hooks/useTheme", () => ({
  useTheme: () => ({
    isDark:      false,
    toggleTheme: mockToggleTheme,
    mounted:     true,
  }),
}));

describe("ThemeToggle", () => {
  beforeEach(() => { mockToggleTheme.mockClear(); });

  it("renders the toggle button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("has accessible aria-label for light mode", () => {
    render(<ThemeToggle />);
    expect(screen.getByLabelText(/switch to dark mode/i)).toBeInTheDocument();
  });

  it("calls toggleTheme on click", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockToggleTheme).toHaveBeenCalledOnce();
  });
});
