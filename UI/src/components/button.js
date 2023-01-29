import React from 'react'

export default function Button(props) {
  return <button onClick={props.onClick}
    className={`text-white transition duration-300 ease-in-out rounded-xl items-center font-bold focus:outline-none
      border-2 inline-block align-baseline text-sm py-2 px-3 mx-auto
      ${props.disabled ? "cursor-not-allowed bg-gray-500 border-gray-500 text-gray-700" : "cursor-pointer border-blue-500 bg-blue-500 hover:bg-blue-900 hover:border-white"}`}
  >
    {props.children}
  </button>;
}

