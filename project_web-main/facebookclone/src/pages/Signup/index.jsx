import callApiHttp from 'functions/callApiHttp'
import React, { useState } from 'react'

function Signup() {
    const signup = async (e) => {
        e.preventDefault()
        const res = await callApiHttp({
            url: '/user',
            data: {
                firstname,
                lastname,
                email,
                password
            },
            method: 'POST',
        })
        const { data } = res
        if (data.code === 200) {
            window.location.href = '/login'
        } else if(data.code === 400){
            setError('You need to fill all the information!');
        }else if(data.code === 403){
            setError('Your email is used! Try another email!');
        }else {
            setError('Login error! Please, try again!');
        }
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [error, setError] = useState('')
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-200">
            <form
                onSubmit={signup}
                className="w-96 text-black bg-gray-100 rounded-lg p-7 space-y-3"
                style={{ width: '400px' }}
            >
                <div className="flex font-semibold text-3xl">Sign Up</div>
                <div>Quick and Easy</div>
                <hr />
                <div className="flex justify-center space-x-2">
                    <input
                        className="inline min-w-0 p-2 rounded border boder-black-300"
                        placeholder="First name"
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    <input
                        className="inline min-w-0 p-2 rounded border boder-black-300"
                        placeholder="Last name"
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>
                <input
                    className="p-2 w-full rounded border boder-black-300"
                    placeholder="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="p-2 w-full rounded border boder-black-300"
                    placeholder="New password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div className="invalid">{error}</div>}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className=" fb-bg-green text-white px-14 py-2 text-xl rounded focus:outline-none "
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Signup
