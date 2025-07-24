import React from "react";
import Card from "./Card";

const CardList = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Card key={post.id} postId={post.id}>
            <p className="text-sm text-gray-600 font-semibold ">{post.presenter_id}</p>
            <p className="text-sm text-gray-600">{post.topic}</p>     
            {/* 피드백개수    */}
            {/* <p className="text-sm text-gray-600">{post.topic}개</p>         */}
        </Card>
      ))}
    </div>
  );
};

export default CardList;
