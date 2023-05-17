import SignIn from "../pages/Forms/LogInForms/SignIn";
import { login } from "../slices/AuthSlice/AuthSlise";
import { setupStore } from "../store/store";
import { renderWithProviders } from "../setupTests";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Sign in", () => {
  const store = setupStore();
  
  it("Sign in", () => {
    store.dispatch(login({ username: "admin", password: "12345678" }));
    const state = store.getState().user;
    expect(state.user.username).toEqual("admin");
    expect(state.user.password).toEqual("12345678");
    expect(JSON.parse(localStorage.getItem("user"))).toEqual("admin");
    expect(JSON.parse(localStorage.getItem("password"))).toEqual("12345678");

    act(() => {
      renderWithProviders(
        <MemoryRouter initialEntries={["/sign-in"]}>
          <SignIn />
        </MemoryRouter>,
        { store }
      );
    });
  });
});
