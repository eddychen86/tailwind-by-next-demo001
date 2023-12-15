import { Inter } from 'next/font/google'
import Gemini from '@components/Gemini'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between mx-24 py-10 ${inter.className}`}
    >
      <div className="section">
        <h1 className='title'>Gemini AI</h1>
      </div>

      <Gemini />
      <SpeedInsights />
    </main>
  )
}
