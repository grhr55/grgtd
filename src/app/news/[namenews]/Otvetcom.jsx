'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import Reactions from "./Lice";

export default function Otvetcom({ otvetcomid, onReplyAdded }) {
  const [comments, setComments] = useState([]);
  const [collapsed, setCollapsed] = useState({});
  const [replyText, setReplyText] = useState({});
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    fetch(`https://grgrg4ee.onrender.com/otetcom/otetcom/${otvetcomid}`)
      .then(res => res.json())
      .then(setComments)
      .catch(console.log);
  }, [otvetcomid]);

  const tree = buildTree(comments);

  return (
    <div className="mt-4">
      {tree.map(node => (
        <CommentNode
          key={node._id}
          node={node}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          replyText={replyText}
          setReplyText={setReplyText}
          replyTo={replyTo}
          setReplyTo={setReplyTo}
          otvetcomid={otvetcomid}
          setComments={setComments}
          onReplyAdded={onReplyAdded}
          depth={0}
        />
      ))}
    </div>
  );
}

/* 🌳 ПОСТРОЕНИЕ ДЕРЕВА */
function buildTree(list) {
  const map = {};
  const roots = [];

  list.forEach(item => {
    map[item._id] = { ...item, children: [] };
  });

  list.forEach(item => {
    if (item.parentOtvetId) {
      map[item.parentOtvetId]?.children.push(map[item._id]);
    } else {
      roots.push(map[item._id]);
    }
  });

  // Сортировка корневых комментариев (новые сверху)
  roots.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Сортировка детей для каждого узла (новые сверху)
  Object.values(map).forEach(node => {
    if (node.children.length > 0) {
      node.children.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  });

  return roots;
}

/* 🌿 ОДИН КОММЕНТ */
function CommentNode({
  node,
  collapsed,
  setCollapsed,
  replyText,
  setReplyText,
  replyTo,
  setReplyTo,
  otvetcomid,
  setComments,
  onReplyAdded,
  depth = 0,
}) {
  const isCollapsed = collapsed[node._id];

  const toggle = () =>
    setCollapsed(p => ({ ...p, [node._id]: !p[node._id] }));

  const sendReply = async () => {
    if (!replyText[node._id]?.trim()) return;

    const res = await fetch("https://grgrg4ee.onrender.com/otetcom/ovetcoment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comentsotvet: replyText[node._id],
        otvetcomid,
        parentOtvetId: node._id
      })
    });

    const data = await res.json();
    setComments(prev => [...prev, data.data]);
    setReplyText(p => ({ ...p, [node._id]: "" }));
    setReplyTo(null);
    setCollapsed(p => ({ ...p, [node._id]: false }));
    
    if (onReplyAdded) onReplyAdded();
  };

  return (
    <div className="max-[500px]:ml-3 ml-6 relative mt-4">
      {/* вертикальная линия (кликабельная) */}
      {node.children.length > 0 && !isCollapsed && (
        <button
          onClick={toggle}
          className="absolute max-[500px]:left-1 left-2 top-0 bottom-0 max-[500px]:w-[2px] w-[3px] bg-gradient-to-b from-gray-600/50 to-gray-700/30 hover:from-amber-500/60 hover:to-amber-600/40 transition-all cursor-pointer rounded-full"
          style={{ border: 'none', padding: 0 }}
          aria-label="Свернуть ветку"
        />
      )}

      {/* кнопка свернуть по центру линии */}
      {node.children.length > 0 && (
        <button
          onClick={toggle}
          className="absolute max-[500px]:left-1 left-2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                     max-[500px]:w-5 max-[500px]:h-5 w-6 h-6 rounded-full
                     bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 
                     max-[500px]:text-[11px] text-xs text-white font-bold
                     hover:border-amber-500 hover:from-gray-700 hover:to-gray-800 
                     hover:scale-110 transition-all z-10 shadow-lg
                     flex items-center justify-center"
        >
          {isCollapsed ? "+" : "−"}
        </button>
      )}

      <div className="bg-gradient-to-br from-[#0a092f] to-[#0d0b3d] max-[500px]:p-3 p-5 rounded-2xl max-[500px]:ml-3 ml-5 border border-gray-800/50 shadow-xl hover:border-gray-700/50 transition-all">
        {/* Хедер */}
        <div className="flex justify-between items-start max-[500px]:gap-2 mb-3">
          <div className="flex  gap-3 items-center">
            <div className="relative">
              <Image
                src="/img/1687156254_610x900_66014.jpg"
                width={36}
                height={36}
                alt="avatar"
                className="max-[500px]:w-8 max-[500px]:h-8 w-9 h-9 rounded-full ring-2 ring-amber-500/30"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a092f]"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-amber-400 max-[500px]:text-xs text-sm font-bold">
                Аноним
              </span>
              <span className="text-gray-500 max-[500px]:text-[10px] text-xs">
                {new Date(node.createdAt).toLocaleString("ru-RU", {
                  day: '2-digit',
                  month: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
          
          <Reactions licesid={node._id} />
        </div>

     
        {!isCollapsed && (
          <>
            <p className="text-white max-[500px]:text-sm text-base whitespace-pre-wrap mb-3 leading-relaxed">
              {node.comentsotvet}
            </p>

            {/* Кнопка ответить */}
            <button
              onClick={() => setReplyTo(replyTo === node._id ? null : node._id)}
              className="text-amber-400 hover:text-amber-300 max-[500px]:text-xs text-sm font-semibold transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              {replyTo === node._id ? "Отменить" : "Ответить"}
            </button>

            {/* Форма ответа */}
            {replyTo === node._id && (
              <div className="mt-4 bg-gradient-to-br from-[#121147] to-[#15134d] max-[500px]:p-3 p-4 rounded-xl border border-amber-500/20 shadow-lg">
                <textarea
                  value={replyText[node._id] || ""}
                  onChange={e =>
                    setReplyText(p => ({ ...p, [node._id]: e.target.value }))
                  }
                  rows={3}
                  className="w-full bg-gray-900/50 text-white max-[500px]:p-2 max-[500px]:text-sm p-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 border border-gray-700 resize-none placeholder:text-gray-500"
                  placeholder="Введите ваш ответ..."
                  autoFocus
                />
                <div className="flex gap-2 justify-end mt-3">
                  <button
                    onClick={sendReply}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 text-black max-[500px]:px-3 max-[500px]:py-1.5 max-[500px]:text-xs px-5 py-2 rounded-xl text-sm font-bold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-amber-500/50 hover:scale-105"
                  >
                    Отправить
                  </button>
                  <button
                    onClick={() => setReplyTo(null)}
                    className="bg-gradient-to-r from-gray-600 to-gray-700 text-white max-[500px]:px-3 max-[500px]:py-1.5 max-[500px]:text-xs px-5 py-2 rounded-xl text-sm font-semibold hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Сообщение о свернутых */}
        {isCollapsed && (
          <div className="flex items-center gap-2 text-gray-400 max-[500px]:text-xs text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="italic">
              {node.children.length} {node.children.length === 1 ? 'ответ' : node.children.length < 5 ? 'ответа' : 'ответов'} скрыто
            </span>
          </div>
        )}
      </div>

      {/* Дочерние комментарии */}
      {!isCollapsed && node.children.length > 0 && (
        <div className="mt-2">
          {node.children.map(child => (
            <CommentNode
              key={child._id}
              node={child}
              depth={depth + 1}
              {...{
                collapsed,
                setCollapsed,
                replyText,
                setReplyText,
                replyTo,
                setReplyTo,
                otvetcomid,
                setComments,
                onReplyAdded
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}