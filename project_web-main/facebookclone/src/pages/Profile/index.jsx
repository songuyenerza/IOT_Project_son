// import React, { useState, useEffect } from 'react'
// import { ProvideUser, useProvideUser} from 'hooks/useUser'
// import callApiHttp from 'functions/callApiHttp'
// import logo from 'assets/images/avatar.png'
// import { IoIosCamera } from 'react-icons/io'

// import useHookProfile from './hooks'
// import ListsFriendsProfile from './ListFriends'
// import FormUpdateProfile from './FormUpdateProfile'
// import NavProfile from './NavProfile'
// import DropdownEditCover from './DropdownEditCover'
// import ModalEditAvatar from './ModalEditAvatar'

// const ProfileImpl = () => {
//     const {
//         modal,
//         setModal,
//         modalRef,
//         avatar,
//         setAvatar,
//         previewAvatar,
//         setPreviewAvatar,
//         handleChangeAvatar,
//         handleUnfriend,
//         setLoadingCover,
//         loadingCover
//     } = useHookProfile()

//     useProvideUser();
//     const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user_info')))
//     const [showOptionsEditCover, setShowOptionsEditCover] = useState(false)

//     useEffect(() => {
//         setUserInfo(JSON.parse(localStorage.getItem('user_info')))
//     })

//     const fetchUserInfo = async () => {
//         try {
//             const res = await callApiHttp({
//                 url: `/user`,
//                 method: 'GET',
//             })
//             const { data } = res
//             if (data.code === 200) {
//                 setUserInfo(data.data)
//                 localStorage.setItem('user_info', JSON.stringify(data.data))
//             } else {
//                 alert(`Error : ${res}`)
//             }
//         } catch (error) {
//             alert(`Error : ${error}`)
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
//                 await fetchUserInfo();
//                 alert('Update profile success.')
//             } else {
//                 alert('Update profile fail!')
//             }
//         } catch (error) {
//             alert(`Error: ${error}`)
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
//             setPreviewAvatar()
//             await fetchUserInfo()
//         } else {
//             alert('Change avatar fail! Try again!');
//         }
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
//             await fetchUserInfo();
//             setLoadingCover(false);
//         } else {
//             alert('Change your cover image fail! Try again!');
//         }
//     }

//     return (
//         <div className="w-full min-h-full flex flex-col fb-bg-dark">
//             <div className="h-96 relative pb-4 box-content flex flex-row justify-center fb-bg-dark-2">
//                 <div className="relative" style={{ width: '940px' }}>
//                     {loadingCover && (
//                         <>
//                             <div className="absolute top-0 left-0 bg-black w-full h-full bg-opacity-75" />
//                             <div className="loader bg-black w-full" />
//                         </>
//                     )}
//                     <img
//                         src={userInfo?.cover_image || logo}
//                         className="rounded-lg h-96 object-cover"
//                         style={{ width: '940px' }}
//                         alt="cover_image"
//                     />
//                     <div className="absolute bottom-0 right-0 m-4">
//                         <button
//                             type="button"
//                             onClick={() => setShowOptionsEditCover((x) => !x)}
//                             className="bg-gray-400 bg-opacity-25 hover:bg-opacity-50 p-2 rounded-lg font-semibold text-lg"
//                         >
//                             Edit cover photo
//                         </button>
//                         {showOptionsEditCover && (
//                             <DropdownEditCover
//                                 handleChangeCover={handleChangeCover}
//                             />
//                         )}
//                     </div>
//                 </div>
//                 <div
//                     className="absolute bottom-0 left-1/2"
//                     style={{ marginLeft: '-64px' }}
//                 >
//                     <img
//                         src={userInfo?.avatar || logo}
//                         className="rounded-full w-32 h-32 border-4 border-black object-cover"
//                         alt="avatar_image"
//                     />

//                     <IoIosCamera
//                         className="w-7 h-7 absolute bottom-0 right-0 m-2 bg-gray-900 p-1 rounded-full cursor-pointer"
//                         onClick={() => setModal((x) => !x)}
//                     />
//                     {modal && (
//                         <ModalEditAvatar
//                             modalRef={modalRef}
//                             setModal={setModal}
//                             previewAvatar={previewAvatar}
//                             handleChangeAvatar={handleChangeAvatar}
//                             handleSubmitAvatar={handleSubmitAvatar}
//                         />
//                     )}
//                 </div>
//             </div>
//             <div>
//                 <div className="text-4xl font-bold text-center">
//                     {`${userInfo.firstname} ${userInfo.lastname}` || 'Name'}
//                 </div>
//             </div>
//             <div className="px-72">
//                 <NavProfile />
//                 <FormUpdateProfile
//                     userInfo={userInfo}
//                     handleSubmitInfo={handleSubmitInfo}
//                 />
//                 {/* <ListsFriendsProfile
//                     friends={userInfo?.friends}
//                     handleUnfriend={handleUnfriend}
//                 /> */}
//             </div>
//         </div>
//     )
// }

// const Profile = () => (
//     <ProvideUser>
//         <ProfileImpl />
//     </ProvideUser>
// )

// export default Profile
