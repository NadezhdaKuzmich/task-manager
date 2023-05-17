import BoardEditModal from "../pages/Forms/FormsModal/FormsForBoard/BoardModalEdit";
import { editBoard } from "../slices/BoardSlice/BoardsSlice";
import { setupStore } from "../store/store";
import { renderWithProviders } from "../setupTests"

describe("Edit board name", () => {
  const store = setupStore();

  it("Edit name", () => {
    store.dispatch(editBoard({ name: "new name" }));
    const state = store.getState().boards;
    expect(state.boards[0].name).toEqual("new name");
  });

  it("Change new name", () => {
    store.dispatch(editBoard({ name: "new name 2" }));
    const state = store.getState().boards;
    expect(state.boards[0].name).toEqual("new name 2");
  });

  renderWithProviders(<BoardEditModal board="Example" />, { store });
});
