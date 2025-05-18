import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary-600">
              AI Model Benchmark
            </Link>
          </div>
          <nav className="flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-primary-600">
              Dashboard
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary-600">
              About
            </Link>
            <Link href="/video-models" className="text-gray-600 hover:text-primary-600">
              Video Models
            </Link>
            <Link href="/audio-models" className="text-gray-600 hover:text-primary-600">
              Audio Models
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
} 