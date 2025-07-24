// 오늘 날짜, cardList
import React, { Suspense } from "react";
import CardList from "@/app/ui/CardList"; 
import Header from "@/app/ui/Header";  
import Spinner from "../ui/Spinner";
import { redirect } from "next/dist/server/api-utils";
import data from "@/lib/mock-data.json"


const posts = data.posts;

export default function DashboardPage() {
  const now = new Date()
  const today = now.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })

  const isLoggedIn = false; //실제 인증 로직 추가(서버 컴포넌트에서 리다이렉트 됨)

  if (isLoggedIn) { //바꿔야댐 !isLoggedIn
    redirect("/login");
  }

  return (
    <>
      <Header today={today}/>

      <Suspense fallback={<Spinner/>}>
        <CardList posts={posts} />
      </Suspense>
    </>
  );
}
