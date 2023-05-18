"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Shani from "../../assets/Shani.png";
import axios from "axios";
import dayjs from 'dayjs';
import { useRouter } from "next/navigation";

const Frame = () => {
  // console.log(data);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [publishAt, setPublishAt] = useState("")
  const [picture, setPicture] = useState("")
  const [links, setLinks] = useState("")
  useEffect(() => {
    const fetch = async()=>{
      const data = await gatData();
      setTitle(data.data.title);
      setDescription(data.data.desctription);
      const dateString = data.data.publishedAt
      const formattedDate = dayjs(dateString).locale('en').format('DD MMMM YYYY');
      setPublishAt(formattedDate); // Output: "14 May 2023"
      setPicture(data.data.picture)
      setLinks(data.data.links)
    }
    fetch()
  }, []);
  const router = useRouter()
  return (
    <div className="frame" onClick={()=> router.push(links)}>
      <div className="image-content" >
        <Image src={picture} className="images" width={600} height={400} alt="images" />
      </div>
      <div className="content-frame">
        <div className="title-frame">
          {
            title
          }
          {/* <p>Masih sekolah, Freya JKT48 teringat ujian saat lagi manggung</p> */}
          <p>{description}</p>
        </div>

        <div className="writer-date">
          {/* <span>4 May 2023</span> */}
          <span>{publishAt}</span>
          <p>  .</p>
        </div>
      </div>
    </div>
  );
};

async function gatData() {
  const data = await axios.get(
    `http://203.194.113.203:1337/api/contents?pagination%5BwithCount%5D=true&pagination%5Bpage%5D=1&pagination%5BpageSize%5D=1&populate=%2A`
  );

  // if (data.data.data){
  const content = data.data.data[0];
  // }
  const attributes = content.attributes
  const links = `${attributes.categories.data[0].attributes.CategoryName}/${attributes.slug}`
  const title = attributes.Title;
  const desctription = attributes.Description
  const publishedAt = attributes.publishedAt
  const picture = attributes.Media.data[0].attributes.url
  console.log(links);

  return {
    data: {
      title: title,
      desctription:desctription,
      publishedAt:publishedAt,
      picture:picture,
      links:links
    },
  };
}

export default Frame;
