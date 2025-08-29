'use client';

import useSWR from 'swr';
import { useAuth } from '../context/AuthContext';
import Comment from './Comment';

const fetcher = (url) => fetch(url, { cache: 'no-store' }).then(r => r.json());

export default function CommentsClient({ postId }) {
  const { user } = useAuth();
  const viewerId = user?.id;

  // 훅 순서 고정: useSWR는 항상 호출. viewerId 없으면 key=null로 비활성화
  const key = viewerId ? `/api/${postId}?viewerId=${viewerId}` : null;
  const { data, isLoading, error, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: true,
  });

  // 로그인 안 한 경우 UI만 다르게 렌더 (훅은 이미 호출됨)
  if (!viewerId) {
    return (
      <div className="text-gray-500 text-center py-8">
        댓글을 보려면 로그인해주세요.
      </div>
    );
  }

  if (isLoading) return <div className="text-center py-4">댓글을 불러오는 중...</div>;
  if (error)     return <div className="text-red-500 text-center py-4">댓글을 불러오는데 실패했습니다.</div>;

  const comments = data?.comments ?? [];
  const isPresenter = data?.isPresenter ?? false;

  // --- 실제 수정/삭제 API 호출 ---
  const updateComment = async (commentId, content) => {
    const res = await fetch(`/api/${postId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'comment',
        commentId,
        content,
        authorId: viewerId,
      }),
    });
    if (!res.ok) {
      const { error } = await res.json().catch(() => ({ error: '수정 실패' }));
      alert(error || '수정 실패');
      return false;
    }
    await mutate(); // 목록 갱신
    return true;
  };

  const deleteComment = async (commentId) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) return;
    const res = await fetch(`/api/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'comment',
        commentId,
        authorId: viewerId,
      }),
    });
    if (!res.ok) {
      const { error } = await res.json().catch(() => ({ error: '삭제 실패' }));
      alert(error || '삭제 실패');
      return;
    }
    await mutate();
  };

  return (
    <div id="comments">
      {comments.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          {isPresenter ? '아직 댓글이 없습니다.' : '작성한 댓글이 없습니다.'}
        </div>
      ) : (
        comments.map((c) => (
          <Comment
            key={c.id}
            id={c.id}
            time={c.created_at}
            content={c.content}
            isMine={String(c.author_id) === String(viewerId)}
            onSave={(next) => updateComment(c.id, next)}
            onDelete={() => deleteComment(c.id)}
          />
        ))
      )}
    </div>
  );
}
