import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        {["All", "Technology", "Startup", "Lifestyle"].map((item) => (
          <button
            key={item}
            onClick={() => setMenu(item)}
            className={`text-black py-2 px-6 rounded-md font-semibold shadow-md transition-all duration-300 transform 
              ${menu === item
                ? "bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg hover:shadow-xl hover:-translate-y-1"
                : "bg-gray-200 hover:bg-gray-300 shadow-md hover:shadow-lg hover:translate-y-1"}
            `}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blogs
          .filter(item => menu === "All" || item.category === menu)
          .map((item, index) => (
            <BlogItem
              key={index}
              image={item.image}
              id={item._id}
              category={item.category}
              title={item.title}
              description={item.description}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
