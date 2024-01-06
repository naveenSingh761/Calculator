import React, { useState } from "react";
import "./styles.scss";
const UiArray = [
  "C",
  "*",
  "/",
  "+",
  "1",
  "2",
  "3",
  "-",
  "4",
  "5",
  "6",
  "%",
  "7",
  "8",
  "9",
  "**",
  "0",
  ".",
  "=",
];
const myCalculator = () => {
  const [operand, setOperand] = useState({
    curr: "0",
    res: "",
  });
  const [switchOperands, setswitchOperands] = useState(true);

  return (
    <div className="calcontainer">
      <div className="outputUiCont">
        {operand && (
          <div>
            <h1>{operand.curr ? operand.curr : null}</h1>
            <hr />

            <h1> {operand.res ? "=" + operand.res : null}</h1>
          </div>
        )}
      </div>
      <div className="inputUiCont">
        <DigitButton operand={operand} setOperand={setOperand} />
      </div>
    </div>
  );
};

const DigitButton = ({ operand, setOperand }) => {
  const HandleCalulatioon = (item) => {
    if (item === "C")
      return setOperand({
        curr: "0",
        res: "",
      });

    if (item === "=") {
      let exp = operand.curr;
      console.log("file: App.jsx:61 ~ HandleCalulatioon ~ exp:", typeof exp);
      for (let index = 0; index < exp.length; index++) {
        if (
          exp[index] === "0" &&
          index + 1 < exp.length - 1 &&
          exp[index + 1] !== "0"
        ) {
          exp = exp.substring(index + 1);
          break;
        }
      }

      return setOperand((prev) => ({
        curr: exp,
        res: (eval(exp) + "").slice(0, 15),
      }));
    }

    setOperand((prev) => ({
      ...prev,
      curr: operand.curr + item,
    }));
  };
  return (
    <div className="__CalButton">
      {UiArray.map((item, index) => {
        return (
          <div
            key={index}
            className={`__uibutton${index} __uibutton`}
            onClick={() => {
              HandleCalulatioon(item);
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default myCalculator;
