import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Nav from './Frontend/Nav/nav';
import Home from './Frontend/Home/home';
import Footer from './Frontend/Footer/footer';
import AdminLogin from './Frontend/Admin/adminlogin';  // Corrected import

function Layout() {
  return (
    <>
      <Nav />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="admin/login" element={<AdminLogin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
