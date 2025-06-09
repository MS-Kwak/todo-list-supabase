'use server';

import { createServerSupabaseClient } from 'utils/supabase/server';

function handleError(error) {
  console.error(error);
  throw new Error(error.message);
}

export async function getTodos({ searchInput = '' }) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('todo')
    .select('*')
    .like('title', `%${searchInput}%`)
    .order('created_at', { ascending: true });

  if (error) {
    handleError(error);
  }

  return data;
}

export async function createTodo(todo) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from('todo').insert({
    ...todo,
    created_at: new Date().toISOString(),
  });

  if (error) {
    handleError(error);
  }

  return data;
}

export async function updateTodo(todo) {
  const supabase = await createServerSupabaseClient();
  console.log(todo);

  const { data, error } = await supabase
    .from('todo')
    .update({
      ...todo,
      updated_at: new Date().toISOString(),
    })
    .eq('id', todo.id);

  if (error) {
    handleError(error);
  }

  return data;
}

export async function deleteTodo(id) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('todo')
    .delete()
    .eq('id', id);

  if (error) {
    handleError(error);
  }

  return data;
}
