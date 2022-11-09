'use client'

import Image from 'next/image'

export default function DesktopNav({ navigation, user }: any) {
  return (
    <div className="hidden xl:flex xl:flex-shrink-0">
      <div className="flex w-20 flex-col">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-indigo-600">
          <div className="flex-1">
            <div className="flex items-center justify-center bg-indigo-700 py-4">
              <Image
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                alt="Your Company"
                width={50}
                height={50}
                unoptimized
              />
            </div>
            <nav
              aria-label="Sidebar"
              className="flex flex-col items-center space-y-3 py-6"
            >
              {navigation.map((item: any) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center rounded-lg p-4 text-indigo-200 hover:bg-indigo-700"
                >
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">{item.name}</span>
                </a>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 pb-5">
            <a href="#" className="w-full flex-shrink-0">
              <Image
                className="mx-auto block h-10 w-10 rounded-full"
                src={user.imageUrl}
                alt=""
                width={50}
                height={50}
              />
              <div className="sr-only">
                <p>{user.name}</p>
                <p>Account settings</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
