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

    fireEvent.click(updateEmailButton);
    const updateEmailForm = screen.getByTestId("update-email-form");
    expect(updateEmailForm).toBeInTheDocument();
  });

  test("Should load user update password form", async () => {
    const mockUserInformation = {
      email: "test@email.com",
    };

    mockFind.mockResolvedValue(mockUserInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <AccountDetails />
      </AuthContext.Provider>
    );

    const updatePasswordButton = screen.getByTestId("update-password-button");
    expect(updatePasswordButton).toBeInTheDocument();

    fireEvent.click(updatePasswordButton);
    const updatePasswordForm = screen.getByTestId("update-password-form");
    expect(updatePasswordForm).toBeInTheDocument();
  });

  test("Should load user delete account popup", async () => {
    const mockUserInformation = {
      email: "test@email.com",
    };

    mockFind.mockResolvedValue(mockUserInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <AccountDetails />
      </AuthContext.Provider>
    );

    const deleteAccountButton = screen.getByTestId("delete-account-button");
    expect(deleteAccountButton).toBeInTheDocument();

    fireEvent.click(deleteAccountButton);
    const deleteAccountPopup = screen.getByTestId("delete-account-popup");
    expect(deleteAccountPopup).toBeInTheDocument();
  });

  test("Should load user address book popup", async () => {
    const mockUserInformation = {
      email: "test@email.com",
    };

    mockFind.mockResolvedValue(mockUserInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <AccountDetails />
      </AuthContext.Provider>
    );

    const addAddressBookButton = screen.getByTestId("add-address-book-button");
    expect(addAddressBookButton).toBeInTheDocument();

    fireEvent.click(addAddressBookButton);
    const addAddressBookPopup = screen.getByTestId(
      "address-information-form-popup"
    );
    expect(addAddressBookPopup).toBeInTheDocument();
  });

  test("Should close user address book popup by clicking on x-mark", async () => {
    const mockUserInformation = {
      email: "test@email.com",
    };

    mockFind.mockResolvedValue(mockUserInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <AccountDetails />
      </AuthContext.Provider>
    );

    const addAddressBookButton = screen.getByTestId("add-address-book-button");
    expect(addAddressBookButton).toBeInTheDocument();

    fireEvent.click(addAddressBookButton);
    const addAddressBookPopup = screen.getByTestId(
      "address-information-form-popup"
    );
    expect(addAddressBookPopup).toBeInTheDocument();

    const closeAddressBookButton = screen.getByTestId("address-information-form-popup-x-mark");
    expect(closeAddressBookButton).toBeInTheDocument();

    fireEvent.click(closeAddressBookButton);

    expect(addAddressBookPopup).not.toBeInTheDocument();
  });
});
