import { Navigate, Route, Routes } from "react-router";
import Layout from "./Layout";
import Search from "./pages/Search";
import Like from "./pages/Like";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Navigate to="/search" />} path="/" />
        <Route element={<Search />} path="/search" />
        <Route element={<Like />} path="/like" />
      </Route>
    </Routes>
  );
}

export default App;
