'use client';
import Image from 'next/image';
import {useEffect,useState} from 'react';
import {readImage} from '@/lib/storage';

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
};

const CATALOGUE_SIZES = '(max-width: 520px) calc(100vw - 36px), (max-width: 850px) calc(50vw - 30px), 400px';

export function StoredImage({src,alt,sizes=CATALOGUE_SIZES,priority=false,fill=true,width,height,className}:Props){
  const isStored=src.startsWith('idb:');
  const [resolved,setResolved]=useState(isStored?'':src);

  useEffect(()=>{
    if(!isStored){setResolved(src);return}
    let active=true;
    let objectUrl='';
    readImage(src).then(value=>{if(active){objectUrl=value;setResolved(value)}});
    return()=>{active=false;if(objectUrl.startsWith('blob:'))URL.revokeObjectURL(objectUrl)};
  },[src,isStored]);

  // Uploaded images live in IndexedDB as blobs, so they bypass the optimizer.
  if(isStored){
    return <img
      src={resolved||undefined}
      alt={resolved?alt:''}
      className={className}
      loading={priority?'eager':'lazy'}
      decoding="async"
      style={fill?{width:'100%',height:'100%',objectFit:'cover'}:{width,height,objectFit:'cover'}}
    />;
  }

  return <Image
    src={src}
    alt={alt}
    className={className}
    fill={fill}
    width={fill?undefined:width}
    height={fill?undefined:height}
    sizes={sizes}
    priority={priority}
    loading={priority?undefined:'lazy'}
    quality={82}
  />;
}
