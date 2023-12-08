import type { Metadata } from 'next'
import './ui/global.css'
import { inter } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'icuHub',
  description: 'Open source ICU research platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
      </body>
      
    </html>
  )
}
