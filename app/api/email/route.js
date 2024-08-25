import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    console.log('Connecting to DB...');
    await ConnectDB();
    console.log('Connected to DB.');

    const formData = await request.formData();
    const email = formData.get('email');
    console.log('Received email:', email);

    if (!email) {
      console.log('No email provided.');
      return NextResponse.json({ success: false, msg: 'Email is required' }, { status: 400 });
    }

    const existingEmail = await EmailModel.findOne({ email });
    if (existingEmail) {
      console.log('Email already exists.');
      return NextResponse.json({ success: false, msg: 'Email already subscribed' }, { status: 400 });
    }

    await EmailModel.create({ email });
    console.log('Email added to the database.');

    return NextResponse.json({ success: true, msg: 'Email added successfully' });
  } catch (error) {
    console.error('Error in POST /api/email:', error);
    return NextResponse.json({ success: false, msg: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    console.log('Connecting to DB...');
    await ConnectDB();
    console.log('Connected to DB.');

    const emails = await EmailModel.find().sort({ createdAt: -1 });
    console.log('Fetched emails:', emails);

    return NextResponse.json({ success: true, emails });
  } catch (error) {
    console.error('Error in GET /api/email:', error);
    return NextResponse.json({ success: false, msg: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const emailId = request.nextUrl.searchParams.get('id');
    
    if (!emailId) {
      return NextResponse.json({ success: false, msg: "email ID is required" }, { status: 400 });
    }

    const result = await EmailModel.findByIdAndDelete(emailId);

    if (result) {
      return NextResponse.json({ success: true, msg: "Email deleted" });
    } else {
      return NextResponse.json({ success: false, msg: "Email not found" }, { status: 404 });
    }
  } catch (error) {
    console.error('Error in DELETE request:', error);
    return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
  }
}