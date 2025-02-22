import React from 'react';
import { Code2, Home } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md h-[62px]">
      <div className="mx-auhref px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">CodePractice</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle/>
            <Link href="/" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link 
              href="/problems" 
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Problems
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}