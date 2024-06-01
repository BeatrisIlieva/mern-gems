import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { Register } from "../Register/Register"; 
import { Login } from "./Login";

const mockOnRegisterSubmit = jest.fn();

const mockAuthContextValue = {
  onRegisterSubmit: mockOnRegisterSubmit,
};

describe("Login Component", () => {
  test("Should load image", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const imageElement = screen.getByTestId("image-element");
    expect(imageElement).toBeInTheDocument();
  });
});

describe("Login Component", () => {
    test("Should load sing in title", async () => {
      render(
        <AuthContext.Provider value={mockAuthContextValue}>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </AuthContext.Provider>
      );
  
      const singInTitleElement = screen.getByTestId("sign-in-title-element");
      expect(singInTitleElement).toBeInTheDocument();
    });
  });