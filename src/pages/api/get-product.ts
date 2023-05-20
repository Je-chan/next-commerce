// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getProduct(id: number) {
  try {
    const res = await prisma.products.findUnique({
      where: {
        id,
      },
    })
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
  const { id } = req.query
  if (id == null) {
    res.status(400).json({ message: 'no Id' })
    return
  }
  try {
    const products = await getProduct(Number(id))
    res.status(200).json({ items: products, message: 'Success' })
  } catch (err) {
    res.status(400).json({ message: `FAILED` })
  }
}
