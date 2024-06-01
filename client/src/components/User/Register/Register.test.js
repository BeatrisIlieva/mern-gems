import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { Register } from "./Register";

const mockOnRegisterSubmit = jest.fn();

const mockAuthContextValue = {
  onRegisterSubmit: mockOnRegisterSubmit,
};

describe("Register Component", () => {
  test("Should load image", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const imageElement = screen.getByTestId("image-element");
    expect(imageElement).toBeInTheDocument();
  });
});

describe("Register Component", () => {
  test("Should load title", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const titleElement = screen.getByTestId("title-element");
    expect(titleElement).toBeInTheDocument();
  });
});

describe("Register Component", () => {
  test("Should load sub-title", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const subTitleElement = screen.getByTestId("sub-title-element");
    expect(subTitleElement).toBeInTheDocument();
  });
});

describe("Register Component", () => {
    test("Should load password requirements", async () => {
      render(
        <AuthContext.Provider value={mockAuthContextValue}>
          <BrowserRouter>
            <Register />
          </BrowserRouter>
        </AuthContext.Provider>
      );
  
      const passwordRequirementsElement = screen.getByTestId("password-requirements-element");
      expect(passwordRequirementsElement).toBeInTheDocument();
    });
  });