import React, { useEffect } from "react";
import { useDrag } from "react-dnd";

export const ElementCard = ({
  text,
  icon,
  index,
  type,
  setDragged,
  tag,
}: {
  text: string;
  icon: JSX.Element;
  index: number;
  type: string;
  setDragged: React.Dispatch<React.SetStateAction<boolean>>;
  tag: string | undefined;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: { text, index, type, tag },
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
