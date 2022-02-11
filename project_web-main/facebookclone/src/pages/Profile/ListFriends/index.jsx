// import React from 'react'
// import PropTypes from 'prop-types'

// const ListsFriendsProfile = ({ friends, handleUnfriend }) => (
//     <div>
//         <div>friends: </div>
//         <div className="pl-20">
//             {friends.length > 0 ? (
//                 friends.map((friend) => (
//                     <div key={friend}>
//                         {friend}
//                         <button
//                             type="button"
//                             onClick={() => handleUnfriend(friend)}
//                         >
//                             Unfriend
//                         </button>
//                     </div>
//                 ))
//             ) : (
//                 <div>You have no friend</div>
//             )}
//         </div>
//     </div>
// )

// ListsFriendsProfile.defaultProps = {
//     friends: [],
//     handleUnfriend: () => {},
// }

// ListsFriendsProfile.propTypes = {
//     friends: PropTypes.arrayOf(PropTypes.any),
//     handleUnfriend: PropTypes.func,
// }

// export default ListsFriendsProfile
