import './globals.css';
import { Bricolage_Grotesque } from 'next/font/google';
import Providers from '../components/Providers';

const bricolageGrotesque = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'ICAW - Intelligent Collaborative Academic Workspace',
  description: 'Academic platform unifying teacher-approved RAG AI tutor, adaptive exam prep, mastery analytics, and intelligent study group matching.',
  icons: {
    icon: '/ICAW-logo.png',
    shortcut: '/ICAW-logo.png',
    apple: '/ICAW-logo.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={bricolageGrotesque.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-900 font-sans antialiased min-h-screen" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
