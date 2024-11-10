import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'

function Navbar() {
    return (
        <div className="flex justify-center items-center h-16 bg-gray-800 shadow-lg">
            <Link to="/" className="mx-4 text-white hover:text-blue-400 text-lg font-semibold">Submit Form</Link>
            <Link to="/view" className="mx-4 text-white hover:text-blue-400 text-lg font-semibold">View Form</Link>
        </div>
    )
}

export default Navbar