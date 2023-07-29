import React, { useState } from "react";
import useFetch  from '../../../hooks/useFetch';
import SwitchTab from "../../../components/SwithcTab/SwitchTab";
import Carousel from "../../../components/carousel/Carousel";
function Trending() {
    const [endpoint ,setEndPoint]= useState('day')
    const onTabChange = (tab ) => {
        console.log("tab ",)
       setEndPoint( tab==='Day'? 'day':'week')
    }

    const {data ,loading}=useFetch(`/trending/all/${endpoint}`)
    return (
        <div className="carouseSection">
            <div className="wrapper">
                {/* Correct the class name here */}
                <span className="carouselTitle">Trending</span>
                <SwitchTab data={["Day", 'Week']} onTabChange={onTabChange} />
            </div>
            <Carousel data={data?.results} loading={loading}></Carousel>
        </div>
    );
}

export default Trending;
