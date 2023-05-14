import React from "react";

const ListCategory = () => {
  return (
    <div className="title-list-category">
      <p>Categories</p>
      <div className="list-categories">
        <div className="categories">
          <span>News</span>
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default ListCategory;
