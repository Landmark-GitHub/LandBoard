import React, { useEffect, useState } from 'react';
import Player from './Player';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Connect to the server

const Room = (props) => {

  //props
  // username={username}
  // selectRoom={selectRoom} 
  // setAreaRoom={setAreaRoom} ปิดเปิด modal
  // setRoom={setRoom} เก็บ location ทั้งมมด เพื่อไปบอกจำนวนเต็มงงหห้อง

  const [locations, setLocation] = useState(null);
  const number = props.selectRoom;
  const [element, setElement] = useState([]);
  const MaxPlayer = 6

  const getEmptyPlayerSlots = () => {
    if (!locations || !locations[props.number]) {
      return []; // Return an empty array if locations or the selected room is not available
    }
  
    const maxPlayerSlots = MaxPlayer; // The maximum number of player slots allowed
    const playersInRoom = locations[props.number].length; // The number of players in the selected room
  
    const emptySlots = [];
  
    for (let i = playersInRoom; i < maxPlayerSlots; i++) {
      emptySlots.push(i + 1); // Add the slot number (1-indexed) to the emptySlots array
    }
  
    return emptySlots;
  };
  useEffect(() => {

    socket.on('updateRoom', (Room) => {
      setLocation(Room);
      setElement(Room[props.number] || [])
    });

  }, [element]);

    return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-5">
      <div className="bg-black opacity-75 fixed inset-0"></div>
      <div className="bg-white h-full w-full z-20 grid grid-cols-[50%_50%] rounded-lg shadow-xl p-3">
        <button className="absolute top-5 right-5 text-gray-500" onClick={() => props.setAreaRoom(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-gray-300">{props.username}</div>

        <div className="p-2 pb-0 grid grid-rows-[10%_20%_70%]">
          <h2 className="text-center text-2xl font-bold mb-4"
          onClick={() => console.log(locations)}
          >Room {props.number}</h2>

          <div className="mt-2 grid grid-rows-2 grid-flow-col">
            <label onClick={() => {console.log(element)}}>time</label>
            <label>turn</label>
            <label>round</label>
            <label>point</label>
          </div>

          <div className="grid grid-cols-2 grid- gap-2 mt-2" style={{ flexDirection: 'row-reverse' }}>
            
            {[...element.reverse()].map((p, index) => (
               <Player key={index} name={p.name} />
            ))}
            { element.length < MaxPlayer &&
              getEmptyPlayerSlots().map((_, index) => (
                <div key={index} className="bg-gray-300 rounded-lg p-4">
                  Vacant
                </div>
              ))}

          </div>
        </div>
      </div>
    </div>
  );

};

export default Room;

