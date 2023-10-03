import { useState, useEffect, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Buffer } from "buffer";
import { z } from "zod";
import "./Calculator.css";
import TalentPathGrid from "../talentpath/TalentPathGrid";

const SpentPoints = z.number().min(0).max(6);
export type SpentPoints = z.infer<typeof SpentPoints>;

const Talent = z.object({ name: z.string(), allocated: z.boolean() });
export type Talent = z.infer<typeof Talent>;

const TalentPath = z.object({ name: z.string(), talents: Talent.array() });
export type TalentPath = z.infer<typeof TalentPath>;

const TalentTree = z.object({
  pointsSpent: z.number().min(0).max(6),
  paths: TalentPath.array(),
});
export type TalentTree = z.infer<typeof TalentTree>;

function Calculator() {
  const [errorParsingTree, setErrorParsingTree] = useState(false);
  const [talentTree, setTalentTree] = useState<TalentTree>({
    pointsSpent: 0,
    paths: [
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
    ],
  });

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

        const base64ToJson = Buffer.from(existingTree, "base64").toString();

        try {
          const stateFromJson = JSON.parse(base64ToJson);
          const validSchema = TalentTree.parse(stateFromJson);
          setTalentTree(validSchema);
        } catch (err: unknown) {
          /* if JSON.parse throws an error because the deserialized string does not result
          in valid JSON or if TalentTree.parse throws an error for a valid JSON object that does
          not conform to the defined zod schema
          */
          console.log("Failed to parse valid Tree from URL.");
          setErrorParsingTree(true);
          return;
        }
      }
    }

    const stateToJsonStr = JSON.stringify(talentTree);
    const base64Str = Buffer.from(stateToJsonStr).toString("base64");
    setSearchParams({ s: base64Str }, { replace: true });
    setErrorParsingTree(false);
  }, [talentTree]);

  const allocatePoint = (curPathIdx: number, curTalentIdx: number) => {
    if (talentTree.pointsSpent >= 6) {
      return;
    }
    const targetTalents = talentTree.paths[curPathIdx].talents;

    if (
      (curTalentIdx > 0 && !targetTalents[curTalentIdx - 1].allocated) ||
      targetTalents[curTalentIdx].allocated
    ) {
      return;
    }

    const copyTalents = [...targetTalents];
    copyTalents.splice(curTalentIdx, 1, { ...copyTalents[curTalentIdx], allocated: true });

    const updatedTree = talentTree.paths.map((path, idx) => {
      if (curPathIdx === idx) {
        return {
          ...path,
          talents: copyTalents,
        };
      }
      return path;
    });

    setTalentTree({
      pointsSpent: talentTree.pointsSpent + 1,
      paths: updatedTree,
    });
  };

  const removePoint = (e: React.MouseEvent, curPathIdx: number, curTalentIdx: number) => {
    e.preventDefault();
    if (talentTree.pointsSpent <= 0) {
      return;
    }
    const targetTalents = talentTree.paths[curPathIdx].talents;

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

    const updatedTree = talentTree.paths.map((path, idx) => {
      if (curPathIdx === idx) {
        return {
          ...path,
          talents: copyTalents,
        };
      }
      return path;
    });
    setTalentTree({
      pointsSpent: talentTree.pointsSpent - removeSpentCount,
      paths: updatedTree,
    });
  };

  return (
    <>
      {errorParsingTree ? (
        <p className="parsing-error">Failed to create a valid loadout from URL.</p>
      ) : null}
      <div className="calculator-container">
        <div className="talent-tree-container">
          {talentTree.paths.map((path, idx) => (
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
          <p>{talentTree.pointsSpent} &#47; 6</p>
          <p>Points Spent</p>
        </div>
      </div>
    </>
  );
}

export default Calculator;
