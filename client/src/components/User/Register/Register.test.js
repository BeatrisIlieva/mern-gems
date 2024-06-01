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
  test("Should load image", async () => {
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
