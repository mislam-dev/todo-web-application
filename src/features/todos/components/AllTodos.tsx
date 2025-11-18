import { SingleTodoCard, type Todo } from "./SingleTodo";

export function AllTodos({ todos }: { todos: Todo[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {todos.map((todo) => {
        return <SingleTodoCard todo={todo} key={todo.id} />;
      })}
    </div>
  );
}
