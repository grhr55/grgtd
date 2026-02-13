'use client'

import Image from "next/image";
import Link from 'next/link';
import { useRef } from "react";
import {  useState , useEffect} from "react";
import Slaid  from "./Slaid";
import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp } from "react-icons/fa";
import MovieRating  from "./Ritingkino"

export default function Heder() {
  
  const [products,setproducts] = useState([])
  const [news, setnews] = useState([])
  const [fynts, setfynts] =useState(true)
  const [nav ,setnav] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [topkinos,settopkinos] = useState('All')
  const [visibleCount, setVisibleCount] = useState(8);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const toggleMenu = () => setIsOpen(prev => !prev);
  const ref = useRef(null);
  const lastX = useRef(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoadingNews(true);
        const res = await fetch("https://grgrg4ee.onrender.com/newsi/newosti");
        if (!res.ok) throw new Error("Ошибка загрузки");
        const data = await res.json();
        setnews(data);
     
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingNews(false);
      }
    };
    loadNews();
  }, []);

 
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true)
      const res = await fetch("https://grgrg4ee.onrender.com/kino/kinge");
      if (!res.ok) throw new Error("Ошибка загрузки данных портфеля");
      const data = await res.json(); 
      setproducts(data); 
      
    } catch(err) {
      console.error(err);
    } finally {
        setLoadingProducts(false);
      }
  }
  
  useEffect(() => {
    fetchProducts()
  },[])
  
  const filter = () => {
    if(!products){
      setfynts(true)
    }else{
      setfynts(false)
    }
  }
  
  useEffect(() => {
    setVisibleCount(8); 
  }, [selectedGenre]);

  const [emails, setEmails] = useState("");
  const [status, setStatus] = useState("");

  const sendEmail = async () => {
    if (!emails) {
      setStatus("Enter your email");
      return;
    }

    try {
      const res = await fetch("https://grgrg4ee.onrender.com/newsi/newosti", {
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

    useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



 





  const slugify = (text) => text
    .toLowerCase()
    .trim()
    .replace(/[,\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const filteredProducts = selectedGenre === 'All' ? products : products.filter((product) => product.kateor.toLowerCase() === selectedGenre.toLowerCase());
  const filteredfilm = topkinos === 'All' ? products : products.filter((product) => product.year.toLowerCase() === topkinos.toLowerCase());

  const genres = ['All', 'action films', 'adventures', 'comedy', 'fantasy', 'thrillers', 'drama'];
  const years = ["All",...Array.from(new Set(products.map(p => Number(p.year)))).sort((a, b) => b - a).map(String)];


  const MovieCardSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-[#adacac] rounded-[15px]
        2xl:w-[330px] xl:w-[330px] xl:max-[1453px]:w-[202px]
        lg:w-[202px] min-[500px]:w-[202px] max-[500px]:w-[150px]
        2xl:h-[440px] xl:h-[440px] xl:max-[1453px]:h-[270px]
        lg:h-[270px] min-[500px]:h-[270px] max-[500px]:h-[197px]"
      />
      <div className="h-5 bg-[#adacac] rounded mt-[10px]
        2xl:w-[320px] xl:w-[200px]
        min-[500px]:w-[200px] max-[1300px]:w-[150px]" />
      <div className="h-4 bg-[#adacac] rounded mt-2 w-1/2" />
    </div>
  );

  

  const NewsCardSkeleton = () => (
    <div className="animate-pulse group relative rounded-2xl overflow-hidden shadow-lg">
      <div className="relative w-full h-[300px] sm:h-[360px] bg-[#adacac]" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="h-6 bg-[#8a8989] rounded w-3/4 mb-2" />
        <div className="h-6 bg-[#8a8989] rounded w-1/2" />
      </div>
    </div>
  );



return (
    <div className="bg-[#00000000]">
      
      
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black ">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 opacity-[0.02]"></div>
      </div>

      
      <ScrollToTop
        smooth
        top={100}
        component={
          <div className="relative group ">
            <FaArrowUp size={18} className="text-white relative   " />
            <div className="absolute  inset-0 bg-gradient-to-r from-red-600 to-amber-600 rounded-full blur opacity-75 group-hover:opacity-100 transition"></div>
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
          border: "1px solid rgba(255, 255, 255, 0.1)",
          zIndex: 50,
        }}
      />

      
      <div className="flex min-[501px]:hidden">
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
              
            
            </div>
          </div>
        )}
      </div>


<div className={`sticky top-0 z-40 transition-all duration-500 ${
            isScrolled 
              ? 'bg-[#00000000] backdrop-blur-2xl shadow-2xl bg-[#00000000]' 
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
                    <span className="absolute  bg-gradient-to-r from-red-500 group-hover:w-full transition-all duration-500"></span>
                  </a>


<a href="/news" className="nosifer-regular text-sm xl:text-base text-white/80 hover:text-red-500 transition-all duration-300 relative group">
                    NEWS
                    <span className="absolute  bg-gradient-to-r from-red-500  group-hover:w-full transition-all duration-500"></span>
                  </a>
                  <a href="#" className="nosifer-regular text-sm xl:text-base text-white/80 hover:text-red-500 transition-all duration-300 relative group">
                    CATEGORIES
                    <span className="absolute  bg-gradient-to-r from-red-500 group-hover:w-full transition-all duration-500"></span>
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






          <div className="flex justify-center mt-[30px] relative z-10  ">
            <div className="hidden min-[1420px]:flex">
              <h1 className="text-[38px] nosifer-regular bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">Now at the cinema</h1>
            </div>

            <div className="hidden min-[1420px]:flex">
              <div className="w-[60px] mt-[23px] mx-[50px] h-[3px] bg-amber-50"></div>
            </div>
   
            <div className="hidden min-[600px]:flex">
              {genres.map((genre, index) => (
                <button onClick={() => {setSelectedGenre(genre);setnav(null);}}  key={index} className={`mx-2  cursor-pointer   nosifer-regular min-[700px]:text-[13px] max-[700px]:text-[10px]  text-[#73848c] hover:text-[#fbff00] hover:underline transition duration-300 ${selectedGenre === genre ? 'text-[#fbff00]':'text-[#73848c]' }   `}>
                  {genre}
                </button>
              ))}
            </div>
          </div>






          <div className="flex relative z-10     mx-[10px] flex-col items-center  min-[500px]:my-9 min-[600px]:hidden">
            <h2 className="nosifer-regular  text-[23px] bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent  mb-[20px] ">
              Now at the cinema
            </h2>

            <div className="w-full max-w-xs bg-gray-800 border border-gray-600 rounded-lg shadow-md">
              <button
                onClick={toggleMenu}
                className="w-full flex items-center justify-center py-3 bg-[#008667] text-white rounded-t-lg  transition duration-200"
                aria-label="Toggle menu"
              >
                <span className="text-lg font-bold">☰</span>
              </button>

              {isOpen && (
                <ul className="flex   flex-col divide-y divide-gray-700">
                  {genres.map((genre, index) => (
                    <li key={index}>
                      <button
                        onClick={() => {
                          setSelectedGenre(genre);
                          setnav(null);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-[12px] nosifer-regular transition duration-300 
                          ${selectedGenre === genre ? 'text-yellow-400 underline' : 'text-gray-300'} 
                          hover:text-yellow-300 hover:underline`}
                      >
                        {genre}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>





          <div>
            <div className="flex justify-center relative z-10 2xl:mx-[90px] xl:mx-[170px] min-[1000px]:mx-[170px] max-[1200px]:mx-[15px] flex-wrap mx-[15px] min-[500px]:mt-[60px] mt-[30px] min-[500px]:gap-[22px] max-[500px]:gap-[20px]">
            

              {loadingProducts ? (

                    Array.from({ length:products.length || 8 }).map((_, index) => (
                  <MovieCardSkeleton className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-10" key={index} />
                ))
               
              ) : (
                

                 filteredProducts.map((product) => (
                  <Link
                    href={`/kino/${slugify(product.name)}`}
                    key={product._id}
                    
                  >
                 <div className="reletive group z-0  ">
                  <div  className="hover:bg-[#0000007c]  absolute z-30 rounded-[15px] 2xl:w-[330px] xl:w-[330px] xl:max-[1453px]:w-[202px]
                        lg:w-[202px] min-[500px]:w-[202px] max-[500px]:w-[150px]
                        2xl:h-[440px] xl:h-[440px] xl:max-[1453px]:h-[270px]
                        lg:h-[270px] min-[500px]:h-[270px] max-[500px]:h-[197px] ">
<button className="mt-45 ml-15 hidden min-[1200px]:flex
               opacity-0 group-hover:opacity-100
               transition-all duration-300 ease-in-out
               
               bg-gradient-to-r   from-red-600 via-red-600 to-amber-600
              
               text-white text-[20px] font-medium
               px-15 py-5
               rounded-xl
               shadow-lg hover:shadow-xl
               hover:scale-105
               active:scale-95
               
              
               relative overflow-hidden
               
               before:absolute before:inset-0 before:bg-white/20 
               before:translate-y-full hover:before:translate-y-0
               before:transition-transform before:duration-300">
  <span className="relative z-10">Смотреть</span>
</button>



                      

                  </div>
                 <Image 
                      src={`https://grgrg4ee.onrender.com/kino${product.img}`}
                      width={330}
                      height={440}
                      alt={product.name}
                      title={product.name}
                      loading="lazy"
                      className="2xl:w-[330px] xl:w-[330px] xl:max-[1453px]:w-[202px]
                        lg:w-[202px] min-[500px]:w-[202px] max-[500px]:w-[150px]
                        2xl:h-[440px] xl:h-[440px] xl:max-[1453px]:h-[270px]
                        lg:h-[270px] min-[500px]:h-[270px] max-[500px]:h-[197px]
                        rounded-[15px] object-fill "
                    />
                   <div className=" absolute z-20 min-[1453px]:ml-63  min-[1453px]:mt-[-420px]  min-[500px]:ml-34  ml-24 min-[500px]:mt-[-260px]  mt-[-190px] ">
                     <MovieRating idconos={product._id} />
                   </div>



                    <h3 className="rye-regular mt-[10px] text-[18px]
                      2xl:w-[320px] xl:w-[200px]
                      min-[500px]:w-[200px] max-[1300px]:w-[150px]
                      text-amber-50">
                      {product.name}
                    </h3>
                    

                    <h3 className="rubik-distressed-regular text-[15px] text-[rgba(242,246,15,1)]">
                      {product.kateor}
                    </h3>

                 </div>
                  </Link>
                ))
       
               
              )  }

            </div>

            <div className="flex relative z-10 justify-center">
              {visibleCount < filteredProducts.length && (
                <button
                  onClick={() => setVisibleCount(prev => prev + 8)}
                  className="mt-6 nosifer-regular px-6 py-3 rounded-[10px] bg-white text-blue-700 font-semibold shadow-md hover:bg-blue-100 transition"
                >
                  show more
                </button>
              )}
            </div>
          </div>



        
        
        <div className="bg-[rgba(30,37,56,1)]">
          <Slaid products={products}/>
        </div>

        
        <div className="flex justify-center  relative z-10 mt-[50px] mb-[80px] ">
          <div className="hidden min-[1420px]:flex">
            <h2 className="text-[38px] nosifer-regular   bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent nosifer-regular">Popular films</h2>
          </div>

          <div className="hidden min-[1420px]:flex">
            <div className="w-[60px] mt-[23px] mx-[250px] h-[3px] bg-amber-50"></div>
          </div>

          <div className="mx-[10px]">
            <div className=" min-[1420px]:hidden ">
              <div className="mb-[30px]">
                <h2 className="text-[28px] text-center bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent nosifer-regular">Popular films</h2>
              </div>
            </div>
    
            <div className="min-[500px]:w-[400px] max-[500px]:w-[300px] mt-[13px] min-[500px]:mx-[0px] max-[500px]:mx-[10px] overflow-hidden relative">
              <div
                ref={ref}
                onMouseEnter={(e) => {
                  lastX.current = e.clientX;
                }}
                onMouseMove={(e) => {
                  if (lastX.current === null) return;
                  const dx = e.clientX - lastX.current;
                  ref.current.scrollLeft -= dx;
                  lastX.current = e.clientX;
                }}
                onMouseLeave={() => {
                  lastX.current = null;
                }}
                className="flex gap-4 overflow-x-auto whitespace-nowrap select-none
                          [&::-webkit-scrollbar]:hidden
                          [-ms-overflow-style:'none']
                          [scrollbar-width:'none']"
              >
                {years.map((year, index) => (
                  <button
                    key={index}
                    onClick={() => settopkinos(year)}
                    className={`nosifer-regular text-[13px] flex-shrink-0 transition
                      ${topkinos === year ? "text-[#fbff00] underline" : "text-[#73848c] hover:text-[#fbff00]"}
                    `}
                  >
                    {year}
                  </button>
                ))}
              </div>
              <div className="pointer-events-none absolute top-0 right-0 h-full w-12
                            bg-gradient-to-l  to-transparent" />
            </div>
          </div>
        </div>





        
        
          <div className="flex justify-center relative z-10 2xl:mx-[90px] xl:mx-[170px] min-[1000px]:mx-[170px] max-[1200px]:mx-[0px] flex-wrap mt-[50px] min-[500px]:gap-[22px] max-[500px]:gap-[20px]">
            {loadingProducts ? (
          
             <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-10">
            {products.map((product) => (
              <MovieCardSkeleton key={product._id} />
            ))}
          </div>

            ) : (
              filteredfilm.map((product) => (
                <Link
                  href={`/kino/${slugify(product.name)}`}
                  key={product._id}
                >
                  <div className="relative  group z-0">

                         <div  className="hover:bg-[#0000007c]    absolute z-30 rounded-[15px] 2xl:w-[330px] xl:w-[330px] xl:max-[1453px]:w-[202px]
                        lg:w-[202px] min-[500px]:w-[202px] max-[500px]:w-[150px]
                        2xl:h-[440px] xl:h-[440px] xl:max-[1453px]:h-[270px]
                        lg:h-[270px] min-[500px]:h-[270px] max-[500px]:h-[197px] ">

<button className="mt-50 ml-15   hidden min-[1200px]:flex 
               opacity-0 group-hover:opacity-100
               transition-all duration-300 ease-in-out
               
               bg-gradient-to-r   from-red-600 via-red-600 to-amber-600
              
               text-white text-[20px] font-medium
               px-15 py-5
               rounded-xl
               shadow-lg hover:shadow-xl
               hover:scale-105
               active:scale-95
               
              
               relative overflow-hidden
               
               before:absolute before:inset-0 before:bg-white/20 
               before:translate-y-full hover:before:translate-y-0
               before:transition-transform before:duration-300">
  <span className="relative z-10">Смотреть</span>
</button>



                      

                  </div>
                    <Image
                      src={`https://grgrg4ee.onrender.com/kino${product.img}`}
                      width={330}
                      height={440}
                      alt={product.name}
                      className="2xl:w-[330px] xl:w-[330px] xl:max-[1453px]:w-[202px]
                                lg:w-[202px] min-[500px]:w-[202px] max-[500px]:w-[147px]
                                2xl:h-[440px] xl:h-[440px] xl:max-[1453px]:h-[270px]
                                lg:h-[270px] min-[500px]:h-[270px] max-[500px]:h-[197px]
                                rounded-[15px] object-fill"
                    />
                    <div className="absolute 2xl:bottom-95 xl:min-[1520px]:bottom-97
                                  min-[500px]:bottom-57 max-[500px]:bottom-39
                                  left-3 bg-blue-900 bg-opacity-60 text-white text-[15px] px-2 py-1 rounded">
                      {product.year}
                    </div>
                  </div>

                  <h3 className="rye-regular mt-[10px] text-[18px]
                    2xl:w-[320px] xl:w-[200px]
                    min-[500px]:w-[200px] max-[1300px]:w-[150px]
                    text-amber-50">
                    {product.name}
                  </h3>
                  <h3 className="rubik-distressed-regular text-[15px] text-[rgba(242,246,15,1)]">{product.kateor}</h3>
                </Link>
              ))
            )}
          </div>

          <div className="flex  relative z-10 justify-center">
            {visibleCount < filteredfilm.length && (
              <button
                onClick={() => {setVisibleCount(visibleCount + 8);}}
                className="mt-6 nosifer-regular px-6 py-3 rounded-[10px] bg-white text-blue-700 font-semibold shadow-md hover:bg-blue-100 hover:text-blue-900 transition duration-200"
              >
                show more
              </button>
            )}
          </div>
          
          <div className=" mb-[100px] relative z-10  min-[500px]:mx-[14%] max-[500px]:mx-[11%]">
            <h2 className=" min-[500px]:text-[40px] max-[500px]:text-[28px] text-left nosifer-regular   bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent  min-[500px]:my-16 my-7 my-10 nosifer-regular">News</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-10">
              {loadingNews ? (
               
                Array.from({ length: news.length || 6 }).map((_, index) => (
                  <NewsCardSkeleton key={index} />
                ))
              ) : (
                news.map(ne => (
                  <Link
                    key={ne._id}
                    href={`/news/${slugify(ne.namenews)}`}
                    className="group relative rounded-2xl overflow-hidden shadow-lg"
                  >
                    <div className="relative w-full h-[300px] sm:h-[360px]">
                      <Image
                        src={`https://grgrg4ee.onrender.com/newsi${ne.imgnews}`}
                        fill
                        alt={ne.namenews}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h2 className="text-white text-lg sm:text-xl font-semibold leading-snug line-clamp-2">
                        {ne.namenews}
                      </h2>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>




     

     
      <div className="bg-[#00000000] flex justify-center w-[100%]  min-[500px]:h-[700px] max-[500px]:h-[400px]">
        <div className="min-[500px]:mt-[60px] max-[500px]:mt-[0px] min-[500px]:w-[1400px] max-[500px]:w-[360px] mx-[5%] h-[580px] rounded-[10px] bg-gradient-to-br from-red-900/20 via-black to-amber-900/20 border border-red-900/30 flex flex-col items-center relative overflow-hidden">
          
        
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-amber-600/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 w-full flex flex-col items-center">
          
            <h2 className="text-amber-50 mx-[20px] font-extrabold text-center mt-[14%] min-[500px]:text-[30px] max-[500px]:text-[22px]">
              Leave your email address to receive news and updates
            </h2>

            
            <div className="flex mx-[10px] justify-center flex-wrap mt-10 gap-4">
              <input
                type="email"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                placeholder="Enter your email"
                className="px-8 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white/10"
              />


<button
                onClick={sendEmail}
                className="min-[530px]:px-14 max-[530px]:px-28 py-5 bg-gradient-to-r from-red-600 via-red-600 to-amber-600 text-white rounded-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Send
              </button>
            </div>

          
            {status && (
              <p className="text-center text-amber-50 mt-6 text-sm">
                {status}
              </p>
            )}

            <div className="min-[500px]:mt-10">
              <div className="flex justify-center mx-[20px] flex-wrap min-[500px]:pt-[80px] max-[500px]:pt-[60px] h-[5px] 2xl:gap-[70px] xl:gap-[50px] gap-[30px] text-[20px] text-amber-50">
                <a href="#" className="nosifer-regular text-[17px] text-gray-500 hover:text-red-500 hover:underline hover:scale-115 hover:duration-300">
                  Media
                </a>
                <a href="/movies" className="nosifer-regular text-[17px] text-gray-500 hover:text-red-500 hover:underline hover:scale-115 hover:duration-300">
                  Movies
                </a>
                <a href="/actors" className="nosifer-regular text-[17px] text-gray-500 hover:text-red-500 hover:underline hover:scale-115 hover:duration-300">
                  ACTORS
                </a>
                <a href="/news" className="nosifer-regular text-[17px] text-gray-500 hover:text-red-500 hover:underline hover:scale-115 hover:duration-300">
                  NEWS
                </a>
                <a href="#" className="nosifer-regular text-[17px] text-gray-500 hover:text-red-500 hover:underline hover:scale-115 hover:duration-300">
                  CATEGORIES
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}