// 오늘 날짜, cardList
import React, { Suspense } from "react";
import CardList from "@/app/ui/CardList"; 
import Header from "@/app/ui/Header";  
import Spinner from "../ui/Spinner";
import { redirect } from "next/dist/server/api-utils";

const users = [
  {
      "id": 1,
      "name": "admin",
      "password": "1234",
      "grade": 10
    },
    {
      "id": 2,
      "name": "user1",
      "password": "1234",
      "grade": 0
    },
    {
      "id": 3,
      "name": "user2",
      "password": "1234",
      "grade": 0
    }
];

const posts = [
  {
    id: 1,
    date: "2025-07-24",
    presenter_id: 2,
    topic: "리액트 성능 최적화",
    presenter_name: "남기연"
  },
  {
    id: 2,
    date: "2025-07-25",
    presenter_id: 5,
    topic: "Next.js 서버 구성 이해",
    presenter_name: "남기연"
  },
  {
      id: 3,
      date: "2025-07-24",
      presenter_id: 1,
      topic: "Supabase 사용법",
      presenter_name: "이"
  }
];


const comments = [
  {
      "id": 1,
      "created_at": "2025-07-24 09:15:00",
      "author_id": 1,
      "content": "너무 잘 설명해주셨어요!",
      "post_id": 1
    },
    {
      "id": 2,
      "created_at": "2025-07-24 09:30:00",
      "author_id": 3,
      "content": "궁금한 점이 생겼어요~",
      "post_id": 1
    },
    {
      "id": 3,
      "created_at": "2025-07-24 10:05:00",
      "author_id": 2,
      "content": "구조 그림으로 보여주세요!",
      "post_id": 2
    },
    {
      "id": 4,
      "created_at": "2025-07-24 11:20:00",
      "author_id": 2,
      "content": "유용한 툴 소개 감사해요.",
      "post_id": 3
    },
    {
      "id": 5,
      "created_at": "2025-07-24 12:45:00",
      "author_id": 3,
      "content": "DB 연동 부분 다시 보고 싶어요.",
      "post_id": 3
    }
];


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
