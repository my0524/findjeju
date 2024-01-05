import React from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from "./Main";
import MainContents from "./pages/MainContents";
import Recommand from "./components/main/recommand/Recommand";
import Join from "./pages/JoinPage";
import Rest from "./components/main/rest/Rest";
import VisualSlide from "./components/main/visual/VisualSlide";
import SearchModal from "./components/modal/SearchModal";
import SearchPage from "./pages/SearchPage";
import Fiesta from "./components/main/fiesta/Fiesta";
import FestivalSubPage from "./pages/FestivalSubPage";
import FestivalDetailPage from "./pages/FestivalDetailPage";
import Weather from "./components/main/weather/Weather";

const router = createBrowserRouter([

  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element:
          <MainContents>
            <SearchModal/>
            <VisualSlide/>
            <Recommand />
            <Rest />
            <Fiesta/>
            <Weather/>
          </MainContents>
      },
      {
        path: "/join",
        element:
          <Join />
      },
      {
        path:"/search/:keyword",
        element:
        <SearchPage/>
      },
      {
        path:"/festival",
        element:
        <MainContents>
          <FestivalSubPage/>
        </MainContents>
      },
      {
        path:"/festival/:contentid",
        element:
        <MainContents>
          <FestivalDetailPage/>
        </MainContents>
      },
    ]
  }

]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
