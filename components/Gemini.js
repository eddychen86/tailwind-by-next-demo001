import { useState, useEffect } from 'react'
import { marked } from 'marked'
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import { GoogleGenerativeAI } from '@google/generative-ai'

export default function Gemini() {
  const [prompt, setPrompt] = useState('')
  const [text, setText] = useState('')

  const transform = (node, index) => {
    if (node.type === 'text' && node.data.match(/```(?:.*)```/)) {
      return <div class='m-3 p-4 bg-gray-900 text-gray-200 rounded-lg'>{node.data}</div>
    }

    return convertNodeToElement(node, index, transform)
  }

  const option = {
    decodeEntities: true,
    transform,
  }
  
  const run = async keyword => {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(keyword)
    const response = await result.response
    const newValue = [...text, response.text()]
    console.log(newValue)
    setText(newValue)
  }
  
  return (
    <div class='w-full h-full max-w-5xl'>

      <div class="group px-2 pb-3 text-lg text-black transition duration-300 ease-in-out">
        <span class='group-hover:text-red-500 transition duration-300 ease-in-out'>Hello</span>
        <span class='font-bold'> Eddy</span>
        <span class='group-hover:text-blue-500 transition duration-300 ease-in-out'> 請輸入問題：</span>
      </div>

      <p class='card'>
        {text && Object.values(text).map((m, idx) =>
          <div key={idx} class=''>
            <p class='text-blue-600' children='Gemini' />
            <p class='pb-3'>
              {ReactHtmlParser(marked.parse(m), option)}
            </p>
          </div>
        )}
      </p>
      <div class='flex h-20'>
        <textarea
          class='h-full w-full border border-gray-500 rounded-lg mr-3 p-2 overflow-y-auto'
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => e.code === 'Enter' && e.shiftKey && run(prompt) && setPrompt('')}
        />
        <button
          class='h-10 px-3 bg-blue-300 rounded-full text-white font-bold'
          onClick={() => run(`請以繁體中文回答問題：${prompt}`)}
          children='RUN'
        />
        <button
          class='h-10 ml-3 px-3 bg-red-300 rounded-full text-white font-bold'
          onClick={() => setText('')}
          children='clear'
        />
      </div>
    </div>
  )
}