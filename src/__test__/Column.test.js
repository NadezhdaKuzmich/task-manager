import Column from "../components/Tasks/Column";
import { screen } from "@testing-library/react";
import { setupStore } from "../store/store";
import { renderWithProviders } from "../setupTests";

test("Render column", () => {
  const store = setupStore();
  const colId = 2;

  renderWithProviders(<Column colId={colId} col="done" />, { store });
  const state = store.getState().boards;
  const board = state.boards.find((board) => board.isActive === true);
  const column = board.columns.find((column, i) => i === colId);
  expect(screen.getByText(column.name)).toBeInTheDocument();
  expect(screen.getByText(column.tasks[0].title)).toBeInTheDocument();
});
