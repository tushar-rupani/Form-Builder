import React from "react";
import { AllElementType } from "../Main/Main";
import { Draggable } from "react-beautiful-dnd";
import { EditOutlined } from "@ant-design/icons";
import { Typography } from "antd";
interface PropsType {
  data: AllElementType;
  index: number;
  handleDeleteQuestion: Function;
  handleEditQuestion: Function;
}
export const CheckBox = ({
  data,
  index,
  handleDeleteQuestion,
  handleEditQuestion,
}: PropsType) => {
  const { Text } = Typography;
  console.log("radio", data);

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
          {Array.isArray(data.options) &&
            data.options.map((element) => (
              <>
                <input
                  type="checkbox"
                  value={element.key}
                  name={element.key}
                  checked={element.selected as boolean}
                />{" "}
                {element.value} <br />
              </>
            ))}
          <br />
          <Text italic className="margin-10 ">
            {data.helperText as string}
          </Text>
        </div>
      )}
    </Draggable>
  );
};
