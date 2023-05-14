import Image from "next/image";
import React from "react";
const CardListNews = (props:any) => {
  return (
    <div className="card-list-news">
      <div className="image">
        <Image src={props.picture} width={600} height={400} className="image-card-list-news" alt="content" />
      </div>
      <div className="content">
        <div className="title">
          {props.title}
        </div>
        <div className="category-and-date">
            Media <span>{props.createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default CardListNews;
