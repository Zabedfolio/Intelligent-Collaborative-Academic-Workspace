import './globals.css';
import Providers from '../components/Providers';

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
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 font-sans antialiased min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
