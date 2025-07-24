import React from "react";
import Link from 'next/link'

// 대시보드에 렌더링 할 카드
const Card = ({ postId, children }) => {
  // console.log('postId:', postId)
  return (
    <Link href={`/dashboard/${postId}`}>
      <div className="hover:bg-blue-300 min-h-[200px] border border-gray-300 shadow-md rounded-lg p-4 m-2 hover:bg-white hover:bg-opacity-70 transition-colors duration-200">
        {children}
      </div>
   </Link>
  );
};

export default Card;
