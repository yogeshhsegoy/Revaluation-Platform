import Navbar from "../components/Navbar.tsx";
import Hero from "../components/Hero.tsx";
import useRedirect from "../hooks/useRedirect.tsx";

function Landing() {
    useRedirect()
    return (
        <div>
            <Navbar />
            <Hero />
        </div>
    )
}

export default Landing;