import React from 'react';
import Player from './Player';

const Room = ({ username, number, setRoom }) => {
  const players = [];
  const maxPlayers = 6;

  if (players.length < maxPlayers) {
    players.push(username)
  } else {
    alert('Room Full');
    setRoom(false)
  }

  const getEmptyPlayerSlots = () => {
    const emptySlots = maxPlayers - players.length;
    const emptyPlayers = Array(emptySlots).fill(null);
    return emptyPlayers;
  };

  const isRoomFull = players.length === maxPlayers;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-5">
      <div className="bg-black opacity-75 fixed inset-0"></div>
      <div className="bg-white h-full w-full z-20 grid grid-cols-[50%_50%] rounded-lg shadow-xl p-3">
        <button className="absolute top-5 right-5 text-gray-500" onClick={() => setRoom(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-gray-300">{username}</div>

        <div className="p-2 pb-0 grid grid-rows-[10%_20%_70%]">
          <h2 className="text-center text-2xl font-bold mb-4">Room {number}</h2>

          <div className="mt-2 grid grid-rows-2 grid-flow-col">
            <label>time</label>
            <label>turn</label>
            <label>round</label>
            <label>point</label>
          </div>

          <div className="grid grid-cols-2 grid- gap-2 mt-2" style={{ flexDirection: 'row-reverse' }}>
            {[...players.reverse()].map((p, index) => (
               <Player key={index} name={p} />
            ))}
            {!isRoomFull &&
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
