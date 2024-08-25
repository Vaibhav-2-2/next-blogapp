'use client'
import React, { useState, useEffect } from 'react';
import { FaUpload } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Alex Bennett",
        authorImg: "/per1.jpg"
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (e)=>{
      e.preventDefault();
       const formData = new FormData();
       formData.append('image', image);
       formData.append('title', data.title);
       formData.append('description', data.description);
       formData.append('category', data.category);
       formData.append('author', data.author);
       formData.append('author_img', data.authorImg);
       const response = await axios.post('/api/blog',formData);
       if(response.data.success){
        toast.success(response.data.msg)
        setImage(null)
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Alex Bennett",
          authorImg: "/per1.jpg"
      })
       }
       else{
        toast.error(response.data.msg)
       }
    }

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <form onSubmit={onSubmitHandler} className='bg-white p-8 rounded-lg shadow-lg max-w-lg w-full'>
                <h2 className='text-2xl font-bold mb-6'>Add New Blog</h2>

                <label htmlFor="image" className='block'>
                    <p className='text-lg font-semibold mb-2'>Upload Thumbnail</p>
                    <div className="group relative w-full border border-dashed border-gray-300 rounded-lg cursor-pointer transition-colors duration-200">
                        <div className="flex items-center justify-center w-full h-40 group-hover:bg-gray-100 group-hover:border-gray-500 transition-colors duration-200">
                            {image ? (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Thumbnail Preview"
                                    className="w-full h-full object-cover rounded-md"
                                />
                            ) : (
                                <FaUpload
                                    className="text-gray-700 group-hover:text-blue-500 transition-colors duration-200"
                                    size={50}
                                />
                            )}
                        </div>
                        <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            id='image'
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            required
                        />
                    </div>
                </label>

                <label htmlFor="title" className='block mt-6'>
                    <p className='text-lg font-semibold mb-2'>Blog Title</p>
                    <input name="title" onChange={onChangeHandler} value={data.title}
                        id="title"
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
                        type="text"
                        placeholder='Type here'
                        required
                    />
                </label>

                <label htmlFor="description" className='block mt-6'>
                    <p className='text-lg font-semibold mb-2'>Blog Description</p>
                    <textarea name="description" onChange={onChangeHandler} value={data.description}
                        id="description"
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
                        placeholder='Write content here'
                        rows={7}
                        required
                    />
                </label>

                <label htmlFor="category" className='block mt-6'>
                    <p className='text-lg font-semibold mb-2'>Blog Category</p>
                    <select
                        id="category"
                        name="category" onChange={onChangeHandler} value={data.category}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
                    >
                        <option value="Startup">Startup</option>
                        <option value="Technology">Technology</option>
                        <option value="Lifestyle">Lifestyle</option>
                    </select>
                </label>

                <button
                    type='submit'
                    className='mt-8 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
                >
                    Add Blog
                </button>
            </form>
        </div>
    );
}

export default Page;
