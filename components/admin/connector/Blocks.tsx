'use client'

import React, { useEffect, useState } from 'react'
import ClientTestComponent from '../../ClientTestComponent'

function CodeBlock({ title, children }: any) {
  return (
    <code>
      <b>{title}</b>
      {children}
    </code>
  )
}

CodeBlock.form = {
  title: {
    type: 'string',
  },
  children: {
    type: 'string',
  },
}

const availableBlocks: any = {
  CodeBlock: CodeBlock,
  ClientTestComponent: ClientTestComponent,
}

function DevBlocks(props: any) {
  const safeChildren = props.blocks.map((block: any) => {
    if (!availableBlocks.hasOwnProperty(block.type)) {
      throw new Error('Unknown block type, make sure it is registered!')
    }
    if (!availableBlocks[block.type].hasOwnProperty('form')) {
      throw new Error(
        `Block of type: ${block.type} is missing the 'form' property.`
      )
    }
    return {
      type: block.type,
      props: block.props,
      form: availableBlocks[block.type].form,
    }
  })
  const { collection, field } = props
  const [blocks, setBlocks] = useState(safeChildren)
  const env = process.env.NODE_ENV
  useEffect(() => {
    if (env === 'development' && typeof window !== 'undefined') {
      window.parent.postMessage({
        type: 'register',
        field: {
          type: 'block',
          collection,
          field,
          value: safeChildren,
          page: props.page,
        },
      })
      window.addEventListener('message', (event) => {
        if (event.data.type === 'update' && event.data.field === field) {
          setBlocks(event.data.value)
        }
      })
    }
  }, [])
  return blocks.map((block: any) =>
    React.createElement(availableBlocks[block.type], {
      ...block.props,
      key: JSON.stringify(block),
    })
  )
}

function ProdBlocks({ blocks }: any) {
  return blocks.map((block: any) =>
    React.createElement(availableBlocks[block.type], {
      ...block.props,
      key: JSON.stringify(block),
    })
  )
}

let Blocks: React.FunctionComponent<{
  page: string
  collection: string
  field: string
  blocks: any
}>
if (process.env.NODE_ENV === 'development') {
  Blocks = DevBlocks
} else {
  Blocks = ProdBlocks
}

export default Blocks
