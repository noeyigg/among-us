'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '../Button'
import { validateId, validatePassword } from './SingupValidation'

export default function SignupForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  // 각 입력 필드의 유효성 상태
  const isIdValid = validateId(id)
  const isPwValid = validatePassword(pw)
  const isCodeValid = code === 'woori1234'

  const handleSignup = (e) => {
    e.preventDefault()

    if (!name || !id || !pw || !code) {
      setError('모든 항목을 입력해주세요.')
      return
    }

    if (!isIdValid || !isPwValid) {
      setError('입력값을 다시 확인해주세요.')
      return
    }
    if (!isCodeValid) {
    setError('인증코드가 올바르지 않습니다.')
    return
  }

    alert('회원가입 완료!')
    router.push('/login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white border border-gray-300 shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">회원가입</h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            {id && !isIdValid && (
              <p className="text-red-500 text-sm mt-1">
                아이디는 3~16자의 영문 소문자와 숫자만 사용할 수 있습니다.
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            {pw && !isPwValid && (
              <p className="text-red-500 text-sm mt-1">
                비밀번호는 8~16자, 영문/숫자/특수문자를 포함해야 합니다.
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="인증코드"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
           
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit">회원가입</Button>

          <Link
            href="/login"
            className="block text-center text-sm text-blue-400 hover:underline"
          >
            로그인으로 돌아가기
          </Link>
        </form>
      </div>
    </div>
  )
}
