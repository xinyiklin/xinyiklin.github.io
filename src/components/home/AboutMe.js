import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Profilepicture from "../../pictures/profilepic.JPG";

function AboutMe() {
    const imgSize = 320;

    return (
        <div id="about" className="bg-light">
            <Container className="p-5">
                <div className="display-4 pb-4 text-center">
                    About Me
                </div>

                <Row className="align-items-center g-4">

                    {/* Image */}
                    <Col lg={5} className="text-center">
                        <img
                            src={Profilepicture}
                            alt="Xinyi Lin"
                            width={imgSize}
                            height={imgSize}
                            className="rounded shadow-sm img-fluid"
                        />
                    </Col>

                    {/* Text */}
                    <Col lg={7}>
                        <p className="lead">
                            Hi, I’m <strong>Xinyi Lin</strong>, an aspiring full-stack developer
                            passionate about building clean, practical, and user-friendly web applications.
                        </p>

                        <p>
                            I have a background in Computer Science and experience working with
                            technologies such as <strong>React, Node.js, Python, and SQL</strong>.
                            I enjoy turning ideas into real applications and continuously improving
                            my development skills through hands-on projects.
                        </p>

                        <p>
                            Recently, I’ve been focused on building full-stack applications,
                            including projects like a clinic scheduling system, where I worked on both
                            frontend user interfaces and backend functionality.
                        </p>

                        <p className="mb-0">
                            I’m currently seeking <strong>internship or entry-level opportunities</strong>
                            as a software engineer, where I can contribute, learn, and grow as a developer.
                        </p>
                    </Col>

                </Row>
            </Container>
        </div>
    );
}

export default AboutMe;