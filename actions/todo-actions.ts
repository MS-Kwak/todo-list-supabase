'use server';

import { Database } from 'types_db';
import { createServerSupabaseClient } from 'utils/supabase/server';

export type TodoRow = Database['public']['Tables']['todo']['Row'];
export type TodoRowInsert =
  Database['public']['Tables']['todo']['Insert'];
export type TodoRowUpdate =
  Database['public']['Tables']['todo']['Update'];

function handleError(error: any) {
  console.error('Error:', error);
  throw new Error(error.message || 'An error occurred');
}

export async function getTodos({
  searchInput = '',
}): Promise<TodoRow[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('todo')
    .select('*')
    .ilike('title', `%${searchInput}%`)
    .order('created_at', { ascending: true });

  if (error) {
    handleError(error);
  }
  return data;
}

export async function createTodo(todo: TodoRowInsert) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('todo')
    .insert({ ...todo, created_at: new Date().toISOString() });

  if (error) {
    handleError(error);
  }
  return data;
}

export async function updateTodo(todo: TodoRowUpdate) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('todo')
    .update({ ...todo, updated_at: new Date().toISOString() })
    .eq('id', todo.id);

  if (error) {
    handleError(error);
  }
  return data;
}

export async function deleteTodo(id: number) {
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
