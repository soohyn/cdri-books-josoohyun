import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Layout from "./Layout";
import Search from "./pages/Search";
import Like from "./pages/Like";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Home />} path="/" />
        <Route element={<Search />} path="/search" />
        <Route element={<Like />} path="/like" />
      </Route>
    </Routes>
  );
}

export default App;
