'use client'

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation'
import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp, FaTimes, FaBars, FaSearch } from "react-icons/fa";
import Image from "next/image";
import Coments from './Coments'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

import { Mousewheel, Pagination } from 'swiper/modules';

export default function Vidnovosti() {
  const { namenews } = useParams();
  const [fynts, setfynts] = useState(true);
  const [product, setProduct] = useState(null);
  const [emails, setEmails] = useState("");
  const [status, setStatus] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

useEffect(() => {
  if (!namenews) return;

  setLoading(true);

  fetch(`https://grgrege.onrender.com/newsi/news/${namenews}`)
    .then(res => res.json())
    .then(data => {
      setProduct(data);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      setLoading(false);
    });

}, [namenews]);


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




  return (
    <div className="min-h-screen bg-[#00000000]">
      
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02]"></div>
      </div>

      {/* Scroll to Top */}
      <ScrollToTop
        smooth
        top={100}
        component={
          <div className="relative group">
            <FaArrowUp size={18} className="text-white relative z-10" />
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
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      />
  
      {/* Mobile Menu */}
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

      {/* Header */}
      <div className={`sticky top-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#00000000] backdrop-blur-2xl shadow-2xl border-b border-white/5' 
          : 'bg-transparent'
      }`}>
        <div className="flex min-[1058px]:justify-center max-[1058px]:justify-around 2xl:gap-[130px] xl:gap-[70px] max-[500px]:gap-[5px] min-[400px]:mx-[30px] max-[400px]:mx-[10px]">
          
          {/* Mobile Menu Button */}
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

          {/* Search Button Mobile */}
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

          {/* Logo */}
          <Image
            src="/img/Copilot_20251012_035756.png"
            width={150}
            height={150}
            alt="Logo"
            className="2xl:w-[150px] xl:h-[150px] lg:w-[150px] lg:h-[150px] md:h-[150px] md:w-[150px] sm:h-[150px] sm:w-[150px] min-[400px]:w-[140px] max-[400px]:w-[125px] min-[400px]:h-[140px] max-[400px]:h-[125px] xl:w-[150px] 2xl:h-[150px] drop-shadow-2xl hover:drop-shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all duration-500 hover:scale-110"
          />

          {/* Desktop Navigation */}
          <div className="hidden min-[1058px]:flex">
            <div className='flex justify-center pt-[70px] h-[5px] 2xl:gap-[70px] xl:gap-[50px] gap-[30px] text-[20px] text-amber-50'>
              <a href="#" className="nosifer-regular text-sm xl:text-base text-white/80 hover:text-red-500 transition-all duration-300 relative group">
                Media
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-amber-500 group-hover:w-full transition-all duration-500"></span>
              </a>
              <a href="/movies" className="nosifer-regular text-sm xl:text-base text-white/80 hover:text-red-500 transition-all duration-300 relative group">
                Movies
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-amber-500 group-hover:w-full transition-all duration-500"></span>
              </a>
              <a href="/actors" className="nosifer-regular text-sm xl:text-base text-white/80 hover:text-red-500 transition-all duration-300 relative group">
                ACTORS
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-amber-500 group-hover:w-full transition-all duration-500"></span>
              </a>
              <a href="/news" className="nosifer-regular text-sm xl:text-base text-white/80 hover:text-red-500 transition-all duration-300 relative group">
                NEWS
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-amber-500 group-hover:w-full transition-all duration-500"></span>
              </a>
              <a href="#" className="nosifer-regular text-sm xl:text-base text-white/80 hover:text-red-500 transition-all duration-300 relative group">
                CATEGORIES
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-amber-500 group-hover:w-full transition-all duration-500"></span>
              </a>
            </div>
          </div>

          {/* Desktop Actions */}
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

          {/* Mobile Enter Button */}
          <div className="flex min-[1058px]:hidden">
            <button className="cursor-pointer min-[500px]:w-[138px] nosifer-regular max-[500px]:w-[90px] min-[500px]:h-[53px] max-[500px]:h-[52px] 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-[80px] sm:mt-[80px] mt-[50px] hover:scale-110 font-semibold bg-gradient-to-r from-red-600 to-red-700 text-white rounded-[20px] hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300">
              Enter
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="2xl:mx-[24%] xl:mx-[14%] lg:mx-[10%] mx-[10%]">
        
        {/* Title */}
       {loading ? (
         <div className="animate-pulse">
           <div className="h-8 w-3/4 bg-[#797b7f] rounded mb-2" />
           <div className="h-6 w-1/2 bg-[#797b7f] rounded" />
         </div>
       ) : (
         <h1 className="text-amber-50 min-[500px]:text-[30px] max-[500px]:text-[17px] m-0 p-0 leading-tight min-[500px]:font-extrabold max-[500px]:font-bold text-3xl sm:text-4xl lg:text-6xl">
           {product.newsname}
         </h1>
       )}

        {/* Breadcrumbs */}
      {loading ? (
        <div className="animate-pulse mt-4">
          <div className="h-6 w-[80%] bg-[#797b7f] rounded mb-7" />
        </div>
      ):(  <nav className="flex flex-wrap min-[500px]:mt-[30px] max-[500px]:mt-[20px] min-[500px]:mb-[50px] max-[500px]:mb-[20px] gap-2 text-[rgba(79,91,124,1)]">
          <a href="/" className="hover:underline min-[800px]:text-[20px] max-[800px]:text-[15px] text-gray-500 hover:text-red-500 transition-colors">
            Home
          </a>
          <span className="text-gray-600 min-[800px]:mt-[4px] max-[800px]:mt-[0px]">›</span>
          <a href="/news" className="hover:underline min-[800px]:text-[20px] max-[800px]:text-[15px] text-gray-500 hover:text-red-500 transition-colors">
            news
          </a>
          <span className="text-gray-600 min-[800px]:mt-[4px] max-[800px]:mt-[0px]">›</span>
          <span className="text-red-500 min-[800px]:text-[20px] max-[800px]:text-[15px] font-medium">
            {product.namenews}
          </span>
        </nav>)}
        

        {/* Featured Image */}
       {loading ? ( <div className="animate-pulse mt-4">
          <div className=" bg-[#797b7f] rounded-[15px] 2xl:h-[800px] xl:h-[600px] lg:h-[500px] md:h-[400px] sm:h-[300px] h-[270px] w-full" />
        </div>):( <div className="relative overflow-hidden rounded-2xl group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Image
            src={`https://grgrege.onrender.com/newsi${product.imgnews}`}
            width={910}
            height={680}
            alt={product.namenews}
            className="rounded-[15px] w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000"
          />
        </div>)}

        {/* Description */}
        <h2 className="text-amber-50 m-0 p-0 leading-tight min-[500px]:mt-[40px] max-[500px]:mt-[20px] min-[500px]:mb-[40px] max-[500px]:mb-[20px] font-mono min-[500px]:text-[20px] max-[500px]:text-[17px] text-gray-300 text-lg lg:text-xl leading-relaxed font-light">
          {product.opisnews}
        </h2>

        {/* Video */}
       {loading ? (<div className="animate-pulse mt-4">
          <div className=" bg-[#797b7f] w-full 2xl:h-[700px] xl:h-[700px] lg:h-[500px] md:h-[400px] sm:h-[400px] h-[250px] rounded-[15px] " />
        </div>):( <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl">
          <iframe
            height="700"
            src={`https://www.youtube.com/embed/${product.videonews}`}
            className="w-full 2xl:h-[700px] xl:h-[700px] lg:h-[500px] md:h-[400px] sm:h-[400px] h-[250px] rounded-[15px]"
            allowFullScreen
          />
        </div>)}

        {/* Video Description */}
        <h2 className="text-amber-50 m-0 p-0 leading-tight min-[500px]:mt-[40px] max-[500px]:mt-[20px] min-[500px]:mb-[40px] max-[500px]:mb-[20px] font-mono min-[500px]:text-[20px] max-[500px]:text-[17px] text-gray-300 text-lg lg:text-xl leading-relaxed font-light">
          {product.opisvideonews}
        </h2>

        {/* Highlight Box */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-950/30 via-amber-950/20 to-red-950/30 border border-red-900/30 min-[500px]:p-7 max-[500px]:p-4">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-amber-600 to-red-600"></div>
          <h2 className="text-amber-50 m-0 p-0 leading-tight min-[500px]:mt-[40px] max-[500px]:mt-[0px] min-[500px]:mb-[40px] max-[500px]:mb-[0px] font-mono min-[500px]:text-[20px] max-[500px]:text-[17px] text-white/90">
            {product.textsetifoto}
          </h2>
        </div>

        {/* Secondary Image */}
     {loading ? (<div className="animate-pulse mt-4">
          <div className=" bg-[#797b7f] w-full 2xl:h-[700px] xl:h-[700px] lg:h-[500px] md:h-[400px] sm:h-[400px] h-[250px] rounded-[15px]   " />
        </div>):(   <div className="relative overflow-hidden rounded-2xl group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Image
            src={`https://grgrege.onrender.com/newsi${product.img}`}
            width={940}
            height={680}
            alt={product.namenews}
            className="w-[940px] min-[500px]:h-auto max-[500px]:h-[200px] min-[500px]:mt-[40px] max-[500px]:mt-[20px] rounded-[15px] object-cover transform group-hover:scale-105 transition-transform duration-1000"
          />
        </div>)}


        {/* Vertical Swiper - ORIGINAL */}
     {loading ?(<div className="animate-pulse mt-4">
          <div className=" bg-[#797b7f] w-full 2xl:h-[700px] xl:h-[700px] lg:h-[500px] md:h-[400px] sm:h-[400px] h-[250px] rounded-[15px]  " />
        </div>):(   <Swiper
          direction={'vertical'}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          modules={[Mousewheel, Pagination]}
          className="mySwiper min-[500px]:mt-[70px] max-[500px]:mt-[20px] swiper rounded-[15px] swiper-slide"
        >
          {product?.masnewsimg &&
            Object.values(product.masnewsimg).map((img, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={`https://grgrege.onrender.com/newsi${img}`}
                  width={940}
                  height={680}
                  alt={product.namenews}
                  className="w-[940px] max-w-full object-fill min-[500px]:mt-[40px] max-[500px]:mt-[20px] rounded-[15px]"
                />
              </SwiperSlide>
            ))}
        </Swiper>)}

      </div>

      {/* Comments */}
      {product && <Coments newsId={product._id} />}

      {/* Newsletter Section */}
      <div className="bg-[#070b2391] flex justify-center w-[100%] h-[700px]">
        <div className="my-[70px] min-[500px]:w-[1400px] max-[500px]:w-[360px] mx-[8%] h-[580px] rounded-[10px] bg-gradient-to-br from-red-900/20 via-black to-amber-900/20 border border-red-900/30 flex flex-col items-center relative overflow-hidden">
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-amber-600/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 w-full flex flex-col items-center">
            {/* Title */}
            <h2 className="text-amber-50 mx-[20px] font-extrabold text-center mt-[14%] min-[500px]:text-[30px] max-[500px]:text-[22px]">
              Leave your email address to receive news and updates
            </h2>

            {/* Form */}
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

            {/* Status */}
            {status && (
              <p className="text-center text-amber-50 mt-6 text-sm">
                {status}
              </p>
            )}

            {/* Footer Nav */}
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