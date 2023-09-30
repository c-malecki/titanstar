import { useContext } from "react";
import { CalculatorContext } from "../../context/CalculatorContext";
import "./Calculator.css";
import TalentPath from "../talentpath/TalentPath";

function Calculator() {
  const { calculatorState } = useContext(CalculatorContext);

  return (
    <div className="calc-container">
      <div className="flex-col">
        {calculatorState.paths.map((path, idx) => (
          <TalentPath key={path.name} path={path} pathIdx={idx} />
        ))}
      </div>
      <div className="points-counter">
        <span>{calculatorState.pointsSpent} / 6</span>
        <span>Points Spent</span>
      </div>
    </div>
  );
}

export default Calculator;
