// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

type Data = {
  detail?: any
  message: string
}

const notion = new Client({
  auth: 'secret_vI1Q2Dx1OJXqBzGexmP7fL58XLuyAODu4R9NfbPuo4k',
})

const databaseId = '04987d39c6b840d3889a754d535ea778'

async function getDetail(pageId: string, propertyId: string) {
  console.log('errorItem')
  try {
    const res = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
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
    const { pageId, propertyId } = req.query
    const response = await getDetail(String(pageId), String(propertyId))
    res.status(200).json({ detail: response, message: 'Success' })
  } catch (err) {
    res.status(400).json({ message: `FAILED` })
  }
}
