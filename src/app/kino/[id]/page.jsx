'use client'
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation'
import Link from 'next/link';
import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp } from "react-icons/fa";


import Image from "next/image";
import Kino from './Kino'
import Nagrad from './Nagrad'
import Kadri from './Kadri'



export default function ProductPage() {
  
  const [fynts, setfynts] = useState(true); 
   const [granit, setgranit] = useState(10);
  const { id } = useParams();
  const [product, setProduct] = useState(null);



    
  useEffect(() => {
    if (!id) return;

    fetch(`https://frfrf-2zok.onrender.com/kino/kinge/${id}`)
      .then(res => res.json())
      .then(setProduct)
      .catch(console.error);
  }, [id]);

  if (!product) return <div className="flex flex-col mt-[400px] items-center justify-center min-h-[200px] gap-4">
  <div className="w-30 h-30 rounded-full border-4 border-zinc-700 border-t-amber-400 animate-spin"></div>
  <span className="text-amber-400 tracking-widest text-[30px] animate-pulse">
    LOADING...
  </span>
</div>


  const faction = Array.isArray(product.masactor) ? product.masactor : [product.masactor];

  
  


  return (
    

  <div>
    
     <div className="group w-[100%]  h-[100%]   relative ">

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
      
      <div className="w-full z-0  h-[1000px]  bg-cover "
 style={{
    backgroundImage: `url(https://frfrf-2zok.onrender.com/kino${product.imgvid})`,
  }}>

      

           
        <div  className="grind   w-[100%] h-[1200px]  z-10 "
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



        <div className="flex justify-center">

    <div >
          <div className="flex gap-[50px] ">
              <Image
               src={`https://frfrf-2zok.onrender.com/kino${product.img}`}
              width={404}
              height={559}
              alt="User Avatar"
              className=" w-[404px]   rounded-[15px]   h-[559px]"
              />
            <div>
  <nav className="flex  mt-[40px] gap-2 text-sm text-[rgba(79,91,124,1)]">
  <a href="/" className="hover:underline text-[20px] text-[#e9e9e9bf]">Home</a>
  <span className="text-gray-400 mt-[4px]">›</span>
  <a href="/films" className="hover:underline text-[20px] text-[#e9e9e9bf]">Movies</a>
  <span className="text-gray-400 mt-[4px]">›</span>
  <span className="text-amber-50 text-[20px] font-medium">{product.name}</span>
  </nav>

<h1 className="text-[40px] rubik-distressed-regular text-amber-50">{product.name}</h1>
<h2 className="text-[23px] text-amber-50 w-[700px]">{product.quotes}</h2>

<a href="#movies"
className=" 
    px-7 py-3 rounded-2xl 
    bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400
    text-white font-bold text-[18px] tracking-wider 
    shadow-[0_0_20px_rgba(255,180,0,0.6)]
    hover:shadow-[0_0_30px_rgba(255,200,0,0.9)]
    hover:scale-105 active:scale-95
    transition-all duration-300
  "
>
  🎬 Watch a movie
</a>



            </div>

        </div>
        <div className="mt-[120px] gap-[50px] z-30 flex ">

          <div>
            <h2 className="text-[19px] rubik-distressed-regular text-amber-50 ">year :<span className="text-amber-300  underline pl-[80px]">{product.year}</span></h2>
             <h2 className="text-[19px] rubik-distressed-regular text-amber-50 ">Country :<span className="text-amber-300   underline pl-[40px]">{product.country}</span></h2>
              <h2 className="text-[19px] rubik-distressed-regular text-amber-50 ">Slogan :<span className="text-amber-300  underline pl-[55px]">{product.slogan}</span></h2>
               <h2 className="text-[19px] rubik-distressed-regular text-amber-50 ">Director :<span className="text-amber-300  underline pl-[40px]">{product.director}</span></h2>
                <h2 className="text-[19px] rubik-distressed-regular text-amber-50 ">Scenario :<span className="text-amber-300  underline pl-[37px]">{product.scenario}</span></h2>
                 <h2 className="text-[19px] rubik-distressed-regular text-amber-50 ">Producer :<span className="text-amber-300  underline pl-[31px]">{product.Producer}</span></h2>
                   <h2 className="text-[19px] rubik-distressed-regular text-amber-50 ">Operator :<span className="text-amber-300  underline pl-[33px]">{product.Operator}</span></h2>
                 <h2 className="text-[19px] rubik-distressed-regular text-amber-50 ">Composer :<span className="text-amber-300   underline pl-[25px]">{product.Composer}</span></h2>
                 

          </div>
              <div>
            <h2 className="text-[19px] rubik-distressed-regular text-amber-50 ">Artist :<span className="text-amber-300 underline pl-[74px]">{product.Artist}</span></h2>
             <h2 className="text-[19px] rubik-distressed-regular text-amber-50 ">Editor :<span className="text-amber-300 underline pl-[75px]">{product.Editing}</span></h2>
              <h2 className="text-[19px] rubik-distressed-regular text-amber-50 ">Genre :<span className="text-amber-300 underline pl-[79px]">{product.Genre}</span></h2>
               <h2 className="text-[19px] rubik-distressed-regular text-amber-50 ">collected :<span className="text-amber-300  pl-[46px]">{product.Worldwide_gross}</span></h2>
                <h2 className="text-[19px] rubik-distressed-regular text-amber-50 ">Age :<span className="text-amber-300  pl-[101px]">{product.Age}+</span></h2>
                 <h2 className="text-[19px] rubik-distressed-regular text-amber-50 ">Time :<span className="text-amber-300   pl-[89px]">{product.Time}</span></h2>
                 
                 

          </div>

        </div>

        
        
    </div>
        </div>



        

    
   

        </div>
        <div className=" px-[12%]">
           <div>
           <h2 className="text-[50px] mb-[60px] rubik-distressed-regular text-amber-50">Starring</h2>
        
<div className="grid grid-cols-5 gap-4">
  {product.masactor?.slice(0, granit).map((actor, i) => (
    <Link
      href={`/actors/${encodeURIComponent(actor.nameacter)}`}
      key={actor._id || i}
      className="w-[248px] hover:scale-110 transition-transform duration-400 mb-[50px] h-[300px]"
    >
      <div className="w-[248px] h-[250px] overflow-hidden">
        <Image 
          src={`https://frfrf-2zok.onrender.com/kino${actor.masactor}`} 
          width={248} 
          height={250} 
          alt={`image-${i}`} 
          className="object-cover w-full h-full" 
        />
      </div>

      <h2 className="text-amber-50 text-[18px] mt-[15px]">
        {actor.nameacter}
      </h2>

      <h2 className="text-amber-400 text-[16px] mt-[8px]">
        {actor.biopic?.join(', ')}
      </h2>
    </Link>
  ))}
</div>


  <div className="flex justify-center">
      {!granit < faction.length && (

  <button
  onClick={() => {setgranit(granit + 10  );}}
  className="mt-6 mb-16 nosifer-regular px-6 py-3 rounded-[10px] bg-white text-blue-700 font-semibold shadow-md hover:bg-blue-100 hover:text-blue-900 transition duration-200"
>
  show more
</button>

  ) }
  </div>
           </div>
<Kino product={product}/>
<Nagrad product={product}/>
<Kadri/>





        </div>

        
        
    

      </div>
      

    
    </div>
   
  </div>



  );
}