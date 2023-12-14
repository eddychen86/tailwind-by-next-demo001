import { Inter } from 'next/font/google'
import Gemini from '@components/Gemini'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main
      class={`flex min-h-screen flex-col items-center justify-between mx-24 py-10 ${inter.className}`}
    >
      <div class="section">
        <h1 class='title'>Gemini AI</h1>
      </div>

      <Gemini />
    </main>
  )
}
