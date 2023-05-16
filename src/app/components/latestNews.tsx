import React, { useEffect, useState } from "react";
import CardLatest from "./cardLatest";
import axios from "axios";
import dayjs from "dayjs";

const LatestNews = () => {
  const [detail, setDetail] = useState<any[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await getData();
      setDetail(data);
    };
    fetch();
  }, []);
  return (
    <div>
      <div className="latest-title">Latest News</div>
      <div className="latest-content">
        {detail.map((content: any, index: number) => {
          return (
            <div key={index} className="card-latest">
              <CardLatest key={index} title={content.title} picture={content.picture} createdAt={content.createdAt} />
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

  const titlesAndDates = entries.map((entry: any) => ({
    title: entry.attributes.Title,
    createdAt: dayjs(entry!.attributes.createdAt).locale('en').format('DD MMMM YYYY'),
    picture: entry.attributes.Media.data[0].attributes.url,
  }));
  return titlesAndDates;
}

export default LatestNews;
