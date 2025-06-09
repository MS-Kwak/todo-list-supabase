'use client';

import style from './ui.module.css';
import Todo from '/components/todo';
import {
  FormControl,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getTodos, createTodo } from '/actions/todo.action';

export default function UI() {
  const [searchInput, setSearchInput] = useState('');

  const todosQuery = useQuery({
    queryKey: ['todos', searchInput],
    queryFn: () => getTodos({ searchInput }),
  });

  const createTodoMutation = useMutation({
    mutationFn: () =>
      createTodo({ title: 'New todo', completed: false }),
    onSuccess: () => {
      todosQuery.refetch();
    },
  });

  return (
    <div className={style.ui__container}>
      <h1 className={style.h1}>TODO LIST</h1>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">
          Search todo
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                // onClick={handleClickShowPassword}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Search todo"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </FormControl>

      {todosQuery.isPending && <p>Loading...</p>}
      {todosQuery.data &&
        todosQuery.data.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}

      <Button
        onClick={() => createTodoMutation.mutate()}
        loading={createTodoMutation.isPending}
        variant="contained"
        startIcon={<AddIcon />}
      >
        ADD TODO
      </Button>
    </div>
  );
}
