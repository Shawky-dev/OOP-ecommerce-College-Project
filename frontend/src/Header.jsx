import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

function MyNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home"><img src="../assets/logo-white-new1.png" style={{ width: '100px', marginLeft: '20px' }} alt="" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline className="mx-auto d-flex">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{ width: '500px' }} />
                    <Button variant="outline-success" style={{ marginLeft: '10px' }}>Search</Button>
                </Form>
                <Nav className="ml-auto" style={{ marginRight: '20px' }}>
                    <NavDropdown title="Actions" id="basic-nav-dropdown" >
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something else here</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Account" id="basic-nav-dropdown" >
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something else here</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#cart">
                        <img src="../assets/cart.png" style={{ width: '30px', marginLeft: '30px' }} alt="" />
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;
