// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

type Data = {
  success: boolean
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = JSON.parse(req.body)
  let page = body.page.slice(1)
  if (page === '') {
    page = 'home'
  }
  page = page.split('/').join('-')
  console.log(path.resolve(process.env.ROOT!, 'content', `${page}.json`))
  fs.writeFileSync(path.resolve(process.env.ROOT!, 'content', `${page}.json`), JSON.stringify(body.data))
  res.status(200).json({ success: true })
}
