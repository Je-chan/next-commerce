// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

type Data = {
  items?: any
  message: string
}

const notion = new Client({
  auth: 'secret_vI1Q2Dx1OJXqBzGexmP7fL58XLuyAODu4R9NfbPuo4k',
})

const databaseId = '04987d39c6b840d3889a754d535ea778'

async function getItems() {
  console.log('errorItem')
  try {
    const res = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'price',
          direction: 'ascending',
        },
      ],
    })
    console.log(res)
    return res
  } catch (err) {
    console.error(JSON.stringify(err))
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await getItems()
    res.status(200).json({ items: response?.results, message: 'Success' })
  } catch (err) {
    res.status(400).json({ message: `FAILED` })
  }
}
