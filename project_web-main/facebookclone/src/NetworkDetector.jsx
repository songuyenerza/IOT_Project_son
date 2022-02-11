import ToastError from 'components/ToastError'
import React, { useEffect, useState } from 'react'

export default function handleDisconnectInternet(ComposedComponent) {
    const NetworkDetector = () => {
        const [isDisconnected, setIsDisconnected] = useState(false)
        useEffect(() => {
            handleConnectionChange()
            window.addEventListener('online', handleConnectionChange)
            window.addEventListener('offline', handleConnectionChange)
            return () => {
                window.removeEventListener('online', handleConnectionChange)
                window.removeEventListener('offline', handleConnectionChange)
            }
        }, [])

        const handleConnectionChange = () => {
            const condition = navigator.onLine ? 'online' : 'offline'
            if (condition === 'online') {
                const webPing = setInterval(() => {
                    fetch('//google.com', {
                        mode: 'no-cors',
                    })
                        .then(() => {
                            setIsDisconnected(() => {
                                clearInterval(webPing)
                                return false
                            })
                        })
                        .catch(() => setIsDisconnected(true))
                }, 2000)
                return
            }

            setIsDisconnected(true)
        }

        return (
            <div>
                {isDisconnected && (
                    <ToastError
                        code={404}
                        message="You are currently offline."
                    />
                )}
                <ComposedComponent />
            </div>
        )
    }

    return NetworkDetector
}
