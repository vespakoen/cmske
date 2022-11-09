import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

interface OrderButtonProps {
  canMoveUp: boolean
  canMoveDown: boolean
  onMoveUp: () => void
  onMoveDown: () => void
}

export default function OrderButtons({
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
}: OrderButtonProps) {
  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      {canMoveUp && (
        <button
          type="button"
          onClick={onMoveUp}
          className={`relative inline-flex items-center ${
            canMoveDown ? 'rounded-l-md' : 'rounded-md'
          } border border-gray-300 bg-white px-2 py-1 text-sm hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
        >
          <span className="sr-only">Previous</span>
          <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
      {canMoveDown && (
        <button
          type="button"
          onClick={onMoveDown}
          className={`relative -ml-px inline-flex items-center ${
            canMoveUp ? 'rounded-r-md' : 'rounded-md'
          } border border-gray-300 bg-white px-2 py-1 text-sm hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
        >
          <span className="sr-only">Next</span>
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </span>
  )
}
