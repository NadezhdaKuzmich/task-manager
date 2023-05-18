import TaskEditModal from "../pages/Forms/FormsModal/FormsForTask/TaskEditModal";
import { editTask } from "../slices/BoardSlice/BoardsSlice";
import { setupStore } from "../store/store";
import { renderWithProviders } from "../setupTests";

describe("Edit task", () => {
  const store = setupStore();
  const state = store.getState().boards;
  const todoLength = state.boards[0].columns[0].tasks.length;
  const inProgressLength = state.boards[0].columns[1].tasks.length;

  const initialState = {
    id: "7gZZ320CjrlYjQCrJd8Im",
    title: "Learn TypeScript",
    date: new Date(2023, 3, 24, 10, 15, 0).toString(),
    description:
      'TypeScript (TS, TScript or "typescript") is a web development programming language based on JavaScript. Makes the code more understandable and reliable, adds static typing (variables are bound to certain data types), and can also compile to JavaScript. TypeScript is used by front-end and back-end developers.',
    status: "todo",
    limit: new Date(2023, 4, 31, 16, 15, 0).toString(),
    responsible: ["Marichka Demydenko", "Pavlo Vashchenko"],
    visible: true,
  };

  it("Edit task", () => {
    store.dispatch(
      editTask({
        id: "7gZZ320CjrlYjQCrJd8Im",
        title: "title",
        description: "description",
        status: "in progress",
        prevStatus: "todo",
        timeLimit: new Date(2023, 3, 24, 10, 15, 0).toString(),
        responsible: ["Marichka Demydenko", "Pavlo Vashchenko"],
      })
    );
    const state = store.getState().boards;
    expect(state.boards[0].columns[0].tasks.length).not.toEqual(todoLength);
    expect(state.boards[0].columns[1].tasks.length).toEqual(inProgressLength + 1);
  });

  renderWithProviders(<TaskEditModal {...initialState} col="todo" />, {
    store,
  });
});
