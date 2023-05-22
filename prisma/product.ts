import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const productData: Prisma.productsCreateInput[] = Array.apply(
  null,
  Array(100)
).map((_, idx) => ({
  name: `Dark Jean ${idx}`,
  contents: `{"blocks":[{"key":"9krlj","text":"This is a Dark Jean ${
    idx + 1
  }","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
  category_id: 1,
  image_url: `https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/${
    (idx + 1) % 10 === 0 ? 10 : (idx + 1) % 10
  }.jpg`,
  price: Math.floor(Math.random() * 30000 + 2000),
}))

async function main() {
  await prisma.products.deleteMany({})

  for (const p of productData) {
    const product = await prisma.products.create({
      data: p,
    })

    console.log(`CREATED ID : ${product.id}`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
