import './globals.css'
import { AuthProvider } from './context/AuthContext'

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {/* 로그인 전역 상태 유지 */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

