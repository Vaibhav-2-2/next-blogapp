"use client";
import { asserts } from "@/assets/assets";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { blog_data } from "@/assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  FaGithub,
  FaLinkedin,
  FaReddit,
  FaDiscord,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";
import Footer from "@/components/Footer";
import axios from "axios";

const Page = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get("/api/blog", {
        params: { id: params.id },
      });
      console.log("Fetched blog data:", response.data); // Debugging line
      setData(response.data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };
  

  useEffect(() => {
    fetchBlogData();
  }, [params.id]);

  return data ? (
    <>
      <div className="bg-gray-300 py-5 px-5 md:px-12 lg:px-28">
        {/* Your existing JSX */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl font-semibold max-w-[700px] mx-auto mb-6">
            {data.title || 'No Title Available'}
          </h1>
  
          <div className="w-[80px] h-[80px] rounded-full overflow-hidden mx-auto mb-4">
            <Image
              src={data.author_img || '/default-author-image.jpg'} // Fallback image
              alt="Author Image"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <p className="text-gray-700 text-lg max-w-[740px] mx-auto mb-6">
            {data.author || 'No Author Available'}
          </p>
        </div>
  
        <div className="relative max-w-[800px] mx-auto">
          <Image
            src={data.image || '/default-blog-image.jpg'} // Fallback image
            width={1280}
            height={720}
            alt="Blog Image"
            className="w-full h-auto rounded-md"
          />
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: data.description || 'No Description Available' }}></div>
  
          {/* Social media sharing and footer */}
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <div>Loading...</div>
  );
} 

export default Page;
