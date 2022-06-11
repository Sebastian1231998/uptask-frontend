import React from 'react'

const Avatar = ({iniciales, width, height, margin_top}) => {
    return (
        <div
            className='flex justify-center items-center rounded-full bg-gray-600'
            style={{
                width,
                height
            }}
        >
            <p
                className='h-full font-bold text-2xl text-white'
                style={{ marginTop: margin_top }}
            >{iniciales}</p>
        </div>
    )
}

export default Avatar