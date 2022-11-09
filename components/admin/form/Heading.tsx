export default function Heading({ title, description }: any) {
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
      <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
    </div>
  )
}
