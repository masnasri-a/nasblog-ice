"use client";
import Headers from "@/app/components/headers";
import ReactMarkdown from 'react-markdown';
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Footer from "@/app/components/footer";
// http://203.194.113.203:1337/api/contents?populate=%2A&filters%5Bslug%5D=
const Page = (props: any) => {
  const [detail, setDetail] = useState<any>({});
  useEffect(() => {
    const fetch = async () => {
      const data = await getData(props.params.id);
      setDetail(data[0]);
    };
    fetch();
  }, []);
  return (
    <main>
      <div className="body">
        <Headers />
        <div className="main-content-post">
          <p>Published at • {detail.createdAt}</p>
          <br />
          <br />
          <div className="title-post">{detail.title}</div>
          <br />
          <div className="desc-post">{detail.desc}</div>
          <br />
          <div className="image-post">
            <Image
              className=""
              src={detail.picture}
              alt="content"
              width={600}
              height={400}
            />
          </div>
          <br />
          <ReactMarkdown>{detail.posts}</ReactMarkdown>
        </div>
      </div>
      <Footer />
    </main>
  );
};


async function getData(slug: string) {
  const data = await axios.get(
    `http://203.194.113.203:1337/api/contents?populate=%2A&filters%5Bslug%5D=${slug}`
  );
  const entries = data.data.data;

  const titlesAndDates = entries.map((entry: any) => ({
    title: entry.attributes.Title,
    desc: entry.attributes.Description,
    createdAt: dayjs(entry!.attributes.createdAt)
      .locale("en")
      .format("DD MMMM YYYY"),
    picture: entry.attributes.Media.data[0].attributes.url,
    posts:entry.attributes.Content,
  }));
  return titlesAndDates;
}

export default Page;
