
import { useState, useRef,useEffect } from 'react'
import './App.css'

function App() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [start, setStart] = useState(false);
  const [time, setTime] = useState('00:00:00');
  const [laps, setLaps] = useState([]);

  const timeRef = useRef(null);

  const startStopwatch = () => {
    setStart(true);
  };

  const stopStopwatch = () => {
    setStart(false);
  };

  const resetStopwatch = () => {
    setHour(0);
    setMinute(0);
    setSecond(0);
    setTime('00:00:00');
    setStart(false);
  };

  const lapStopwatch = () => {
    const lapTime = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`;
    setLaps(prevLaps => [...prevLaps, lapTime]);
  };

  useEffect(() => {
    if (start) {
      timeRef.current = setInterval(() => {
        setSecond(prevSecond => {
          let newSecond = prevSecond + 1;
          if (newSecond === 60) {
            newSecond = 0;
            setMinute(prevMinute => {
              let newMinute = prevMinute + 1;
              if (newMinute === 60) {
                newMinute = 0;
                setHour(prevHour => prevHour + 1);
              }
              return newMinute;
            });
          }
          return newSecond;
        });
      }, 1000);
    } else {
      clearInterval(timeRef.current);
    }

    return () => clearInterval(timeRef.current);
  }, [start]);

  useEffect(() => {
    const h = hour < 10 ? '0' + hour : hour;
    const m = minute < 10 ? '0' + minute : minute;
    const s = second < 10 ? '0' + second : second;
    setTime(`${h}:${m}:${s}`);
  }, [hour, minute, second]);


  

   


 

  
  


  return (
    <>
    <div className='flex flex-col items-center mt-10 m-3 '>
      <div className='text-3xl mb-48'>StopWatch</div>
      <div className='flex flex-col'>
        <h1 className='text-5xl mb-16 time'>{time}</h1>
        <div className='flex'>
        <button className='btn py-2 px-6 mr-3 rounded-2xl hover:bg-red-700 hover:text-white' onClick={startStopwatch}>Start</button>
        <button className='btn py-2 px-6 mr-3 rounded-2xl hover:bg-red-700 hover:text-white' onClick={stopStopwatch}>Stop</button>
        <button className='btn py-2 px-6 mr-3 rounded-2xl hover:bg-red-700 hover:text-white' onClick={resetStopwatch}>Reset</button>
        <button className='btn py-2 px-6 mr-3 rounded-2xl hover:bg-red-700 hover:text-white' onClick={lapStopwatch}>Lap</button>
        </div>

        <ul className='mt-10 flex flex-col'>
          <div className='text-2xl'>Recorded laps</div>
          {laps.map((lap, index) => (
            <li key={index} className='text-xl my-1 lap'>{lap}</li>
          ))}
        </ul>
      </div>
      </div>
    </>
  )
}

export default App
