import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FinalObjectType } from "../Main/Main";
import Header from "../components/Header/Header";
import { InputBox } from "../Elements/OutputElements/Input";
import { SelectBox } from "../Elements/OutputElements/SelectBox";

interface AnswerType {
  [key: string]: string;
}
export const OutputForm = () => {
  const { id } = useParams();
  const data = localStorage.getItem("form-data") || "[]";
  const parsedData: FinalObjectType[] | [] = JSON.parse(data);
  const dataToShow = parsedData.find((data) => data.id === id);
  const allElements = dataToShow?.data || [];
  const [ansObject, setAnsObject] = useState<AnswerType>({});
  // const handleChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {};
  useEffect(() => {
    const initialValue: AnswerType = {};
    allElements.forEach((data, index) => {
      initialValue[data.label as string] = data.defaultValue as string;
    });
    setAnsObject(initialValue);
  }, []);
  return (
    <Header>
      <>
        {allElements.length > 0 &&
          allElements.map((data, index) => {
            return (
              <>
                <br />
                <div key={index}>
                  {data.tag === "input" && <InputBox data={data} />}
                </div>

                <div key={index}>
                  {data.type === "select" && <SelectBox data={data} />}
                </div>
              </>
            );
          })}
      </>
    </Header>
  );
};
