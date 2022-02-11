import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <div className="w-screen h-screen flex md:flex-row flex-col fb-bg-xanhnhat text-black">
             <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                <div className="text-2xl font-bold">
                    Chat app project by group 7
                </div>
                <p className="max-w-lg text-center text-lg text-black-400">
                    Members of group: 
                </p>
                <p className="max-w-lg text-center text-lg text-black-400">
                    Lê Thanh Phương 20181696 
                    
                </p>
                <p className="max-w-lg text-center text-lg text-black-400">
                    Nguyễn Trường Sơn 20181732
                    
                </p>
                <p className="max-w-lg text-center text-lg text-black-400">
                Đặng Trung Anh 20181313
                </p>
                
                <p className="max-w-lg text-center text-lg text-black-400">
                Tạ Anh Tú 20174311
                </p>
                <Link
                    to="/"
                    className="fb-bg-pink text-white p-3 rounded-md text-xl font-semiblod"
                >
                    Hello friends
                </Link>
            </div>
        </div>
    )
}

export default HomePage