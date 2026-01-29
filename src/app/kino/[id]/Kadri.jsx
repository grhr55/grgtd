'use client'

import React, { useState } from 'react'
import Image from "next/image";
import { products } from '../products';

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";

export default function ProductPage() {
  const [index, setIndex] = useState(-1);
  const [visibleCount, setVisibleCount] = useState(3);

  const slides = products.map((product) => ({
    src: product.img,
    title: product.name,
  }));

  const filteredfilm = 'All' ? products : products.filter((product) => product.year.toLowerCase() === topkinos.toLowerCase());
  return (
    <div className="p-4 md:p-10 min-h-screen ">
      <h2 className="text-4xl md:text-[50px] mb-8 md:mb-[60px] rubik-distressed-regular text-amber-50 text-center md:text-left">
        Stills from the film
      </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className="cursor-pointer "
          >
            <Image
              src={product.img}
              alt={product.name}
              width={400}
              height={300}
              className="object-cover w-[330px] h-[430px]"
            />
          </div>
        ))}
      </div>

              
<div className='flex justify-center mt-[20px]'>
    {visibleCount < filteredfilm.length && (
  <button
    onClick={() => setVisibleCount(prev => prev + 3)}
    className="mt-6 nosifer-regular px-6 py-3 rounded-[10px] bg-white text-blue-700 font-semibold shadow-md hover:bg-blue-100 transition"
  >
    show more
  </button>
)}

</div>
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          scrollToZoom: true
        }}
      />
    </div>
  )
}
