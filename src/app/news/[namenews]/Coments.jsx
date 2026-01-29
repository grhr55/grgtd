'use client'

import { useState, useEffect } from "react";




export default function Comentaris({newsId}) {

    const [comentaris,setcomentaris] = useState([])
    const [coment, setcoment] =useState("")
    const [infocoment ,setinfocoment] = useState()



    

    

    

const Coments = async () => {
  if (!coment.trim()) return;

  try {
    const res = await fetch("https://frfrf-2zok.onrender.com/data/coments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coment, newsId })
    });

    if (!res.ok) throw new Error("Request failed");

    const savedComent = await res.json();

  
    setcomentaris(prev => [savedComent.data, ...prev]);

    setcoment(""); // очищаем поле ввода
    setinfocoment("Комментарий отправлен");
    setTimeout(() => setinfocoment(""), 3000);

  } catch (err) {
    console.log(err);
    setinfocoment("Ошибка при отправке");
  }
};



// Получаем комментарии для конкретного фильма
useEffect(() => {
  fetch(`https://frfrf-2zok.onrender.com/data/coments/${newsId}`)
    .then(res => res.json())
    .then(data => setcomentaris(data));
}, [newsId]);


 console.log("products:", comentaris);









    return(
        
 <div className="flex justify-center  mx-[8%]  ">
  <div className="w-full  min-[500px]:w-[1400px]  max-[500px]:w-[360px] rounded-2xl mt-[40px] mb-[40px] p-4 ">
    
    <h2 className="text-2xl font-bold text-center text-amber-50 text-[40px]">
      Комментарии
    </h2>


{comentaris.map((comenta) => (
 <div
  key={comenta._id}
  className="w-full p-3  rounded-lg"
>
  
    <div className="bg-amber-500 w-[30px] p-3  h-[30px] rounded-[30px]  ">аак</div>
    
  
  <h3 className="text-white text-center text-2xl">{comenta.coment}</h3>
</div>

))}







    <input
      type="text"
      value={coment}
      onChange={(e) => setcoment(e.target.value)}
      placeholder="Введите комментарий..."
      className="
        w-full px-5 py-3 rounded-xl
        bg-amber-50 text-gray-800
        outline-none transition
        focus:ring-4 focus:ring-blue-400/30
        placeholder:text-gray-400
      "
    />

    <button
      onClick={Coments}
      className="
        w-full py-3 rounded-xl
        bg-blue-600 text-white font-medium
        hover:bg-blue-700
        active:scale-[0.98]
        transition-all
      "
    >
      Отправить
    </button>

  </div>

  <h2 className="mt-3 text-green-600">{infocoment}</h2>
  
</div>
    )
}