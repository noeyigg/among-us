import supabase from "@/lib/supabaseClient";

export async function GET(request, { params }) {
  const { postId } = await params;

  try {
    const url = new URL(request.url);
    const viewerId = url.searchParams.get("viewerId");

    // 게시글 + 작성자 정보 조회
    const { data: post, error: postError } = await supabase
      .from("posts")
      .select(`*, users!inner ( name )`)
      .eq("id", postId)
      .single();

    if (postError) {
      return Response.json({ error: postError.message }, { status: 500 });
    }

    // 로그인하지 않은 사용자는 댓글 볼 수 없음
    if (!viewerId) {
      return Response.json({ post, comments: [], isPresenter: false });
    }

    // 로그인한 사용자 정보 조회 (level 확인)
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("level")
      .eq("id", viewerId)
      .single();

    if (userError) {
      console.error('User fetch error:', userError);
      return Response.json({ error: userError.message }, { status: 500 });
    }

    // 발표자 여부 확인
    const isPresenter = String(viewerId) === String(post.presenter_id);

    let comments = [];

    if (user.level === 2 || isPresenter) {
      const { data: allComments, error: commentsError } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (commentsError) {
        console.error('All comments fetch error:', commentsError);
        return Response.json({ error: commentsError.message }, { status: 500 });
      }
      comments = allComments || [];
    } else {
      // 일반 사용자는 본인 댓글만 조회
      const { data: myComments, error: commentsError } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .eq("author_id", viewerId)
        .order("created_at", { ascending: true });

      if (commentsError) {
        console.error('My comments fetch error:', commentsError);
        return Response.json({ error: commentsError.message }, { status: 500 });
      }
      comments = myComments || [];
    }

    return Response.json({
      post,
      comments,
      isPresenter,
    });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const { postId } = await params;
  const { content, authorId } = await req.json();

  if (!content || !postId || !authorId) {
    return Response.json({ error: '내용을 작성해주세요' }, { status: 400 });
  }

  try {
    const { error } = await supabase.from('comments').insert({
      post_id: postId,
      content,
      author_id: authorId,
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('댓글 등록 오류:', error);
    return Response.json({ error: '서버 오류가 발생했습니다' }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const { postId } = params;
  const body = await req.json();
  const { kind, authorId } = body || {};

  if (!kind || !authorId) {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 게시글 수정
  if (kind === "post") {
    const { topic } = body || {};
    if (!topic?.trim()) {
      return Response.json({ error: "제목이 비었습니다." }, { status: 400 });
    }

    // 내가 소유자인지 확인 (presenter_id 검사)
    const { data: post, error: findErr } = await supabase
      .from("posts")
      .select("id, presenter_id")
      .eq("id", postId)
      .single();

    if (findErr) return Response.json({ error: findErr.message }, { status: 500 });
    if (String(post.presenter_id) !== String(authorId)) {
      return Response.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    const { error: updateErr } = await supabase
      .from("posts")
      .update({ topic })
      .eq("id", postId);

    if (updateErr) return Response.json({ error: updateErr.message }, { status: 500 });
    return Response.json({ success: true });
  }

  // 댓글 수정
  if (kind === "comment") {
    const { commentId, content } = body || {};
    if (!commentId || !content?.trim()) {
      return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
    }

    // 내 댓글인지 확인
    const { data: target, error: findErr } = await supabase
      .from("comments")
      .select("id, author_id, post_id")
      .eq("id", commentId)
      .single();

    if (findErr) return Response.json({ error: findErr.message }, { status: 500 });
    if (String(target.author_id) !== String(authorId)) {
      return Response.json({ error: "권한이 없습니다." }, { status: 403 });
    }
    if (String(target.post_id) !== String(postId)) {
      return Response.json({ error: "postId 불일치" }, { status: 400 });
    }

    const { error: updateErr } = await supabase
      .from("comments")
      .update({ content })
      .eq("id", commentId);

    if (updateErr) return Response.json({ error: updateErr.message }, { status: 500 });
    return Response.json({ success: true });
  }

  return Response.json({ error: 'kind는 "post" 또는 "comment" 여야 합니다.' }, { status: 400 });
}

// 댓글 삭제 OR 게시글 삭제
export async function DELETE(req, { params }) {
  const { postId } = params;
  const body = await req.json();
  const { kind, authorId } = body || {};

  if (!kind || !authorId) {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 게시글 삭제 (작성자만)
  if (kind === "post") {
    const { data: post, error: findErr } = await supabase
      .from("posts")
      .select("id, presenter_id")
      .eq("id", postId)
      .single();

    if (findErr) return Response.json({ error: findErr.message }, { status: 500 });
    if (String(post.presenter_id) !== String(authorId)) {
      return Response.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    // FK CASCADE가 없다면 댓글 먼저 제거
    await supabase.from("comments").delete().eq("post_id", postId);

    const { error: delErr } = await supabase.from("posts").delete().eq("id", postId);
    if (delErr) return Response.json({ error: delErr.message }, { status: 500 });

    return Response.json({ success: true });
  }

  // 댓글 삭제 (작성자만)
  if (kind === "comment") {
    const { commentId } = body || {};
    if (!commentId) {
      return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
    }

    const { data: target, error: findErr } = await supabase
      .from("comments")
      .select("id, author_id, post_id")
      .eq("id", commentId)
      .single();

    if (findErr) return Response.json({ error: findErr.message }, { status: 500 });
    if (String(target.author_id) !== String(authorId)) {
      return Response.json({ error: "권한이 없습니다." }, { status: 403 });
    }
    if (String(target.post_id) !== String(postId)) {
      return Response.json({ error: "postId 불일치" }, { status: 400 });
    }

    const { error: delErr } = await supabase.from("comments").delete().eq("id", commentId);
    if (delErr) return Response.json({ error: delErr.message }, { status: 500 });

    return Response.json({ success: true });
  }

  return Response.json({ error: 'kind는 "post" 또는 "comment" 여야 합니다.' }, { status: 400 });
}
