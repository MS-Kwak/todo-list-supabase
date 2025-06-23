'use client';

import { deleteTodo, updateTodo } from '@/actions/todo-actions';
import { queryClient } from '@/config/ReactQueryClientProvider';
import { Spinner } from '@material-tailwind/react';
import { Button, Checkbox, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export default function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);

  const updateTodoMutation = useMutation({
    mutationFn: () =>
      updateTodo({
        id: todo.id,
        title,
        completed,
      }),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });

  return (
    <div className="flex items-center gap-1 w-full">
      <Checkbox
        checked={completed}
        onChange={async (e) => {
          await setCompleted(e.target.checked);
          await updateTodoMutation.mutateAsync();
        }}
      />

      {isEditing ? (
        <TextField
          className="flex-1"
          id="standard-basic"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <p className={`flex-1 ${completed && 'line-through'}`}>
          {title}
        </p>
      )}
      {isEditing ? (
        <Button
          variant="contained"
          className="!p-3 !w-10 !min-w-auto"
          onClick={async () => await updateTodoMutation.mutateAsync()}
        >
          {updateTodoMutation.isPending ? (
            <Spinner />
          ) : (
            <i className="fa-solid fa-check" />
          )}
        </Button>
      ) : (
        <Button
          variant="contained"
          className="!p-3 !w-10 !min-w-auto"
          onClick={() => setIsEditing(true)}
        >
          <i className="fa-solid fa-pen" />
        </Button>
      )}
      <Button
        onClick={() => deleteTodoMutation.mutate()}
        variant="contained"
        className="!p-3 !w-10 !min-w-auto"
      >
        {deleteTodoMutation.isPending ? (
          <Spinner />
        ) : (
          <i className="fa-solid fa-trash" />
        )}
      </Button>
    </div>
  );
}
