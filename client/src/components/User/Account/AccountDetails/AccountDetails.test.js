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

// describe("AccountDetails Component", () => {
//   test("Should load Personal Information container", async () => {
//     render(
//       <AuthContext.Provider value={mockAuthContextValue}>
//         <AccountDetails />
//       </AuthContext.Provider>
//     );

//     const personalInformationTitleElement = screen.getByTestId(
//       "personal-information-title"
//     );
//     expect(personalInformationTitleElement).toBeInTheDocument();
//   });
// });

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
// console.log(userEmailElement)
    await waitFor(() => {
      expect(userEmailElement).toHaveTextContent(mockUserInformation.email);
    });
  });
});
