import fs from 'fs'
import path from 'path'
// import Blocks from '../../components/admin/connector/Blocks'
import Value from '../../components/admin/connector/Value'

export default function About() {
  const data = JSON.parse(
    fs.readFileSync(
      path.resolve(process.env.ROOT!, 'content', 'about.json'),
      'utf8'
    )
  ).page
  return (
    <div className="container">
      <main>
        <h1>
          <Value page="/about" collection="page" field="title">
            {data.title}
          </Value>
        </h1>
        <p>
          <Value page="/about" collection="page" field="intro">
            {data.intro}
          </Value>
        </p>
      </main>
    </div>
  )
}
