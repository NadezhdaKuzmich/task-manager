import BoardModal from "../pages/Forms/FormsModal/FormsForBoard/BoardModal";
import { addBoard } from "../slices/BoardSlice/BoardsSlice";
import { setupStore } from "../store/store";
import { renderWithProviders } from "../setupTests"

describe("Add board", () => {
  const store = setupStore();
  it("Add new board", () => {
    store.dispatch(addBoard({
      id: 1,
      name: "example 2",
      author: "anonymous"
    }));
    const state = store.getState().boards;
    expect(state.boards[0].name).toEqual("Example");
    expect(state.boards[1].name).toEqual("example 2");
  });

  renderWithProviders(<BoardModal />, { store });
});
