import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const lists = [
    { herf: 'https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app', title: 'Docs', para: 'Find in-depth information about Next.js features and API.' },
    { href: 'https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app', title: 'Learn', para: 'Learn about Next.js in an interactive course with quizzes!' },
    { href: 'https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app', title: 'Templates', para: 'Discover and deploy boilerplate example Next.js projects.' },
    { href: 'https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app', title: 'Deploy', para: 'Instantly deploy your Next.js site to a shareable URL with Vercel.' },
  ]

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="section1">
        <p className="title">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">pages/index.js</code>
        </p>
      </div>

      <div className="section2">
        <Image className="relative" src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
      </div>

      <div className="flex border">
        <div className="border border-red-500
          m-4 p-4
        ">
          <p>未使用 Just in Time</p>
        </div>

        <div className="border border-blue-500
          m-[1.15rem] p-[10.35px]
        ">
          <p>使用 Just in Time</p>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {lists.map((m, idx) => (
          <a key={idx} className="card" target="_blank" rel="noopener noreferrer">
            <h2 className={`subTitle`}>
              {`${m.title} `}<span className="arrow">-&gt;</span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`} children={m.para} />
          </a>
        ))}
      </div>
    </main>
  )
}
