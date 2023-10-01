import { useState, useContext } from "react";
import { CalculatorContext } from "../../context/CalculatorContext";
import "./Calculator.css";
import TalentPathGrid from "../talentpath/TalentPathGrid";

export type Talent = {
  id: number;
  name: string;
  allocated: boolean;
};

export type TalentPath = {
  position: number;
  name: string;
  talents: Array<Talent>;
};

export type TalentTree = Array<TalentPath>;

function Calculator() {
  const [points, setPoints] = useState(0);
  const [talentTree, setTalentTree] = useState<TalentTree>([
    {
      position: 1,
      name: "talent path 1",
      talents: [
        {
          id: 1,
          name: "talent 1",
          allocated: false,
        },
        {
          id: 2,
          name: "talent 2",
          allocated: false,
        },
        {
          id: 3,
          name: "talent 3",
          allocated: false,
        },
        {
          id: 4,
          name: "talent 4",
          allocated: false,
        },
      ],
    },
    {
      position: 2,
      name: "talent path 2",
      talents: [
        {
          id: 1,
          name: "talent 1",
          allocated: false,
        },
        {
          id: 2,
          name: "talent 2",
          allocated: false,
        },
        {
          id: 3,
          name: "talent 3",
          allocated: false,
        },
        {
          id: 4,
          name: "talent 4",
          allocated: false,
        },
      ],
    },
  ]);
  // const { calculatorState } = useContext(CalculatorContext);

  const allocatePoint = (pathIdx: number, talentIdx: number) => {
    if (points >= 6) {
      return;
    }
    const targetTalents = talentTree[pathIdx].talents;

    if (
      (talentIdx > 0 && !targetTalents[talentIdx - 1].allocated) ||
      targetTalents[talentIdx].allocated
    ) {
      return;
    }

    setPoints(points + 1);
    const copyTalents = [...targetTalents];
    copyTalents.splice(talentIdx, 1, { ...copyTalents[talentIdx], allocated: true });

    const updatedTree = talentTree.map((path, idx) => {
      if (pathIdx === idx) {
        return {
          ...path,
          talents: copyTalents,
        };
      }
      return path;
    });

    setTalentTree(updatedTree);
  };

  const removePoint = (e: React.MouseEvent, pathIdx: number, talentIdx: number) => {
    e.preventDefault();
    if (points <= 0) {
      return;
    }
    const targetTalents = talentTree[pathIdx].talents;

    if (!targetTalents[talentIdx].allocated) {
      return;
    }

    setPoints(points - 1);
    const copyTalents = [...targetTalents];
    copyTalents.splice(talentIdx, 1, { ...copyTalents[talentIdx], allocated: false });

    const updatedTree = talentTree.map((path, idx) => {
      if (pathIdx === idx) {
        return {
          ...path,
          talents: copyTalents,
        };
      }
      return path;
    });

    setTalentTree(updatedTree);
  };

  return (
    <div className="calc-container">
      <div className="flex-col">
        {talentTree.map((path, idx) => (
          <TalentPathGrid
            key={path.name}
            path={path}
            pathIdx={idx}
            allocatePoint={allocatePoint}
            removePoint={removePoint}
          />
        ))}
      </div>
      <div className="points-counter">
        <span>{points} / 6</span>
        <span>Points Spent</span>
      </div>
    </div>
  );
}

export default Calculator;
