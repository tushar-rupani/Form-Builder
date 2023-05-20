import React, { ChangeEvent, useState } from "react";
import "./style.css";
import { dataForElements, iconObjectInitial } from "../../utils/_const";
import { useDrop } from "react-dnd";
import { InitialObjectForInput } from "../../utils/_const";
import { ElementCard } from "./ElementCard";
import { Modal, Input, Alert } from "antd";
import logo from "../../assets/images/form-builder-logo.png";
export const Main = () => {
  const [currentElement, setCurrentElement] = useState(InitialObjectForInput);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item: any) => {
      showModal();
      setCurrentElement((prev) => ({ ...prev, element: item.text }));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    alert("Ok pressed!");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentElement((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="main-context">
      <div className="draggable-part">
        <img src={logo} alt="logo" width="100%" height="15%" />
        {dataForElements.map((data, index) => (
          <div key={index}>
            <ElementCard
              text={data.text}
              icon={iconObjectInitial[data.icon]}
              index={index}
            />
          </div>
        ))}
      </div>
      <div className="droppable-part" ref={drop}>
        <Alert
          message="Drag and Drop!"
          description="Just Drag whatever element you want to add in your form from left panel and drop it at right panel."
          type="info"
        />
      </div>

      <Modal
        title={`Let's Create - ${currentElement.element} Field!`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Enter Label"
          name="label"
          onChange={handleChange}
          value={currentElement.label}
        />
      </Modal>
    </div>
  );
};
