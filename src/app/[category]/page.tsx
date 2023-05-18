"use client";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Headers from "../components/headers";
import CardListNews from "../components/cardListNews";
import { useRouter } from "next/navigation";

const Page = (props: any) => {
  const router = useRouter()
  const [detail, setDetail] = useState<any[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await getData(props.params.category);
      setDetail(data);
    };
    fetch();
  }, []);
  return (
    <div>
      <div className="body">
        <Headers />
        <div className="content-list-news">
          <p>Category : {props!.params.category}</p>
          <div className="main-content-list-news">
            {detail.map((content: any, index: number) => {
              return (
                <div key={index} onClick={() => router.push(content.links)}>
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
      </div>
    </div>
  );
};

async function getData(category: string) {
  const data = await axios.get(
    `http://203.194.113.203:1337/api/contents?populate=%2A&filters[categories][CategoryName]=` +
      category
  );
  const entries = data.data.data;

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
export default Page;
