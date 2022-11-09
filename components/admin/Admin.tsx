'use client'

import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { CogIcon, HomeIcon } from '@heroicons/react/24/outline'

import MobileNavPanel from './MobileNavPanel'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import Heading from './form/Heading'
import Input from './form/Input'
import OrderButtons from './OrderButtons'
// import Textarea from './form/Textarea'
// import Image from './form/Image'
// import Select from './form/Select'

const user = {
  name: 'Emily Selman',
  email: 'emily.selman@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon },
  { name: 'Settings', href: '#', icon: CogIcon },
]

interface Block {
  type: string
  form: {
    [key: string]: FormField
  }
  props: {
    [key: string]: any
  }
}

interface FormField {
  type: 'string' | 'number'
}

interface BlockField {
  type: 'block'
  page: string
  collection: string
  field: string
  value: Block[]
}

interface ValueField {
  type: 'value'
  page: string
  collection: string
  field: string
  value: string
}

interface ActionRegister {
  type: 'register'
  field: BlockField | ValueField
}

interface Fields {
  [key: string]: BlockField | ValueField
}

function Form({
  fields,
  setFields,
  iframeRef,
}: {
  fields: Fields
  setFields: Dispatch<SetStateAction<Fields>>
  iframeRef: RefObject<HTMLIFrameElement>
}) {
  const updateField = useCallback(
    (fieldKey: string, value: any) => {
      setFields((currentFields) => ({
        ...currentFields,
        [fieldKey]: {
          ...currentFields[fieldKey],
          value,
        },
      }))
      iframeRef.current?.contentWindow?.postMessage({
        type: 'update',
        field: fieldKey,
        value,
      })
    },
    [iframeRef, setFields]
  )

  return (
    <div>
      {Object.keys(fields).map((fieldKey: string) => {
        const fieldConfig = fields[fieldKey]
        switch (fieldConfig.type) {
          case 'value':
            return (
              <Input
                key={fieldKey}
                label={fieldKey}
                value={fieldConfig.value}
                onChange={(e) => updateField(fieldKey, e.target.value)}
              />
            )
          case 'block':
            return (
              <div key={fieldKey}>
                <Heading
                  title={fieldKey}
                  description="Here you can edit the blocks for this section..."
                />
                {fieldConfig.value.map((block, blockIndex: number) => {
                  const canMoveUp = blockIndex > 0
                  const canMoveDown = blockIndex < fieldConfig.value.length - 1
                  return (
                    <div
                      key={blockIndex}
                      className="rounded-md p-5 mb-5 bg-gray-100"
                    >
                      <div className="flex justify-between mb-5">
                        <b>{block.type}</b>
                        <OrderButtons
                          canMoveUp={canMoveUp}
                          canMoveDown={canMoveDown}
                          onMoveUp={() => {
                            const element = fieldConfig.value[blockIndex]
                            fieldConfig.value.splice(blockIndex, 1)
                            fieldConfig.value.splice(blockIndex - 1, 0, element)
                            updateField(fieldKey, [...fieldConfig.value])
                          }}
                          onMoveDown={() => {
                            const element = fieldConfig.value[blockIndex]
                            fieldConfig.value.splice(blockIndex, 1)
                            fieldConfig.value.splice(blockIndex + 1, 0, element)
                            updateField(fieldKey, [...fieldConfig.value])
                          }}
                        />
                      </div>
                      {Object.keys(block.form).map((formFieldKey: string) => {
                        const formFieldConfig = block.form[formFieldKey]
                        switch (formFieldConfig.type) {
                          case 'string':
                            return (
                              <Input
                                key={fieldKey + '-' + formFieldKey}
                                label={formFieldKey}
                                value={block.props[formFieldKey]}
                                onChange={(e) => {
                                  fieldConfig.value[blockIndex].props[
                                    formFieldKey
                                  ] = e.target.value
                                  updateField(fieldKey, [...fieldConfig.value])
                                }}
                              />
                            )
                          default:
                            return (
                              <div>
                                unknown field type {formFieldConfig.type}
                              </div>
                            )
                        }
                      })}
                    </div>
                  )
                })}
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

let page = ''

export default function Admin({
  iframeRef,
}: {
  iframeRef: RefObject<HTMLIFrameElement>
}) {
  const [fields, setFields] = useState<Fields>({})
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    window.addEventListener('message', (e: MessageEvent<ActionRegister>) => {
      // console.log('admin', e.data)
      if (e.data.type === 'register') {
        const field = e.data.field
        let emptyFields: any = null
        if (field.page !== page) {
          page = field.page
          emptyFields = {}
        }
        if (field.type === 'block') {
          field.value.forEach((block) => {
            Object.keys(block.form).forEach((key: string) => {
              if (!block.props.hasOwnProperty(key)) {
                block.props[key] = ''
              }
            })
          })
        }
        setFields((currentFields) => ({
          ...(emptyFields ? emptyFields : currentFields),
          [field.field]: field,
        }))
      }
    })
  }, [])

  return (
    <div className="flex h-full">
      <MobileNavPanel
        navigation={navigation}
        user={user}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <DesktopNav navigation={navigation} user={user} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <MobileNav setMobileMenuOpen={setMobileMenuOpen} />
        <main className="flex flex-1 overflow-hidden">
          <section
            aria-labelledby="primary-heading"
            className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last p-5"
          >
            <form className="space-y-8 divide-y divide-gray-200">
              <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div className="space-y-6 sm:space-y-5">
                  <Heading
                    title="Page"
                    description="Here you can edit the page..."
                  />
                  <Form
                    fields={fields}
                    setFields={setFields}
                    iframeRef={iframeRef}
                  />
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={async () => {
                      let page = ''
                      const serialized = Object.entries(fields).reduce(
                        (memo, [key, config]) => {
                          if (config.page) {
                            page = config.page
                          }
                          if (!memo.hasOwnProperty(config.collection)) {
                            memo[config.collection] = {}
                          }
                          if (!memo[config.collection].hasOwnProperty(key)) {
                            memo[config.collection][key] = {}
                          }
                          if (config.type === 'block') {
                            config.value.forEach((value) => {
                              // @ts-ignore
                              delete value.form
                            })
                          }
                          memo[config.collection][key] = config.value
                          return memo
                        },
                        {} as any
                      )
                      const res = await fetch('/api/admin', {
                        method: 'POST',
                        body: JSON.stringify({
                          page,
                          data: serialized,
                        }),
                      })
                      console.log(await res.json())
                      // console.log(page, serialized)
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  )
}
