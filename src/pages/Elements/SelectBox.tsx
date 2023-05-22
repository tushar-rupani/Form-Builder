import React from "react";
import { AllElementType } from "../Main/Main";
import { Typography } from "antd";
import { Draggable } from "react-beautiful-dnd";
import { EditOutlined } from "@ant-design/icons";
interface InputBoxType {
  data: AllElementType;
  index: number;
  handleDeleteQuestion: Function | undefined;
  handleEditQuestion: Function | undefined;
}
const SelectBox = ({
  data,
  index,
  handleDeleteQuestion,
  handleEditQuestion,
}: InputBoxType) => {
  const { Text } = Typography;
  return (
    <Draggable
      key={index.toString()}
      draggableId={index.toString()}
      index={index}
    >
      {(provided) => (
        <div
          className="output__element"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex">
            <label className="margin-10 ">
              {data.label as string}
              {data.required && <span style={{ color: "red" }}>*</span>}
            </label>
            <div className="flex">
              <button
                className="edit-btn"
                onClick={(e) => {
                  handleEditQuestion && handleEditQuestion(e, index);
                }}
              >
                <EditOutlined />
              </button>
              <button
                className="delete-btn"
                onClick={(e) => {
                  handleDeleteQuestion && handleDeleteQuestion(e, index);
                }}
              >
                X
              </button>
            </div>
          </div>
          <select className="select">
            {Array.isArray(data.options) &&
              data.options.map((element) => (
                <option
                  value={element.key}
                  selected={element.selected as boolean}
                >
                  {element.value}
                </option>
              ))}
          </select>
          <br />
          <Text italic className="margin-10 ">
            {data.helperText as string}
          </Text>
        </div>
      )}
    </Draggable>
  );
};

export default SelectBox;
