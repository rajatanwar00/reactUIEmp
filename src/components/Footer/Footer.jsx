import React from "react";

export default function Footer(){

    return (
        <footer className="  w-full  bg-orange-500">
            <div className="p-3 w-full">
                <p className="text-xl p-2">Contact Us</p>
                <div className="p-2">
                    <input type="text" className="h-20 w-2/4 bg-gray-100"></input>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 ">Submit</button>
            </div>
            
        </footer>
    )
}