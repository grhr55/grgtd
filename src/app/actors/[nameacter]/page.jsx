'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from "next/image";

export default function ActorP() {
  const { nameacter } = useParams()
  const [actor, setActor] = useState(null)
  const [fynts, setfynts] = useState(true);

  useEffect(() => {
    if (!nameacter) return

    fetch(`https://frfrf-2zok.onrender.com/kino/actor/${(nameacter)}`)
      .then(res => res.json())
      .then(setActor)
      .catch(console.error)
  }, [nameacter])
  console.log("actor:", actor);
   useEffect(() => {
    if (!nameacter) return

    fetch(`https://frfrf-2zok.onrender.com/kino/actors/${(nameacter)}`)
      .then(res => res.json())
      .then(setActor)
      .catch(console.error)
  }, [nameacter])
  console.log("actor:", actor);


    if (!actor) return <div className="flex flex-col mt-[400px] items-center justify-center min-h-[200px] gap-4">
  <div className="w-30 h-30 rounded-full border-4 border-zinc-700 border-t-amber-400 animate-spin"></div>
  <span className="text-amber-400 tracking-widest text-[30px] animate-pulse">
    LOADING...
  </span>
</div>

  return (
  <div>
    
     <div className="group w-[100%]  h-[100%]   relative ">
      
      <div className="w-full z-0   h-[1000px]  bg-cover "
>

      

           
        <div  className="grind bg-[#333333eb]  w-[100%] h-[1200px]  z-10 "
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

        <div className='flex gap-[100px] justify-center'>
           <Image
    src={`https://frfrf-2zok.onrender.com/kino${actor.imgacter}`}
    width={400}
    height={600}
    alt={actor.nameacter}
    className="w-[400px]  rounded-[20px] h-[600px] "
  />
  <div>
 <nav className="flex   gap-2 text-sm text-[rgba(79,91,124,1)]">
  <a href="/" className="hover:underline text-[20px] text-[#e9e9e9bf]">Home</a>
  <span className="text-gray-400 mt-[4px]">›</span>
  <a href="/actors" className="hover:underline text-[20px] text-[#e9e9e9bf]">Actors</a>
  <span className="text-gray-400 mt-[4px]">›</span>
  <span className="text-amber-50 text-[20px] font-medium">{actor.nameacter}</span>
</nav>
    <h1 className="text-[50px] rubik-distressed-regular text-amber-50">{actor.nameacter}</h1>
    <h2 className="text-[25px] text-amber-50">Information</h2>
    <div className='flex  pt-[10px] gap-[20px]'>




<div className="flex gap-3">
  {actor && (
    <>
      {/* Facebook */}
      {actor.faisbokactor && (
        <a
          key={`${actor._id}-facebook`}
          href={`https://${actor.faisbokactor}`}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform transform hover:scale-110 hover:shadow-lg"
        >
          <Image
            src="/img/images.png"
            width={45}
            height={45}
            alt={actor.nameacter || "Facebook"}
            className="w-11 h-11 rounded-full object-cover shadow-md"
          />
        </a>
      )}

      {/* Instagram */}
      {actor.instagramactor && (
        <a
          key={`${actor._id}-instagram`}
          href={`https://${actor.instagramactor}`}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform transform hover:scale-110 hover:shadow-lg"
        >
          <Image
            src="/img/images__7_-removebg-preview.png"
            width={45}
            height={45}
            alt={actor.nameacter || "Instagram"}
            className="w-11 h-11 rounded-full object-cover shadow-md"
          />
        </a>
      )}

      {/* Twitter */}
      {actor.twitteractor && (
        <a
          key={`${actor._id}-twitter`}
          href={`https://${actor.twitteractor}`}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform transform hover:scale-110 hover:shadow-lg"
        >
          <Image
            src="/img/qirtkPIYHfGLbtL9GgcAVdIBpROsEdcKxBa.png"
            width={45}
            height={45}
            alt={actor.nameacter || "Twitter"}
            className="w-11 h-11 rounded-full object-cover shadow-md"
          />
        </a>
      )}
    </>
  )}
</div>









    </div>
    
    <div>
     
      <h2 className="text-[19px] mt-[15px]  text-amber-50 ">Height :<span className="text-amber-300   pl-[70px]"> {actor.actorost}м</span></h2>
      <h2 className="text-[19px] mt-[15px]  text-amber-50 ">Date of birth :<span className="text-amber-300   pl-[25px]"> {actor.datarodactor}</span></h2>
       <h2 className="text-[19px] mt-[15px] text-amber-50 ">Place of birth :<span className="text-amber-300   pl-[22px]"> {actor.Actorgeo}</span></h2>
    </div>
  </div>

        

        </div>


            <div className="flex pt-[80px] gap-[10px] justify-center flex-wrap">
             
           
                <div
                  
                  className="w-[347px] h-[160px] rounded-[16px] bg-[rgba(54,87,203,0.3)] p-2 pl-[30px] flex items-center gap-7"
                >
                  <Image
                    src={`https://frfrf-2zok.onrender.com/kino${actor.nagradimg}`}
                    width={55}
                    height={100}
                    alt={'frfrf'}
                    className="rounded-md  object-fill"
                  />
                <div>
                    <div className="text-white text-[18px] font-semibold">
                    {actor.actorkybocname} 
                  </div>
                     <div className="text-[rgba(242,246,15,1)] text-[16px] font-semibold">
                    {actor.actornamenagrad} 
                  </div>
                     <div className="text-[rgba(255,255,255,0.7)] text-[14px] font-semibold">
                    {actor.nagradyear}
                  </div>
                </div>
                </div>
         
            </div>


          





        

    
   

        </div>
      

        
        
    

      </div>
      

    
    </div>
   
  </div>

  )
}