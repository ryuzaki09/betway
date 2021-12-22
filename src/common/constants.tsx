import { Sports } from "../main/sports";
import { LiveAndReal } from "../main/liveAndReal";
import { Casino } from "../main/casino";
import { Esports } from "../main/esports";
import { Vegas } from "../main/vegas";

interface IAppRoute {
  route: string;
  name: string;
  color: string;
  component: React.ReactNode;
}

export const appRoutes: IAppRoute[] = [
  {
    route: "/",
    name: "sports",
    color: "#00a826",
    component: <Sports />
  },
  {
    route: "/live-and-real",
    name: "live & real",
    color: "red",
    component: <LiveAndReal />
  },
  {
    route: "/casino",
    name: "casino",
    color: "orange",
    component: <Casino />
  },
  {
    route: "/esports",
    name: "esports",
    color: "brown",
    component: <Esports />
  },
  {
    route: "/vegas",
    name: "vegas",
    color: "yellow",
    component: <Vegas />
  }
];
