import Navigation from "./components/Navigation";
import Main from "./sections/Main";
import AboutMe from "./sections/AboutMe";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contacts from "./sections/Contacts";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
    const [projectIndex, setProjectIndex] = useState(0);

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        const scrollToHash = () => {
            const targetId = window.location.hash.slice(1);
            const target = document.getElementById(targetId);

            if (!target) {
                return;
            }

            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - 72,
                left: 0,
                behavior: "auto",
            });
        };

        const hashScrollTimers = [80, 220, 520].map((delay) =>
            window.setTimeout(scrollToHash, delay)
        );
        requestAnimationFrame(scrollToHash);
        window.addEventListener("hashchange", scrollToHash);

        return () => {
            hashScrollTimers.forEach((timer) => window.clearTimeout(timer));
            window.removeEventListener("hashchange", scrollToHash);
        };
    }, []);

    return (
        <>
            <Navigation onSelectProject={setProjectIndex} />

            <main className="d-flex flex-column">
                <Main />
                <AboutMe />
                <Skills />
                <Projects currentIndex={projectIndex} setCurrentIndex={setProjectIndex} />
                <Contacts />
            </main>

            <Footer />
        </>
    );
}

export default App;
