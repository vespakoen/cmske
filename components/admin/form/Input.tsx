import { ChangeEventHandler } from 'react'

interface InputProps {
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export default function Input({ label, value, onChange }: InputProps) {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
      <label
        htmlFor="url"
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        {label}
      </label>
      <div className="mt-1 sm:col-span-2 sm:mt-0 mb-5">
        <div className="flex max-w-lg rounded-md shadow-sm">
          {/* <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
            /
          </span> */}
          <input
            type="text"
            value={value}
            onChange={onChange}
            name="url"
            id="url"
            autoComplete="url"
            className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  )
}
