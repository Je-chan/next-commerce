import ImageGallery from 'react-image-gallery'
import Carousel from 'nuka-carousel'
import Image from 'next/image'

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
]

export default function Products() {
  return (
    <Carousel>
      {images.map((item) => (
        <Image
          layout="responsive"
          key={item.original}
          src={item.original}
          alt="IMAGE"
          width={1000}
          height={600}
        />
      ))}
    </Carousel>
  )
}
