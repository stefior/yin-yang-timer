import './globals.css'
import { Open_Sans } from 'next/font/google';

const open_sans = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Yin Yang Timer',
  description: '1. Run a stopwatch until you stop it 2. Automatically start a countdown for the length of your stopwatch. 3. Repeat',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='flex justify-center items-center flex-col min-h-full'>
      <body className={`flex justify-center items-center flex-col min-h-full -mt-36 transition-all ${open_sans.className}`}>{children}</body>
    </html>
  )
}
