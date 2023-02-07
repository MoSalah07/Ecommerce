import React from "react";
import axios from "axios";
import { useState, useRef } from "react";

function Privacy() {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const messageRef = useRef(null);
  const getValues = (e) =>
    setPassword({ ...password, [e.target.name]: e.target.value });

  const { currentPassword, newPassword } = password;

  const sendPasswordToDb = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/changePassword", {
        currentPassword,
        newPassword,
      });
      setMessage(data.message);
      setPassword({ currentPassword: "", newPassword: "" });
    } catch (err) {
      console.log(err.response.data.message);
    }
    // After 3000 Delete Message
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid grid-cols-1 md:gap-4">
        <div className="md:col-span-2 space-y-6 bg-gray-100  px-4 py-5 sm:p-6 capitalize">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              privacy
            </h3>
            <p className="mt-2 text-sm text-gray-600 md:w-[50%]">
              do not share this information with other people so be careful what
              you share
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={sendPasswordToDb}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="capitalize">
                    <label
                      htmlFor="company-website"
                      className="block text-sm font-medium text-gray-700 mb-4"
                    >
                      current password
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm border py-2 ">
                      <input
                        type="password"
                        name="currentPassword"
                        id="current-password"
                        className="pl-3 outline-none block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={getValues}
                        autoComplete="true"
                        value={currentPassword}
                      />
                    </div>
                  </div>
                  <div className="capitalize">
                    <label
                      htmlFor="company-website"
                      className="block text-sm font-medium text-gray-700 mb-4"
                    >
                      new password
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm border py-2 ">
                      <input
                        type="password"
                        name="newPassword"
                        id="new-password"
                        className="pl-3 outline-none block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={getValues}
                        autoComplete="true"
                        value={newPassword}
                      />
                    </div>
                  </div>
                </div>
                {/* Message */}
                <div ref={messageRef}>
                  {message.includes("invalid") ? (
                    <h3 className="text-red-500 capitalize font-semibold text-sm">
                      {message}
                    </h3>
                  ) : (
                    <h3 className="text-green-300 capitalize font-semibold text-sm">
                      {message}
                    </h3>
                  )}
                </div>
                {/* Button */}
                <div className="py-4">
                  <button className=" tracking-wide capitalize flex ml-auto py-1 px-2 rounded-lg bg-indigo-700 transition-colors hover:bg-indigo-500 text-white text-md">
                    save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
