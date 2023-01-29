import React from 'react'

export default function Button(props) {
  return <button
    className={`text-black transition duration-150 ease-in-out rounded items-center font-bold focus:outline-none
      border-2  inline-block align-baseline text-sm py-2 px-3 mx-auto
      ${props.disabled ? "cursor-not-allowed bg-gray-500 border-red-900" : "border-gray-600 cursor-pointer bg-green-500 hover:bg-green-300 hover:border-white"}`}
  >
    {props.children}
  </button>;
}

