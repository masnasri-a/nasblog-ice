import React, { useEffect, useState } from "react";
import CardListNews from "./cardListNews";
import axios from "axios";
import dayjs from "dayjs";

const ListNews = () => {
  const [detail, setDetail] = useState<any[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await getData();
      setDetail(data);
    };
    fetch();
  }, []);
  return (
    <div className="content-list-news">
      <p>List News</p>
      <div className="main-content-list-news">
        {detail.map((content: any, index: number) => {
          return (
            <div key={index}>
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
    "http://192.168.18.32:1337/api/contents?pagination%5BpageSize%5D=4&populate=%2A"
  );
  const entries = data.data.data;

  const titlesAndDates = entries.map((entry: any) => ({
    title: entry.attributes.Title,
    createdAt: dayjs(entry!.attributes.createdAt)
      .locale("en")
      .format("DD MMMM YYYY"),
    picture: entry.attributes.Media.data[0].attributes.url,
  }));
  return titlesAndDates;
}

export default ListNews;
