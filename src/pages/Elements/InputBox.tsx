import React from 'react'
import { AllElementType } from '../Main/Main'
import { Input, Typography } from 'antd'
import { Draggable } from 'react-beautiful-dnd';
interface InputBoxType {
    data: AllElementType;
    index: number;
    handleDeleteQuestion: Function;
}
const InputBox = ({ data, index, handleDeleteQuestion }: InputBoxType) => {
    const { Text } = Typography;
    return (
        <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
            {
                (provided) => (
                    <div ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className="flex">
                            <label className="margin-10 ">{data.label as string}{data.required && <span style={{ color: "red" }}>*</span>}</label>
                            <button className="delete-btn" onClick={(e) => handleDeleteQuestion(e, index)}>X</button>
                        </div>
                        <Input className="margin-10 output_text" type={data.type as string} placeholder={data.placeholder as string} required={data.required as boolean} autoFocus={data.focus as boolean} disabled={data.disable as boolean} value={data.defaultValue as string} />
                        <Text strong className="margin-10 ">{data.helperText as string}</Text>
                    </div>
                )
            }

        </Draggable>
    )
}

export default InputBox
