export default function SquareRating({ value = 80 }) {
  
  const getColor = () => {
    if (value >= 80) return "#22c55e"; 
    if (value >= 60) return "#CB6C36";
    if (value >= 40) return "#CB3F36";
    if (value >= 20) return "#eab308"; 
    return "#FF0000"; 
  };

  return (
   <div className="px-20">
     <div className="relative mt-[25px] w-full  h-15 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      {/* Цветная полоска прогресса */}
      <div
        className="h-full transition-all duration-700"
        style={{
          width: `${value}%`,
          backgroundColor: getColor(),
        }}
      />

      
      <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
        {value}%
      </span>
    </div>
   </div>
  );
}
