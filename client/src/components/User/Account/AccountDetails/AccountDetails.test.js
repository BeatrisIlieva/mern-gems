import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthContext } from "../../../../contexts/AuthContext"; 
import { AccountDetails } from "./AccountDetails"
import { personalInformationServiceFactory } from "../../../../services/personalInformationService"

const mockAuthContextValue = {
  userId: "user123",
};

jest.mock("../../../../services/personalInformationService", () => ({
  personalInformationServiceFactory: jest.fn(),
}));

const mockFind = jest.fn();

describe("AccountDetails Component", () => {
  beforeEach(() => {
    personalInformationServiceFactory.mockReturnValue({
      find: mockFind,
    });
  });

  test("Should load Personal Information container", async () => {
    const mockUserPersonalInformation = {
      firstName: "Test",
    };

    mockFind.mockResolvedValue(mockUserPersonalInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <AccountDetails />
      </AuthContext.Provider>
    );

    const personalInformationTitleElement = screen.getByTestId("personal-information-title");
    expect(personalInformationTitleElement).toBeInTheDocument();


    // await waitFor(() => {
    //   expect(titleElement).toHaveTextContent(
    //     `Hi, ${mockUserPersonalInformation.firstName}`
    //   );
    // });

    // const paragraphElement = screen.getByTestId("paragraph-element");
    // expect(paragraphElement).toBeInTheDocument();

    // const accountDetailsTitleElement = screen.getByTestId(
    //   "account-details-title-element"
    // );
    // expect(accountDetailsTitleElement).toBeInTheDocument();

    // const orderHistoryTitleElement = screen.getByTestId(
    //   "order-history-title-element"
    // );
    // expect(orderHistoryTitleElement).toBeInTheDocument();

    // expect(accountDetailsTitleElement).toHaveClass("selected");

    // expect(orderHistoryTitleElement).not.toHaveClass("selected");

    // fireEvent.click(orderHistoryTitleElement);

    // expect(orderHistoryTitleElement).toHaveClass("selected");

    // expect(accountDetailsTitleElement).not.toHaveClass("selected");
  });
});
