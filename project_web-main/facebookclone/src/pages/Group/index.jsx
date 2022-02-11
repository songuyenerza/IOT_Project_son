import callApiHttp from 'functions/callApiHttp'
import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const Group = () => {
    const location = useLocation()

    const { from } = location.state || { from: { pathname: '/' } }

    const [roomName, setRoomName] = useState('')
    const [err, setError] = useState('')

    const login = async (e) => {
        e.preventDefault()
        try {
            const res = await callApiHttp({
                method: 'POST',
                url: '/conversation/group',
                data: {
                    "name": roomName
                },
            })
            const { data } = res

            console.log(data)
            if (res.status === 200) {
                // localStorage.setItem('user_id', data?.user_id)
                // localStorage.setItem('token', data?.token)
                window.location.href = from.pathname
            } else if(res.status === 400){
                setError('You need to fill all the information!');
            }else if(res.status === 402){
                setError('Your email or password is incorrect!');
            }else {
                setError('Login error! Please, try again!');
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="w-screen h-screen flex md:flex-row flex-col fb-bg-xanhnhat text-black">
            <div className="flex-1  flex items-center justify-center p-10">
                <form
                    onSubmit={login}
                    className="bg-gray-100 rounded-md space-y-4 w-min p-4"
                >
                    <input
                        className="p-4 rounded-md outline-none w-96 border border-gray-300"
                        id="email"
                        type="text"
                        name="name"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        placeholder="Nhập tên phòng"
                    />
                    {err && <div className="invalid">{err}</div>}
                    <button
                        type="submit"
                        className="fb-bg-green focus:outline-none p-3 text-white text-2xl font-semibold rounded-md w-96"
                    >
                        Đăng ký phòng mới
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Group
