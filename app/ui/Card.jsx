import React from "react";

// 대시보드에 렌더링 할 카드
const Card = ({ children }) => {
  return (
    <div className="border border-gray-300 shadow-md rounded-lg p-4 m-2 hover:bg-white hover:bg-opacity-70 transition-colors duration-200">
      {children}
    </div>
  );
};

export default Card;
