import fs from 'fs'
import Link from 'next/link'
import path from 'path'
import Blocks from '../components/admin/connector/Blocks'
import Value from '../components/admin/connector/Value'

export default function Home() {
  const data = JSON.parse(
    fs.readFileSync(
      path.resolve(process.env.ROOT!, 'content', 'home.json'),
      'utf8'
    )
  ).page
  return (
    <div className="container">
      <main>
        <Link href="/about">About</Link>
        <h1>
          <Value page="/" collection="page" field="title">
            {data.title}
          </Value>
        </h1>
        <p>
          <Value page="/" collection="page" field="intro">
            {data.intro}
          </Value>
        </p>
        <div>
          <Blocks
            page="/"
            collection="page"
            field="blocks"
            blocks={data.blocks}
          />
        </div>
      </main>
    </div>
  )
}
