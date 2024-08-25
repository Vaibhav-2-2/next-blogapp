import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const BlogItem = ({ image, id, category, title, description }) => {

  return (
    <div className='max-w-[600px] sm:max-w-[500px] bg-white border border-none hover:shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-md overflow-hidden'>
      <div className='relative w-[600px] h-[300px]'>
        <Link href={`/blogs/${id}`}>
        <Image 
          src={image} 
          alt='' 
          layout='fill' 
          objectFit='cover' 
          className='rounded-t-md' 
        />
        </Link>
      </div>
      <p className='ml-5 mt-5 px-1 inline-block bg-black text-white text-sm rounded-[5px]'>{category}</p>
      <div className="p-5">
        <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{title}</h5>
        <p className='mb-3 text-sm tracking-tight text-gray-700' dangerouslySetInnerHTML={{__html:description.slice(0,150)+" "+"......"}}></p>
        <Link href={`/blogs/${id}`} className='inline-flex items-center py-2 font-semibold text-center'>Read More <FontAwesomeIcon icon={faArrowRight} width={12} className='ml-2' /></Link>
      </div>
    </div>
  );
};

export default BlogItem;
