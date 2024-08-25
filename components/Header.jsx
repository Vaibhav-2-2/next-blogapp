import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { asserts } from "@/assets/assets";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Header() {

  const [email,setEmail] = useState("")
  const onSubmitHandler = async (e) =>{
    e.preventDefault()
    // API call to subscribe email
    const formData = new FormData()
    formData.append("email",email)
    const response = await axios.post('/api/email',formData);
      if(response.data.success){
        toast.success(response.data.msg);
        setEmail("")
      }
      else{
        toast.error("Error")
      }
    console.log("Email Subscribed: ", email)
    
  }

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28 bg-gray-700 text-white">
      <div className="flex justify-between items-center">
        <Image
          src={asserts.logo}
          width={40}
          height={40}
          alt="Logo"
          className="w-10 h-10 rounded-full sm:w-auto"
        />
        
        <Link
          href='./admin'
          className="flex items-center gap-2 text-sm py-2 px-4 border border-none bg-blue-600 text-white hover:bg-blue-700 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md shadow-md active:scale-95"
        >
          Get started
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </Link>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-sm sm:text-base">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
          inventore ad sunt repellat eos temporibus sed molestias consequatur
          omnis error
        </p>
        <form
          onSubmit={onSubmitHandler}
          action=""
          className="flex items-center max-w-[500px] mx-auto mt-10 rounded-md shadow-md border-none"
        >
          <input 
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="flex-1 h-12 px-4 rounded-l-md outline-none focus:ring-1 focus:ring-gray-500 transition-colors duration-300 ease-in-out text-gray-800"
          />
          <button className="flex items-center justify-center gap-2 h-12 px-4 bg-blue-600 text-white hover:bg-blue-700 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-r-md shadow-md active:scale-95">
            Subscribe
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Header;