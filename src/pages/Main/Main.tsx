import React, { ChangeEvent, useEffect, useState } from "react";
import "./style.css";
import { OptionType, dataForElements, iconObjectInitial } from "../../utils/_const";
import { useDrop } from "react-dnd";
import { InitialObjectForInput } from "../../utils/_const";
import { ElementCard } from "./ElementCard";
import { Modal, Input, Alert, Switch, Button, Typography } from "antd";
import logo from "../../assets/images/form-builder-logo.png";
import { CloseOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { MouseEvent } from 'react';
import InputBox from "../Elements/InputBox";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import SelectBox from "../Elements/SelectBox";

export interface AllElementType {
  [key: string]: string | boolean | OptionType[] | number;
}
export const Main = () => {

  const [currentElement, setCurrentElement] = useState(InitialObjectForInput);
  const options = currentElement.options as OptionType[];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allElements, setAllElements] = useState<AllElementType[]>([]);
  const [alertVisible, setAlertVisible] = useState<boolean>(true);
  const { confirm } = Modal;

  const [, drop] = useDrop(() => ({
    accept: "div",
    drop: (item: any) => {
      showModal();
      setCurrentElement((prev) => ({ ...prev, element: item.text, type: item.type }));
      setAlertVisible(false);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleAddOption = () => {
    setCurrentElement((prev) => ({
      ...prev,
      options: [...prev.options as OptionType[], { id: options.length + 1, key: "text", value: "text", selected: false }]
    }))
  }

  useEffect(() => {
    console.log({ currentElement, allElements });
  }, [currentElement, allElements])

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

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const cloneOfObj = { ...currentElement };
    const options: OptionType[] = cloneOfObj.options as OptionType[];
    options[index - 1].key = e.target.value.toLowerCase().replace(/\s/g, "-");
    options[index - 1].value = e.target.value;
    setCurrentElement(cloneOfObj);
  }

  const handleDeleteOption = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    const cloneObj = { ...currentElement };
    const options: OptionType[] = cloneObj.options as OptionType[];
    const newOptions = options.filter((option) => option.id !== index);
    cloneObj.options = newOptions;
    setCurrentElement(cloneObj);

  }

  const handleDefault = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const cloneObj = { ...currentElement };
    const options: OptionType[] = cloneObj.options as OptionType[];
    if (currentElement.type === "select") {
      options.map(option => option.selected = false);
      options[index - 1].selected = true;
      setCurrentElement(cloneObj);
    } else {
      options[index - 1].selected = true;
      setCurrentElement(cloneObj);
    }
  }

  const handleDeleteQuestion = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    const cloneObj: AllElementType[] = [...allElements];
    cloneObj.splice(index, 1);
    setAllElements(cloneObj)
  }

  const handleEditQuestion = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    const cloneObj: AllElementType[] = { ...allElements };
    setCurrentElement(cloneObj[index]);
    setIsModalOpen(true)

  }
  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const reOrderedElements = [...allElements];
    const [removed] = reOrderedElements.splice(result.source.index, 1);
    reOrderedElements.splice(result.destination.index, 0, removed);
    setAllElements(reOrderedElements)

  }
  // useEffect(() => {
  //   console.log(currentElement);
  // }, [currentElement])
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
        {
          alertVisible ? <Alert
            message="Drag and Drop!"
            description="Just Drag whatever element you want to add in your form from left panel and drop it at right panel."
            type="info"
            closable
          /> : <Typography.Title level={2} style={{ margin: 0 }}>
            Preview of your form!
          </Typography.Title>
        }

        <br />
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {allElements.map((data, index) => (
                  <div>
                    {(data.type === "text" || data.type === "number" || data.type === "password" || data.type === "date") && (
                      <InputBox data={data} index={index} handleDeleteQuestion={handleDeleteQuestion} handleEditQuestion={handleEditQuestion} />
                    )}

                    {data.type === "select" && (
                      <SelectBox data={data} index={index} handleDeleteQuestion={handleDeleteQuestion} />
                    )}
                    <br />
                  </div>
                ))}
              </div>
            )}

          </Droppable>
        </DragDropContext>

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

        {(currentElement.type === "text" || currentElement.type === "number" || currentElement.type === "password" || currentElement.type === "date") && (
          <Input
            placeholder="Enter Placeholder"
            name="placeholder"
            className="input__box"
            onChange={handleChange}
            value={currentElement.placeholder as string}
          />
        )}


        < Input
          placeholder="Enter Helper Text"
          name="helperText"
          className="input__box"
          onChange={handleChange}
          value={currentElement.helperText as string}
        />

        {(currentElement.type === "text" || currentElement.type === "number" || currentElement.type === "password" || currentElement.type === "date") && (
          <Input
            placeholder="Enter Default Value"
            name="defaultValue"
            type={currentElement.type === "number"
              ? "number"
              : currentElement.type === "date"
                ? "date"
                : currentElement.type === "password"
                  ? "password"
                  : "text"}
            className="input__box"
            onChange={handleChange}
            value={currentElement.defaultValue as string}
          />
        )}

        <br /><br />

        {(currentElement.type === "radio" || currentElement.type === "select" || currentElement.type === "checkbox") ?
          <div>
            <span>Add Options</span>
            <br /><br />
            {
              options.map((data, index) => (
                <>
                  <div className="flex" style={{ gap: "10px" }}>
                    <input type="checkbox" checked={data.selected as boolean} onChange={(e) => handleDefault(e, data.id)} />
                    <Input
                      placeholder={`Enter Option ${index + 1}`}
                      value={data.value}
                      onChange={(e) => handleOptionChange(e, data.id)}
                    />
                    <Input
                      placeholder="Key"
                      value={data.key}
                      disabled
                    />
                    <button style={{ background: "red", padding: "2px", color: "white", cursor: "pointer", borderRadius: "5px" }}
                      onClick={(e) => handleDeleteOption(e, data.id)}
                    >
                      <CloseOutlined />
                    </button>

                  </div>
                  <br />
                </>
              ))
            }
            <br />
            {options.length < 4 && < Button type="primary" onClick={handleAddOption}> Add More</Button>}
          </div> :
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <div>Required: <Switch className="margin-10" checked={currentElement.required as boolean} onChange={() => handleSwitchChange("required")} /><br /></div>
            <div>Disabled: <Switch className="margin-10" checked={currentElement.disable as boolean} onChange={() => handleSwitchChange("disable")} /><br /></div>
            <div>Focus: <Switch className="margin-10" checked={currentElement.focus as boolean} onChange={() => handleSwitchChange("focus")} /><br /></div>
            <div>Read Only: <Switch className="margin-10" checked={currentElement.readOnly as boolean} onChange={() => handleSwitchChange("readOnly")} /><br /></div>
          </div>
        }
      </Modal >
    </div >
  );
};
