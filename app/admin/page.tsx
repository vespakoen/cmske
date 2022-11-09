'use client'

import { useRef } from 'react'
import Admin from '../../components/admin/Admin'

export default function AdminPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  return (
    <>
      <div className="absolute inset-0 right-1/2 lg:right-2/3">
        <Admin iframeRef={iframeRef} />
      </div>
      <div className="absolute inset-0 left-1/2 lg:left-1/3">
        <iframe
          ref={iframeRef}
          src="/"
          style={{ width: '100%', height: '100%', border: 0 }}
        ></iframe>
      </div>
    </>
  )
}
