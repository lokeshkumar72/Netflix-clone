import React, { useRef, useEffect, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';




const TitleCards = ({title, category}) => {

const[apiData, setApiData]= useState([]);

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODE5YTY5N2VlMTllMzlkMzdhZmZlYmQ1ZDg1NjcxMiIsIm5iZiI6MTc0NDE5MzgzMS40NjMsInN1YiI6IjY3ZjY0OTI3ZGRmOTE5NDM4N2RhM2Y1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9A9aRdQkOx0p9YyBTM1o77NGKuSyFLu_D666dSEl16o'
    }
  };
  
 

  const handleWheel = (event) => {
    event.preventDefault();
    const scrollSpeed = 5; // Base speed multiplier
    const acceleration = 1.1; // Acceleration factor
    const velocity = Math.abs(event.deltaY) * acceleration;
    const scrollAmount = event.deltaY * (scrollSpeed + velocity);
    
    cardsRef.current.scrollLeft += scrollAmount;
  }

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => {
      console.error(err);
      // Fallback to local data if API fails
      setApiData(cards_data);
    });

    const currentRef = cardsRef.current;
    currentRef.addEventListener('wheel', handleWheel);
    
    return () => {
      currentRef.removeEventListener('wheel', handleWheel);
    };
  },[category])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
         </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
