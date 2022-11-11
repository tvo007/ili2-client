const handleDragEnd = async ({ source, destination, draggableId }) => {
  try {
    // Dropped outside the column
    if (!destination) {
      return;
    }

    // Card has not been moved
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // Moved to the same column on different position
      // await dispatch(moveCard(draggableId, destination.index));

      //create new column without draggable
      // const newCol = Object.values(tasks.entities).filter(
      //   (task) =>
      //     task.column.id === destination.droppableId &&
      //     task.id !== draggableId
      // );

      // // Then insert the item at the right location
      // newCol.splice(destination.index, 0, tasks.entities[draggableId]);

      // let newIndex = newCol.findIndex((task) => task.id === draggableId);

      // const calcInnerPosition = (index, arr) => {
      //   if (index >= arr.length - 1)
      //     return Math.max(...arr.map((o) => o.position)) + 500; //at highest index

      //   if (index === 0) return Math.min(...arr.map((o) => o.position)) / 2; //at lowest

      //   if (index < arr.length - 1 && index > 0)
      //     return (arr[index - 1].position + arr[index + 1].position) / 2; //in between
      // };

      // console.log(calcInnerPosition(newIndex, newCol));

      const movedTask = await moveTask({
        taskId: draggableId,
        position: calcInnerPosition(newIndex, newCol),
        columnId: source.droppableId,
      });

      if (movedTask) console.log("sucess!");
      //how would you do this on the backend??
      //send over columnId, and taskId, destination.index
      //create temp col and filter out tasks by columnId and without taskId
      //splice in at destin.index, 0 , task @ taskId
      //get index of spliced item in newCol,
      //calc avg position at + 1 and - 1
      //patch request of with avg position value

      /**getting data */
      // console.log({
      //   draggedTask: tasks.entities[draggableId].position,
      //   destIndex: destination.index, //dest position
      //   sourceIndex: source,
      // });

      // let derived = Object.values(tasks.entities)
      //   .map((task) => ({
      //     id: task.id,
      //     name: task.name,
      //     position: task.position,
      //     column: task.column.id,
      //   }))
      //   .filter((task) => task.column === destination.droppableId)
      //   .sort((a, b) => a.position - b.position);
      //sortr array by position
    } else {
      // Moved to another column
      // await dispatch(
      //   moveCard(draggableId, destination.index, destination.droppableId)
      // );
      console.log({
        draggableId, // represents task id
        destIndex: destination.index, //position, not coded in yet
        destDroppable: destination.droppableId, //represents column
      });
    }

    // toast.success("Card moved!");
    console.log("Card moved!");
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong!");
  }
};
