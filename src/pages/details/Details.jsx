import React from 'react'
import './style.scss';
 import { useParams } from 'react-router-dom';
 import useFetch from '../../hooks/useFetch';
import DetailsBanner from './detailsBanner/DetailsBanner';
 import Cast from './cast/Cast';
 import VideosSection from './videoSection/VideoSection';
   import Recommendation from './carousels/Recommendation';
   import Simlar from './carousels/Simlar';
 function Details() {
  const{mediaType ,id}=useParams();
  const {data ,loading}=useFetch(`/${mediaType}/${id}/videos`)
  const {data:credit ,loading:creditLoading}=useFetch(`/${mediaType}/${id}/credits`)
  return (
    <>
    <DetailsBanner video={data?.results?.[0]} crew={credit?.crew}></DetailsBanner>
    <Cast data={credit?.cast} loading={creditLoading}></Cast>
    <VideosSection data={data} loading={loading}></VideosSection>
    <Simlar mediaType={mediaType} id={id}></Simlar>
    <Recommendation mediaType={mediaType} id={id}></Recommendation>
    </>
  )
}

export default Details