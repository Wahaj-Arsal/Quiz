import Root from "./components/Root/Root";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Quiz from "./components/Quiz/QuizView/Quiz";

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "quiz",
        element: <Quiz />,
      },
      {
        path: "quiz/:quizName",
        element: <Quiz />,
      },
    ],
  },
];

export default routes;
