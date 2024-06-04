import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { Account } from "./Account";
import { personalInformationServiceFactory } from "../../../services/personalInformationService";


const mockAuthContextValue = {
    userId: "user123", // Mock user ID
  };
  
  // Mock the personalInformationServiceFactory
  jest.mock("../../../services/personalInformationService", () => ({
    personalInformationServiceFactory: jest.fn(),
  }));
  
  // Mock the find function of personalInformationServiceFactory
  const mockFind = jest.fn();

describe("Account Component", () => {
    beforeEach(() => {
        // Reset the mock implementation before each test
        personalInformationServiceFactory.mockReturnValue({
          find: mockFind,
        });
    })
  test("Should Account Component", async () => {

    const mockUserPersonalInformation = {
        firstName: "John",
      };
  
      // Mock the data returned by the find function
      mockFind.mockResolvedValue(mockUserPersonalInformation);
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Account />
      </AuthContext.Provider>
    );

    const titleElement = screen.getByTestId("title-element");
    expect(titleElement).toBeInTheDocument();

    const paragraphElement = screen.getByTestId("paragraph-element");
    expect(paragraphElement).toBeInTheDocument();

    const accountDetailsTitleElement = screen.getByTestId(
      "account-details-title-element"
    );
    expect(accountDetailsTitleElement).toBeInTheDocument();

    const orderHistoryTitleElement = screen.getByTestId(
      "order-history-title-element"
    );
    expect(orderHistoryTitleElement).toBeInTheDocument();
  });
});
