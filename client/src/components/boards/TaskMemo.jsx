import React, { memo } from "react";
import Task from "./Task";

//This component exists for performcane, as when snapshot changes,
// all of the tasks are being rerendered
//With memoization, we cache the innerlist, and only rerender when tehre is changes to props

const TaskMemo = ({ tasks }) => {
  return tasks.map((task, index) => (
    <Task key={task.id} task={task} index={index} />
  ));
};

const areEqual = (prevProps, nextProps) => prevProps.tasks === nextProps.tasks;

export default memo(TaskMemo, areEqual);
