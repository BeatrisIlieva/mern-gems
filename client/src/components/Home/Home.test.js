import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"
import { Home } from "./Home";

const mockOnRegisterSubmit = jest.fn();

const mockAuthContextValue = {
  onRegisterSubmit: mockOnRegisterSubmit,
};

describe("Home Component", () => {
  test("Should load Forget-Me-Not Collection", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const titleElement = screen.getByTestId("forget-me-not-title");
    expect(titleElement).toBeInTheDocument();
  });
});