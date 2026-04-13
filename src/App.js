import Navigation from "./components/Navigation";
import Main from "./sections/Main";
import AboutMe from "./sections/AboutMe";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contacts from "./sections/Contacts";
import Footer from "./components/Footer";

function App() {
    return (
        <>
            <Navigation />

            <main className="d-flex flex-column">
                <Main />
                <AboutMe />
                <Skills />
                <Projects />
                <Contacts />
            </main>

            <Footer />
        </>
    );
}

export default App;