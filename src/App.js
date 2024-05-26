import React, { useEffect, useState } from "react";
import { filterData } from "./data";
import { apiUrl } from "./data";
import Nav from "./components/Nav";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { toast } from "react-toastify";
import Spinnner from "./components/Spinnner";

const App = () => {

  const [courses,setCourses] = useState(null);
  const [loading,setLoading] = useState(true);
  const [category,setcategory] = useState(filterData[0].title);  

  async function getData(){
    setLoading(true);
    try{
      let response = await fetch(apiUrl);
      let output = await response.json();
      setCourses(output.data);
    }
    catch(error){
      toast.error("network problem");
    }
    setLoading(false);
  }

  useEffect(()=>{
    getData();
  },[])



  return (
    <div className="flex flex-col min-h-screen bg-indigo-900">
      <div>
        <Nav></Nav>
      </div>
      <div className="bg-indigo-900">
          <div>
            <Filter filterData={filterData} category={category} setcategory={setcategory}></Filter>
          </div>
          <div className="w-11/12 max-w-[1200px] flex flex-wrap mx-auto justify-center items-center min-h-[50vh]">
            {
              loading ? (<Spinnner/> ): (<Cards courses={courses} category={category}></Cards>)
            }
          </div>
      </div>

    </div>
  );
}

export default App;
