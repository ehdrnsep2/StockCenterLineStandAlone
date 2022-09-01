import { Button } from "bootstrap";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IoSettingsOutline } from "react-icons/io5";

export default function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">CL 계산기</Navbar.Brand>
          <Nav>
            <Nav.Link href="/setting">
              <IoSettingsOutline size={30} />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
