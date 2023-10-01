import { useState } from "react";
import "./Calculator.css";
import TalentPathGrid from "../talentpath/TalentPathGrid";

export type Talent = {
  name: string;
  allocated: boolean;
};

export type TalentPath = {
  name: string;
  talents: Array<Talent>;
};

export type TalentTree = Array<TalentPath>;

function Calculator() {
  const [points, setPoints] = useState(0);
  const [talentTree, setTalentTree] = useState<TalentTree>([
    {
      name: "talent path 1",
      talents: [
        {
          name: "talent 1",
          allocated: false,
        },
        {
          name: "talent 2",
          allocated: false,
        },
        {
          name: "talent 3",
          allocated: false,
        },
        {
          name: "talent 4",
          allocated: false,
        },
      ],
    },
    {
      name: "talent path 2",
      talents: [
        {
          name: "talent 1",
          allocated: false,
        },
        {
          name: "talent 2",
          allocated: false,
        },
        {
          name: "talent 3",
          allocated: false,
        },
        {
          name: "talent 4",
          allocated: false,
        },
      ],
    },
  ]);

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

    let removeCount = 0;
    const copyTalents = targetTalents.map((talent, index) => {
      if (index >= talentIdx && talent.allocated) {
        removeCount = removeCount + 1;
        return {
          ...talent,
          allocated: false,
        };
      }
      return talent;
    });

    const updatedTree = talentTree.map((path, idx) => {
      if (pathIdx === idx) {
        return {
          ...path,
          talents: copyTalents,
        };
      }
      return path;
    });
    setPoints(points - removeCount);
    setTalentTree(updatedTree);
  };

  return (
    <div className="calc-container">
      <div className="talent-tree-container">
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
        <p>{points} &#47; 6</p>
        <p>Points Spent</p>
      </div>
    </div>
  );
}

export default Calculator;
