import './globals.css';

export const metadata = {
  title: 'Intelligent Collaborative Academic Workspace',
  description: 'Academic Workspace App Setup'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
