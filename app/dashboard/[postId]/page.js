import PostForm from "@/app/ui/PostForm";
import data from "@/lib/mock-data.json";
import Comment from "@/app/ui/Comment";

// 피드백 작성할 PostForm, 작성된 피드백
export default async function PostIdPage({ params }) {
  const { postId } = await params;

  // 해당하는 post 데이터
  const post = data.posts.find((item) => item.id === Number(postId));

  // 발표자 데이터
  const presenter = data.users.find((user) => user.id === post.presenter_id);

  // 해당하는 post의 댓글
  // TODO: 발표자는 모든 댓글, 그 외는 작성한 댓글만 보이도록 필터링
  const comments = data.comments.filter(
    (item) => item.post_id === Number(postId)
  );

  return (
    <>
      <div className="my-10">
        <p className="font-bold">
          {" "}
          <span className="font-bold text-xl mb-4">{post.topic}</span>
          {` - ${presenter.name}`}
        </p>
      </div>
      <PostForm />
      {/* TODO: 댓글 데이터 Suspense로 streaming 처리 */}
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          time={comment.created_at}
          content={comment.content}
        />
      ))}
    </>
  );
}
