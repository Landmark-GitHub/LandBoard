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

    const {username} = router.query
    const [userTotal, setUserTotal] = useState([]);
    const [room, setRoom] = useState();
    const [selectRoom, setSelectRoom] = useState();

    const [areaRoom, setAreaRoom] = useState(false);

    const backToHome = (username) => {

        router.push(`http://localhost:3000/?username=${username}`)

        socket.emit('outGame', username);
    }

    const connecGame = () => {
        socket.emit('connecGame', username);
    }

    const joinRoom = (index) => {
        setAreaRoom(true)
        setSelectRoom(index)
        let info = {
            room: index,
            name: username
        }
        console.log(info)
        socket.emit('joinRoom', (info));
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

      }, [userTotal]);

    return (
        <main className={`grid min-h-screen grid-rows-[15%_95%] items-center overflow-hidden`}>
            <div className='pl-2 font-bold text-2xl'> 
                <label className='grid grid-rows-[50%_50%]'>
                    <label>
                        <button
                        className='p-2 bg-slate-800 hover:scale-105'
                        onClick={() => {backToHome(username)}}>
                            backJa
                        </button>
                        <p>Undercover</p>
                    </label>
                    <label>
                        <p>{username || "not"}</p>
                        <p>{userTotal.length} online</p>
                    </label>
                </label>
            </div>
            <div className=' absolute'>
                <button className={`bg-red-300 p-4`} onClick={() => 
                    console.log(room)}>
                    Room Total
                </button>
                <button className={`bg-red-300 p-4`} onClick={() => {
                    console.log(userTotal)
                    }}>
                    user Total
                </button>
                {/* <button className={`bg-red-300 p-4`} onClick={() => {
                    console.log(selectRoom)
                    }}>
                    {username}
                </button> */}
            </div>
            <div className='bg-red-300 h-full mt-2 p-2 grid grid-cols-3 gap-1 overflow-x-auto'>
                {room ? 
                <>
                    {Object.keys(room).map((number,index) => (
                    <div key={index} onClick={() => joinRoom(index+1)}>
                        <CardMenu title={(index+1)} data={room[number].length} />
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
