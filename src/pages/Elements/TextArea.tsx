import React from "react";
import { AllElementType } from "../Main/Main";
import { Typography } from "antd";
import { Draggable } from "react-beautiful-dnd";
import { EditOutlined } from "@ant-design/icons";
interface InputBoxType {
  data: AllElementType;
  index: number;
  handleDeleteQuestion: Function;
  handleEditQuestion: Function;
}
const TextArea = ({
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
                onClick={(e) => handleEditQuestion(e, index)}
              >
                <EditOutlined />
              </button>
              <button
                className="delete-btn"
                onClick={(e) => handleDeleteQuestion(e, index)}
              >
                X
              </button>
            </div>
          </div>
          <textarea value={data.defaultValue as string}></textarea>
          <br />
          <Text italic className="margin-10 ">
            {data.helperText as string}
          </Text>
        </div>
      )}
    </Draggable>
  );
};

export default TextArea;
