const routes = [
    {
        path: '/',
        name: 'Home',
    },
    {
        path: '/login',
        name: 'Login',
    },
    {
        path: '/signup',
        name: 'Signup',
    },
    {
        path: '*',
        name: 'NotFound',
    },
    // {
    //     path: '/message/:id',
    //     name: 'Message',
    // },
    {
        path: '/message',
        name: 'Message',
    },
    {
        path: '/profile',
        name: 'Profile',
    },
    {
        path: '/friend',
        name: 'Friend',
    },
    {
        path: '/landing',
        name: 'Landing',
    },
]

export default routes
