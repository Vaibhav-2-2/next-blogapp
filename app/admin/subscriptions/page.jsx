"use client"

import SubsTableItem from "@/components/AdminComponents/SubsTableItem";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    try {
      const response = await axios.get("/api/email");
      if (response.data.success) {
        setEmails(response.data.emails);
      } else {
        console.error("Failed to fetch emails:", response.data.msg);
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const deleteEmail = async (mongoId) => {
    try {
      const response = await axios.delete('/api/email', {
        params: { id: mongoId }
      });
      toast.success(response.data.msg);
      fetchEmails();
    } catch (error) {
      console.error("Error deleting email:", error);
      toast.error("Failed to delete email.");
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="flex-1 p-5 sm:pl-16 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">All Subscribers</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="relative max-w-[800px] h-[80vh] overflow-x-auto border-t border-gray-200 scrollbar-hide">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Subscribers</th>
                <th scope="col" className="hidden sm:table-cell px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Remove</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((item, index) => (
                <SubsTableItem
                  key={index}
                  email={item.email}
                  mongoId={item._id}
                  date={item.createdAt}
                  deleteEmail={deleteEmail}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
