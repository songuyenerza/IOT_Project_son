import callApiHttp from 'functions/callApiHttp'
import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const Login = () => {
    const location = useLocation()

    const { from } = location.state || { from: { pathname: '/' } }
    const login = async (e) => {
        e.preventDefault()
        try {
            const res = await callApiHttp({
                method: 'POST',
                url: '/token/login',
                data: {
                    email,
                    password,
                },
            })
            const { data } = res
            if (data.code === 200) {
                localStorage.setItem('user_id', data?.user_id)
                localStorage.setItem('token', data?.token)
                window.location.href = from.pathname
            } else if(data.code === 400){
                setError('You need to fill all the information!');
            }else if(data.code === 402){
                setError('Your email or password is incorrect!');
            }else {
                setError('Login error! Please, try again!');
            }
        } catch (error) {
            setError(error.message)
        }
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    return (
        <div className="w-screen h-screen flex md:flex-row flex-col fb-bg-xanhnhat text-black">
            <div className="md:flex-1 box-content flex flex-col justify-center pl-20 space-y-5">
                <span className="text-red-500 font-bold text-5xl">
                    Chat app 
                </span>
                <span className="text-black font-semibold text-xl">
                    Chat app do nhóm 7 xây dựng sẽ giúp bạn được điểm cao môn học
                </span>
            </div>
            <div className="flex-1  flex items-center justify-center p-10">
                <form
                    onSubmit={login}
                    className="bg-gray-100 rounded-md space-y-4 w-min p-4"
                >
                    <input
                        className="p-4 rounded-md outline-none w-96 border border-gray-300"
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                    />
                    <input
                        type="password"
                        className="p-4 rounded-md outline-none w-96 border border-gray-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    {error && <div className="invalid">{error}</div>}
                    <button
                        type="submit"
                        className="fb-bg-green focus:outline-none p-3 text-white text-2xl font-semibold rounded-md w-96"
                    >
                        Đăng nhập
                    </button>
                    <hr />
                    <div className="text-red-500 text-sm text-center">
                        <Link to="/forgotten_password">
                            Quên mật khẩu ư :)))
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <NavLink
                            to="/signup"
                            className="fb-bg-pink text-white p-3 rounded-md text-xl font-semiblod"
                        >
                            Tạo tài khoản mới
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login
