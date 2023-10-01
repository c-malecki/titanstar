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
  const calcSpritePos = (pathPosition: number, talent: Talent, idx: number) => {
    const posMultiplier = pathPosition > 1 ? 4 : 0;
    const xPos = (idx + posMultiplier) * -50;
    const yPos = talent.allocated ? 0 : 50;
    return {
      backgroundImage: `url(${sprites})`,
      backgroundPosition: `${xPos}px ${yPos}px`,
    };
  };

  return (
    <div className="talent-path-container">
      <span>{props.path.name}</span>
      {props.path.talents.map((talent, talentIdx) => (
        <button
          style={calcSpritePos(props.path.position, talent, talentIdx)}
          title={`talent ${talentIdx + 1}`}
          key={talentIdx}
          onClick={() => props.allocatePoint(props.pathIdx, talentIdx)}
          onContextMenu={(e) => props.removePoint(e, props.pathIdx, talentIdx)}
        ></button>
      ))}
    </div>
  );
}

export default TalentPath;
