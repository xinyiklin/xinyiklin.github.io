import Navigation from "./components/Navigation";
import Main from "./sections/Main";
import AboutMe from "./sections/AboutMe";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contacts from "./sections/Contacts";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
    const [projectIndex, setProjectIndex] = useState(0);

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
