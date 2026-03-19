import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Layout from "./Layout";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import About from "./Pages/About";
import Gallery from "./Pages/Gallery";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
