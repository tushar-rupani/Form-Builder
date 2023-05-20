import React from "react";
import { useDrag } from "react-dnd";

export const ElementCard = ({
  text,
  icon,
  index,
  type
}: {
  text: string;
  icon: JSX.Element;
  index: number;
  type: string
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: { text, index, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div className={`input__element ${isDragging ? "dragging" : ""}`} ref={drag} >
      {icon}
      {text}
    </div>
  );
};
