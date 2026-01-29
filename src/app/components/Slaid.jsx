'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import dynamic from 'next/dynamic';
import 'plyr-react/plyr.css';
import Link from 'next/link';

const Plyr = dynamic(() => import('plyr-react'), {
  ssr: false,
});





export default function Slaid({ products }) {

  
  
  const swiperRef = useRef(null);
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const WithVideo = products.filter(product => product.video);


     const slugify = (text) =>
     text
    .toLowerCase()
    .trim()
    .replace(/[,\s]+/g, '-')      // пробелы и запятые → "-"
    .replace(/-+/g, '-')          // убираем двойные "-"
    .replace(/^-|-$/g, '');       // убираем "-" в начале и конце

  

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        video.muted = false;
        video.currentTime = 0;
        video.play()
      } else {
        video.pause();
        video.muted = true;
      }
      

    });
  }, [activeIndex]);

  const isLoading = !WithVideo || WithVideo.length === 0;


  

  const getVisibleThumbnails = () => {
    const start = Math.max(activeIndex - 2, 0);
    const end = Math.min(start + 4, products.length);
    return products.slice(start, end);
  };

  return (
 <div className="w-full max-w-[89rem] mx-auto px-4 py-6 space-y-8 touch-pan-y">

  <h2 className="min-[500px]:text-[38px] max-[500px]:text-[30px] text-[#789112] text-center mt-[40px] nosifer-regular">
    New trailers
  </h2>

  {isLoading ? (
   
    <div className="animate-pulse bg-[#adacac] rounded-xl w-full min-[500px]:h-[800px] h-[250px]" />
  ) : (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      slidesPerView={1}
      spaceBetween={20}
      pagination={{ clickable: true, type: 'progressbar' }}
      modules={[Pagination]}
      className="rounded-xl"
      resistance
      resistanceRatio={0.6}
      touchRatio={1}
      threshold={5}
      allowTouchMove
      style={{ width: '100%' }}
    >
      {products.map((product, index) => (
        <SwiperSlide key={index} className="video-item">

          <Plyr
            source={{
              type: 'video',
              sources: [
                {
                  src: `https://frfrf-2zok.onrender.com/kino${product.video}`,
                  type: 'video/mp4',
                },
              ],
              poster: `https://frfrf-2zok.onrender.com/kino${product.img}`,
            }}
            options={{ autoplay: false }}
          />

          <div className="flex justify-center">
            <Link
              href={`/kino/${slugify(product.name)}`}
              className="group mt-3 inline-flex items-center gap-2 rounded-xl 
                         bg-gradient-to-r from-[#199500] to-[#000]
                         px-6 py-3 text-[18px] font-semibold text-white
                         shadow-lg transition-all duration-300
                         hover:scale-105 active:scale-95"
            >
              🎬 Watch a movie {product.name} 👈
            </Link>
          </div>

        </SwiperSlide>
      ))}
    </Swiper>
  )}

  <div className="grid min-[700px]:grid-cols-4 max-[700px]:grid-cols-2 gap-6">

    {isLoading
      ? Array.from({ length: 4 }).map((_, i) => (
          
          <div
            key={i}
            className="animate-pulse bg-[#adacac] rounded-[20px]
                       w-full 2xl:h-[400px] xl:h-[400px]
                       lg:h-[300px] md:h-[300px]
                       sm:h-[300px] h-[195px]"
          />
        ))
      : getVisibleThumbnails().map((product, i) => {
          const realIndex = Math.max(activeIndex - 2, 0) + i;
          return (
            <div
              key={realIndex}
              onClick={() => swiperRef.current?.slideTo(realIndex)}
              className={`relative cursor-pointer transition-transform duration-200 ${
                activeIndex === realIndex
                  ? 'scale-100 ring-4 ring-[#26b50c] rounded-[15px]'
                  : 'hover:scale-105'
              }`}
            >
              <video
                src={`https://frfrf-2zok.onrender.com/kino${product.video}`}
                muted
                loop
                poster={`https://frfrf-2zok.onrender.com/kino${product.img}`}
                preload="auto"
                className="w-full 2xl:h-[400px] xl:h-[400px]
                           lg:h-[300px] md:h-[300px]
                           sm:h-[300px] h-[195px]
                           object-fill rounded-[20px]"
              />

              <div className="absolute bottom-1 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                {product.name}
              </div>
            </div>
          );
        })}
  </div>

</div>

  );
}
