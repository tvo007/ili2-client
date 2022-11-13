import { createSlice, current } from "@reduxjs/toolkit";

const boardSlice = createSlice({
  name: "board",
  initialState: { order: null },
  reducers: {
    setBoard: (state, action) => {
      const data = action.payload;
      state.order = data;
    },
    moveSyncTask(state, action) {
      const { taskId, targetColId, sourceColId, targetPosition } =
        action.payload;

      let boardCopyColumns = JSON.parse(
        JSON.stringify(current(state.order.columns))
      );

      if (sourceColId !== targetColId) {
        let sourceColIndex = boardCopyColumns.findIndex(
          (col) => col.id === sourceColId
        );
        let sourceCol = boardCopyColumns[sourceColIndex];
        sourceCol.order = sourceCol.order.filter((col) => col.id !== taskId);
        sourceCol.order = sourceCol.order.map((col, index) => ({
          ...col,
          position: index,
        }));
      }

      let targetColIndex = boardCopyColumns.findIndex(
        (col) => col.id === targetColId
      );

      let targetCol = boardCopyColumns[targetColIndex];

      targetCol.order = targetCol.order.filter((col) => col.id !== taskId);
      targetCol.order.splice(targetPosition, 0, {
        id: taskId,
      });
      targetCol.order = targetCol.order.map((col, index) => ({
        ...col,
        position: index,
      }));

      state.order = { columns: boardCopyColumns };
    },
  },
});

export const { setBoard, moveSyncTask } = boardSlice.actions;

export default boardSlice.reducer;

export const selectCurrentBoard = (state) => state.board.order;
