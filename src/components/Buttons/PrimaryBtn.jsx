// components/PrimaryBtn.jsx
"use client"
export default function PrimaryBtn({ onClick, btnText,type,btnClass }) {
    return (
      <button
        onClick={onClick}
        type={type??"button"}
        className={`${btnClass} bg-primary text-white py-2 px-4 rounded-lg shadow-lg hover:scale-105 transition duration-200`}
      >
        {btnText}
      </button>
    );
  }
  