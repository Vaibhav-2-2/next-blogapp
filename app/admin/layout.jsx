"use client";

import { asserts } from "@/assets/assets";
import Sidebar from "@/components/AdminComponents/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <ToastContainer theme="dark"/>
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center w-full h-[120px] px-12 border-b border-black bg-white shadow-sm">
          <h3 className="text-2xl font-bold">Admin Panel</h3>
          <Image
            src={asserts.geto}
            width={80}  // Increased size of image
            height={80} // Increased size of image
            alt="Author Image"
            className="rounded-full"
          />
        </div>
        <div className="flex-1 p-6 bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
}
