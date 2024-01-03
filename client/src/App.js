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
      }
    ]
  }

])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
