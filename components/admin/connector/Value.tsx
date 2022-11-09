'use client'

import { ReactNode, useEffect, useState } from 'react'

interface ValueProps {
  page: string
  collection: string
  field: string
  children: ReactNode
}

function DevValue({ collection, field, children, page }: any) {
  const [value, setValue] = useState(children)
  useEffect(() => {
    const env = process.env.NODE_ENV
    if (env === 'development' && typeof window !== 'undefined') {
      window.addEventListener('message', (event) => {
        if (event.data.type === 'update' && event.data.field === field) {
          setValue(event.data.value)
        }
      })
      window.parent.postMessage({
        type: 'register',
        field: {
          type: 'value',
          collection,
          field,
          value: children,
          page,
        },
      })
    }
  }, [collection, field, children])
  return value
}

function ProdValue({ collection, field, children, page }: any) {
  return children
}

let Value: React.FunctionComponent<ValueProps>
if (process.env.NODE_ENV === 'development') {
  Value = DevValue
} else {
  Value = ProdValue
}

export default Value
