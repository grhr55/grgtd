'use client'
import { useEffect, useState } from "react";

export default function Reactions({ licesid }) {
  const [reaction, setReaction] = useState({
    likeCount: 0,
    dizlace: 0,
    liked: false,
    disliked: false,
  });
  const [deviceId, setDeviceId] = useState(null);

  // Генерация уникального deviceId
  useEffect(() => {
    let id = localStorage.getItem("deviceId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("deviceId", id);
    }
    setDeviceId(id);
  }, []);

  // Получаем счётчики
  const fetchReactions = async () => {
    const res = await fetch(`https://frfrf-2zok.onrender.com/reactions/lice/${licesid}`);
    const data = await res.json();
    setReaction({
      likeCount: data.likes,
      dizlace: data.dislikes,
      liked: data.userReaction === 'like',
      disliked: data.userReaction === 'dislike'
    });
  };

  useEffect(() => {
    if (licesid && deviceId) fetchReactions();
  }, [licesid, deviceId]);

  // Отправка реакции
  const sendReaction = async (type) => {
    // Локально обновляем состояние
    setReaction(prev => {
      if (type === 'like') {
        const liked = !prev.liked;
        return {
          ...prev,
          liked,
          disliked: liked ? false : prev.disliked,
          likeCount: prev.likeCount + (liked ? 1 : -1),
          dizlace: liked && prev.disliked ? prev.dizlace - 1 : prev.dizlace
        };
      } else {
        const disliked = !prev.disliked;
        return {
          ...prev,
          disliked,
          liked: disliked ? false : prev.liked,
          dizlace: prev.dizlace + (disliked ? 1 : -1),
          likeCount: disliked && prev.liked ? prev.likeCount - 1 : prev.likeCount
        };
      }
    });

    // Отправляем на сервер, но не ждём GET
    fetch("https://frfrf-2zok.onrender.com/reactions/lice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ licesid, deviceId, type })
    }).catch(err => console.error(err));
  };

  return (
    <div className="flex items-center gap-3 my-3">
      {/* Лайк */}
      <button
        onClick={() => sendReaction('like')}
        className={`
          group relative flex items-center gap-2 
          max-[500px]:px-3 max-[500px]:py-2 px-4 py-2.5 
          rounded-full font-bold 
          shadow-lg transition-all duration-300 
          max-[500px]:text-xs text-sm
          ${reaction.liked 
            ? 'bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white shadow-emerald-500/50 scale-105' 
            : 'bg-gray-800/60 text-gray-300 hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-green-500/20 hover:text-emerald-400 hover:shadow-emerald-500/30 hover:scale-105'
          }
          active:scale-95 border border-gray-700/50
        `}
      >
        <span className={`
          text-lg transition-transform duration-300
          ${reaction.liked ? 'scale-110' : 'group-hover:scale-110'}
        `}>
          👍
        </span>
        <span className="font-bold tracking-wide">
          {reaction.likeCount}
        </span>
        
        {/* Эффект свечения при активации */}
        {reaction.liked && (
          <span className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl animate-pulse"></span>
        )}
      </button>

      {/* Дизлайк */}
      <button
        onClick={() => sendReaction('dislike')}
        className={`
          group relative flex items-center gap-2 
          max-[500px]:px-3 max-[500px]:py-2 px-4 py-2.5 
          rounded-full font-bold 
          shadow-lg transition-all duration-300 
          max-[500px]:text-xs text-sm
          ${reaction.disliked 
            ? 'bg-gradient-to-r from-red-500 via-rose-500 to-red-600 text-white shadow-red-500/50 scale-105' 
            : 'bg-gray-800/60 text-gray-300 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-rose-500/20 hover:text-red-400 hover:shadow-red-500/30 hover:scale-105'
          }
          active:scale-95 border border-gray-700/50
        `}
      >
        <span className={`
          text-lg transition-transform duration-300
          ${reaction.disliked ? 'scale-110' : 'group-hover:scale-110'}
        `}>
          👎
        </span>
        <span className="font-bold tracking-wide">
          {reaction.dizlace}
        </span>
        
        {/* Эффект свечения при активации */}
        {reaction.disliked && (
          <span className="absolute inset-0 rounded-full bg-red-400/20 blur-xl animate-pulse"></span>
        )}
      </button>
    </div>
  );
}