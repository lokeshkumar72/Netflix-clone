import React, { useEffect, useState } from 'react'
import './Player.css'
import { useNavigate, useParams } from 'react-router-dom'
import back_arrow_icon from '../../assets/back_arrow_icon.png'

const Player = () => {

const { id } = useParams();
const navigate =useNavigate();

const [apiData,setApiData] = useState({
  name:"",
  key:"",
  published_at:"",
  type:"",
})

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODE5YTY5N2VlMTllMzlkMzdhZmZlYmQ1ZDg1NjcxMiIsIm5iZiI6MTc0NDE5MzgzMS40NjMsInN1YiI6IjY3ZjY0OTI3ZGRmOTE5NDM4N2RhM2Y1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9A9aRdQkOx0p9YyBTM1o77NGKuSyFLu_D666dSEl16o'
    }
  };
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        setApiData(data.results[0])
      }
    })
    .catch(err => console.error(err));
  },[id])
  
  
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="Back button" onClick={()=>{navigate('/')}} className='player__back' />
      <iframe
        width='90%'
        height='90%'
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title='Movie Trailer'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
      <div className='player-info'>
        <p>{apiData.published_at?.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
