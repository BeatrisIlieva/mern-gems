import {render, screen} from "@testing-library/react";
import {RegisterForm} from "./RegisterForm";
import { AuthContext } from "../../../../contexts/AuthContext";

const mockAuthContextValue = {
  onRegisterSubmit: jest.fn(),
};

describe("RegisterFrom Component", () => {
  test("Should show register form", () => {

    const title = "New Customers";

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    expect(screen.queryByText(title)).toBeInTheDocument();
  })
})
