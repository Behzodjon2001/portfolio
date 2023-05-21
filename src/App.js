import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home, Login, Register, KunUz, Registration } from "./pages/front";
import { FrontLayout, AdminLayouts } from "./components/layout";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/NotFound";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { TOKEN } from "./const";
import {
  Dashboard,
  Experiences,
  Messages,
  Portfolio,
  Skills,
} from "./pages/admin";
import KudaPizza from "./pages/front/KudaPizza";
import Leangroup from "./pages/front/Leangroup";
import TeachersList from "./pages/front/TeachersList";

function App() {
  const frontRoutes = [
    {
      url: "",
      page: Home,
    },
    {
      url: "login",
      page: Login,
    },
    {
      url: "register",
      page: Register,
    },
    {
      url: "kunuz",
      page: KunUz,
    },
    {
      url: "registration",
      page: Registration,
    },
    {
      url: "kudapizza",
      page: KudaPizza,
    },
    {
      url: "leangroup",
      page: Leangroup,
    },
    {
      url: "teachers_list",
      page: TeachersList,
    },
  ];
  const adminRoutes = [
    { url: "dashboard", page: Dashboard },
    { url: "portfolio", page: Portfolio },
    { url: "skills", page: Skills },
    { url: "messages", page: Messages },
    { url: "experiences", page: Experiences },
  ];
  const token = localStorage.getItem(TOKEN);
  return (
    <div className="App">
      <Router>
        <ToastContainer autoClose={1000} />{" "}
        <Routes>
          {" "}
          {frontRoutes.map(({ url, page: Page }) => (
            <Route
              key={url}
              path={"/" + url}
              element={
                <FrontLayout>
                  <Page />
                </FrontLayout>
              }
            >
              {" "}
            </Route>
          ))}{" "}
          {token &&
            adminRoutes.map(({ url, page: Page }) => (
              <Route
                key={url}
                path={"/" + url}
                element={
                  <AdminLayouts>
                    <Page />
                  </AdminLayouts>
                }
              >
                {" "}
              </Route>
            ))}{" "}
          <Route path="*" element={<NotFound />} />{" "}
        </Routes>{" "}
      </Router>{" "}
    </div>
  );
}

export default App;
