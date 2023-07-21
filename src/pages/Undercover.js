import React, { useEffect, useState } from 'react'
import Backgroud from '@/pages/component/Backgroud'
import Navbar from './component/Navbar';
import CardMenu from './component/CardMenu';
import Room from './component/Undercover/Room';
import { useRouter } from 'next/router';
import io from 'socket.io-client';

const socket = io(`http://localhost:3001`);

const Undercover = () => {

    const router = useRouter()

    const ShowRoom = ['1', '2', '3']

    const {username} = router.query
    const [userTotal, setUserTotal] = useState();
    const [room, setRoom] = useState();
    const [selectRoom, setSelectRoom] = useState();

    const [areaRoom, setAreaRoom] = useState(false);

    function backToHome(username) {
        router.push({
            pathname: './',
            query: { user: username }
          })
    }

    const connecGame = () => {
        socket.emit('connecGame', username);
    }

    const joinRoom = (data) => {
        socket.emit('joinRoom', (data));
    }

    useEffect(() => {

        connecGame();

        socket.on('setRoom', (Room) => {
            setRoom(Room); 
        })

        socket.on('updateUser', (users) => {
            setUserTotal(users); 
        })

        socket.on('updateRoom', (Room) => {
            setRoom(Room);
          });

      }, []);

    return (
        <main className={`grid min-h-screen grid-rows-[15%_95%] items-center overflow-hidden`}>
            <div className='pl-2 font-bold text-2xl'> 
                <label className=''>
                    <p onClick={() => backToHome(username)}>Undercover</p>
                    <p>{username || "not"}</p>
                </label>
            </div>
            <div className=' absolute'>
                <button className={`bg-red-300 p-4`} onClick={() => 
                    console.log(room)}>
                    1111
                </button>
                <button className={`bg-red-300 p-4`} onClick={() => {
                    console.log(userTotal)
                    }}>
                    12222
                </button>
                <button className={`bg-red-300 p-4`} onClick={() => {
                    console.log(selectRoom)
                    }}>
                    {username}
                </button>
            </div>
            <div className='bg-red-300 h-full mt-2 p-2 grid grid-cols-3 gap-1 overflow-x-auto'>
                {room ? 
                <>
                    {Object.keys(room).map((number,index) => (
                    <div key={index} onClick={() => {
                        setAreaRoom(true)
                        setSelectRoom(index+1)
                        let info = {
                            room: index+1,
                            name: username
                        }
                        console.log(info)
                        joinRoom(info)
                    }}>

                        <CardMenu title={(index+1)} />
                    </div>
                ))}
                </>
                :
                <>
                    <p> Loading</p>
                </>
                }
            </div>

            {areaRoom && (
                <Room
                    username={username}
                    number={selectRoom}
                    setAreaRoom={setAreaRoom}
                />
            )}

        </main>

    )
}

export default Undercover
