import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import Register from "./pages/Register"
import { Toaster } from "react-hot-toast"
import SignIn from "./pages/SignIn"
import { useSelector } from "react-redux"
import AddHotel from "./pages/AddHotel"
import MyHotels from "./pages/MyHotels"
import EditHotel from "./pages/EditHotel"
import Search from "./pages/Search"
import Details from "./pages/Details"
import Booking from "./pages/Booking"
import MyBookings from './pages/MyBookings';
import Home from "./pages/Home"

function App() {
  const {token} = useSelector((state) => state.auth)

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout>
          <Home />
        </Layout>} />

        <Route path="/search" element={
        <Layout>
            <Search />
        </Layout>} />
        
        <Route path="/detail/:hotelId" element={
        <Layout showSearchBar={false}>
            <Details />
        </Layout>} />

        <Route 
          path="/register"
          element={<Layout showSearchBar={false}>
            <Register />
          </Layout>}
        />
        
        <Route 
          path="/sign-in"
          element={<Layout showSearchBar={false}>
            <SignIn />
          </Layout>}
        />

        {
          token &&  (
          <>
            <Route  
              path="/add-hotel"
              element={
                <Layout showSearchBar={false}>
                  <AddHotel />
                </Layout>
              }
            />

            <Route  
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />

            <Route 
              path="/edit-hotel/:hotelId"
              element= {
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />

            <Route  
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking showSearchBar={false} />
                </Layout>
              }
            />

            <Route  
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />

          </>  
          )
        }

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App