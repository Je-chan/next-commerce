// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getProducts() {
  console.log('errorItem')
  try {
    const res = await prisma.products.findMany()
    console.log(res)
    return res
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
    const products = await getProducts()
    res.status(200).json({ items: products, message: 'Success' })
  } catch (err) {
    res.status(400).json({ message: `FAILED` })
  }
}
