import { Outlet } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

function App() {
  const nome = "Wisner";
  const ano = 2023;
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <main className="h-75 overflow-y-auto">
        <Outlet />
      </main>

      <Footer nome={nome} ano={ano} />
    </div>
  );
}

export default App;
