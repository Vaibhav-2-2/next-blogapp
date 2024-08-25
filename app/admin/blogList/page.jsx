"use client";

import BlogTableItem from "@/components/AdminComponents/BlogTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Ensure toast notifications are styled

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs || []); // Ensure there's a fallback if `blogs` is undefined
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const deleteBlog = async (mongoId) => {
    try {
      const response = await axios.delete('/api/blog', {
        params: {
          id: mongoId
        }
      });
      toast.success(response.data.msg);
      fetchBlogs();
    } catch (error) {
      toast.error("Failed to delete blog");
      console.error("Error deleting blog:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-6 px-6 sm:pt-12 sm:pl-16 bg-gray-100">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">All Blogs</h1>
      </header>
      <div className="relative h-[80vh] max-w-full overflow-x-auto mt-4 border border-gray-300 rounded-lg shadow-lg bg-white">
        <table className="w-full text-sm text-gray-500 border-separate border-spacing-0">
          <thead className="text-sm text-gray-600 uppercase bg-gray-200 border-b border-gray-300">
            <tr>
              <th scope="col" className="hidden sm:table-cell px-6 py-3 text-left">Author Name</th>
              <th scope="col" className="px-6 py-3 text-left">Blog Title</th>
              <th scope="col" className="px-6 py-3 text-left">Date</th>
              <th scope="col" className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item) => (
              <BlogTableItem
                key={item._id}
                mongoId={item._id}
                title={item.title}
                author_img={item.author_img}
                author={item.author}
                date={item.date}
                deleteBlog={deleteBlog}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
