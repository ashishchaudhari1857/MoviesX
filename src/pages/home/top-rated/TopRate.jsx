import React, { useState } from "react";
import useFetch  from '../../../hooks/useFetch';
import SwitchTab from "../../../components/SwithcTab/SwitchTab";
import Carousel from "../../../components/carousel/Carousel";
function TopRated() {
    const [endpoint ,setEndPoint]= useState('movie')
    const onTabChange = (tab ) => {
       setEndPoint( tab==='Movies'? 'movie':'tv')
    }

    const {data ,loading}=useFetch(`/${endpoint}/top_rated`)
    return (
        <div className="carouseSection">
            <div className="wrapper">
                {/* Correct the class name here */}
                <span className="carouselTitle">Top-rated</span>
                <SwitchTab data={["Movies", 'Tv Shows']} onTabChange={onTabChange} />
            </div>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint}></Carousel>
        </div>
    );
}

export default TopRated;
