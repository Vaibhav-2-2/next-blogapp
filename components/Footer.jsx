import React from "react";
import Image from "next/image";
import { asserts } from "@/assets/assets";
import {
  FaGithub,
  FaLinkedin,
  FaReddit,
  FaDiscord,
  FaGoogle,
} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center">
      <Image
        src={asserts.logo}
        width={50}
        height={50}
        alt="Footer Image"
        className="rounded-full object-cover"
      />
      <div className="flex gap-4">
        <Link
          href="https://github.com"
          className="text-gray-700 hover:text-white transition-colors"
        >
          <FaGithub size={24} />
        </Link>
        <Link
          href="https://linkedin.com"
          className="text-gray-700 hover:text-blue-700 transition-colors"
        >
          <FaLinkedin size={24} />
        </Link>
        <Link
          href="https://reddit.com"
          className="text-gray-700 hover:text-red-600 transition-colors"
        >
          <FaReddit size={24} />
        </Link>
        <Link
          href="https://discord.com"
          className="text-gray-700 hover:text-indigo-500 transition-colors"
        >
          <FaDiscord size={24} />
        </Link>
        <Link
          href="https://google.com"
          className="text-gray-700 hover:text-blue-500 transition-colors"
        >
          <FaGoogle size={22} />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
