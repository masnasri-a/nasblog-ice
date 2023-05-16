import React, { useEffect, useState } from "react";
import CardListNews from "./cardListNews";
import { useRouter } from 'next/navigation';

import axios from "axios";
import dayjs from "dayjs";

const ListNews = () => {
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
    <div className="content-list-news">
      <p>List News</p>
      <div className="main-content-list-news">
        {detail.map((content: any, index: number) => {
          return (
            <div key={index} onClick={()=>{redirect(content.links)}}>
              <CardListNews
                key={index}
                title={content.title}
                createdAt={content.createdAt}
                picture={content.picture}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

async function getData() {
  const data = await axios.get(
    `http://203.194.113.203:1337/api/contents?pagination%5BpageSize%5D=4&populate=%2A`
  );
  const entries = data.data.data;
  console.log(entries);
  const titlesAndDates = entries.map((entry: any) => ({
    links:`${entry.attributes.categories.data[0].attributes.CategoryName}/${entry.attributes.slug}`,
    title: entry.attributes.Title,
    createdAt: dayjs(entry!.attributes.createdAt)
      .locale("en")
      .format("DD MMMM YYYY"),
    picture: entry.attributes.Media.data[0].attributes.url,
  }));
  console.log(titlesAndDates);
  
  return titlesAndDates;
}

export default ListNews;
