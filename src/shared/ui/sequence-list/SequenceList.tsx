'use client'
import { Droppable, Draggable, DragDropContext } from "@hello-pangea/dnd";
import { type ReactNode, useId } from "react";
import { type DropResult } from "@hello-pangea/dnd";
import { GrDrag } from "react-icons/gr";

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [moved] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, moved);

  return result;
};

export type SequenceListProps<Id extends number | string> = {
  value?: Id[],
  onMove: (p: { id: string, toIndex: number }) => void,
  render?: (itemId: Id, arrayIndex: number) => ReactNode,
  showNumbers?: boolean,
}

export function SequenceList<Id extends number | string = number>({ value = [], render = (id) => <>{id}</>, showNumbers, onMove }: SequenceListProps<Id>) {
  const id = useId();

  function onDragEnd(result: DropResult) {
    onMove({ id: result.draggableId, toIndex: result.destination.index });
  }
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {value.map((item, arrayIndex) => (
              <Draggable key={item} index={arrayIndex} draggableId={item + ''}>
                {(provided) => (
                  <div {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                    <div className="flex flex-col w-full bg-base-300 hover:bg-base-200 transition-all p-3 cursor-grab">
                      <div className="flex flex-row gap-2 items-center justify-start">
                        {showNumbers && <div style={{ fontSize: 12, color: 'grey' }}>
                          {arrayIndex + 1}
                        </div>}
                        <div {...provided.dragHandleProps}>
                          <GrDrag size={20} />
                        </div>
                        {render(item, arrayIndex)}
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
