import axios from "axios";
// import { useRouter } from "next/router";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";

const ListCategory = () => {
  const route = useRouter()
  const [detail, setDetail] = useState<any[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await getData();
      setDetail(data);
    };
    fetch();
  }, []);
  const redirect = (category:string)=>{
    // console.log(category);
    const urls = `/${category}`
    route.push(urls)
  }
  return (
    <div className="title-list-category">
      <p>Categories</p>
      <div className="list-categories">
        {detail.map((detail: any, index: number) => {
          return (
            <div key={index} className="categories" onClick={()=>redirect(detail.title)}>
              <span>{detail.title}</span>
            </div>
          );
        })}
{/* 
        <div className="categories">
          <span>Business</span>
        </div>
        <div className="categories">
          <span>Sport</span>
        </div>
        <div className="categories">
          <span>Technology</span>
        </div>
        <div className="categories">
          <span>Media</span>
        </div>
        <div className="categories">
          <span>Health</span>
        </div> */}
      </div>
    </div>
  );
};

async function getData() {
  const data = await axios.get(
    `http://203.194.113.203:1337/api/categories?fields=CategoryName`
  );
  const entries = data.data.data;
  const titlesAndDates = entries.map((entry: any) => ({
    title: entry.attributes.CategoryName,
  }));
  console.log(titlesAndDates);

  return titlesAndDates;
}
export default ListCategory;
