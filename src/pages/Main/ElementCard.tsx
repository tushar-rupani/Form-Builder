import React, { useEffect } from "react";
import { useDrag } from "react-dnd";

export const ElementCard = ({
  text,
  icon,
  index,
  type,
  setDragged,
}: {
  text: string;
  icon: JSX.Element;
  index: number;
  type: string;
  setDragged: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: { text, index, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    isDragging ? setDragged(true) : setDragged(false);
  }, [isDragging, setDragged]);
  return (
    <div
      className={`input__element ${isDragging ? "dragging" : ""}`}
      ref={drag}
    >
      {icon}
      {text}
    </div>
  );
};
