'use client';

import style from './todo.module.css';
import {
  IconButton,
  Checkbox,
  TextField,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteTodo, updateTodo } from 'actions/todo.action';
import { queryClient } from 'config/ReactQueryClientProvider';

export default function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);

  const onChangeInput = (e) => {
    setTitle(e.target.value);
  };

  const onChageCheckbox = async (e) => {
    await setCompleted(e.target.checked);
    await updateTodoMutation.mutate();
  };

  const onClickEditing = async () => {
    await updateTodoMutation.mutate();
  };

  const onClickCreate = async () => {
    await setIsEditing(!isEditing);
  };

  const onClickDelete = async () => {
    await deleteTodoMutation.mutate();
  };

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
    <div className={style.todo__container}>
      <Checkbox checked={completed} onChange={onChageCheckbox} />

      {isEditing ? (
        <TextField
          id="standard-basic"
          className={style.todo__item}
          label=""
          variant="standard"
          value={title}
          onChange={onChangeInput}
        />
      ) : (
        <div
          className={`${style.todo__item} ${completed && style.line}`}
        >
          {title}
        </div>
      )}

      <div className={style.todo__buttons}>
        {isEditing ? (
          <IconButton aria-label="create" onClick={onClickEditing}>
            {updateTodoMutation.isPending ? (
              <CircularProgress size={24} />
            ) : (
              <CheckIcon />
            )}
          </IconButton>
        ) : (
          <IconButton aria-label="create" onClick={onClickCreate}>
            <CreateIcon />
          </IconButton>
        )}
        <IconButton aria-label="delete" onClick={onClickDelete}>
          {deleteTodoMutation.isPending ? (
            <CircularProgress size={24} />
          ) : (
            <DeleteIcon />
          )}
        </IconButton>
      </div>
    </div>
  );
}
