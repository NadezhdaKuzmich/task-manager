import TaskItem from "../components/Tasks/TaskItem";
import { screen } from "@testing-library/react";
import { setupStore } from "../store/store";
import { renderWithProviders } from "../setupTests";

test("Render task", () => {
  const store = setupStore();
  const colId = 2;
  const taskIndex = 2;

  renderWithProviders(<TaskItem colId={colId} taskIndex={taskIndex} />, { store });
  const state = store.getState().boards;
  const board = state.boards.find((board) => board.isActive === true);
  const column = board.columns.find((column, i) => i === colId);
  const task = column.tasks.find((task, i) => i === taskIndex);
  const date = new Date(task.date).toLocaleString();
  expect(screen.getByText(task.title)).toBeInTheDocument();
  expect(screen.getByText(date)).toBeInTheDocument();
});
