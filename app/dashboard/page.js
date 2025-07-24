import React, { Suspense } from "react";
import Card from "@/app/ui/Card";
import Spinner from "../ui/Spinner";
import { redirect } from "next/dist/server/api-utils";
import data from "@/lib/mock-data.json";

const posts = data.posts;

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const isLoggedIn = false; //실제 인증 로직 추가(서버 컴포넌트에서 리다이렉트 됨)

  if (isLoggedIn) {
    //바꿔야댐 !isLoggedIn
    redirect("/login");
  }

  return (
    <>
      <p className="text-lg font-semibold text-gray-800 my-10">{today}</p>

      <Suspense fallback={<Spinner />}>
        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </Suspense>
    </>
  );
}
