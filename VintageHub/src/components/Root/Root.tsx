import { NavLink, Outlet } from "react-router-dom"

const Root = () => {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/collection">Collection</NavLink></li>
                        <li><NavLink to="/recommendation">Home</NavLink></li>
                    </ul>
                </nav>
            </header>
            <Outlet/>
        </>
    );
}

export default Root