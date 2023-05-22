// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getProducts(skip: number, take: number) {
  try {
    const res = await prisma.products.findMany({
      skip,
      take,
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
  const { skip, take } = req.query
  if (skip == null || take == null) {
    res.status(400).json({ message: 'no skip or take' })
    return
  }
  try {
    const products = await getProducts(Number(skip), Number(take))
    res.status(200).json({ items: products, message: 'Success' })
  } catch (err) {
    res.status(400).json({ message: `FAILED` })
  }
}
