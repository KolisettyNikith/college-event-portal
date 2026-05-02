import Navbar from "./components/Navbar";

import Hero from "./components/Hero";

import Schools from "./components/Schools";

import Events from "./components/Events";

import AdminPanel from "./components/AdminPanel";

function App() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const isAdmin =
    user?.email ===
    "admin@chanakyauniversity.edu.in";

  return (

    <div>

      <Navbar />

      <Hero />

      <Schools />

      <Events />

      {isAdmin && <AdminPanel />}

    </div>
  );
}

export default App;