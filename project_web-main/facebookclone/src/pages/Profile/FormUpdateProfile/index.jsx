// import React from 'react'
// import { useForm } from 'react-hook-form'
// import PropTypes from 'prop-types'

// const FormUpdateProfile = ({ handleSubmitInfo, userInfo }) => {
//     const { register, handleSubmit, formState: { errors } } = useForm()

//     return (
//         <form
//             className="flex flex-col space-y-2 border border-white p-4 mb-10"
//             onSubmit={handleSubmit(handleSubmitInfo)}
//         >
//             <div className="text-2xl font-semibold">Update your profile</div>
//             <label htmlFor="firstname">
//                 <div className="w-20 inline-block">First Name:</div>

//                 <input
//                     name="firstname"
//                     type="text"
//                     placeholder="First Name"
//                     defaultValue={userInfo?.firstname}
//                     className="rounded-full focus:outline-none p-2 fb-bg-dark-2"
//                     ref={register({ required: true })}
//                 />
//             </label>
//             <label htmlFor="lastname">
//                 <div className="w-20 inline-block">Last Name:</div>

//                 <input
//                     name="lastname"
//                     type="text"
//                     placeholder="Last Name"
//                     defaultValue={userInfo?.lastname}
//                     className="rounded-full focus:outline-none p-2 fb-bg-dark-2"
//                     ref={register({ required: true })}
//                 />
//             </label>
//             <label htmlFor="username">
//                 <div className="w-20 inline-block">Username:</div>

//                 <input
//                     name="username"
//                     placeholder="Username"
//                     defaultValue={userInfo?.username}
//                     className="rounded-full focus:outline-none p-2 fb-bg-dark-2"
//                     ref={register({required: true })}
//                 />
//             </label>
//             <label htmlFor="email">
//                 <div className="w-20 inline-block">Email:</div>

//                 <input
//                     name="email"
//                     placeholder="email"
//                     defaultValue={userInfo?.email}
//                     className="rounded-full focus:outline-none p-2 fb-bg-dark-2"
//                     disabled
//                 />
//             </label>
//             <label htmlFor="birthday">
//                 <div className="w-20 inline-block"> Birthday:</div>

//                 <input
//                     name="birthday"
//                     type="date"
//                     defaultValue={userInfo?.birthday}
//                     placeholder="birthday"
//                     className="rounded-full focus:outline-none p-2 fb-bg-dark-2"
//                     ref={register({ required: true })}
//                 />
//             </label>
//             {errors.birthday && <span className="invalid">You need fill all the informations</span>}
//             <button className="w-20 p-2 fb-bg-main rounded-lg" type="submit">
//                 Save
//             </button>
//         </form>
//     )
// }

// FormUpdateProfile.defaultProps = {
//     userInfo: {},
//     handleSubmitInfo: () => {},
// }

// FormUpdateProfile.propTypes = {
//     userInfo: PropTypes.objectOf(PropTypes.any),
//     handleSubmitInfo: PropTypes.func,
// }

// export default FormUpdateProfile
