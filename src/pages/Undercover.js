import React, { useState } from 'react'
import Backgroud from '@/pages/component/Backgroud'
import Navbar from './component/Navbar';
import CardMenu from './component/CardMenu';
import Room from './component/Undercover/Room';
import { useRouter } from 'next/router';

const ShowRoom = ['1', '2', '3']

const Undercover = () => {

    const router = useRouter()

    const {username} = router.query

    const [room, setRoom] = useState(null);

    function backToHome(username) {
        router.push({
            pathname: './',
            query: { user: username }
          })
    }

    return (
        <main className={`grid min-h-screen grid-rows-[15%_95%] items-center overflow-hidden`}>
            <div className='pl-2 font-bold text-2xl'> 
                <label onClick={() => backToHome(username)}>Undercover {username}</label>
            </div>
            <div className='bg-red-300 h-full mt-2 p-2 grid grid-cols-3 gap-1 overflow-x-auto'>
                {ShowRoom.map((room) => (
                    <div key={room} onClick={() => {
                        setRoom(room)
                        console.log('llel' + room)
                    }}>

                        <CardMenu title={room} />
                    </div>
                ))}
            </div>

            {room != null && room != false && (
                <Room
                    username={username}
                    number={room}
                    setRoom={setRoom}
                />
            )}

        </main>

    )
}

export default Undercover
