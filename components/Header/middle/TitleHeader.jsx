import React from "react";
import Links from "../../icons/Links";

function TitleHeader() {
  return (
    <div className="basis-[25%]">
      <Links>
        <h2 className="text-4xl text-blue-500 font-bold">
          xe-<span className="text-black">mart</span>
        </h2>
      </Links>
    </div>
  );
}

export default TitleHeader;
