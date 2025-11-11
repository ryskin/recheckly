import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recheckly - Web Checklist UI",
  description: "Веб-интерфейс для мануального тестирования",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
