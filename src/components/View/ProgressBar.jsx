import React, { useEffect, useState } from 'react'

const ProgressBar = ({value,max, onComplete=()=>{}}) => {
    console.log(max);
    const [progress, setProgress] = useState(value);
  if(value>=100)onComplete();
    useEffect(()=>{
        setProgress(Math.min(max, Math.max(value, 0)));
    },[value])
  return (
    
    <div   className='bg-white'
    style={{
    width: '100%', // Note that it's enclosed in single quotes
    height: '5vh',  // Corrected height value with 'vh' unit
    borderRadius: '20px',
    backgroundColor: 'blue',
    overflow: 'hidden',
  }} >
  
        <span style={{color:progress>4999?'white':'green'}}>{progress.toFixed()}</span>
      <div 
      style={{
    width: '100%', // Note that it's enclosed in single quotes
    height: '5vh',  // Corrected height value with 'vh' unit
    borderRadius: '20px',
    backgroundColor: 'blue',
    overflow: 'hidden',
    transform:`scaleX(${progress/max})`,transformOrigin:'left'
  }}
  className='bg-white'
      role='progressbar'
      aria-valuemin={0}
      aria-valuemax={100000}
      aria-valuenow={progress.toFixed()}
        />
    </div>
  )
}

export default ProgressBar
