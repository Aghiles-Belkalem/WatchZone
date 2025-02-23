import "../Css/header.css";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header>
			<Link to="/">
				<img className="logo" src="src/assets/cinema.png" alt="Logo" />
			</Link>
			<p className="catchphrase">
				Plongez dans l'univers du cinéma. Bienvenue sur WatchZone !
			</p>
		</header>
	);
};

export default Header;
