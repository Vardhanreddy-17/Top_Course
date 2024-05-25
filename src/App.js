import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Filter from "./Components/Filter";
import Cards from "./Components/Cards";
import Spinner from "./Components/Spinner";
import { apiUrl, filterData } from "./data.js";
import { toast } from "react-toastify";

const App = () => {

  const[courses,setCourses] = useState(null);//we can also use empty array instaed of null
  const[loading,setLoading] = useState(true);
  const[category,setCategory] = useState(filterData[0].title);
  async function fetchData(){
    setLoading(true);
    try{
      const response = await fetch(apiUrl);
      const output = await response.json();
      setCourses(output.data);
    }catch(e){
      toast.error("Error in network");
    }
    setLoading(false);
  };

  useEffect(()=>{
    fetchData();
  },[])

  return(
    <div className="min-h-screen flex flex-col">
      <div>
        <Navbar/>
      </div>
      <div className="bg-bgDark2">
      <div>
        <Filter filterData={filterData} category={category} setCategory={setCategory}/>
      </div>
      <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center">
      {
        (loading)?(<Spinner/>):(<Cards courses={courses} category={category}/>)
      }
      </div>
      </div>
    </div>
  )
};

export default App;
