'use client';

import { createTodo, getTodos } from '@/actions/todo-actions';
import Todo from '@/components/todo';
import { TextField, InputAdornment, Button } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function UI() {
  const [searchInput, setSearchInput] = useState('');
  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos({ searchInput }),
  });

  const createTodoMutation = useMutation({
    mutationFn: () =>
      createTodo({
        title: 'New',
        completed: false,
      }),
    onSuccess: () => {
      todosQuery.refetch();
    },
  });

  return (
    <div className="w-2/3 mx-auto flex flex-col items-center py-10 gap-3">
      <h1 className="font-bold text-xl">TODO LIST</h1>
      <TextField
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full"
        id="outlined-basic"
        label="Search TODO"
        placeholder="Search TODO"
        variant="outlined"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <i className="fa-solid fa-magnifying-glass"></i>
              </InputAdornment>
            ),
          },
        }}
      />

      {todosQuery.isPending && <p>Loading...</p>}
      {todosQuery.data &&
        todosQuery.data.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}

      <Button
        onClick={() => createTodoMutation.mutate()}
        loading={createTodoMutation.isPending}
        variant="contained"
      >
        <i className="fa-solid fa-plus mr-2"></i>Add TODO
      </Button>
    </div>
  );
}
