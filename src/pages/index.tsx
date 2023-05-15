import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRef, useState, useEffect } from 'react'

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
        {products &&
          products.map((item) => (
            <div key={item.id}>
              {item.name} {item.createdAt}
            </div>
          ))}
        {/*{products &&*/}
        {/*  products.map((item) => (*/}
        {/*    <div key={item.id}>*/}
        {/*      {JSON.stringify(item)}*/}
        {/*      {Object.entries(item.properties).map(([key, value]) => (*/}
        {/*        <button*/}
        {/*          key={key}*/}
        {/*          onClick={() => {*/}
        {/*            fetch(*/}
        {/*              `/api/get-detail?pageId=${item.id}&propertyId=${value.id}`*/}
        {/*            )*/}
        {/*              .then((res) => res.json())*/}
        {/*              .then((data) => alert(JSON.stringify(data.detail)))*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          {key}*/}
        {/*        </button>*/}
        {/*      ))}*/}
        {/*      <br />*/}
        {/*      <br />*/}
        {/*    </div>*/}
        {/*  ))}*/}
      </div>
    </>
  )
}
