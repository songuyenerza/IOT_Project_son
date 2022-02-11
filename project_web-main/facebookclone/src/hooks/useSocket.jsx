// import { API_URL } from "commons/constants";
// import { JOIN } from "commons/socketEvents";
// import React, { useContext, createContext, useEffect, useRef } from "react";
// import io from "socket.io-client";

// const socketContext = createContext();

// function ProvideSocket({ children }) {
//     const socket = useProvideSocket();
//     return (
//         <socketContext.Provider value={socket}>
//             {children}
//         </socketContext.Provider>
//     );
// }

// function useSocket() {
//     return useContext(socketContext);
// }

// function useProvideSocket() {
    
//     let socketRef = useRef()

//     useEffect(() => {
//         socketRef.current = io(API_URL)
//         return () => {
//             socketRef.current&& socketRef.current.disconnect()
//         }
//     })
//     console.log("curren", socketRef)

//     return {
//         socketRef
//     };
// }

// export {
//     ProvideSocket,
//     useSocket,
//     useProvideSocket,
// }