import React, { ChangeEvent, useEffect, useState } from "react";
import "./style.css";
import { OptionType, dataForElements, iconObjectInitial } from "../../utils/_const";
import { useDrop } from "react-dnd";
import { InitialObjectForInput } from "../../utils/_const";
import { ElementCard } from "./ElementCard";
import { Modal, Input, Alert, Switch } from "antd";
import logo from "../../assets/images/form-builder-logo.png";
import { ExclamationCircleFilled } from '@ant-design/icons';

export const Main = () => {
  interface AllElementType {
    [key: string]: string | boolean | OptionType[];
  }
  const [currentElement, setCurrentElement] = useState(InitialObjectForInput);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allElements, setAllElements] = useState<AllElementType[]>([]);
  const { confirm } = Modal;
  // eslint-disable-next-line
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item: any) => {
      showModal();
      setCurrentElement((prev) => ({ ...prev, element: item.text, type: item.type }));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setAllElements([...allElements, currentElement])
    setCurrentElement(InitialObjectForInput)
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    showConfirm()
  };
  const showConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this field?',
      icon: <ExclamationCircleFilled />,
      content: 'Once cancelled, we can not get the information back!',
      onOk() {
        setIsModalOpen(false);
        setCurrentElement(InitialObjectForInput)

      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentElement((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log(currentElement);
  }, [currentElement])
  const handleSwitchChange = (name: string) => {
    setCurrentElement((prev) => ({ ...prev, [name]: !prev[name] }))
  }
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
              type={data.type}
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
          className="input__box"
          onChange={handleChange}
          value={currentElement.label as string}
        />

        <Input
          placeholder="Enter Placeholder"
          name="placeholder"
          className="input__box"
          onChange={handleChange}
          value={currentElement.placeholder as string}
        />

        <Input
          placeholder="Enter Helper Text"
          name="helperText"
          className="input__box"
          onChange={handleChange}
          value={currentElement.helperText as string}
        />

        <Input
          placeholder="Enter Default Value"
          name="defaultValue"
          type={currentElement.type === "number" ? "number" : "text"}
          className="input__box"
          onChange={handleChange}
          value={currentElement.defaultValue as string}
        />

        <br />
        Required: <Switch className="margin-10" checked={currentElement.required as boolean} onChange={() => handleSwitchChange("required")} /><br />
        Disabled: <Switch className="margin-10" checked={currentElement.disable as boolean} onChange={() => handleSwitchChange("disable")} /><br />
        Focus: <Switch className="margin-10" checked={currentElement.focus as boolean} onChange={() => handleSwitchChange("focus")} /><br />
        Read Only: <Switch className="margin-10" checked={currentElement.readOnly as boolean} onChange={() => handleSwitchChange("readOnly")} /><br />
      </Modal>
    </div>
  );
};
