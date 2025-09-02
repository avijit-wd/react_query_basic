import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import customFetch from "./utils";
import { toast } from "react-toastify";
import { useCreateTask } from "./react-query-custom-hooks";

const Form = () => {
  const queryClient = useQueryClient();
  const [newItemName, setNewItemName] = useState("");
  const { createTasks, createTaskPending } = useCreateTask();

  const handleSubmit = (e) => {
    e.preventDefault();
    createTasks(newItemName, {
      onSuccess: () => {
        toast.success("New task created");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className="form-control">
        <input
          type="text "
          className="form-input"
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type="submit" className="btn" disabled={createTaskPending}>
          add task
        </button>
      </div>
    </form>
  );
};
export default Form;
