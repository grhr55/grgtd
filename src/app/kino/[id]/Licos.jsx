'use client'
import { useEffect, useState, useCallback, useRef } from "react";

export default function Licos({ idconos }) {
  const [reaction, setReaction] = useState({
    likeCount: 0,
    dizlace: 0,
    liked: false,
    disliked: false,
  });
  
  const [deviceId, setDeviceId] = useState(null);
  const isFetchingRef = useRef(false);
   
  // Генерация deviceId
  useEffect(() => {
    let id = localStorage.getItem("deviceId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("deviceId", id);
      console.log('🆔 Создан новый deviceId:', id);
    } else {
      console.log('🆔 Загружен deviceId:', id);
    }
    setDeviceId(id);
  }, []);

  // Загрузка реакций
  const fetchReactions = useCallback(async () => {
    // ✅ ВАЖНО: ждём пока deviceId загрузится
    if (!deviceId || !idconos || isFetchingRef.current) {
      console.log('⏸️ Ожидание:', { deviceId: !!deviceId, idconos: !!idconos });
      return;
    }
    
    try {
      isFetchingRef.current = true;
      
      const idconosStr = String(idconos);
      // ✅ ОБЯЗАТЕЛЬНО передаём deviceId в query параметрах
      const url = `https://grgrg4ee.onrender.com/lacikino/lice/${idconosStr}?deviceId=${encodeURIComponent(deviceId)}`;
      
      console.log(`📡 Загрузка для видео ${idconosStr.slice(-6)}...`);
      console.log(`🔗 URL: ${url}`);
      
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      
      const data = await res.json();
      console.log(`✅ Получено:`, data);
      
      setReaction({
        likeCount: data.likes || 0,
        dizlace: data.dislikes || 0,
        liked: data.userReaction === 'like',
        disliked: data.userReaction === 'dislike'
      });
    } catch (error) {
      console.error('❌ Ошибка загрузки:', error);
    } finally {
      isFetchingRef.current = false;
    }
  }, [deviceId, idconos]);

  useEffect(() => {
    if (deviceId && idconos) {
      fetchReactions();
    }
  }, [deviceId, idconos, fetchReactions]);

  // Отправка реакции
  const sendReaction = async (type) => {
    if (!deviceId || !idconos) {
      console.warn('⚠️ Нет deviceId или idconos');
      return;
    }

    const idconosStr = String(idconos);
    
    console.log(`🎬 Клик ${type} для видео ${idconosStr.slice(-6)}`);

    // Оптимистичное обновление
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

    try {
      const response = await fetch("https://grgrg4ee.onrender.com/lacikino/lice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          idconos: idconosStr, 
          deviceId, 
          type 
        })
      });
      
      if (!response.ok) {
        throw new Error('Ошибка сервера');
      }
      
      const result = await response.json();
      console.log('✅ Сервер ответил:', result);
      
      // Перезагружаем для синхронизации
      setTimeout(() => fetchReactions(), 200);
      
    } catch (err) {
      console.error('❌ Ошибка отправки:', err);
      fetchReactions();
    }
  };

  // Показываем skeleton пока загружается
  if (!deviceId) {
    return (
      <div className="flex items-center gap-3 my-3">
        <div className="animate-pulse bg-gray-700/50 rounded-full w-20 h-10"></div>
        <div className="animate-pulse bg-gray-700/50 rounded-full w-20 h-10"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 my-3">
      <button
        onClick={() => sendReaction('like')}
        className={`
          group relative flex items-center gap-2 
          max-[500px]:px-3 max-[500px]:py-1 px-4 py-2.5 
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
        <span className={`text-lg transition-transform duration-300 ${reaction.liked ? 'scale-110' : 'group-hover:scale-110'}`}>
          👍
        </span>
        <span className="font-bold tracking-wide">{reaction.likeCount}</span>
        {reaction.liked && (
          <span className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl animate-pulse"></span>
        )}
      </button>

      <button
        onClick={() => sendReaction('dislike')}
        className={`
          group relative flex items-center gap-2 
          max-[500px]:px-3 max-[500px]:py-1 px-4 py-2.5 
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
        <span className={`text-lg transition-transform duration-300 ${reaction.disliked ? 'scale-110' : 'group-hover:scale-110'}`}>
          👎
        </span>
        <span className="font-bold tracking-wide">{reaction.dizlace}</span>
        {reaction.disliked && (
          <span className="absolute inset-0 rounded-full bg-red-400/20 blur-xl animate-pulse"></span>
        )}
      </button>
    </div>
  );
}