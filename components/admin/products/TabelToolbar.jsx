import React, { useState } from "react";
import PopUpProduct from "./PopUpProduct";

function TabelToolbar({ title = "", titleBtn = "", setShowPopup }) {


  return (
    <div>
      <div className="bg-gray-100 px-6 py-10 rounded-lg flex justify-between items-center capitalize">
        <h1 className="text-lg font-bold text-gray-600">{title}</h1>
        <button
          onClick={() => setShowPopup(true)}
          className={`bg-blue-500 block min-w-[120px] h-[35px] text-white text-sm 
        font-bold hover:scale-105 transition-transform rounded-md`}
        >{`Add ${titleBtn}`}</button>
      </div>
    </div>
  );
}

export default TabelToolbar;
