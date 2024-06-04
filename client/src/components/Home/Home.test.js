import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
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

    const paragraphElement = screen.getByTestId("forget-me-not-paragraph");
    expect(paragraphElement).toBeInTheDocument();

    const imageElement = screen.getByTestId("forget-me-not-image");
    expect(imageElement).toBeInTheDocument();

    const buttonElement = screen.getByTestId("forget-me-not-button");
    expect(buttonElement).toBeInTheDocument();
  });
});

describe("Home Component", () => {
    test("Should load Pirouette Collection", async () => {
      render(
        <AuthContext.Provider value={mockAuthContextValue}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </AuthContext.Provider>
      );
  
      const titleElement = screen.getByTestId("pirouette-title");
      expect(titleElement).toBeInTheDocument();
  
      const paragraphElement = screen.getByTestId("pirouette-paragraph");
      expect(paragraphElement).toBeInTheDocument();
  
      const imageElement = screen.getByTestId("pirouette-image");
      expect(imageElement).toBeInTheDocument();
  
      const buttonElement = screen.getByTestId("pirouette-button");
      expect(buttonElement).toBeInTheDocument();
    });
  });
