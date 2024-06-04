import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { AccountDetails } from "./AccountDetails";
import { loginInformationServiceFactory } from "../../../../services/loginInformationService";

const mockAuthContextValue = {
  userId: "user123",
};

jest.mock("../../../../services/loginInformationService", () => ({
  loginInformationServiceFactory: jest.fn(),
}));

const mockFind = jest.fn();

describe("AccountDetails Component", () => {
  beforeEach(() => {
    loginInformationServiceFactory.mockReturnValue({
      find: mockFind,
    });
  });

  test("Should load user email", async () => {
    const mockUserInformation = {
      email: "test@email.com",
    };

    mockFind.mockResolvedValue(mockUserInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <AccountDetails />
      </AuthContext.Provider>
    );

    const userEmailElement = screen.getByTestId("user-email");
    expect(userEmailElement).toBeInTheDocument();

    await waitFor(() => {
      expect(userEmailElement).toHaveTextContent(mockUserInformation.email);
    });
  });
});

describe("AccountDetails Component update email button", () => {
  beforeEach(() => {
    loginInformationServiceFactory.mockReturnValue({
      find: mockFind,
    });
  });

  test("Should load user update email form", async () => {
    const mockUserInformation = {
      email: "test@email.com",
    };

    mockFind.mockResolvedValue(mockUserInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <AccountDetails />
      </AuthContext.Provider>
    );

    const updateEmailButton = screen.getByTestId("update-email-button");
    expect(updateEmailButton).toBeInTheDocument();
  });
});
