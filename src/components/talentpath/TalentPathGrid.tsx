import { useState } from "react";
import "./TalentPathGrid.css";
import sprites from "../../assets/talent-icons-sprite.png";
import type { Talent, TalentPath } from "../calculator/Calculator";

type TalentPathGridProps = {
  path: TalentPath;
  pathIdx: number;
  allocatePoint: (pathIdx: number, talentIdx: number) => void;
  removePoint: (e: React.MouseEvent, pathIdx: number, talentIdx: number) => void;
};

function TalentPathGrid(props: TalentPathGridProps) {
  const [isHoverButton, setIsHoverButton] = useState<number | null>(null);

  const calcSpriteSheetPos = (
    pathIdx: number,
    allocated: boolean,
    idx: number,
    active: boolean
  ) => {
    const allocatedOrActive = allocated || active;
    const posMultiplier = pathIdx > 0 ? 4 : 0;
    const xPos = (idx + posMultiplier) * -50;
    const yPos = allocatedOrActive ? 0 : 50;
    return {
      backgroundImage: `url(${sprites})`,
      backgroundPosition: `${xPos}px ${yPos}px`,
    };
  };

  const genTalentButtonClass = (talents: Talent[], curTalentIdx: number) => {
    let buttonClass = "talent-button-border disconnected-path";
    if (talents[curTalentIdx].allocated) {
      buttonClass += " button-border-allocated";
    }
    if (curTalentIdx === 0 && talents[curTalentIdx].allocated) {
      buttonClass += " connected-path";
    }
    if (
      curTalentIdx > 0 &&
      curTalentIdx !== talents.length - 1 &&
      talents[curTalentIdx + 1].allocated
    ) {
      buttonClass += " connected-path";
    }

    return buttonClass;
  };

  return (
    <div className="talent-path-grid">
      <span>{props.path.name}</span>
      {props.path.talents.map((talent, talentIdx) => (
        <div className={genTalentButtonClass(props.path.talents, talentIdx)} key={talentIdx}>
          <button
            style={calcSpriteSheetPos(
              props.pathIdx,
              talent.allocated,
              talentIdx,
              talentIdx === isHoverButton
            )}
            title={`talent ${talentIdx + 1}`}
            onMouseEnter={() => setIsHoverButton(talentIdx)}
            onMouseLeave={() => setIsHoverButton(null)}
            onClick={() => props.allocatePoint(props.pathIdx, talentIdx)}
            onContextMenu={(e) => props.removePoint(e, props.pathIdx, talentIdx)}
          ></button>
        </div>
      ))}
    </div>
  );
}

export default TalentPathGrid;
