import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

export default function Footer() {
    return (<footer style={{fontSize: '0.8em'}}>
        <Navbar bg="light" variant="light" expand="lg" fixed="bottom" className="border-top">
            <Container>
            <Navbar.Text href="#home">B</Navbar.Text>
            <Navbar.Text href="#home">T</Navbar.Text>
            <Navbar.Text href="#home">O</Navbar.Text>
            <Nav.Link href="#home">About</Nav.Link>
            <Nav.Link href="#home">Uses</Nav.Link>
            <Nav.Link href="#home">Support</Nav.Link>
            <Nav.Link href="#home">Blog</Nav.Link>
            <Nav.Link href="#home">Pricing</Nav.Link>
            <Nav.Link href="#home">Contact</Nav.Link>

            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                    <Nav.Link href="#home">Terms of Service</Nav.Link>
                    <Nav.Link href="#link">Privacy</Nav.Link>
                    <Nav.Link href="#">Back to top</Nav.Link>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    </footer>)
}