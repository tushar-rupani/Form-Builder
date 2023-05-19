import React from "react";
import "./style.css";
import { dataForElements, iconObjectInitial } from "../../utils/_const";

import { ElementCard } from "./ElementCard";
export const Main = () => {

  return (
    <div className="main-context">
      <div className="draggable-part">
        {dataForElements.map((data, index) => (
          <div key={index}>
            <ElementCard text={data.text} icon={iconObjectInitial[data.icon]} />
          </div>
        ))}
      </div>
      <div className="droppable-part">

      </div>
    </div>
  );
};
