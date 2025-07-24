'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '../Button'
import supabase from '../../lib/supabaseClient'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !pw) {
      setError('이메일과 비밀번호를 모두 입력해주세요.')
      return
    }

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password: pw,
      })

      if (loginError) {
        setError('로그인 실패: ' + loginError.message)
        return
      }

      // 로그인 성공 시 대시보드 이동
      router.push('/dashboard')
    } catch (err) {
      console.error(err)
      setError('예기치 못한 오류가 발생했습니다.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white border border-gray-300 shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">로그인</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit">로그인</Button>

          <Link
            href="/signup"
            className="block text-center text-sm text-blue-400 hover:underline"
          >
            회원가입하기
          </Link>
        </form>
      </div>
    </div>
  )
}
