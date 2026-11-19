import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import useLenis, { lenis } from "./hooks/useLenis";
import Preloader from "./components/Preloader";
import Starfield from "./components/Starfield";
import Cursor from "./components/Cursor";
import Navigation from "./components/Navigation";
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
export default function App() {
  const [ready, setReady] = useState(false);
  const { pathname } = useLocation();
  useLenis();
  useEffect(() => { lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0); }, [pathname]);
  return (<>
    <Starfield />
    <div className="grain" aria-hidden="true" />
    <Preloader onDone={() => setReady(true)} />
    <Cursor />
    <Navigation />
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home ready={ready} />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </>);
}
