import React, { useEffect, useState } from 'react'
import './style.scss'
import  {useParams} from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component'
import  {fetchDataFromAPi} from "../../utils/api"
import ContentWrapper  from '../../components/content-wrapper/ContentWrapper'
 import  noResults from '../../assets/no-results.png'
 import Spinner from '../../components/spinner/Spinner'
 import MovieCard from '../../components/movieCard/MovieCard'
const SearchResult = () => {
  const [data ,setData]=useState(null);
  const[pageNum, setpageNu]=useState(1)
  const[loading ,setLoading]=useState(false);
  const {query}=useParams();
  const  fetchInitialData= async()=>{
    setLoading(true);
    const res =await fetchDataFromAPi(`/search/multi?query=${query}&page=${pageNum}`);
      setData(res)
      setpageNu((pre)=>pre+1)
      setLoading(false);

  }
   const fetchNextData=async()=>{
    
    const res =await fetchDataFromAPi(`/search/multi?query=${query}&page=${pageNum}`);
    if(data?.results){
       setData({
        ...data, results:[...data?.results ,...res.results]
       })
    }else{
      setData(res);
    }

    setpageNu((pre)=>pre+1);
   }
  useEffect(()=>{
    setpageNu(1)
    fetchInitialData()
  },[query])
  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true}></Spinner>}
      {!loading && (
        <ContentWrapper>
         
          {data?.results?.length > 0 ?(
                    <>
                  <div className="pageTitle">
                    {`Searach ${data.total_results > 1 ?"results":"result"} of  ${query}`}
                  </div>
                  <InfiniteScroll
                       className='content'
                       dataLength={data?.results?.length || []}
                       next={fetchNextData}
                       hasMore={pageNum<=data?.total_pages}
                       loader={<Spinner></Spinner>}


                  >
                    {data.results.map((item ,index)=>{
                      if(item.mediaType==='person') return;
                      return(
                        <MovieCard
                        key={index}
                        data={item}
                        fromSearch={true}
                        
                        ></MovieCard>
                      )

                    })}
                  </InfiniteScroll>
                  </>
          ):(
            <span className="resultNotFound">
              Sorry ,Result Not found
            </span>
          )}
        </ContentWrapper>
      )}
      </div>
  )
}

export default SearchResult