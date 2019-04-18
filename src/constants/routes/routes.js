import CreateFlower from "../../pages/create-flower-page/create-flower.component";
import LogIn from "../../pages/log-in/log-in.component";
import SignUp from "../../pages/sign-up/sign-up.component";

const routes = [
  {
    path: "/create-flower",
    component: CreateFlower
  },
  {
    path: "/log-in",
    component: LogIn
  },
  {
    path: "/sign-up",
    component: SignUp
  }
];

export default routes;
