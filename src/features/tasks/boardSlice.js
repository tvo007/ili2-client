import { createSlice, current } from "@reduxjs/toolkit";
import { objFromArray } from "../../utils/obj-from-array";

const boardSlice = createSlice({
  name: "board",
  initialState: { order: null, id: null, tasks: [] },
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

    setBoardTasks: (state, action) => {
      const { data } = action.payload;
      state.tasks = data;
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
      const { targetColId, taskKey, name, desc } = action.payload;

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
      state.tasks.push({
        key: taskKey,
        name: name,
        desc: desc,
        column: targetColId,
      });
      // console.log("If you are reading this, things went well!");
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
      state.tasks = state.tasks.filter((task) => task.key !== taskKey);
    },
  },
});

export const {
  setBoard,
  moveSyncTask,
  addSyncTask,
  deleteSyncTask,
  clearBoard,
  setBoardTasks,
} = boardSlice.actions;

export default boardSlice.reducer;

export const selectCurrentBoard = (state) => state.board;
export const selectBoardTasks = (state) => objFromArray(state.board.tasks);
