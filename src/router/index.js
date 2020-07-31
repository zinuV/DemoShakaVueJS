import HomeComponent from "../components/HomeComponent";
import ListComponent from "../components/vod/ListComponent";
import DetailComponent from "../components/vod/DetailComponent";
import FadioComponent from "../components/fadio/FadioComponent";
import MusicComponent from "../components/music/MusicComponent";
import karaokeComponent from "../components/kara/karaokeComponent";
import ContactComponent from "../components/contact/ContactComponent";
import VirtualkeyComponent from "../components/virtualkey/VirtualkeyComponent";
import HomeDemo from "../components/demo/HomeDemo";
import MoviePlayer from "../components/demo/MoviePlayer";

const routes = [{
        path: "/",
        name: "HomeDemo",
        component: HomeDemo,
    },
    {
        path: "/movieplayer",
        name: "MoviePlayer",
        component: MoviePlayer,
    },
    {
        path: "/list",
        name: "ListComponent",
        component: ListComponent,
    },
    {
        path: "/detail",
        name: "DetailComponent",
        component: DetailComponent,
    },
    {
        path: "/virtualkey",
        name: "VirtualkeyComponent",
        component: VirtualkeyComponent,
    },
    {
        path: "/contact",
        name: "ContactComponent",
        component: ContactComponent,
    },
    {
        path: "/music",
        name: "MusicComponent",
        component: MusicComponent,
    },
    {
        path: "/fadio",
        name: "FadioComponent",
        component: FadioComponent,
    },
    {
        path: "/kara",
        name: "karaokeComponent",
        component: karaokeComponent,
    },
];

export default routes;