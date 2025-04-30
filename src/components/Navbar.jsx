import React from 'react';
import { Leaf, Calendar, BookOpen, Map, Home, Lightbulb } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-green-700 fixed w-full z-50 top-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center gap-2 text-white">
                    <Leaf className="h-8 w-8" />
                    <span className="font-bold text-xl">GreenPlaces</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {menuItems.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="nav-item text-green-100 hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
                    >
                      {item.icon}
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-green-100 hover:bg-green-600"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    {isOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {menuItems.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="nav-item text-green-100 hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
                  >
                    {item.icon}
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>
      );
}

export default Navbar