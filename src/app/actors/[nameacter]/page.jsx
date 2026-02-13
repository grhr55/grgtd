'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from "next/image";
import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp, FaTimes } from "react-icons/fa";
import { BsInstagram, BsTwitter, BsFacebook } from "react-icons/bs";
import { MdHeight, MdCake, MdLocationOn } from "react-icons/md";

export default function ActorP() {
  const { nameacter } = useParams()
  const [actor, setActor] = useState(null)
  const [fynts, setfynts] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!nameacter) return

    fetch(`https://grgrg4ee.onrender.com/kino/actor/${(nameacter)}`)
      .then(res => res.json())
      .then(setActor)
      .catch(console.error)
  }, [nameacter])

  useEffect(() => {
    if (!nameacter) return

    fetch(`https://grgrg4ee.onrender.com/kino/actors/${(nameacter)}`)
      .then(res => res.json())
      .then(setActor)
      .catch(console.error)
  }, [nameacter])

  if (!actor) return (
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
      
     
 
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02]"></div>
      </div>

      
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

      
     <div className={`sticky top-0 z-40 transition-all duration-500 ${
            isScrolled 
              ? 'bg-[#00000000] backdrop-blur-2xl shadow-2xl border-' 
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




    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
     
        <div className='flex flex-col lg:flex-row gap-10 lg:gap-20 justify-center items-start'>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-amber-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <Image
              src={`https://grgrg4ee.onrender.com/kino${actor.imgacter}`}
              width={400}
              height={600}
              alt={actor.nameacter}
              className="relative w-full lg:w-[400px] rounded-3xl h-auto lg:h-[600px] object-cover shadow-2xl ring-2 ring-white/10"
            />
          </div>

        
          <div className="flex-1 space-y-6">
            
          
            <nav className="flex flex-wrap gap-2 text-sm">
              <a href="/" className="hover:underline text-[20px] text-gray-500 hover:text-red-500 transition-colors">
                Home
              </a>
              <span className="text-gray-600 mt-[4px]">›</span>
              <a href="/actors" className="hover:underline text-[20px] text-gray-500 hover:text-red-500 transition-colors">
                Actors
              </a>
              <span className="text-gray-600 mt-[4px]">›</span>
              <span className="text-red-500 text-[20px] font-medium">{actor.nameacter}</span>
            </nav>

           
            <h1 className="text-4xl lg:text-6xl rubik-distressed-regular text-amber-50 font-black bg-gradient-to-r from-amber-50 via-amber-100 to-amber-200 bg-clip-text text-transparent">
              {actor.nameacter}
            </h1>

           
            <h2 className="text-2xl lg:text-3xl text-amber-50 font-bold">Information</h2>

            <div className='flex gap-4'>
              {actor.faisbokactor && (
                <a
                  href={`https://${actor.faisbokactor}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                    <BsFacebook className="text-white text-xl" />
                  </div>
                </a>
              )}

              {actor.instagramactor && (
                <a
                  href={`https://${actor.instagramactor}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-pink-600 via-purple-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                    <BsInstagram className="text-white text-xl" />
                  </div>
                </a>
              )}

              {actor.twitteractor && (
                <a
                  href={`https://${actor.twitteractor}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 to-sky-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-sky-600 to-sky-800 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                    <BsTwitter className="text-white text-xl" />
                  </div>
                </a>
              )}
            </div>

            {/* Actor Details */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center">
                  <MdHeight className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Height</h3>
                  <p className="text-amber-300 text-xl font-semibold">{actor.actorost}м</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center">
                  <MdCake className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Date of birth</h3>
                  <p className="text-amber-300 text-xl font-semibold">{actor.datarodactor}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center">
                  <MdLocationOn className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Place of birth</h3>
                  <p className="text-amber-300 text-xl font-semibold">{actor.Actorgeo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex pt-20 gap-6 justify-center flex-wrap">
          <div className="group relative w-full max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-amber-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative w-full h-auto rounded-2xl bg-gradient-to-br from-red-950/30 via-amber-950/20 to-red-950/30 border border-red-900/30 p-6 flex items-center gap-6">
              <div className="relative flex-shrink-0">
                <Image
                  src={`https://grgrg4ee.onrender.com/kino${actor.nagradimg}`}
                  width={80}
                  height={140}
                  alt={actor.actornamenagrad}
                  className="rounded-xl object-cover shadow-xl"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="text-white text-xl font-bold">
                  {actor.actorkybocname}
                </div>
                <div className="text-amber-400 text-lg font-semibold">
                  {actor.actornamenagrad}
                </div>
                <div className="text-gray-400 text-base font-medium">
                  {actor.nagradyear}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}