"use client";

import { ApiClient } from "@/lib/apiClient";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { toast } from "sonner";
import { SingleTodoCard, Todo } from "../components/SingleTodo";

const DnDList = ({ todos, token }: { todos: Todo[]; token: string }) => {
  const [items, setItems] = useState<Todo[]>(
    todos.sort((a, b) => a.position - b.position)
  );

  const updateTodoPosition = async (id: number, position: number) => {
    const formData = new FormData();
    formData.append("position", position.toString());

    const axios = new ApiClient(token);
    try {
      await axios.patch(`/todos/${id}/`, formData);
    } catch {
      toast.error(
        "Something went wrong ! Failed to update position! try again later!"
      );
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);

        const newOrder = arrayMove(prev, oldIndex, newIndex);

        const updated = newOrder.map((item, index) => ({
          ...item,
          position: index + 1,
        }));

        updated.forEach(async (item) => {
          await updateTodoPosition(item.id, item.position);
        });

        return updated;
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <div className="grid grid-cols-3 gap-2">
          {items.map((todo) => (
            <SingleTodoCard todo={todo} key={todo.id} token={token} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DnDList;
