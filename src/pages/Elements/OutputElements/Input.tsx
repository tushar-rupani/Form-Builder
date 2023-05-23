import React from "react";
import { AllElementType } from "../../Main/Main";
import { Input, Typography } from "antd";
interface Props {
  data: AllElementType;
}
export const InputBox = ({ data }: Props) => {
  const { Text } = Typography;

  return (
    <div className="output__element">
      <label className="margin-10 ">
        {data.label as string}
        {data.required && <span style={{ color: "red" }}>*</span>}
      </label>
      <Input
        className="margin-10 output_text"
        type={data.type as string}
        placeholder={data.placeholder as string}
        required={data.required as boolean}
        autoFocus={data.focus as boolean}
        readOnly={data.readOnly as boolean}
        disabled={data.disable as boolean}
        defaultValue={data.defaultValue as string}
      />
      <Text italic className="margin-10 ">
        {data.helperText as string}
      </Text>
    </div>
  );
};
