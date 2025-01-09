// components/SecondaryBtn.jsx
"use client"
export default function SecondaryBtn({ onClick, type ,btnText}) {
    return (
      <button
        onClick={onClick}
        type={type}
        className="bg-gray-100 text-primary py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200 transition duration-200"
      >
        {btnText}
      </button>
    );
  }
  