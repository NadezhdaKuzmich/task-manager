import SignUp from "../pages/Forms/LogInForms/SignUp";
import { register } from "../slices/AuthSlice/AuthSlise";
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
    store.dispatch(register({ username: "nadiia", email: "example@gmail.com", password: "88888888"}));
    const state = store.getState().user;
    expect(state.user.username).toEqual("nadiia");
    expect(state.user.password).toEqual("88888888");
    expect(JSON.parse(localStorage.getItem("user"))).toEqual("nadiia");
    expect(JSON.parse(localStorage.getItem("password"))).toEqual("88888888");
    expect(!!state.authUsers.find(user => user.username === "nadiia")).toEqual(true);
    expect(!!state.authUsers.find(user => user.username === "vadim")).toEqual(false);

    act(() => {
      renderWithProviders(
        <MemoryRouter initialEntries={["/sign-up"]}>
          <SignUp />
        </MemoryRouter>,
        { store }
      );
    });
  });
});
