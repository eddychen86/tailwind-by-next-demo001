import { useState, useEffect } from 'react'
import { marked } from 'marked'
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import { GoogleGenerativeAI } from '@google/generative-ai'
import useCookie from '@/hooks/use-cookie';
import moment from 'moment-timezone'

export default function Gemini() {
  const deadline = moment(new Date(new Date().getFullYear(), new Date().getMonth(), (new Date().getDate() + 1))).tz('Asia/Taipei')._d
  const [api, setApi, rmApi] = useCookie('g-api', null, { expires: deadline, path: '/' })

  const [prompt, setPrompt] = useState('')
  const [text, setText] = useState('')
  const [lang, setLang] = useState('英文')
  const [user, setUser] = useState('local')
  const [keys, setKeys] = useState(null)
  const [key, setKey] = useState(null)

  const transform = (node, index) => {
    if (node.type === 'text' && node.data.match(/```(?:.*)```/)) {
      return <div className='m-3 p-4 bg-gray-900 text-gray-200 rounded-lg'>{node.data}</div>
    }

    return convertNodeToElement(node, index, transform)
  }

  const option = {
    decodeEntities: true,
    transform,
  }

  const run = async keyword => {
    const genAI = new GoogleGenerativeAI(api || key)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(keyword)
    const response = await result.response
    const newValue = [ ...text, { q: prompt, a: response.text() }]
    // console.log(newValue)
    setText(newValue)
    setPrompt('')
  }

  return (
    <div className='w-full h-full max-w-5xl pb-10'>

      <div className="group px-2 pb-3 text-lg text-black transition duration-300 ease-in-out">
        <span className='group-hover:text-red-500 transition duration-300 ease-in-out'>Hello</span>
        <span className='font-bold'> {user}</span>
        <span className='group-hover:text-blue-500 transition duration-300 ease-in-out'> 請輸入問題：</span>
      </div>

      <p className='card'>
        {text && Object.values(text).map((m, idx) =>
          <div key={idx} className=''>
            <p className='text-green-600' children={user} />
            <p className='pb-3'>
              {ReactHtmlParser(marked.parse(m.q), option)}
            </p>

            <p className='text-blue-600' children='Gemini' />
            <p className='pb-3'>
              {ReactHtmlParser(marked.parse(m.a), option)}
            </p>

            <div className='border border-gray-300 drak:border-white' />
          </div>
        )}
      </p>
      <div className='h-20'>
        {(!api && !key)
          ? (
            <div>
              <label>
                請先輸入 Gemini API：
                <input
                  placeholder='貼上 Key'
                  className='rounded-full h-8 w-[20vw] px-3 border border-gray-500'
                  onChange={e => setKeys(e.target.value)}
                />
                <button
                  className='h-8 w-[100px] ml-3 px-3 bg-blue-300 rounded-full text-white font-bold'
                  onClick={() => {
                    setKey(keys)
                    setApi(keys)
                  }}
                  children='送出'
                />
              </label>
              <hr className='border border-gray-300 dark:border-white my-3' />
            </div>
          )
          : (
            <textarea
              value={prompt}
              placeholder={!key && '請輸入 Gemini API'}
              className='h-full w-full border border-gray-500 rounded-lg mr-3 p-2 overflow-y-auto'
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={e => e.code === 'Enter' && e.shiftKey && run(prompt)}
            />
          )
        }
        <div className='flex justify-between mt-3'>
          <div className='flex'>
            <label>
              請問如何稱呼？
              <input className='rounded-full h-8 w-50 px-3 border border-gray-500' placeholder={`預設為 Local`} onChange={e => setUser(e.target.value)} />
            </label>
            <label className='ml-3'>
              回答語言：
              <input className='rounded-full h-8 w-50 px-3 border border-gray-500' placeholder={`預設為「英文」`} onChange={e => setLang(e.target.value)} />
            </label>
          </div>

          <div className='flex'>
            <button
              className='h-10 w-[100px] px-3 bg-blue-300 rounded-full text-white font-bold'
              onClick={() => run(`請以${lang}回答問題：${prompt}`)}
              children='RUN'
            />
            <button
              className='h-10 w-[100px] ml-3 px-3 bg-red-300 rounded-full text-white font-bold'
              onClick={() => setText('')}
              children='clear'
            />
          </div>
        </div>
      </div>
    </div>
  )
}