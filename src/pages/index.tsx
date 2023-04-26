import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const handleClick = () => {
    fetch('/api/add-item?name=Jacket')
      .then((res) => res.json())
      .then((data) => alert(data.message))
  }
  return <button onClick={handleClick}>ADD Jacket</button>
}
