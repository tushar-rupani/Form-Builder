import React from "react";
import { useDrag } from "react-dnd";

export const ElementCard = ({
  text,
  icon,
}: {
  text: string;
  icon: JSX.Element;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div className="input__element" ref={drag}>
      {icon}
      {text}
    </div>
  );
};
