import React from "react";
import { useParams } from "react-router-dom";
import { FinalObjectType } from "../Main/Main";

export const OutputForm = () => {
  const { id } = useParams();
  const data = localStorage.getItem("form-data") || "[]";
  const parsedData: FinalObjectType[] | [] = JSON.parse(data);
  const dataToShow = parsedData.find((data) => data.id === id);
  const allElements = dataToShow?.data || [];

  return <div></div>;
};
