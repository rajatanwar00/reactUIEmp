import React from 'react'

function Loader() {
  return (
    // items-center removed
    <div className="flex  items-center justify-center ">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  )
}

export default Loader