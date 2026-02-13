'use client'
import React, { useState, useEffect } from 'react' 
import { useParams } from 'next/navigation'
import Image from "next/image";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState({ imgnarad: [] });

    useEffect(() => {
      if (!id) return;
      fetch(`https://grgrg4ee.onrender.com/kino/kinge/${id}`)
        .then(res => res.json())
        .then(data => setProduct(Array.isArray(data) ? data[0] : data))
        .catch(err => console.error(err));
    }, [id]);

  return (
    <div className="flex gap-[10px] justify-center flex-wrap">
     
      {product.imgnarad.map((item, index) => (
        <div
          key={index}
          className="w-[347px] h-[160px] rounded-[16px] bg-[rgba(239,243,255,0.3)] p-2 pl-[30px] flex items-center gap-7"
        >
          <Image
            src={`https://grgrg4ee.onrender.com/kino${item.imgramat}`}
            width={55}
            height={100}
            alt={`Product image ${index + 1}`}
            className="rounded-md object-fill"
          />
        <div>
            <div className="text-white text-[18px] font-semibold">
            {item.kybocname} 
          </div>
             <div className="text-[rgba(242,246,15,1)] text-[16px] font-semibold">
            {item.namenagrad} 
          </div>
             <div className="text-[rgba(255,255,255,0.7)] text-[14px] font-semibold">
            {item.year}
          </div>
        </div>
        </div>
      ))}
    </div>
  );
}