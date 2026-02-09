'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import Otvetcom from "./Otvetcom";
import Reactions from "./Lice";

export default function Comentaris({ newsId }) {
  const [comentaris, setcomentaris] = useState([]);
  const [coment, setcoment] = useState("");
  const [zagolcoment, setzagolcoment] = useState("");
  const [infocoment, setinfocoment] = useState("");
  const [faction, setfaction] = useState(null);
  const [replyCounts, setReplyCounts] = useState({});
  const [replyText, setReplyText] = useState({});
  const [showReplyInput, setShowReplyInput] = useState(null);
  const [loading, setLoading] = useState(true);

  const Coments = async () => {
    if (!coment.trim()) return;

    try {
      const res = await fetch("http://localhost:8000/data/coments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coment, newsId, zagolcoment })
      });

      if (!res.ok) throw new Error("Request failed");

      const savedComent = await res.json();

      setcomentaris(prev => [savedComent.data, ...prev]);

      setcoment("");
      setzagolcoment("");
      setinfocoment("Комментарий отправлен");
      setTimeout(() => setinfocoment(""), 3000);
    } catch (err) {
      console.log(err);
      setinfocoment("Ошибка при отправке");
    }
  };

  const loadReplyCount = async (commentId) => {
    try {
      const res = await fetch(`http://localhost:8000/otetcom/otetcom/${commentId}`);
      const data = await res.json();
      setReplyCounts(prev => ({ ...prev, [commentId]: data.length }));
    } catch (e) {
      console.log(e);
    }
  };

  const sendReply = async (commentId) => {
    if (!replyText[commentId]?.trim()) return;

    try {
      const res = await fetch("http://localhost:8000/otetcom/ovetcoment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comentsotvet: replyText[commentId],
          otvetcomid: commentId,
          parentOtvetId: null
        })
      });

      if (!res.ok) throw new Error("Request failed");

      setReplyText(prev => ({ ...prev, [commentId]: "" }));
      setShowReplyInput(null);
      loadReplyCount(commentId);
      setfaction(String(commentId));
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        
        setLoading(true);
        const res = await fetch(`http://localhost:8000/data/coments/${newsId}`);
        const data = await res.json();

        setcomentaris(data);
      } catch (e) {
        console.log(e);
        
        setcomentaris([]);
      } finally {
        setLoading(false);
      }
    };

    if (newsId) load();
  }, [newsId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleReply = (id) => {
    const strId = String(id);
    setfaction(prev => (prev === strId ? null : strId));
  };

  const handleReplyClick = (id) => {
    const strId = String(id);
    setShowReplyInput(prev => (prev === strId ? null : strId));
  };

  const CommentSkeleton = () => (
    <div className="bg-gradient-to-br from-gray-500 to-green-100/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 max-[500px]:p-4 shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4 max-[500px]:gap-3">
          {/* Avatar skeleton */}
          <div className="min-[500px]:w-20 max-[500px]:w-15 min-[500px]:h-20 max-[500px]:h-15 rounded-full bg-gray-700/50 animate-pulse" />
          
          <div className="space-y-2">
            {/* Name skeleton */}
            <div className="h-5   min-[500px]:w-24 max-[500px]:w-17  bg-gray-700/50 rounded animate-pulse" />
            {/* Date skeleton */}
            <div className="h-4  min-[500px]:w-32  max-[500px]:w-17 bg-gray-700/50 rounded animate-pulse" />
          </div>
        </div>

        {/* Reactions skeleton */}
        <div className="flex gap-2">
          <div className="w-16 h-8 bg-gray-700/50 rounded-lg animate-pulse" />
          <div className="w-16 h-8 bg-gray-700/50 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Title skeleton */}
      <div className="h-6 w-3/4 bg-gray-700/50 rounded animate-pulse mb-3" />

      {/* Text skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full bg-gray-700/50 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-gray-700/50 rounded animate-pulse" />
        <div className="h-4 w-4/6 bg-gray-700/50 rounded animate-pulse" />
      </div>

      {/* Actions skeleton */}
      <div className="flex items-center gap-4 pt-3 border-t border-gray-700/50">
        <div className="h-8 w-24 bg-gray-700/50 rounded animate-pulse" />
        <div className="h-8 w-32 bg-gray-700/50 rounded animate-pulse" />
      </div>
    </div>
  );

  return (
    <div className="flex justify-center max-[500px]:px-4 px-8 py-10">
      <div className="w-full max-w-5xl">
        {/* Заголовок секции */}
        <div className="text-center mb-10">
          <h2 className="text-4xl max-[500px]:text-3xl font-extrabold bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
            Комментарии
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto mt-4 rounded-full"></div>
        </div>

       
        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 max-[500px]:p-4 shadow-2xl mb-8">
          <h3 className="text-2xl max-[500px]:text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Оставить комментарий
          </h3>

          <div className="space-y-4">
            <input
              type="text"
              value={zagolcoment}
              onChange={(e) => setzagolcoment(e.target.value)}
              placeholder="Заголовок комментария"
              className="w-full px-4 py-3 max-[500px]:px-3 max-[500px]:py-2 max-[500px]:text-sm rounded-xl bg-gray-900/70 text-white outline-none transition-all border border-gray-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40 placeholder:text-gray-500"
            />

            <textarea
              value={coment}
              onChange={(e) => setcoment(e.target.value)}
              placeholder="Что вы думаете об этом?..."
              rows={4}
              className="w-full px-4 py-3 max-[500px]:px-3 max-[500px]:py-2 max-[500px]:text-sm rounded-xl bg-gray-900/70 text-white outline-none transition-all border border-gray-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40 placeholder:text-gray-500 resize-none"
            />

            <button
              onClick={Coments}
              className="w-full py-3.5 max-[500px]:py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-base max-[500px]:text-sm font-bold hover:from-amber-600 hover:to-yellow-600 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50"
            >
              Опубликовать комментарий
            </button>
          </div>

          {infocoment && (
            <div className={`mt-4 p-3 rounded-lg text-center font-semibold ${
              infocoment.includes("Ошибка") 
                ? "bg-red-500/20 text-red-400 border border-red-500/50" 
                : "bg-green-500/20 text-green-400 border border-green-500/50"
            }`}>
              {infocoment}
            </div>
          )}
        </div>

       
        <div className="space-y-6">
          {loading ? (
            <div className="space-y-6">
              {comentaris.map((comenta) => (
                <CommentSkeleton key={comenta._id}  />
              ))}
            </div>
          ) : comentaris.length === 0 ? (
            
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-12 text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-gray-400 text-lg">Пока нет комментариев. Будьте первым!</p>
            </div>
          ) : (
            
            comentaris.map((comenta) => (
              <div key={comenta._id} className="w-full">
               
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 max-[500px]:p-4 shadow-xl hover:shadow-2xl transition-all duration-300">
                 
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4 max-[500px]:gap-3">
                      <div className="relative">
                        <Image
                          src="/img/1687156254_610x900_66014.jpg"
                          width={60}
                          height={60}
                          loading="lazy"
                          alt="User Avatar"
                          className="w-20 h-20 rounded-full ring-2 ring-amber-500/50"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg max-[500px]:text-base">
                          Аноним
                        </h3>
                        <span className="text-gray-400 text-sm max-[500px]:text-xs">
                          {formatDate(comenta.createdAt)}
                        </span>
                      </div>
                    </div>

                    <Reactions licesid={comenta._id} />
                  </div>

                 
                  {comenta.zagolcoment && (
                    <h2 className="text-amber-400 font-bold text-xl max-[500px]:text-lg mb-3">
                      {comenta.zagolcoment}
                    </h2>
                  )}

                
                  <p className="text-gray-100 text-base max-[500px]:text-sm leading-relaxed whitespace-pre-wrap mb-4">
                    {comenta.coment}
                  </p>

                 
                  <div className="flex items-center gap-4 max-[500px]:gap-3 pt-3 border-t border-gray-700/50">
                    <button
                      onClick={() => handleReplyClick(comenta._id)}
                      className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm max-[500px]:text-xs transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      {showReplyInput === String(comenta._id) ? "Отменить" : "Ответить"}
                    </button>
                    
                    {replyCounts[comenta._id] > 0 && (
                      <button 
                        onClick={() => toggleReply(comenta._id)}
                        className="flex items-center gap-2 text-gray-400 hover:text-amber-400 font-semibold text-sm max-[500px]:text-xs transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>
                          {faction === String(comenta._id) ? "Скрыть" : "Показать"} {replyCounts[comenta._id]} {replyCounts[comenta._id] === 1 ? 'ответ' : replyCounts[comenta._id] < 5 ? 'ответа' : 'ответов'}
                        </span>
                      </button>
                    )}
                  </div>
                </div>

               
                {showReplyInput === String(comenta._id) && (
                  <div className="ml-8 max-[500px]:ml-4 mt-4 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 max-[500px]:p-4 shadow-xl">
                    <h3 className="text-amber-400 text-lg max-[500px]:text-base font-semibold mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      Ответить на комментарий
                    </h3>
                    <textarea
                      value={replyText[comenta._id] || ""}
                      onChange={(e) =>
                        setReplyText(prev => ({ ...prev, [comenta._id]: e.target.value }))
                      }
                      placeholder="Напишите ваш ответ..."
                      rows={3}
                      className="w-full px-4 py-3 max-[500px]:px-3 max-[500px]:py-2 max-[500px]:text-sm rounded-xl bg-gray-900/70 text-white outline-none transition-all border border-gray-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40 placeholder:text-gray-500 resize-none"
                    />
                    <div className="flex gap-3 max-[500px]:gap-2 mt-4">
                      <button
                        onClick={() => sendReply(comenta._id)}
                        className="px-6 py-2.5 max-[500px]:px-4 max-[500px]:py-2 max-[500px]:text-sm rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold hover:from-amber-600 hover:to-yellow-600 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-amber-500/30"
                      >
                        Отправить
                      </button>
                      <button
                        onClick={() => setShowReplyInput(null)}
                        className="px-6 py-2.5 max-[500px]:px-4 max-[500px]:py-2 max-[500px]:text-sm rounded-xl bg-gray-700 text-white font-semibold hover:bg-gray-600 active:scale-[0.97] transition-all duration-200"
                      >
                        Отменить
                      </button>
                    </div>
                  </div>
                )}

                
                {faction === String(comenta._id) && (
                  <div className="ml-8 max-[500px]:ml-4 mt-4">
                    <Otvetcom 
                      otvetcomid={comenta._id}
                      onReplyAdded={() => loadReplyCount(comenta._id)}
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}