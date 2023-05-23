import React from "react";
import { AllElementType } from "../../Main/Main";
import { Typography } from "antd";
interface Props {
  data: AllElementType;
}
export const SelectBox = ({ data }: Props) => {
  const { Text } = Typography;
  return (
    <div className="output__element">
      <label className="margin-10 ">
        {data.label as string}
        {data.required && <span style={{ color: "red" }}>*</span>}
      </label>
      <br />
      <select className="select">
        {Array.isArray(data.options) &&
          data.options.map((element) => (
            <option value={element.key} selected={element.selected as boolean}>
              {element.value}
            </option>
          ))}
      </select>
      <br />
      <Text italic className="margin-10 ">
        {data.helperText as string}
      </Text>
    </div>
  );
};
