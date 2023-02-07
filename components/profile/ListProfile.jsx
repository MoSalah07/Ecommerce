import React from "react";

function ListProfile({ setChoice, choice }) {
  const profileNavList = [
    "profile",
    "personal information",
    "orders",
    "notifications",
    "privacy",
  ];

  return (
    <nav className="md:col-span-1 flex-1 bg-gray-100 w-full">
      <ul className="flex md:flex-col justify-center capitalize ">
        {profileNavList.map((item, idx) => {
          return (
            <li
              key={idx}
              onClick={(e) => setChoice(e.target.textContent)}
              className={`bg-gray-100 font-[400] text-md   cursor-pointer text-black p-5 md:border-b md:border-gray-500 ${
                choice !== item && "hover:bg-gray-200 transition-colors"
              } ${choice == item && 'bg-gray-600 text-gray-50'}`}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default ListProfile;
