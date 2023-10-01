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

  const calcSpritePos = (pathIdx: number, allocated: boolean, idx: number, active: boolean) => {
    const allocatedOrActive = allocated || active;
    const posMultiplier = pathIdx > 0 ? 4 : 0;
    const xPos = (idx + posMultiplier) * -50;
    const yPos = allocatedOrActive ? 0 : 50;
    return {
      backgroundImage: `url(${sprites})`,
      backgroundPosition: `${xPos}px ${yPos}px`,
    };
  };

  const genButtonClass = (talents: Talent[], curTalentIdx: number) => {
    let buttonClass = "button-border unconnected-path";
    if (talents[curTalentIdx].allocated) {
      buttonClass += " border-allocated";
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
    <div className="talent-path-container">
      <span>{props.path.name}</span>
      {props.path.talents.map((talent, talentIdx) => (
        <div className={genButtonClass(props.path.talents, talentIdx)} key={talentIdx}>
          <button
            style={calcSpritePos(
              props.pathIdx,
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
