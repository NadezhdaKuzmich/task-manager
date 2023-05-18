import DetailTask from "../pages/Forms/FormsModal/FormsForTask/DetailsTask";
import { deleteTask } from "../slices/BoardSlice/BoardsSlice";
import { renderWithProviders } from "../setupTests";
import { act } from "react-dom/test-utils";
import { setupStore } from "../store/store";

describe("Details of task", () => {
  const store = setupStore();
  const state = store.getState().boards;
  const board = state.boards.find((board) => board.isActive === true);
  const task = board.columns[0].tasks[0];
  const taskLength = board.columns[0].tasks.length;

  it("Delete task", () => {  
    act(() => {
      store.dispatch(deleteTask({ id: task.id, status: task.status }));
      renderWithProviders(<DetailTask {...task} />, { store });
    });
    const state = store.getState().boards;
    expect(state.boards[0].columns[0].tasks.length).not.toEqual(taskLength);
  });
});
