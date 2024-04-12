import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import Register from "./pages/Register"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout>
          <p>Home Page</p>
        </Layout>} />

        <Route path="/search" element={<Layout>
          <p>Search Page</p>
        </Layout>} />
        
        <Route 
          path="/register"
          element={<Layout>
            <Register />
          </Layout>}
        />

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App