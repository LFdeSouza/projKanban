import React, { memo } from "react";
import Column from "./Column";

export const ColumnMemo = ({ column, tasks, index, boardId }) => {
  const colTasks = column.taskIds.map((taskId) => tasks[taskId]);

  return (
    <Column column={column} tasks={colTasks} index={index} boardId={boardId} />
  );
};

const areEqual = (prevProps, nextProps) =>
  prevProps.column === nextProps.column &&
  prevProps.tasks === nextProps.tasks &&
  prevProps.index === nextProps.index;

export default memo(ColumnMemo, areEqual);
