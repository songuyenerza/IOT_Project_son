// import { useEffect, useRef, useState } from 'react'
// import callApiHttp from 'functions/callApiHttp'
// import { useUser } from 'hooks/useUser'

// const useHookProfile = () => {
//     const user = useUser()
//     const { userInfo = null } = user
//     const modalRef = useRef(null)

//     const [modal, setModal] = useState()
//     const [loadingCover, setLoadingCover] = useState(false)

//     const [avatar, setAvatar] = useState()
//     const [previewAvatar, setPreviewAvatar] = useState()
//     const handleChangeAvatar = (e) => {
//         e.preventDefault()
//         const file = e.target.files[0]
//         const reader = new FileReader()
//         reader.onloadend = () => {
//             setAvatar(file)
//             setPreviewAvatar(reader.result)
//         }
//         reader.readAsDataURL(file)
//     }

//     const handleChangeCover = async (e) => {
//         setLoadingCover(true)
//         e.preventDefault()
//         const file = e.target.files[0]
//         const formData = new FormData()
//         formData.append('cover_image', file)
//         const { data } = await callApiHttp({
//             method: 'POST',
//             url: '/user/upload_cover_image',
//             data: formData,
//         })
//         if (data.code === 200) {
//             setLoadingCover(false);
//         } else {
//             alert('Change your cover image fail! Try again!');
//         }
//     }

//     const handleSubmitAvatar = async (e) => {
//         e.preventDefault()
//         const formData = new FormData()
//         formData.append('avatar', avatar)

//         const { data } = await callApiHttp({
//             method: 'POST',
//             url: '/user/upload_avatar',
//             data: formData,
//         })
//         if (data.code === 200) {
//             setModal(false)
//             setAvatar(null)
//         } else {
//             alert('Change avatar fail! Try again!');
//         }
//     }

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (modalRef.current && !modalRef.current.contains(event.target))
//                 setModal(false)
//         }
//         document.addEventListener('mousedown', handleClickOutside)
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside)
//         }
//     }, [modalRef])

//     const handleUnfriend = async (userId) => {
//         try {
//             const { data } = await callApiHttp({
//                 method: 'POST',
//                 url: '/friend/set_unfriend',
//                 data: {
//                     userId,
//                 },
//             })
//             if (data.code === 200) {
//                 // alert('success')
//             } else {
//                 // alert('failed')
//             }
//         } catch (error1) {
//             // setError(error1?.message)
//         }
//     }

//     const handleSubmitInfo = async (payload) => {
//         try {
//             const { data } = await callApiHttp({
//                 method: 'PUT',
//                 url: `/user`,
//                 data: payload,
//             })
//             if (data.code === 200) {
//                 alert('Update profile success.')
//             } else {
//                 alert('Update profile fail!')
//             }
//         } catch (error1) {
//             alert(`Error: ${error1}`)
//         }
//     }

//     return {
//         userInfo,
//         handleChangeCover,
//         modal,
//         setModal,
//         avatar,
//         setAvatar,
//         modalRef,
//         handleSubmitAvatar,
//         previewAvatar,
//         setPreviewAvatar,
//         handleChangeAvatar,
//         handleUnfriend,
//         handleSubmitInfo,
//         loadingCover,
//         setLoadingCover,
//     }
// }

// export default useHookProfile
