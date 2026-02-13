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
import MovieRating from './Reits'




export default function ProductPage() {
  
  const [fynts, setfynts] = useState(true); 
   const [granit, setgranit] = useState(10);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);


    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    
  useEffect(() => {
    if (!id) return;

    fetch(`https://grgrg4ee.onrender.com/kino/kinge/${id}`)
      .then(res => res.json())
      .then(setProduct)
      .catch(console.error);
  }, [id]);

if (!product) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="relative">
        <div className="w-28 h-28 rounded-full border-[6px] border-gray-800 border-t-red-600 animate-spin"></div>
        <div className="absolute inset-0 w-28 h-28 rounded-full border-[6px] border-transparent border-b-amber-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      <div className="mt-10 text-center">
        <span className="block text-amber-500 tracking-[0.4em] text-3xl font-black animate-pulse mb-2">
          LOADING
        </span>
        <span className="text-gray-500 text-sm tracking-wider">Please wait...</span>
      </div>
    </div>
  );


  const faction = Array.isArray(product.masactor) ? product.masactor : [product.masactor];

  
  


  return (
    

  <div>
    
     <div className=" w-[100%]  relative  ">


      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02]"></div>
      </div>




       


    <ScrollToTop
        smooth
        top={100}
        component={
          <div className="relative z-10 group">
            <FaArrowUp size={18} className="text-white " />
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600 rounded-full blur opacity-75 group-hover:opacity-100 transition"></div>
          </div>
        }
        style={{
          backgroundColor: "#dc2626",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 10px 40px rgba(220, 38, 38, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}
      />
      
 <div
  className="w-full h-[1000px] bg-cover bg-center relative"
  style={{
    backgroundImage: `url(https://grgrg4ee.onrender.com/kino${product.imgvid})`,
  }}
>
     
        <div  className="bg-gradient-to-br  w-full relative z-0 "> 
          
  
  {/* Градиент поверх изображения - от прозрачного к чёрному */}
  <div className="absolute inset-0 bg-gradient-to-b  from-black/10 to-black"></div>

  {/* Размытое пятно снизу для мягкого перехода */}
  <div className="absolute top-[75%] w-full left-0 right-0 h-[30%] bg-gradient-to-t bg-gradient-to-b from-gray-950 via-gray-900 to-black to-transparent  blur-[10px] "></div>
  


 




      
   <div className="flex  top-0 relative  z-40 min-[501px]:hidden">
           {!fynts && (
             <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl">
               <div className="relative h-full flex flex-col items-center justify-start p-6 space-y-6">
                 
                 <div className="mb-[100px] flex">
                   <Image
                     src="/img/Copilot_20251012_035756.png"
                     width={125}
                     height={125}
                     alt="User Avatar"
                     className="w-[125px] min-[400px]:ml-[100px] max-[400px]:ml-[90px] h-[125px] rounded-full shadow-2xl ring-4 ring-red-500/30"
                   />
                   <button 
                     className="min-[400px]:ml-[90px] max-[400px]:ml-[70px] text-[25px] text-red-500 hover:text-red-400 transition-colors" 
                     onClick={() => setfynts(!false)}
                   >
                     X
                   </button>
                 </div>
                 
                 <nav className="flex text-amber-50 flex-wrap mx-[200px] justify-center gap-10">
                   {["Media", "Movies", "ACTORS", "NEWS", "CATEGORIES"].map((item) => (
                     <a
                       key={item}
                       href="#"
                       className="nosifer-regular text-[17px] text-center transition duration-300 transform hover:text-red-500 hover:underline hover:scale-110"
                     >
                       {item}
                     </a>
                   ))}
                 </nav>
               </div>
             </div>
           )}
         </div>
   
         
     <div className={` sticky z-40  top-0  transition-all duration-500 ${
  isScrolled
    ? 'bg-black/40 backdrop-blur-2xl shadow-2xl'
    : 'bg-transparent'
}`}>

               <div className="flex min-[1058px]:justify-center max-[1058px]:justify-around 2xl:gap-[130px] xl:gap-[70px] max-[500px]:gap-[5px] min-[400px]:mx-[30px] max-[400px]:mx-[10px]">
                 
                 <div className="flex gap-[4px] min-[500px]:hidden">
                   <button 
                     onClick={() => setfynts(false)} 
                     className="min-[400px]:w-[55px] max-[400px]:w-[44px] min-[400px]:h-[52px] max-[400px]:h-[42px] min-[400px]:rounded-[20px] max-[400px]:rounded-[15px] 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-[80px] sm:mt-[80px] mt-[50px] hover:scale-110 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                   >
                     <div className="min-[400px]:ml-[15px] max-[400px]:ml-[10px] min-[400px]:mb-[0px] max-[400px]:mb-[3px]">
                       <div className="w-[25px] h-[3px] my-[6px] bg-red-500"></div>
                       <div className="w-[25px] h-[3px] my-[6px] bg-red-500"></div>
                       <div className="w-[25px] h-[3px] bg-red-500"></div>
                     </div>
                   </button>
                 </div>
       
                 <div className="flex gap-[4px] min-[1058px]:hidden">
                   <a 
                     href="#" 
                     className="min-[400px]:w-[55px] max-[400px]:w-[44px] min-[400px]:h-[52px] max-[400px]:h-[42px] min-[400px]:rounded-[20px] max-[400px]:rounded-[15px] 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-[80px] sm:mt-[80px] mt-[50px] hover:scale-110 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                   >
                     <Image
                       src="/img/Vector.png"
                       width={25}
                       height={25}
                       alt="Search"
                       className="w-[25px] mx-auto min-[400px]:mt-[15px] max-[400px]:mt-[10px] hover:scale-140 transition duration-400 ease-in-out h-[25px]"
                     />
                   </a>
                 </div>
       
                 <Image
                   src="/img/Copilot_20251012_035756.png"
                   width={150}
                   height={150}
                   alt="Logo"
                   className="2xl:w-[150px] xl:h-[150px] lg:w-[150px] lg:h-[150px] md:h-[150px] md:w-[150px] sm:h-[150px] sm:w-[150px] min-[400px]:w-[140px] max-[400px]:w-[125px] min-[400px]:h-[140px] max-[400px]:h-[125px] xl:w-[150px] 2xl:h-[150px] drop-shadow-2xl hover:drop-shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all duration-500 hover:scale-110"
                 />
       
                 <div className="hidden min-[1058px]:flex">
                   <div className='flex justify-center pt-[70px] h-[5px] 2xl:gap-[70px] xl:gap-[50px] gap-[30px] text-[20px] text-amber-50'>
                     <a href="#" className="nosifer-regular text-sm xl:text-base text-white/80 hover:text-red-500 transition-all duration-300 relative group">
                       Media
                       <span className="absolute  bg-gradient-to-r from-red-500  group-hover:w-full transition-all duration-500"></span>
                     </a>
                     <a href="/movies" className="nosifer-regular text-sm xl:text-base text-white/80 hover:text-red-500 transition-all duration-300 relative group">
                       Movies
                       <span className="absolute  bg-gradient-to-r from-red-500  group-hover:w-full transition-all duration-500"></span>
                     </a>
                     <a href="/actors" className="nosifer-regular text-sm xl:text-base text-white/80 hover:text-red-500 transition-all duration-300 relative group">
                       ACTORS
                       <span className="absolute  bg-gradient-to-r from-red-500  group-hover:w-full transition-all duration-500"></span>
                     </a>
                     <a href="/news" className="nosifer-regular text-sm xl:text-base text-white/80 hover:text-red-500 transition-all duration-300 relative group">
                       NEWS
                       <span className="absolute  bg-gradient-to-r from-red-500  group-hover:w-full transition-all duration-500"></span>
                     </a>
                     <a href="#" className="nosifer-regular text-sm xl:text-base text-white/80 hover:text-red-500 transition-all duration-300 relative group">
                       CATEGORIES
                       <span className="absolute  bg-gradient-to-r from-red-500  group-hover:w-full transition-all duration-500"></span>
                     </a>
                   </div>
                 </div>
       
                 <div className="hidden min-[1058px]:flex">
                   <div className="flex mt-[50px] gap-[12px]">
                     <a 
                       href="#" 
                       className="w-[55px] h-[52px] rounded-[20px] hover:scale-110 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 flex items-center justify-center"
                     >
                       <Image
                         src="/img/Vector.png"
                         width={25}
                         height={25}
                         alt="Search"
                         className="w-[25px] h-[25px] hover:scale-140 transition duration-400 ease-in-out"
                       />
                     </a>
                     <button className="w-[138px] cursor-pointer nosifer-regular hover:scale-110 h-[53px] font-semibold px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-[15px] hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300">
                       Enter
                     </button>
                   </div>
                 </div>
       
                 <div className="flex min-[1058px]:hidden">
                   <button className="cursor-pointer min-[500px]:w-[138px] nosifer-regular max-[500px]:w-[90px] min-[500px]:h-[53px] max-[500px]:h-[52px] 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-[80px] sm:mt-[80px] mt-[50px] hover:scale-110 font-semibold bg-gradient-to-r from-red-600 to-red-700 text-white rounded-[20px] hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300">
                     Enter
                   </button>
                 </div>
               </div>
             </div>

             
             


        <div className="flex  relative z-20 justify-center">

    <div >
          <div className="flex gap-[50px] ">
              <div>
                <Image
               src={`https://grgrg4ee.onrender.com/kino${product.img}`}
              width={404}
              height={559}
              alt="User Avatar"
              className=" w-[404px]   rounded-[15px]   h-[559px]"
              />
            <MovieRating  idconos={product._id}  />
              </div>
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
        <div className="mt-[120px] gap-[50px] relative z-20 flex ">

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

        <div className="  px-[12%]   ">

       
           <div className=" relative z-20">
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
          src={`https://grgrg4ee.onrender.com/kino${actor.masactor}`} 
          width={248} 
          height={250} 
          alt={`акуккк`} 
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