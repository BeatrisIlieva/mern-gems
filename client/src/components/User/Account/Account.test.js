import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { Account } from "./Account";
import { useState } from "react";

const mockOnRegisterSubmit = jest.fn();

const mockAuthContextValue = {
  onRegisterSubmit: mockOnRegisterSubmit,
};

describe("Login Component", () => {
  test("Should load image", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Account />
      </AuthContext.Provider>
    );

    const titleElement = screen.getByTestId("title-element");
    expect(titleElement).toBeInTheDocument();

    const paragraphElement = screen.getByTestId("paragraph-element");
    expect(paragraphElement).toBeInTheDocument();

    const accountDetailsTitleElement = screen.getByTestId("account-details-title-element");
    expect(accountDetailsTitleElement).toBeInTheDocument();

    const orderHistoryTitleElement = screen.getByTestId("order-history-title-element");
    expect(orderHistoryTitleElement).toBeInTheDocument();
  });
});
