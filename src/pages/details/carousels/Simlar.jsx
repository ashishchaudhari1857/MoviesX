import Carousel from'../../../components/carousel/Carousel';
import useFetch from "../../../hooks/useFetch";
import React from 'react'

function Simlar({mediaType, id}) {
    const {data , loading ,error }=useFetch( `/${mediaType}/${id}/similar`);
       const title =mediaType==='tv'?"Similar Tv Shows":"Similar Movies"
  return (
    <Carousel
      title={title}
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    ></Carousel>
  )
}

export default Simlar