import { useState, useEffect, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Buffer } from "buffer";
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
  const [spentPoints, setSpentPoints] = useState(0);
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

  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const initRender = useRef(true);

  useEffect(() => {
    if (initRender.current) {
      if (!location.search.length) {
        initRender.current = false;
        return;
      } else {
        initRender.current = false;
        const existingTree = searchParams.get("s");
        if (!existingTree) return;
        const pointscount = searchParams.get("p");
        const base64ToJson = Buffer.from(existingTree, "base64").toString();
        const stateFromJson = JSON.parse(base64ToJson);
        setSpentPoints(parseInt(pointscount!));
        setTalentTree(stateFromJson);
      }
    }
    // need to add zod to validate structure and discard invalid result
    const stateToJsonStr = JSON.stringify(talentTree);
    const base64Str = Buffer.from(stateToJsonStr).toString("base64");
    setSearchParams({ p: spentPoints.toString(), s: base64Str }, { replace: true });
  }, [spentPoints, talentTree, location.search, searchParams, setSearchParams]);

  const allocatePoint = (curPathIdx: number, curTalentIdx: number) => {
    if (spentPoints >= 6) {
      return;
    }
    const targetTalents = talentTree[curPathIdx].talents;

    if (
      (curTalentIdx > 0 && !targetTalents[curTalentIdx - 1].allocated) ||
      targetTalents[curTalentIdx].allocated
    ) {
      return;
    }

    setSpentPoints(spentPoints + 1);
    const copyTalents = [...targetTalents];
    copyTalents.splice(curTalentIdx, 1, { ...copyTalents[curTalentIdx], allocated: true });

    const updatedTree = talentTree.map((path, idx) => {
      if (curPathIdx === idx) {
        return {
          ...path,
          talents: copyTalents,
        };
      }
      return path;
    });

    setTalentTree(updatedTree);
  };

  const removePoint = (e: React.MouseEvent, curPathIdx: number, curTalentIdx: number) => {
    e.preventDefault();
    if (spentPoints <= 0) {
      return;
    }
    const targetTalents = talentTree[curPathIdx].talents;

    if (!targetTalents[curTalentIdx].allocated) {
      return;
    }

    let removeSpentCount = 0;
    const copyTalents = targetTalents.map((talent, index) => {
      if (index >= curTalentIdx && talent.allocated) {
        removeSpentCount = removeSpentCount + 1;
        return {
          ...talent,
          allocated: false,
        };
      }
      return talent;
    });

    const updatedTree = talentTree.map((path, idx) => {
      if (curPathIdx === idx) {
        return {
          ...path,
          talents: copyTalents,
        };
      }
      return path;
    });
    setSpentPoints(spentPoints - removeSpentCount);
    setTalentTree(updatedTree);
  };

  return (
    <div className="calculator-container">
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
      <div className="points-spent-counter">
        <p>{spentPoints} &#47; 6</p>
        <p>Points Spent</p>
      </div>
    </div>
  );
}

export default Calculator;
