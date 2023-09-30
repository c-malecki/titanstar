import "./TalentPath.css";
import sprites from "../../assets/talent-icons-sprite.png";
import type { Talent, Path } from "../../context/CalculatorContext";

type TalentPathProps = {
  path: Path;
  pathIdx: number;
};

function TalentPath({ path, pathIdx }: TalentPathProps) {
  const calcSpritePos = (path: number, talent: Talent, idx: number) => {
    const posMultiplier = path > 0 ? 4 : 0;
    const xPos = (idx + posMultiplier) * -50;
    const yPos = talent.allocated ? 0 : 50;
    return {
      backgroundImage: `url(${sprites})`,
      backgroundPosition: `${xPos}px ${yPos}px`,
    };
  };

  return (
    <div className="talent-path-container">
      <span>{path.name}</span>
      {path.talents.map((talent, talentIdx) => (
        <button
          style={calcSpritePos(pathIdx, talent, talentIdx)}
          title={`talent ${talentIdx + 1}`}
          key={talentIdx}
        ></button>
      ))}
    </div>
  );
}

export default TalentPath;
