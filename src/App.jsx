import { useEffect } from "react";
import { fetchDataFromAPi } from "./utils/api";
import { useSelector ,useDispatch} from "react-redux";
import { getApiConfiguration } from "./store/homeslice";
import { getGeners } from "./store/homeslice";
import { BrowserRouter,Route ,Routes } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import Header from './components/header/Header'
function App() {
  const dispatch= useDispatch()
 
  useEffect(() => {
    fetchApiConfig();
    genersCall();
  }, []);
  
  const fetchApiConfig = async () => {
    const res = await fetchDataFromAPi("/configuration");

      const url ={
        backdrop:res.images.secure_base_url+"original",
        poster:res.images.secure_base_url+"original",
        profile:res.images.secure_base_url+"original"

      }
     dispatch(getApiConfiguration(url))

  };

  const genersCall=async ()=>{
    let promises=[];
    let endpoints=['tv','movie'];
    let allGenres={};
    endpoints.forEach((url)=>{
      promises.push(fetchDataFromAPi(`/genre/${url}/list`))
    })
   

   const data= await Promise.all(promises)
   data.map(({genres})=>{
    return genres.map((item)=>(allGenres[item.id]= item))
   })
   dispatch(getGeners(allGenres))
  } 

  return (
    <>
      <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/:mediaType/:id" element={<Details></Details>}></Route>
        <Route path="/search/:query" element={<SearchResult></SearchResult>}></Route>
        <Route path="explore/:mediaType" element={<Explore></Explore>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
      <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
