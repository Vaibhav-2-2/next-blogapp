import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { asserts } from "@/assets/assets";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-slate-100 h-screen">
      {/* Logo Link */}
      <Link href="/" passHref>
        <div className="flex items-center justify-center h-[120px] border-b border-gray-300 cursor-pointer">
          <Image
            src={asserts.logo}
            width={60} // Increase width for consistency
            height={60} // Increase height for consistency
            alt="Logo"
            className="rounded-full"
          />
        </div>
      </Link>
      
      {/* Sidebar Links */}
      <div className="flex flex-col items-start p-4 space-y-6">
        <Link href="/admin/addProduct" className="w-full">
          <div className="flex items-center w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-100 transition-transform duration-300 transform hover:-translate-y-1">
            <FontAwesomeIcon icon={faPlus} className="text-blue-600" />
            <p className="ml-3 font-semibold text-gray-800">Add Blog</p>
          </div>
        </Link>
        <Link href="/admin/blogList" className="w-full">
          <div className="flex items-center w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-100 transition-transform duration-300 transform hover:-translate-y-1">
            <FontAwesomeIcon icon={faList} className="text-blue-600" />
            <p className="ml-3 font-semibold text-gray-800">Blog List</p>
          </div>
        </Link>
        <Link href="/admin/subscriptions" className="w-full">
          <div className="flex items-center w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-100 transition-transform duration-300 transform hover:-translate-y-1">
            <FontAwesomeIcon icon={faEnvelope} className="text-blue-600" />
            <p className="ml-3 font-semibold text-gray-800">Subscribers</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
