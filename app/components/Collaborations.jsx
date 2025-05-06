"use client";
import React, { useEffect, useState } from "react";

import { DndContext } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import CollaborationModel from "./CollaborationModel";
import { GetAllCollaboration, sortCollaboration } from "@/lib/api";

export default function Collaborations() {
  const [collaborations, setCollaborations] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (over && active.id !== over.id) {
      const oldIndex = collaborations.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = collaborations.findIndex((item) => item.id === over.id);
      setCollaborations((collaborations) =>
        arrayMove(collaborations, oldIndex, newIndex)
      );
    }
  };

  useEffect(() => {
    sortCollaboration(collaborations);
  }, [collaborations]);

  useEffect(() => {
    GetAllCollaboration().then(
      (data) => setCollaborations(data),
      setLoading(false)
    );
  }, []);

  if (loading) return null;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext
        items={collaborations.map((item) => (item.id = item._id))}
      >
        {" "}
        <div className="flex flex-wrap items-center text-black justify-start gap-10">
          {collaborations?.map((item) => (
            <CollaborationModel
              key={item._id}
              id={item._id}
              thumbnail={item.image}
              name={item.name.en}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
