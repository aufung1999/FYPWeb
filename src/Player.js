import React, { useEffect, useRef } from 'react'

function Player({ playing, seekTime, onTimeUpdate, onLoadedData, srcData, index }) {
    // let audio = new Audio(srcData)
    // console.log('srcData: ' + srcData)
    const ref = useRef(null);
    if (ref.current) playing == index ? ref.current.play() : ref.current.pause();
    //updates audio element only on seekTime change (and not on each rerender):

    // useEffect(() => (ref.current.currentTime = seekTime), [seekTime]);  ############################
    return (
      <audio
        src={srcData}
        ref={ref}
        onTimeUpdate={onTimeUpdate}
        onLoadedData={onLoadedData}
        key={index}
      />
    );
  }
export default Player