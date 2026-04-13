import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Profilepicture from "../pictures/profilepic.JPG";
import { NAME } from "../constants/app";

function AboutMe() {
    const imgSize = 320;

    return (
        <section id="about" className="py-5 bg-white">
            <Container>
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-semibold mb-2">About Me</h2>
                    <p className="text-muted mb-0">
                        A quick introduction to my background, interests, and goals as a developer.
                    </p>
                </div>

                <div className="rounded-4 border bg-white shadow-sm p-4 p-md-5">
                    <Row className="align-items-center g-4">
                        <Col lg={5} className="text-center">
                            <img
                                src={Profilepicture}
                                alt={NAME}
                                width={imgSize}
                                height={imgSize}
                                className="img-fluid rounded-4 shadow-sm"
                            />
                        </Col>

                        <Col lg={7}>
                            <p className="lead">
                                Hi, I’m <strong>{NAME}</strong>, an aspiring full-stack developer
                                focused on building clean, practical, and user-friendly web applications.
                            </p>

                            <p>
                                I have a background in Computer Science and hands-on experience with
                                <strong> React, JavaScript, Python, Django, and SQL</strong>.
                                I enjoy turning ideas into real applications and improving my skills
                                through full-stack projects.
                            </p>

                            <p>
                                Recently, I’ve been focused on building projects like a clinic scheduling
                                system, where I worked on both frontend UI and backend logic to simulate
                                real-world workflows.
                            </p>

                            <p className="mb-0">
                                I’m currently seeking <strong>internship or entry-level software engineering roles</strong>
                                where I can contribute, continue learning, and grow as a developer.
                            </p>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    );
}

export default AboutMe;