import React, { useEffect, useState } from 'react';

const Player = ({name}) => {
  return (
    <div className="bg-green-300 rounded-lg p-4">{name}</div>
  )
}

export default Player
