// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function updateProduct(id: number, contents: string) {
  try {
    const res = await prisma.products.update({
      where: {
        id,
      },
      data: {
        contents,
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
  const { id, contents } = JSON.parse(req.body)
  if (id == null || contents == null) {
    res.status(400).json({ message: 'no Id or contents' })
    return
  }
  try {
    const products = await updateProduct(Number(id), contents)
    res.status(200).json({ items: products, message: 'Success' })
  } catch (err) {
    res.status(400).json({ message: `FAILED` })
  }
}
