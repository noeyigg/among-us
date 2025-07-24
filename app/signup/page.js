export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white border border-gray-300 shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">회원가입</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="이름"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="아이디"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="인증코드"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            className="w-full bg-blue-200 hover:bg-blue-300 text-white font-semibold py-2 rounded-md transition-colors"
          >
            회원가입
          </button>
          <button
            type="button"
            className="px-3 py-1.5 border border-gray-400 rounded-md text-gray-500 text-sm hover:bg-gray-100 transition-colors duration-200 focus:outline-none "
          >
            돌아가기
          </button>
        </form>
      </div>
    </div>
  );
}
