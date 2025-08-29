'use client';

// app/ui/Comment.jsx
import { useState } from 'react';

const Comment = ({ id, time, content, isMine, onSave, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [next, setNext] = useState(content);

  const formatTime = (timeString) => {
    try {
      const date = new Date(timeString);
      return date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return timeString;
    }
  };

  return (
    <div className="mb-4 border-b border-b-gray-200 py-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold">익명</span>
        <span className="text-gray-500 text-sm">{formatTime(time)}</span>

        {isMine && !editing && (
          <div className="ml-auto flex gap-2">
            <button className="text-blue-600 hover:underline" onClick={() => setEditing(true)}>
              수정
            </button>
            <button className="text-red-600 hover:underline" onClick={onDelete}>
              삭제
            </button>
          </div>
        )}
      </div>

      {!editing ? (
        <p className="text-gray-800 mt-3 whitespace-pre-wrap">{content}</p>
      ) : (
        <div className="mt-2 flex gap-2">
          <textarea
            className="flex-grow p-2 border rounded"
            value={next}
            onChange={(e) => setNext(e.target.value)}
          />
          <button
            className="px-3 py-2 bg-blue-600 text-white rounded"
            onClick={async () => {
              const ok = await onSave(next);
              if (ok) setEditing(false);
            }}
          >
            저장
          </button>
          <button
            className="px-3 py-2 bg-gray-200 rounded"
            onClick={() => {
              setNext(content);
              setEditing(false);
            }}
          >
            취소
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
