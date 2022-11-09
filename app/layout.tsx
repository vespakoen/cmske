import '../styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="h-full">
      <head>
        <title>Root</title>
      </head>
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  )
}
