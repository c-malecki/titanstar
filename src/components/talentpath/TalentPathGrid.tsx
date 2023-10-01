import { useState } from "react";
import "./TalentPathGrid.css";
import sprites from "../../assets/talent-icons-sprite.png";
import type { Talent, TalentPath } from "../calculator/Calculator";

type TalentPathProps = {
  path: TalentPath;
  pathIdx: number;
  allocatePoint: (pathIdx: number, talentIdx: number) => void;
  removePoint: (e: React.MouseEvent, pathIdx: number, talentIdx: number) => void;
};

function TalentPath(props: TalentPathProps) {
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const calcSpritePos = (
    pathPosition: number,
    allocated: boolean,
    idx: number,
    active: boolean
  ) => {
    const allocatedOrActive = allocated || active;
    const posMultiplier = pathPosition > 1 ? 4 : 0;
    const xPos = (idx + posMultiplier) * -50;
    const yPos = allocatedOrActive ? 0 : 50;
    return {
      backgroundImage: `url(${sprites})`,
      backgroundPosition: `${xPos}px ${yPos}px`,
    };
  };

  return (
    <div className="talent-path-container">
      <span>{props.path.name}</span>
      {props.path.talents.map((talent, talentIdx) => (
        <div className="button-border" key={talentIdx}>
          <button
            style={calcSpritePos(
              props.path.position,
              talent.allocated,
              talentIdx,
              talentIdx === activeButton
            )}
            title={`talent ${talentIdx + 1}`}
            onMouseEnter={() => setActiveButton(talentIdx)}
            onMouseLeave={() => setActiveButton(null)}
            onClick={() => props.allocatePoint(props.pathIdx, talentIdx)}
            onContextMenu={(e) => props.removePoint(e, props.pathIdx, talentIdx)}
          ></button>
        </div>
      ))}
    </div>
  );
}

export default TalentPath;
