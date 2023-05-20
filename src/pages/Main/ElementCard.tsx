import React from "react";
import { useDrag } from "react-dnd";

export const ElementCard = ({
  text,
  icon,
  index
}: {
  text: string;
  icon: JSX.Element;
  index: number
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: {text, index},
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
