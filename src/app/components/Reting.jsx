import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Rating({ value = 80}) {
  const getColor = () => {
    if (value >= 80 ) return "#22c55e"; // зелёный
    if (value >= 60) return "#CB6C36";
    if (value >= 40) return "#CB3F36";
    if (value >= 20) return "#eab308"; // жёлтый
    return "#FF0000"; // красный
  };

  return (
    <div className={` min-[1453px]:w-17   min-[1453px]:h-17  min-[500px]:w-14 min-[500px]:h-14  w-12 h-12   rounded-full 
                    flex items-center justify-center 
                    `}
    style={{ backgroundColor: getColor() }}>

      <CircularProgressbar
        value={value}
        maxValue={100} // ✅ Максимум 100
        text={`${value}%`}
        strokeWidth={12}
        styles={buildStyles({
          pathColor: getColor(),
          textColor: "#ffffff",
          trailColor: "#00000040",
          pathTransitionDuration: 1,
          textSize: "24px",
        })}
      />
    </div>
  );
}
