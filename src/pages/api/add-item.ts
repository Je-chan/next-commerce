// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'
type Data = {
  message: string
}

const notion = new Client({
  auth: 'secret_vI1Q2Dx1OJXqBzGexmP7fL58XLuyAODu4R9NfbPuo4k',
})

const databaseId = '04987d39c6b840d3889a754d535ea778'

async function addItem(name: string) {
  console.log('errorItem')
  try {
    const res = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
    })
    console.log(res)
  } catch (err) {
    console.error(JSON.stringify(err))
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('HEEEEEEE')
  const { name } = req.query
  console.log(name)
  if (name === null) {
    return res.status(400).json({ message: `NO name` })
  }
  try {
    await addItem(String(name))
    res.status(200).json({ message: `Success ${name} added` })
  } catch (err) {
    res.status(400).json({ message: `FAILED` })
  }
}
