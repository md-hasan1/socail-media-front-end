/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSendMailMutation } from "@/redux/features/api/userApi";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { IoIosPin } from "react-icons/io";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { toast } from "sonner";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [sendMail, { isLoading }] = useSendMailMutation();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await sendMail(formData);
    if (res.data.success) {
      toast.success("Message sent successfully!", {
        position: "top-right", // Specify the position
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <main className="py-20">
      <div className="container mb-12">
        <h2 className="text-4xl font-bold text-title leading-[120%] mb-4">
          Get in Touch
        </h2>
        <p className="text-lg leading-[160%] text-gray-600 font-normal lg:w-[50%]">
          Drop us a message using the contact form below and we&apos;ll get back
          to you within 24 hours (Monday-Friday)
        </p>
      </div>
      <section className="flex lg:items-center lg:flex-row flex-col container gap-10 lg:gap-[127px]">
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter Phone *
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md"
                  placeholder="Enter Phone"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md"
                placeholder="Enter Email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-md"
                rows={4}
                placeholder="Write a message..."
              ></textarea>
            </div>
            <button
              disabled={isLoading} // Fixed the typo: "disablE" to "disabled"
              type="submit"
              className="bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900 w-full"
            >
              SUBMIT NOW
            </button>
          </form>
        </div>
        <div className="lg:w-[30%]">
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-title">
              Contact Information
            </h3>
            <p className="text-lg text-gray-600 leading-[160%]">
              Say something to start a live chat!
            </p>
          </div>
          <ul className="space-y-8">
            <li className="flex items-center gap-6 text-gray-600">
              <span>
                <MdOutlinePhoneInTalk className="text-2xl text-gray-800" />
              </span>
              (316) 555-0116
            </li>
            <li className="flex items-center gap-6 text-gray-600">
              <span>
                <FaEnvelope className="text-2xl text-gray-800" />
              </span>
              deanna.curtis@example.com
            </li>
            <li className="flex items-center gap-6 text-gray-600">
              <span>
                <IoIosPin className="text-2xl text-gray-800" />
              </span>
              132 Dartmouth Street Boston, Massachusetts 02156 United States
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Contact;
