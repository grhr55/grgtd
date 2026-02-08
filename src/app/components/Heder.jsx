'use client'

import Image from "next/image";
import Link from 'next/link';
import { useRef } from "react";
import {  useState , useEffect} from "react";
import Slaid  from "./Slaid";
import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp } from "react-icons/fa";

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
  
  const toggleMenu = () => setIsOpen(prev => !prev);
  const ref = useRef(null);
  const lastX = useRef(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoadingNews(true);
        const res = await fetch("https://grgrege.onrender.com/newsi/newosti");
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
      setLoadingProducts(true);
      const res = await fetch("https://grgrege.onrender.com/kino/kinge");
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
      const res = await fetch("https://grgrege.onrender.com/newsi/newosti", {
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

  // Skeleton компонент для карточек фильмов
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

  // Skeleton компонент для новостей
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
    <div className="group relative ">
      <div className="w-[100%]  z-0 h-[100%]  bg-[rgba(30,37,56,1)]" >
        <div className="w-[100%]   z-10 h-[100%]  bg-[url('/img/efe.png')] bg-cover bg-center">

          <ScrollToTop
            smooth
            top={100}
            component={
              <FaArrowUp
                size={24} 
                color="white"
                style={{ display: "block", margin: "0 auto" }} 
              />
            }
            style={{
              backgroundColor: "#222",
              borderRadius: "20%", 
              width: "60px",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 8px 8px rgba(0,0,0,0.3)",
              cursor: "pointer",
            }}
          />
    
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
                <a href="/movies" className="nosifer-regular hover:text-red-700 hover:duration-300 hover:underline  hover:scale-115 text-[17px]">Movies</a>
                <a href="/actors" className="nosifer-regular hover:text-red-700 hover:duration-300 hover:underline hover:scale-115 text-[17px]">ACTORS</a>
                <a href="/news" className="nosifer-regular hover:text-red-700 hover:duration-300 hover:underline  hover:scale-115 text-[17px]">NEWS</a>
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

          <div className="flex justify-center  ">
            <div className="hidden min-[1420px]:flex">
              <h1 className="text-[38px] text-[#789112] nosifer-regular">Now at the cinema</h1>
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

          <div className="flex  mx-[10px] flex-col items-center my-9 min-[600px]:hidden">
            <h2 className="nosifer-regular  text-[23px] text-[#00e132] mb-4">
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
                <ul className="flex flex-col divide-y divide-gray-700">
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
            <div className="flex justify-center 2xl:mx-[90px] xl:mx-[170px] min-[1000px]:mx-[170px] max-[1200px]:mx-[15px] flex-wrap mx-[15px] mt-[50px] min-[500px]:gap-[22px] max-[500px]:gap-[20px]">
              {loadingProducts ? (
                // Показываем skeleton только для первых 8 элементов
                Array.from({ length: Math.min(8, visibleCount) }).map((_, index) => (
                  <MovieCardSkeleton key={index} />
                ))
              ) : (
                filteredProducts.slice(0, visibleCount).map((product) => (
                  <Link
                    href={`/kino/${slugify(product.name)}`}
                    key={product._id}
                  >
                    <Image
                      src={`https://grgrege.onrender.com/kino${product.img}`}
                      width={330}
                      height={440}
                      alt={product.name}
                      title={product.name}
                      loading="lazy"
                      className="2xl:w-[330px] xl:w-[330px] xl:max-[1453px]:w-[202px]
                        lg:w-[202px] min-[500px]:w-[202px] max-[500px]:w-[150px]
                        2xl:h-[440px] xl:h-[440px] xl:max-[1453px]:h-[270px]
                        lg:h-[270px] min-[500px]:h-[270px] max-[500px]:h-[197px]
                        rounded-[15px] object-fill"
                    />

                    <h3 className="rye-regular mt-[10px] text-[18px]
                      2xl:w-[320px] xl:w-[200px]
                      min-[500px]:w-[200px] max-[1300px]:w-[150px]
                      text-amber-50">
                      {product.name}
                    </h3>

                    <h3 className="rubik-distressed-regular text-[15px] text-[rgba(242,246,15,1)]">
                      {product.kateor}
                    </h3>
                  </Link>
                ))
              )}
            </div>

            <div className="flex justify-center">
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
        </div>
        
        <div className="bg-[rgba(30,37,56,1)]">
          <Slaid products={products}/>
        </div>
        
        <div className="flex justify-center  mt-[80px] mb-[40px] ">
          <div className="hidden min-[1420px]:flex">
            <h2 className="text-[38px] text-[#789112] nosifer-regular">Popular films</h2>
          </div>

          <div className="hidden min-[1420px]:flex">
            <div className="w-[60px] mt-[23px] mx-[250px] h-[3px] bg-amber-50"></div>
          </div>

          <div className="mx-[10px]">
            <div className=" min-[1420px]:hidden ">
              <div className="mb-[30px]">
                <h2 className="text-[28px] text-center text-[#789112] nosifer-regular">Popular films</h2>
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
        
        <div>
          <div className="flex justify-center 2xl:mx-[90px] xl:mx-[170px] min-[1000px]:mx-[170px] max-[1200px]:mx-[0px] flex-wrap mt-[50px] min-[500px]:gap-[22px] max-[500px]:gap-[33px]">
            {loadingProducts ? (
              // Показываем skeleton по количеству элементов которые будут показаны
              Array.from({ length: Math.min(filteredfilm.length || 8, visibleCount) }).map((_, index) => (
                <MovieCardSkeleton key={index} />
              ))
            ) : (
              filteredfilm.slice(0, visibleCount).map((product) => (
                <Link
                  href={`/kino/${slugify(product.name)}`}
                  key={product._id}
                >
                  <div className="relative">
                    <Image
                      src={`https://grgrege.onrender.com/kino${product.img}`}
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

          <div className="flex justify-center">
            {visibleCount < filteredfilm.length && (
              <button
                onClick={() => {setVisibleCount(visibleCount + 8);}}
                className="mt-6 nosifer-regular px-6 py-3 rounded-[10px] bg-white text-blue-700 font-semibold shadow-md hover:bg-blue-100 hover:text-blue-900 transition duration-200"
              >
                show more
              </button>
            )}
          </div>
          
          <div className=" mb-[100px]  min-[500px]:mx-[14%] max-[500px]:mx-[11%]">
            <h2 className=" min-[500px]:text-[40px] max-[500px]:text-[28px] text-left text-[#789112] my-10 nosifer-regular">News</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-10">
              {loadingNews ? (
                // Показываем skeleton по количеству новостей или 6 по умолчанию
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
                        src={`https://grgrege.onrender.com/newsi${ne.imgnews}`}
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

          <div className="bg-[#070b2391] flex justify-center w-[100%] h-[700px]  ">
            <div className="my-[70px] min-[500px]:w-[1400px]  max-[500px]:w-[360px]  mx-[8%] h-[580px] rounded-[10px] bg-[#1447e669] flex flex-col items-center">
              <h2 className="text-amber-50  mx-[20px] font-extrabold text-center mt-[14%] min-[500px]:text-[30px] max-[500px]:text-[22px]">
                Leave your email address to receive news and updates
              </h2>

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

              {status && (
                <p className="text-center text-amber-50 mt-6 text-sm">
                  {status}
                </p>
              )}

              <div className=" min-[500px]:mt-10 ">
                <div className="flex justify-center mx-[20px] flex-wrap min-[500px]:pt-[80px] max-[500px]:pt-[60px] h-[5px] 2xl:gap-[70px] xl:gap-[50px] gap-[30px] text-[20px] text-amber-50">
                  <a href="#" className="nosifer-regular text-[17px] hover:text-red-700 hover:underline hover:scale-115 hover:duration-300">
                    Media
                  </a>
                  <a href="#" className="nosifer-regular text-[17px] hover:text-red-700 hover:underline hover:scale-115 hover:duration-300">
                    Movies
                  </a>
                  <a href="#" className="nosifer-regular text-[17px] hover:text-red-700 hover:underline hover:scale-115 hover:duration-300">
                    ACTORS
                  </a>
                  <a href="#" className="nosifer-regular text-[17px] hover:text-red-700 hover:underline hover:scale-115 hover:duration-300">
                    NEWS
                  </a>
                  <a href="#" className="nosifer-regular text-[17px] hover:text-red-700 hover:underline hover:scale-115 hover:duration-300">
                    CATEGORIES
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}