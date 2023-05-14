"use client";
import Headers from "./components/headers";
import Branding from "./components/branding";
import Frame from "./components/frame";
import LatestNews from "./components/latestNews";
import ListNews from "./components/listNews";
import ListCategory from "./components/listCategory";
import Footer from "./components/footer";

export default async function Home() {
  return (
    <main>
      <div className="body">
        <Headers />
        <Branding />
        <Frame  />
        <br />
        <LatestNews />
        <br />
        <div className="main-news">
          <div className="list-news">
            <ListNews />
          </div>
          <div className="category">
            <ListCategory />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}