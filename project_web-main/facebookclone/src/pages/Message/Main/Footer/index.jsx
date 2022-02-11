/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
    forwardRef,
    memo,
    useImperativeHandle,
    useRef,
    useState,
} from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BiImageAdd } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import { REACT_APP_API_URL } from 'commons/constants'
import axios from 'axios'
import LikeFacebook from 'components/LikeFacebook'
import GEmoji from 'components/GEmoji'
import AddIconFacebook from 'components/AddIconFacebook'
import ImagePickerIconFacebook from 'components/ImagePickerIconFacebook'
import StickerFacebook from 'components/StickerFacebook'
import GifIconFacebook from 'components/GifIconFacebook'
import EmojiPickerIconFacebook from 'components/EmojiPickerIconFacebook'
import SendIconFacebook from 'components/SendIconFacebook'
import classNames from 'classnames'
import { useMain } from '../contexts'

const Footer = (props, ref) => {
    const { id } = useParams()
    const [message, setMessage] = useState(sessionStorage.getItem(id) || '')
    const {
        handleTypingHook,
        handleSubmitSendMessage,
        changing,
        setChanging,
    } = useMain()
    const inputRef = useRef()
    const [file, setFile] = useState([])
    const [imagePreviewUrl, setImagePreviewUrl] = useState([])
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus()
        },
    }))

    const handleTyping = (e, flag = false) => {
        setMessage(e.target.value)
        if (!e.target.value && changing) {
            setChanging(false)
            handleTypingHook(false)
        }
        if (e.target.value && changing !== flag) {
            setChanging(flag)
            handleTypingHook(flag)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setShowPikerEmoji(false)
        setChanging(false)
        handleTypingHook(false)
        setImagePreviewUrl([])
        if (file?.length > 0) {
            const formData = new FormData()
            for (let i = 0; i < file.length; i += 1) {
                formData.append(`images`, file[i])
            }
            const { data } = await axios({
                method: 'post',
                url: `${REACT_APP_API_URL}/upload/image`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': `${localStorage.getItem('token')}`,
                },
            })
            if (data.code === 200) {
                setFile([])
                handleSubmitSendMessage(JSON.stringify(data.data), 'images')
            } else {
                setFile([])
            }
        }
        message && handleSubmitSendMessage(message)
        !message &&
            file?.length === 0 &&
            handleSubmitSendMessage(message, 'react')
    }

    const handleChangeFile = (e) => {
        e.preventDefault()
        const { files } = e.target
        for (let i = 0; i < files.length; i += 1) {
            const reader = new FileReader()
            const fileE = files[i]
            reader.onloadend = () => {
                setFile((x) => [...x, fileE])
                setImagePreviewUrl((x) => [...x, reader.result])
            }
            reader.readAsDataURL(fileE)
        }
    }
    const handleRemoveFile = (index) => {
        setFile((x) => [...x.slice(0, index), ...x.slice(index + 1)])
        setImagePreviewUrl((x) => [...x.slice(0, index), ...x.slice(index + 1)])
    }

    const handlePickEmoji = (e) => {
        setMessage((x) => x + e)
    }

    const [showPikerEmoji, setShowPikerEmoji] = useState(false)

    return (
        <>
            <div className="flex flex-row items-center p-1" />

            <form
                onSubmit={handleSubmit}
                className={classNames(
                    'w-full relative bg-gray-600 rounded-3xl p-2',
                    {
                        'rounded-2xl': imagePreviewUrl?.length > 0,
                    }
                )}
                id="messageForm"
            >
                <div
                    className={classNames('space-x-2', {
                        'm-1': imagePreviewUrl?.length > 0,
                    })}
                >
                    {imagePreviewUrl &&
                        imagePreviewUrl.map((e, index) => (
                            <div className="relative inline-block" key={e}>
                                <img
                                    src={e}
                                    alt="hihi"
                                    className="w-12 h-12 rounded-lg"
                                />
                                <AiFillCloseCircle
                                    className="absolute top-0 right-0 text-gray-800 bg-white w-5 h-5 rounded-full -mr-2 -mt-2"
                                    onClick={() => handleRemoveFile(index)}
                                />
                            </div>
                        ))}
                    {imagePreviewUrl?.length > 0 && (
                        <label
                            htmlFor="image"
                            className="inline-block w-12 text-black h-12 bg-gray-400 p-2 rounded-lg cursor-pointer"
                        >
                            <BiImageAdd className="w-8 h-8" />
                        </label>
                    )}
                </div>
                <div className="w-full flex px-1">
                    <input
                        id="image"
                        type="file"
                        className="hidden"
                        onChange={(e) => handleChangeFile(e)}
                        multiple
                    />
                    <input
                        ref={inputRef}
                        type="text"
                        name="message"
                        className="flex-grow bg-gray-600  focus:outline-none"
                        placeholder="Aa"
                        autoComplete="off"
                        value={message}
                        onInput={(e) => handleTyping(e, true)}
                        onBlur={(e) => handleTyping(e, false)}
                    />
                </div>
            </form>
            {message ? (
                <button
                    type="submit"
                    className="flex-shrink-0 rounded-full w-9 h-9 bg-opacity-0 cursor-pointer hover:bg-gray-600 p-2 focus:outline-none"
                    form="messageForm"
                >
                    <SendIconFacebook />
                </button>
            ) : (
                <button
                    type="submit"
                    className="flex-shrink-0 rounded-full p-2 bg-opacity-0 cursor-pointer hover:bg-gray-600 p-1 focus:outline-none"
                    form="messageForm"
                >
                    <LikeFacebook />
                </button>
            )}
        </>
    )
}

export default memo(forwardRef(Footer))
