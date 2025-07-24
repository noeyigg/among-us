export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white border border-gray-300 shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">로그인</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="아이디"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            className="w-full bg-blue-200 hover:bg-blue-300 text-white font-semibold py-2 rounded-md transition-colors"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
