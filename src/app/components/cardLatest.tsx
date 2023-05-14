import Image from "next/image";
import React from "react";
import Content from "../../assets/card-content.png";

const CardLatest = (props:any) => {
  return (
    <div className="cards-latest">
      <Image
        src={props.picture}
        width={600}
        height={400}
        className="image-content-latest"
        alt="card-content"
      />
      <div className="content-card-latest">
        <p>{props.title}</p>
        <div className="category-date">
            Media  <span>{props.createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default CardLatest;
