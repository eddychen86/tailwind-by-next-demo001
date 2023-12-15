import { useState, useEffect, useCallback } from 'react'
import Cookies from 'universal-cookie';

export default function useCookie(key, val, opt) {
  const cookies = new Cookies()
  const [value, setValue] = useState(val)

  const setItem = newVal => {
    setValue(newVal)
    // console.log(opt)
    cookies.set(key, newVal, opt)
  }

  const removeItem = () => {
    cookies.remove(key)
    setValue(val)
  }

  useEffect(() => {
    const newVal = cookies.get(key)
    if (value !== newVal) {
      setValue(newVal || val)
    }
  })

  const handleCookieChange = useCallback(
    event => {
      if (event.key === key && event.newVal !== value) {
        setValue(event.newVal || val)
      }
      if (event.key === null) {
        setValue(cookies.get(key) || val)
      }
    },
    [value],
  )
  
  useEffect(() => {
    // 使用 universal-cookie 套件的 addChangeListener 函數來監聽 Cookie 的變化
    cookies.addChangeListener(handleCookieChange)
  
    return () => {
      // 在組件卸載時，移除對 Cookie 變化的監聽器
      cookies.removeChangeListener(handleCookieChange)
    };
  }, [handleCookieChange])

  return [value, setItem, removeItem]
}
