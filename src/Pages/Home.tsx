import React from "react";
import { Suspense } from "react";
import Loading from "../components/Loading";

const Popular = React.lazy(() => import("../components/Home/Popular"));
const Free = React.lazy(() => import("../components/Home/Free"));
const Trending = React.lazy(() => import("../components/Home/Trending"));

function Home() {
  return (
    <div className="bg-slate-900 lg:mx-auto max-w-7xl min-h-screen">
      <Suspense fallback={<><Loading/></>}>
        <section>
          <Popular />
          <Free />
          <Trending />
        </section>
      </Suspense>
    </div>
  );
}

export default Home;
