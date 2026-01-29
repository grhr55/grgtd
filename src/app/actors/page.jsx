'use client'
import { useEffect, useState } from 'react'
import Image from "next/image";
import ReactPaginate from 'react-paginate';
import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp } from "react-icons/fa";
import Link from 'next/link';


export default function News() {
  
  const [products, setProducts] = useState([])
  const [fynts, setfynts] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Начинаем с первой страницы (индексация с 0)
  const [productsPerPage] = useState(21); // Количество товаров на одной странице
  const [totalProducts, setTotalProducts] = useState(0); // Общее количество товаров




useEffect(() => {
  fetch("https://frfrf-2zok.onrender.com/kino/actors")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Ошибка загрузки");
      }
      return res.json();
    })
    .then((data) => {
      setProducts(data);
      setTotalProducts(data.length);
      console.log(products , 'rot');

      
      
    })
    .catch((err) => console.error(err));
}, []);

console.log(products, 'danie');



 const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[,\s]+/g, '-')      // пробелы и запятые → "-"
    .replace(/-+/g, '-')          // убираем двойные "-"
    .replace(/^-|-$/g, ''); 




  const [emails, setEmails] = useState("");
  const [status, setStatus] = useState("");

  const sendEmail = async () => {
    if (!emails) {
      setStatus("Enter your email");
      return;
    }

    try {
      const res = await fetch("https://frfrf-2zok.onrender.com/newsi/newosti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails }),
      });

      if (!res.ok) throw new Error("Request failed");

      await res.json();
      setStatus("Email sent successfully");
      setEmails("");
    } catch (err) {
      setStatus("Something went wrong");
    }
  };


const handlePageClick = (event) => {
    setCurrentPage(event.selected); // Устанавливаем выбранную страницу
};

  // Рассчитываем индекс товаров на текущей странице
  const indexOfLastProduct = (currentPage + 1) * productsPerPage; // Индекс последнего товара на текущей странице
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // Индекс первого товара на текущей странице
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct); // Срез данных для текущей страниц






  

    if (!products) return <div className="flex flex-col mt-[400px] items-center justify-center min-h-[200px] gap-4"> 
  <div className="w-30 h-30 rounded-full border-4 border-zinc-700 border-t-amber-400 animate-spin"></div>
  <span className="text-amber-400 tracking-widest text-[30px] animate-pulse">
    LOADING...
  </span>
</div>


  return (
  <div>

 <ScrollToTop
        smooth
        top={100} // показывать после 100px прокрутки
        component={
          <FaArrowUp
            size={24} // размер стрелки
            color="white"
            style={{ display: "block", margin: "0 auto" }} // центрируем стрелку внутри кнопки
          />
        }
        style={{
          backgroundColor: "#222",
          borderRadius: "20%", // круглая кнопка
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 8px 8px rgba(0,0,0,0.3)",
          cursor: "pointer",
        }}
      />
    
     <div className="group w-[100%]  h-[100%]   relative ">
      
      <div className="w-full z-0   h-[100%]  bg-cover "

      
>


      
    
     <div className="flex min-[501px]:hidden">
            {!fynts && (
    <div className="fixed inset-0 z-50 bg-[#333333eb] flex flex-col items-center justify-start p-6 space-y-6">
    
     
      <div className="mb-[100px]  flex">
        <Image
          src="/img/Copilot_20251012_035756.png"
          width={125}
          height={125}
          alt="User Avatar"
          className="w-[125px] min-[400px]:ml-[100px] max-[400px]:ml-[90px] h-[125px] rounded-full shadow-lg"
        />
        <button className=" min-[400px]:ml-[90px] max-[400px]:ml-[70px] text-[25px] text-blue-600" onClick={ () => setfynts(!false)}>X</button>
      </div>
      
    
      <nav className="flex  text-amber-50 flex-wrap mx-[200px] justify-center gap-10">
        {["Media", "Movies", "ACTORS", "NEWS", "CATEGORIES"].map((item) => (
          <a
            key={item}
            href="#"
            className="nosifer-regular text-[17px] text-center transition duration-300 transform hover:text-red-700 hover:underline hover:scale-110"
          >
            {item}
          </a>
        ))}
      </nav>
    
    </div>
    
    )}
     </div>
    
        <div className="flex  min-[1058px]:justify-center  max-[1058px]:justify-around  2xl:gap-[130px] xl:gap-[70px] max-[500px]:gap-[5px] min-[400px]:mx-[30px] max-[400px]:mx-[10px]">
    
    
       <div className="flex gap-[4px] min-[500px]:hidden">
    
    
    
        <button onClick={() => {filter(true);setIsOpen(false) }} className="min-[400px]:w-[55px]   max-[400px]:w-[44px] min-[400px]:h-[52px] max-[400px]:h-[42px] min-[400px]:rounded-[20px] max-[400px]:rounded-[15px] 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-[80px] sm:mt-[80px] mt-[50px]   hover:scale-110 bg-[rgba(255,255,255,1)]">
         <div className=" min-[400px]:ml-[15px]  max-[400px]:ml-[10px]  min-[400px]:mb-[0px] max-[400px]:mb-[3px]">
           <div className="w-[25px] h-[3px] my-[6px] bg-[#608fc5]"></div>
           <div className="w-[25px] h-[3px] my-[6px] bg-[#608fc5]"></div>
            <div className="w-[25px] h-[3px] bg-[#608fc5]"></div>
         </div>
       </button>
  
    
       </div>
    
    
    
       <div className="flex gap-[4px] min-[1058px]:hidden">
    
    
          <a href="#" className="min-[400px]:w-[55px] max-[400px]:w-[44px] min-[400px]:h-[52px] max-[400px]:h-[42px] min-[400px]:rounded-[20px] max-[400px]:rounded-[15px] 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-[80px] sm:mt-[80px] mt-[50px]   hover:scale-110 bg-[rgba(255,255,255,1)]">
    
                      <Image
              src="/img/Vector.png"
              width={25}
              height={25}
              alt="User Avatar"
              className=" w-[25px] mx-auto  min-[400px]:mt-[15px] max-[400px]:mt-[10px]  hover:scale-140 transition duration-400 ease-in-out h-[25px]"
            />
       </a>
       </div>
       
    
     
                        <Image
              src="/img/Copilot_20251012_035756.png"
              width={200}
              height={200}
              alt="Logo"
              className="  2xl:w-[200px] xl:h-[200px] lg:w-[200px] lg:h-[200px] md:h-[200px] md:w-[200px] sm:h-[200px] sm:w-[200px]  min-[400px]:w-[140px] max-[400px]:w-[125px]  min-[400px]:h-[140px] max-[400px]:h-[125px]  xl:w-[200px]   2xl:h-[200px]"
            />
            
    
       
    
      <div className=" hidden min-[1058px]:flex">
                 <div className='flex justify-center  pt-[100px]  h-[5px] 2xl:gap-[70px] xl:gap-[50px] gap-[30px] text-[20px]    text-amber-50'>
    
    <a href="#" className="nosifer-regular hover:text-red-700 hover:duration-300 hover:underline  hover:scale-115 text-[17px]">Media</a>
    <a href="#" className="nosifer-regular hover:text-red-700 hover:duration-300 hover:underline  hover:scale-115 text-[17px]">Movies</a>
    <a href="#" className="nosifer-regular hover:text-red-700 hover:duration-300 hover:underline hover:scale-115 text-[17px]">ACTORS</a>
    <a href="#" className="nosifer-regular hover:text-red-700 hover:duration-300 hover:underline  hover:scale-115 text-[17px]">NEWS</a>
    <a href="#" className="nosifer-regular hover:text-red-700 hover:duration-300  hover:underline  hover:scale-115 text-[17px]">CATEGORIES</a>
    
    
       </div>
      </div>
    <div className="hidden min-[1058px]:flex">
        <div className="flex mt-[80px]    gap-[12px]"> 
           <a href="#" className="w-[55px] h-[52px] rounded-[20px]  hover:scale-110 bg-[rgba(255,255,255,1)]">
    
              <Image
              src="/img/Vector.png"
              width={25}
              height={25}
              alt="User Avatar"
              className=" w-[25px] mx-auto mt-[15px] hover:scale-140 transition duration-400 ease-in-out h-[25px]"
              />
       </a>
       <button className="w-[138px] cursor-pointer nosifer-regular hover:scale-110 h-[53px] font-semibold text-[#ac1920] hover:text-red-600      rounded-[15px]  shadow-[0_0_10px_2px_rgba(173,216,230,0.6)]     bg-[#f1f1f1] ">
        Enter
       </button>
    </div>
    </div>
      
    
      <div className="flex min-[1058px]:hidden">
          <button className=" cursor-pointer min-[500px]:w-[138px] nosifer-regular text-red-700  max-[500px]:w-[90px] min-[500px]:h-[53px] max-[500px]:h-[52px] 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-[80px] sm:mt-[80px] mt-[50px]   hover:scale-110  font-semibold  rounded-[20px]  shadow-[0_0_10px_2px_rgba(173,216,230,0.6)]  bg-[#f1f1f1] ">
        Enter
       </button>
      </div>
        </div>

<div className=' min-[1900px]:mx-[14%] max-[1700px]:mx-[8%]' >
  <h1 className='text-amber-50 font-extrabold text-[60px] '>Actors</h1>
                <nav className="flex mb-[40px] mt-[5px] gap-2 text-sm text-[rgba(79,91,124,1)]">
  <a href="/" className="hover:underline text-[20px] text-[#e9e9e9bf]">Home</a>
  
  <span className="text-gray-400 mt-[4px]">›</span>
  <span className="text-amber-50 text-[20px] font-medium">actors</span>
</nav>

  <div className=''>





   <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-10">
   {products.map((product)=> product.masactor.map((actor)=>(

        <Link
      key={actor._id}
      href={`/actors/${slugify(actor.nameacter)}`}
      className="group relative rounded-2xl overflow-hidden shadow-lg"
    >
      {/* Image */}
      <div className="relative w-full h-[300px] sm:h-[360px] lg:h-[400px]">
        <Image
          src={`https://frfrf-2zok.onrender.com/kino${actor.imgacter}`}
          alt={actor.nameacter}
          fill
          className="object-cover  transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-black/1 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="text-white text-lg sm:text-xl font-semibold leading-snug line-clamp-2">
          {actor.biopic}
        </h2>
         <h2 className="text-white text-lg sm:text-xl font-semibold leading-snug line-clamp-2">
          {actor.datarodactor}
        </h2>
      </div>

    </Link>
   )))}
    </div>



    




<div className='mb-[100px]'>
  <ReactPaginate
  previousLabel="←"
  nextLabel="→"
  pageCount={Math.ceil(totalProducts / productsPerPage)}
  onPageChange={handlePageClick}
  pageRangeDisplayed={2}
  marginPagesDisplayed={1}
  containerClassName="flex items-center gap-2 sm:gap-4 justify-center mt-[80px]"
  pageClassName="rounded"
  pageLinkClassName="
     px-3 py-2 sm:px-6 sm:py-3    
      text-sm sm:text-lg border border-amber-400 rounded-lg 
    text-amber-50 font-semibold 
    hover:bg-amber-400 hover:text-black 
    transition duration-300 ease-in-out
  "
  activeLinkClassName="
    bg-amber-400 text-black font-bold 
    px-3 py-2 sm:px-6 sm:py-3   rounded-lg text-lg
  "
  previousLinkClassName="
    px-3 py-2 sm:px-6 sm:py-3 text-lg border border-amber-400 rounded-lg 
    text-amber-50 font-semibold 
    hover:bg-amber-400 hover:text-black 
    transition duration-300 ease-in-out
  "
  nextLinkClassName="
    px-3 py-2 sm:px-6 sm:py-3 text-lg border border-amber-400 rounded-lg 
    text-amber-50 font-semibold 
    hover:bg-amber-400 hover:text-black 
    transition duration-300 ease-in-out
  "
  disabledLinkClassName="opacity-40 cursor-not-allowed px-3 py-2 sm:px-6 sm:py-3 rounded-lg text-lg border border-amber-400"
  breakLinkClassName="  px-2 sm:px-6 py-2 sm:py-3 text-amber-50 text-lg"
/>
</div>


</div>




</div>
 

          <div className="bg-[#070b2391] flex justify-center w-[100%] h-[700px]  ">
  <div className="my-[70px] min-[500px]:w-[1400px]  max-[500px]:w-[360px]  mx-[8%] h-[580px] rounded-[10px] bg-[#1447e669] flex flex-col items-center">

  {/* Заголовок */}
  <h2 className="text-amber-50  mx-[20px] font-extrabold text-center mt-[14%] min-[500px]:text-[30px] max-[500px]:text-[22px]">
    Leave your email address to receive news and updates
  </h2>

  {/* Форма ввода email */}
  <div className="flex mx-[10px] justify-center flex-wrap mt-10 gap-4">
    <input
      type="email"
      value={emails}
      onChange={(e) => setEmails(e.target.value)}
      placeholder="Enter your email"
      className="
        px-8 py-2 bg-amber-50 rounded
        outline-none transition
        focus:ring-4 focus:ring-blue-400/40
      "
    />

    <button
      onClick={sendEmail}
      className="
        min-[530px]:px-14 max-[530px]:px-28 py-5 bg-blue-600 text-white rounded
        hover:bg-blue-700 active:scale-95 transition
      "
    >
      Send
    </button>
  </div>

  {/* Сообщение о статусе */}
  {status && (
    <p className="text-center text-amber-50 mt-6 text-sm">
      {status}
    </p>
  )}

  {/* Навигационное меню */}
  <div className=" min-[500px]:mt-10 ">
    <div className="flex justify-center mx-[20px] flex-wrap min-[500px]:pt-[80px] max-[500px]:pt-[60px] h-[5px] 2xl:gap-[70px] xl:gap-[50px] gap-[30px] text-[20px] text-amber-50">

      <a
        href="#"
        className="nosifer-regular text-[17px] hover:text-red-700 hover:underline hover:scale-115 hover:duration-300"
      >
        Media
      </a>

      <a
        href="#"
        className="nosifer-regular text-[17px] hover:text-red-700 hover:underline hover:scale-115 hover:duration-300"
      >
        Movies
      </a>

      <a
        href="#"
        className="nosifer-regular text-[17px] hover:text-red-700 hover:underline hover:scale-115 hover:duration-300"
      >
        ACTORS
      </a>

      <a
        href="#"
        className="nosifer-regular text-[17px] hover:text-red-700 hover:underline hover:scale-115 hover:duration-300"
      >
        NEWS
      </a>

      <a
        href="#"
        className="nosifer-regular text-[17px] hover:text-red-700 hover:underline hover:scale-115 hover:duration-300"
      >
        CATEGORIES
      </a>

    </div>

  </div>

</div>

    </div>

       
        
    

      </div>
     
      

    
    </div>
   
  </div>

  )
}