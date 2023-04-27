import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRef } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const handleClick = () => {
    if (inputRef.current === null || inputRef.current.value === '') {
      alert('name 을 넣어주세요')
      return
    }

    fetch(`/api/add-item?name=${inputRef.current.value}`)
      .then((res) => {
        console.log(res)
        return res.json()
      })
      .then((data) => alert(data.message))
  }

  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <>
      <input ref={inputRef} type="text" placeholder="name" />
      <button onClick={handleClick}>ADD Jacket</button>
    </>
  )
}
