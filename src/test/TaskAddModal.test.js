import TaskAddModal from "../pages/Forms/FormsModal/FormsForTask/TaskAddModal"
import { addTask } from "../slices/BoardSlice/BoardsSlice";
import { setupStore } from "../store/store";
import { renderWithProviders } from "../setupTests"

describe("Add task", () => {
  const store = setupStore();

  it("Add new task", () => {
    store.dispatch(addTask({
      title: "title",
      description: "description",
      statusName: "todo",
      timeLimit: new Date(2023, 6, 24, 10, 15, 0).toString(),
      responsible: ["Marichka Demydenko", "Pavlo Vashchenko"],
    }));

    const state = store.getState().boards;
    expect(!!state.boards[0].columns[0].tasks.find(task => task.title === "title")).toEqual(!false);
    expect(state.boards[0].columns[0].tasks.length).toEqual(3);
  });

  renderWithProviders(<TaskAddModal column="todo" />, { store });
});
