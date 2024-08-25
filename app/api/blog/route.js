import { ConnectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import BlogModel from "@/lib/models/BlogModel";


const fs = require('fs')
// Connect to the database
const LoadDB = async () => {
  try {
    await ConnectDB();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};

LoadDB();

// API endpoint to get all blogs or a specific blog by ID
// API endpoint to get all blogs or a specific blog by ID
export async function GET(request) {
  try {
    const blogId = request.nextUrl.searchParams.get('id');
    if (blogId) {
      // Fetch a specific blog by ID
      const blog = await BlogModel.findById(blogId);
      if (blog) {
        return NextResponse.json(blog);
      } else {
        return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
      }
    } else {
      // Fetch all blogs
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (error) {
    console.error('Error in GET request:', error);
    return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
  }
}


// API endpoint for uploading blogs
export async function POST(request) {
  try {
    const formData = await request.formData();

    // Debugging: Log form data to check if 'image' is present
    console.log('FormData keys:', [...formData.keys()]);

    const image = formData.get('image');

    if (!image) {
      console.error('Image not found in formData');
      return NextResponse.json({ success: false, msg: "Image not provided" }, { status: 400 });
    }

    // Check if image is a valid object with arrayBuffer method
    if (typeof image.arrayBuffer !== 'function') {
      console.error('Image is not a valid file object');
      return NextResponse.json({ success: false, msg: "Image not valid" }, { status: 400 });
    }

    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const timestamp = Date.now();
    const path = `./public/${timestamp}_${image.name}`;

    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    const title = formData.get('title')?.toString();
    const description = formData.get('description')?.toString();
    const category = formData.get('category')?.toString();
    const author = formData.get('author')?.toString();
    const author_img = formData.get('author_img')?.toString();

    if (!title || !description || !category || !author || !author_img) {
      return NextResponse.json({ success: false, msg: "Missing required fields" }, { status: 400 });
    }

    const blogData = {
      title,
      description,
      category,
      author,
      author_img,
      image: imgUrl,
    };

    await BlogModel.create(blogData);
    console.log("Blog saved");

    return NextResponse.json({ success: true, msg: "Blog added" });
  } catch (error) {
    console.error('Error in POST request:', error);
    return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
  }
}

// API endpoint to handle DELETE request
export async function DELETE(request) {
  try {
    const blogId = request.nextUrl.searchParams.get('id');
    
    if (!blogId) {
      return NextResponse.json({ success: false, msg: "Blog ID is required" }, { status: 400 });
    }

    const result = await BlogModel.findByIdAndDelete(blogId);

    if (result) {
      return NextResponse.json({ success: true, msg: "Blog deleted" });
    } else {
      return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
    }
  } catch (error) {
    console.error('Error in DELETE request:', error);
    return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
  }
}
