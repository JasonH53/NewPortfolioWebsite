import './globals.css'

export const metadata = {
  title: 'Jason Hon',
  description: "Jason's Portfolio Website",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}