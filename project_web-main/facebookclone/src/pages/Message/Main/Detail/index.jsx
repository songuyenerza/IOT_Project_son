import React, { useState } from 'react'
import { FaDotCircle } from 'react-icons/fa'
import { RiEdit2Fill } from 'react-icons/ri'
// absolute
import AvatarBlock16 from 'components/AvatarBlock16'
import LikeFacebook from 'components/LikeFacebook'
import callApiHttp from 'functions/callApiHttp'
import { useMain } from '../contexts'

const Detail = () => {
    const { show, userInfo } = useMain()
    const [showOptions, setShowOptions] = useState(false)
    const [showMedias, setShowMedias] = useState(false)
    const [medias, setMedias] = useState([])

    const handleShowMedias = async () => {
        if (showMedias) {
            setShowMedias(false)
            return 0
        }
        setShowMedias((x) => !x)

        try {
            const { data } = await callApiHttp({
                method: 'GET',
                url: `/conversation/get_all_medias?conversationId=${sessionStorage.getItem(
                    'conversationId'
                )}`,
            })
            // console.log(`data`, data)
            if (data?.code === 1000) {
                setMedias(data.data)
            } else {
                return 0
            }
            return 0
        } catch (error) {
            return 0
        }
    }

    return (
        show && (
            <div className="flex items-center flex-col border-l w-96 p-2 border-gray-600">
                <AvatarBlock16
                    src={userInfo?.avatar}
                    className="w-20 h-20 my-4"
                />
                <div className="font-semibold text-lg pb-3">
                    {userInfo?.username || userInfo?.email || 'null'}
                </div>
                <button
                    type="button"
                    className="p-3 flex justify-between w-full rounded-lg fb-hover-bg-dark cursor-pointer focus:outline-none text-left font-semibold"
                    onClick={() => setShowOptions((x) => !x)}
                >
                    Customize chat
                    {showOptions ? (
                        <svg height="25" width="25" className="inline">
                            <polyline
                                points="7,15 12.5,10 18,15"
                                fill="none"
                                stroke="#a3a6aa"
                                strokeWidth="3px"
                            />
                            Sorry, your browser does not support inline SVG.
                        </svg>
                    ) : (
                        <svg height="25" width="25">
                            <polyline
                                points="7,10 12.5,15 18,10"
                                fill="none"
                                stroke="#a3a6aa"
                                strokeWidth="3px"
                            />
                            Sorry, your browser does not support inline SVG.
                        </svg>
                    )}
                </button>
                {showOptions && (
                    <div className="w-full">
                        <div className="w-full p-3 rounded-lg fb-hover-bg-dark flex flex-row cursor-pointer">
                            <FaDotCircle className="w-5 h-5 fb-cl-main" />
                            <span className="px-2">Cus 1</span>
                        </div>
                        <div className="w-full p-3 rounded-lg fb-hover-bg-dark flex flex-row cursor-pointer">
                            <div className="w-5 h-5 fb-cl-main">
                                <LikeFacebook />
                            </div>
                            <span className="px-2">Cus 2</span>
                        </div>
                        <div className="w-full p-3 rounded-lg fb-hover-bg-dark flex flex-row cursor-pointer">
                            <RiEdit2Fill className="w-5 h-5 fb-cl-main" />
                            <span className="px-2">Cus 3</span>
                        </div>
                    </div>
                )}

                <div className="p-3 w-full rounded-lg fb-hover-bg-dark cursor-pointer font-semibold">
                    Privacy & support
                </div>
                <button
                    type="button"
                    className="p-3 text-left w-full flex justify-between rounded-lg fb-hover-bg-dark focus:outline-none font-semibold "
                    onClick={() => handleShowMedias()}
                >
                    Shared Media
                    {showMedias ? (
                        <svg height="25" width="25" className="inline">
                            <polyline
                                points="7,15 12.5,10 18,15"
                                fill="none"
                                stroke="#a3a6aa"
                                strokeWidth="3px"
                            />
                            Sorry, your browser does not support inline SVG.
                        </svg>
                    ) : (
                        <svg height="25" width="25">
                            <polyline
                                points="7,10 12.5,15 18,10"
                                fill="none"
                                stroke="#a3a6aa"
                                strokeWidth="3px"
                            />
                            Sorry, your browser does not support inline SVG.
                        </svg>
                    )}
                </button>
                {showMedias && (
                    <div className="w-full">
                        {medias?.length > 0 ? (
                            medias.map((media) => {
                                const images = JSON.parse(media.content)
                                return images.map((image) => (
                                    <img
                                        className="w-28 h-28 object-cover inline m-1"
                                        src={image}
                                        alt="media_image"
                                        key={image}
                                    />
                                ))
                            })
                        ) : (
                            <div className="text-center">No media</div>
                        )}
                    </div>
                )}
            </div>
        )
    )
}

export default Detail
