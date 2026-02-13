'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'plyr-react/plyr.css';
import Licos from './Licos'

const Plyr = dynamic(() => import('plyr-react'), { ssr: false });

export default function Kino({}) {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    fetch(`https://grgrg4ee.onrender.com/kino/kinge/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <section id="movies">
    <div key={product._id}>
      <h2 className="text-[50px] mb-[60px] rubik-distressed-regular text-amber-50">
        Movie: {product.name}
      </h2>
      
 <Plyr
  source={{
    type: 'video',
    poster: `https://grgrg4ee.onrender.com/kino${product.img}`,
    sources: [
      {
        src: `https://grgrg4ee.onrender.com/kino${product.video480}`,
        type: 'video/mp4',
        size: 480,
      },
      {
        src: `https://grgrg4ee.onrender.com/kino${product.video720}`,
        type: 'video/mp4',
        size: 720,
      },
      {
        src: `https://grgrg4ee.onrender.com/kino${product.video1080}`,
        type: 'video/mp4',
        size: 1080,
      },
    ],
  }}
  options={{
    autoplay: false,
    settings: ['quality', 'speed', 'loop'],
    quality: {
      default: 720,
      options: [480, 720, 1080],
      forced: true,
    },
  }}
/>

    <div className='flex justify-between  '>
        <h2 className="text-[40px] mt-[80px] mb-[60px] rubik-distressed-regular text-amber-50">
        {product.name}
      </h2>
       <Licos idconos={product._id} />
    </div>
    </div>
</section>
  );
}
