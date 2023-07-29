import React, { useRef } from "react";
//  this are  the left and right arrow icons  ->  <-
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
//  this library is used change the date format
import dayjs from "dayjs";
import ContentWrapper from '../content-wrapper/ContentWrapper'
import Img from '../lazyLoadimage/img'
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss";
 import CircleRating from "../circleRating/CircleRating";
import Genre from "../genre/Genre";

function Carousel({ data, loading ,endpoint ,title }) {
  const url = useSelector((state) => state.home.url);
  const corouselConatainer=useRef();
  const navigate=useNavigate();
  const navigation = (dir) => {
   const container =corouselConatainer.current;
  //  console.log("contient",container );
  //  console.log( container.scrollLeft);
  //  console.log( container.offsetWidth);
  //  console.log(container.scrollTo);

   const scrollamount=dir==='left'?container.scrollLeft -(container.offsetWidth +20):container.scrollLeft + (container.offsetWidth +20)
      container.scrollTo({
        left:scrollamount,
        behavior:"smooth"
      })
      // console.log(scrollamount);
  };
  console.log(data);
  const skItem = () => {
    return (
        <div className="skeletonItem">
            <div className="posterBlock skeleton"></div>
            <div className="textBlock">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>
            </div>
        </div>
    );
};
  return (
    <div className="carousel">
      <ContentWrapper>
        {title &&<div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        ></BsFillArrowLeftCircleFill>

        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        ></BsFillArrowRightCircleFill>

        {!loading ? (
          <div className="carouselItems" ref={corouselConatainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div key={item.id} className="carouselItem" onClick={()=>navigate(`/${item.media_type?item.media_type:endpoint}/${item.id}`)}>
                  <div className="posterBlock">
                    <Img src={posterUrl}></Img>
                    <CircleRating
                    rating={item.vote_average.toFixed(1)}
                    ></CircleRating>
                    <Genre data={item.genre_ids.slice(0,2)}></Genre>
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.name || item.title}</span>
                    <span className="date">
                      {dayjs(item.release_date || item.first_air_date).format(
                        "MMM D, YYYY"
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
            <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
        </div>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Carousel;
