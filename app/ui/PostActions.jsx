// app/ui/PostActions.jsx
'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function PostActions({ postId, presenterId, initialTopic }) {
    const { user } = useAuth();
    const router = useRouter();
    const [editing, setEditing] = useState(false);
    const [topic, setTopic] = useState(initialTopic);

    const canEdit = useMemo(() => {
        if (!user || presenterId == null) return false;
        return String(user.id) === String(presenterId);
    }, [user, presenterId]);

    if (!user || !canEdit) return null;

    const save = async () => {
        const res = await fetch(`/api/${postId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ kind: 'post', topic, authorId: user.id }),
        });
        if (!res.ok) {
            const { error } = await res.json().catch(() => ({ error: '수정 실패' }));
            alert(error || '수정 실패');
            return;
        }
        setEditing(false);
        router.refresh();
    };

    const remove = async () => {
        if (!confirm('게시글을 삭제하시겠습니까? (댓글도 함께 삭제될 수 있어요)')) return;
        const res = await fetch(`/api/${postId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ kind: 'post', authorId: user.id }),
        });
        if (!res.ok) {
            const { error } = await res.json().catch(() => ({ error: '삭제 실패' }));
            alert(error || '삭제 실패');
            return;
        }
        router.push('/');
    };

    return (
        <div className="mt-3 flex items-center gap-2">
            {!editing ? (
                <>
                    <Button
                        type="button"
                        className="!w-auto !px-4 !py-2 text-sm"
                        onClick={() => setEditing(true)}
                    >
                        게시글 수정
                    </Button>

                    <Button
                        type="button"
                        className="!w-auto !px-4 !py-2 text-sm"
                        onClick={remove}
                    >
                        게시글 삭제
                    </Button>
                </>
            ) : (
                <>
                    <input
                        className="border rounded px-2 py-1 flex-grow"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="게시글 제목을 입력하세요"
                    />
                    <Button
                        type="button"
                        className="!w-auto !px-4 !py-2 text-sm"
                        onClick={save}
                    >
                        저장
                    </Button>
                    <Button
                        type="button"
                        className="!w-auto !px-4 !py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800"
                        onClick={() => { setTopic(initialTopic); setEditing(false); }}
                    >
                        취소
                    </Button>
                </>
            )}
        </div>
    );
}
