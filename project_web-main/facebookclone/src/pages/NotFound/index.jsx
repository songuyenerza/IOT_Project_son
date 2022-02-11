import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
            <div className="text-2xl font-bold">
                This Content Isn&apos;t Available Right Now
            </div>
            <p className="max-w-lg text-center text-lg text-gray-400">
                When this happens, it&apos;s usually because the owner only
                shared it with a small group of people, changed who can see it
                or it&apos;s been deleted.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-blue-900 rounded-lg hover:bg-blue-800"
            >
                Home Page
            </Link>
        </div>
    )
}

export default NotFound
