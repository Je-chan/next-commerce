// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getProductsCount() {
  try {
    return await prisma.products.count()
  } catch (err) {
    console.error(err)
  }
}

type Data = {
  items?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const products = await getProductsCount()
    res.status(200).json({ items: products, message: 'Success' })
  } catch (err) {
    res.status(400).json({ message: `FAILED` })
  }
}
