import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRef, useState, useEffect } from 'react'
import { css } from '@emotion/react'
import Button from '@components/Button'

const inter = Inter({ subsets: ['latin'] })

interface Product {
  id: string
  name: string
  createdAt: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  // useEffect(() => {
  //   fetch('/api/get-items')
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data.items))
  // }, [])

  useEffect(() => {
    fetch('/api/get-products')
      .then((res) => res.json())
      .then((data) => setProducts(data.items))
  }, [])

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

      <div>
        <p>product list</p>
        <button
          css={css`
            background-color: hotpink;
            padding: 1rem;
            border-radius: 0.5rem;
          `}
          onClick={handleClick}
        >
          ADD Jacket
        </button>
        <Button onClick={handleClick}>Add Jacket 2</Button>
        {products &&
          products.map((item) => (
            <div key={item.id}>
              {item.name} {item.createdAt}
            </div>
          ))}
      </div>
    </>
  )
}
