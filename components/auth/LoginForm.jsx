'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '../Button'
import { useAuth } from '../../app/context/AuthContext'


export default function LoginForm() {
  const router = useRouter()
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()

  const handleLogin = (e) => {
    e.preventDefault()

    if (!id || !pw) {
      setError('아이디와 비밀번호를 모두 입력해주세요.')
      return
    }

    // TODO: 실제 인증 로직
    if (id === 'test' && pw === '1234') {
      login({ id }) // 전역 상태 저장
      router.push('/dashboard')
    } else {
      setError('아이디 또는 비밀번호가 틀렸습니다.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white border border-gray-300 shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">로그인</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit">로그인</Button>

          <Link href="/signup" className="block text-center text-sm text-blue-400 hover:underline">
            회원가입
          </Link>
        </form>
      </div>
    </div>
  )
}
