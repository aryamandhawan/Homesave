import React from "react";
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Homesave</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Add File</Nav.Link>
          <Nav.Link href="/Files">Files</Nav.Link>
          <Nav.Link href="/Photos">Photos</Nav.Link>
          <Nav.Link href="/Misc">Misc</Nav.Link>
          <Nav.Link href="/Encrypted">Encrypted</Nav.Link>
          <Nav.Link href="/Decrypted">Decrypted</Nav.Link>
        </Nav>
      </Navbar>
  );
};

export default Navigation;
