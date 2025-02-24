import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import Footer from "./components/footer/Footer";

function App() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}

export default App;
