import { createSlice, current } from "@reduxjs/toolkit";

const boardSlice = createSlice({
  name: "board",
  initialState: { order: null, id: null },
  reducers: {
    setBoard: (state, action) => {
      const { order, id } = action.payload;
      state.order = order;
      state.id = id;
    },

    clearBoard: (state, action) => {
      state.order = null;
      state.id = null;
    },

    moveSyncTask(state, action) {
      const { taskKey, targetColId, sourceColId, targetPosition } =
        action.payload;

      let boardCopyColumns = JSON.parse(
        JSON.stringify(current(state.order.columns))
      );

      if (sourceColId !== targetColId) {
        let sourceColIndex = boardCopyColumns.findIndex(
          (col) => col.id === sourceColId
        );
        let sourceCol = boardCopyColumns[sourceColIndex];
        sourceCol.order = sourceCol.order.filter(
          (task) => task.key !== taskKey
        );
        sourceCol.order = sourceCol.order.map((task, index) => ({
          ...task,
          position: index,
        }));
      }

      let targetColIndex = boardCopyColumns.findIndex(
        (col) => col.id === targetColId
      );

      let targetCol = boardCopyColumns[targetColIndex];

      targetCol.order = targetCol.order.filter((task) => task.key !== taskKey);
      targetCol.order.splice(targetPosition, 0, {
        key: taskKey,
      });
      targetCol.order = targetCol.order.map((task, index) => ({
        ...task,
        position: index,
      }));

      state.order = { columns: boardCopyColumns };
    },
    addSyncTask(state, action) {
      const { targetColId, taskKey } = action.payload;
      let boardCopyColumns = JSON.parse(
        JSON.stringify(current(state.order.columns))
      );

      let targetColIndex = boardCopyColumns.findIndex(
        (col) => col.id === targetColId
      );

      let targetCol = boardCopyColumns[targetColIndex];
      targetCol.order.push({
        key: taskKey,
        position: targetCol.order.length,
      });

      state.order = { columns: boardCopyColumns };
    },

    deleteSyncTask(state, action) {
      const { sourceColId, taskKey } = action.payload;
      let boardCopyColumns = JSON.parse(
        JSON.stringify(current(state.order.columns))
      );
      let sourceColIndex = boardCopyColumns.findIndex(
        (col) => col.id === sourceColId
      );
      let sourceCol = boardCopyColumns[sourceColIndex];
      sourceCol.order = sourceCol.order.filter((task) => task.key !== taskKey);
      sourceCol.order = sourceCol.order.map((task, index) => ({
        ...task,
        position: index,
      }));

      state.order = { columns: boardCopyColumns };
    },
  },
});

export const {
  setBoard,
  moveSyncTask,
  addSyncTask,
  deleteSyncTask,
  clearBoard,
} = boardSlice.actions;

export default boardSlice.reducer;

export const selectCurrentBoard = (state) => state.board;
