// import React from 'react'
// import PropTypes from 'prop-types'
// import { RiPencilFill } from 'react-icons/ri'

// const ModalEditAvatar = ({
//     handleSubmitAvatar,
//     previewAvatar,
//     handleChangeAvatar,
//     modalRef,
//     setModal,
// }) => (
//     <div className=" fixed z-10 pt-20 top-0 left-0 w-full h-full overflow-auto bg-black bg-opacity-75 ">
//         <div
//             ref={modalRef}
//             className="relative m-auto p-0 border border-gray-500 rounded-lg w-6/12 fb-bg-dark "
//         >
//             <div className="text-center text-xl font-semibold py-4">
//                 Update Profile Picture
//             </div>
//             <hr />
//             <form onSubmit={handleSubmitAvatar}>
//                 {previewAvatar ? (
//                     <div className="p-4">
//                         <img
//                             src={previewAvatar}
//                             alt="avatarupload"
//                             className="object-cover"
//                         />
//                         <div className="flex justify-end p-4 space-x-3">
//                             <button
//                                 type="button"
//                                 className="px-10 h-9 rounded-lg text-blue-300"
//                                 onClick={() => setModal((x) => !x)}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="px-10 h-9 fb-bg-main rounded-lg"
//                             >
//                                 Save
//                             </button>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="p-4">
//                         <div className="flex flex-row h-9 space-x-2">
//                             <label
//                                 htmlFor="avatar"
//                                 className="rounded-lg text-blue flex-grow bg-blue-400 flex items-center justify-center cursor-pointer"
//                             >
//                                 <input
//                                     id="avatar"
//                                     type="file"
//                                     className="hidden"
//                                     onChange={(e) => handleChangeAvatar(e)}
//                                 />
//                                 Upload Photo
//                             </label>

//                             <button
//                                 type="button"
//                                 className="rounded-lg text-blue flex-grow fb-bg-dark-2"
//                             >
//                                 Add Frame
//                             </button>
//                             <button
//                                 type="button"
//                                 className="rounded-lg text-blue disble fb-bg-dark-2 h-9 w-12 flex items-center justify-center"
//                             >
//                                 <RiPencilFill size="20" />
//                             </button>
//                         </div>
//                         {/* <div className="">
//                             <div>Profile Pictures</div>
//                             <div>list 6 photos</div>
//                         </div>
//                         <div className="">
//                             <div>Cover Photos</div>
//                             <div>list 6 photos</div>
//                         </div> */}
//                     </div>
//                 )}
//             </form>
//         </div>
//     </div>
// )

// ModalEditAvatar.defaultProps = {
//     handleChangeAvatar: () => {},
//     handleSubmitAvatar: () => {},
//     previewAvatar: '',
//     modalRef: '',
//     setModal: () => {},
// }

// ModalEditAvatar.propTypes = {
//     previewAvatar: PropTypes.node,
//     modalRef: PropTypes.node,
//     handleChangeAvatar: PropTypes.func,
//     handleSubmitAvatar: PropTypes.func,
//     setModal: PropTypes.func,
// }

// export default ModalEditAvatar
