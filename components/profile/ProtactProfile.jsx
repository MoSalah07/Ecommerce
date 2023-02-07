import React from "react";

function ProtactProfile({setShowProtect, setInputProtect,  inputProtect, handlerFormProtect}) {
    const handlerCloseList = (e) => {
        if (e.target.tagName === 'DIV' ) {
            setShowProtect( false );
            setInputProtect('')
            return;
        }
    }



  return (
    <div onClick={handlerCloseList} className="absolute left-0 top-0  w-full min-h-[115vh] bg-gray-800 opacity-40 flex items-center justify-center">
      <form onSubmit={handlerFormProtect} className="h-[150px] bg-slate-500 w-[70%] md:w-[35%] flex items-center justify-center flex-col gap-3 rounded-lg capitalize">
        <h3 className=" text-gray-50">enter your password</h3>
              <input onChange={(e) => setInputProtect(e.target.value)} value={inputProtect} className="py-1 px-2 outline-none" type="password" />
              <button className="text-gray-50 capitalize border px-[6px] py-[4px]">submit</button>
      </form>
    </div>
  );
}

export default ProtactProfile;
