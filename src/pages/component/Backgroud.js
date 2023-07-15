import React from 'react'

const Backgroud = (setRoom) => {
  return (
    <div className="fixed inset-0 transition-opacity">
      <div
      className={`absolute inset-0 z-0 bg-black opacity-75`}
      onClick={() => setRoom(false)}
      ></div>
    </div>
  )
}

export default Backgroud
