import React, { useEffect } from "react";
import   {useNavigate} from 'react-router-dom';
import { useState } from "react";
import "./style.scss";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadimage/img";
import ContentWrapper from "../../../components/content-wrapper/ContentWrapper";

function HeroBanner() {
    const [background ,setbackground]=useState('')
    const [query ,setQuery]=useState("")
    const  navigate= useNavigate();
    const url =useSelector(state=>state.home.url)
    const  {data ,error ,loading}=useFetch('/movie/upcoming')
      useEffect(()=>{
        const bg= url.backdrop+data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
         setbackground(bg);
      },[data])
    
  const searchQueryHandler=(e)=>{
        if(e.key==='Enter' &&  query.length >0){

             navigate(`search/${query}`)
        }
    }
  return (
    <div className="heroBanner">
       {!loading  &&<div className="backdrop-img">
      <Img src={background}></Img>
      </div>}
      <div className="opacity-layer"></div>

<ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subtitle">
            Millions of movies ,Tv shows and people to discover . Explore Now
          </span>
          <div className="searchInput">
            <input
            type="text"
            placeholder="Search for  a movie or Tv show..."
             onKeyUp={searchQueryHandler}
             onChange={(e)=>setQuery(e.target.value)}
            ></input>
            <button >Search</button>

          </div>
        </div>
</ContentWrapper>
      
    </div>
  );
}

export default HeroBanner;
