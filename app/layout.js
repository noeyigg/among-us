import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="px-4 md:px-20">
        <header className="flex items-center justify-center gap-3 py-10">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <h1 className="text-2xl font-bold text-blue-800">Among Us</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
