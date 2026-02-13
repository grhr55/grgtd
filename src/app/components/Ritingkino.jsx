import { useEffect, useState } from "react";
import Rating from "./Reting";

export default function MovieRating({ idconos }) {
  const [percent, setPercent] = useState(80);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idconos) return;

    setLoading(true);
    
    fetch(`https://grgrg4ee.onrender.com/lacikino/lice/${idconos}`)
      .then(res => res.json())
      .then(data => {
        const total = data.likes + data.dislikes;

        if (total === 0) {
          setPercent(80); // Дефолтное значение
        } else {
          // ✅ Процент лайков от общего числа реакций
          const likePercentage = (data.likes / total) * 100;
          
          // ✅ Конвертируем в шкалу 0-100 для рейтинга
          setPercent(parseFloat(likePercentage.toFixed(1)));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка:', err);
        setLoading(false);
      });
  }, [idconos]);

  if (loading ) {
    return <div className="min-[1453px]:w-17   min-[1453px]:h-17  min-[500px]:w-14 min-[500px]:h-14  w-12 h-12 animate-pulse bg-gray-300 rounded-full" />;
  }

  return <Rating value={percent} />;
}