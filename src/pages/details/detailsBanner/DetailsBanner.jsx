import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { PlayIcon } from "../PlayButton";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

import "./style.scss";

import useFetch from "../../../hooks/useFetch";
import Genre from "../../../components/genre/Genre";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from '../../../components/lazyLoadimage/img';
import PosterFallback from "../../../assets/no-poster.png";
import ContentWrapper from "../../../components/content-wrapper/ContentWrapper";
function DetailsBanner({ video, crew }) {
    const [show  ,setShow]=useState(false);
    const [videoId  ,setVideoId]=useState(null);
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const url = useSelector((state) => state.home.url);
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const _genres = data?.genres?.map((g) => g.id);
  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "writer" || f.job === "story"
  );

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data.backdrop_path}></Img>
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      ></Img>
                    ) : (
                      <Img className="posterImg" src={PosterFallback}></Img>
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.title || data.name}
                            (${dayjs(data?.release_date).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genre data={_genres}></Genre>
                    <div className="row">
                      <CircleRating
                        rating={data.vote_average.toFixed(1)}
                      ></CircleRating>
                      <div className="playbtn" onClick={()=>{setShow(true); setVideoId(video.key)}}>
                        <PlayIcon></PlayIcon>
                        <span className="text">Watch trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">overview</div>
                      <div className="description">{data.overview}</div>
                    </div>
                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Realeas Date: </span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM D ,YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director:{}</span>
                        <span className="text">
                          {director.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ","}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer:{}</span>
                        <span className="text">
                          {writer.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {writer.length - 1 !== i && ","}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creators:{}</span>
                        <span className="text">
                          {data?.created_by?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {data?.created_by.length - 1 !== i && ","}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                   show={show}
                   setShow={setShow}
                   videoId={videoId}
                   setVideoId={setVideoId}

                ></VideoPopup>
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
}

export default DetailsBanner;
