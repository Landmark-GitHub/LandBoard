import Image from 'next/image';
import { Aleo, Inter } from 'next/font/google';
import AppBar from '@mui/material/AppBar';
import Navbar from './component/Navbar';
import CardMenu from './component/CardMenu';
import { useRouter } from 'next/router';
import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const inter = Inter({ subsets: ['latin'] });

const Game = ['Onitama', 'Undercover'];

let socket;

export default function Home() {

  const router = useRouter()
  const [user, setUser] = useState(false || router.query.user)

  const selectGame = (name) => {
    console.log('Game'+ name)
    if (user) {
      if (name === 'Undercover') {
        router.push({
          pathname: './Undercover',
          query: { username: user }
        })
      }
    } else {
      alert('LOGIN ก๊อรรนน')
    }
  }

  async function AxiosLogin() {
    await axios.get('./api/login')

    socket = io();
  }

  useEffect(()=>{
    socket
  },[])

  return (
    <main className={`flex min-h-screen flex-col items-center ${inter.className} overflow-hidden`}>
      <Navbar title={'LandBoard'} user={user} setUser={setUser}/>
      <div className='bg-red-300 h-full mt-2 p-2 grid grid-cols-3 gap-1 overflow-x-auto'>
        {Game.map((game) => (
          <CardMenu key={game} title={game}
           onClick={() => selectGame(game)}
           />
        ))}
      </div>
    </main>
  );
}
