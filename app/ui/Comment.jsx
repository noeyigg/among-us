const Comment = ({ time, content }) => {
  return (
    <div className="mb-4 border-b border-b-gray-200 py-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold">익명</span>
        <span className="text-gray-500 text-sm">{time}</span>
      </div>
      <p className="text-gray-800 mt-3">{content}</p>
    </div>
  );
};

export default Comment;
