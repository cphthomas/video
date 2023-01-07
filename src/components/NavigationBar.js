import React from 'react';
// import { Link } from "react-router-dom";
// import Dropdown from 'react-bootstrap/Dropdown';
import {
  Nav,
  Navbar,
  // NavDropdown,
  // OverlayTrigger,
  // Overlay,
  // Tooltip,
  // Form,
  // FormControl,
  // Button,
} from 'react-bootstrap';
import styled from 'styled-components';
import { ReactComponent as Logo } from './tepedu300.svg';
const Styles = styled.div`
  .navbar {
    background-color: lightgrey;
  }

  a,
  .navbar-brand,
  .navbar-nav .nav-link {
    color: black;

    &:hover {
      color: grey;
    }
  }
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar expand="sm" bg="light" variant="light">
      <Navbar.Brand href="https://www.tepedu.dk/">
        <Logo alt="" width="130" height="35" className="d-inline-block align-top" />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Item>
            <Dropdown size="sm">
              <Dropdown.Toggle size="sm" variant="primary" id="dropdown-basic">
                Menu
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item size="sm" href="/eksamensvideoer" target="_blank">
                  Eksamensvideoer
                </Dropdown.Item>
                <Dropdown.Item size="sm" href="/hypergeo" target="_blank">
                  Podcasts
                </Dropdown.Item>
                <Dropdown.Item size="sm" href="https://audio.tepedu.dk/" target="_blank">
                  Podcasts
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item> */}
          {/* <Nav.Item>
            <Dropdown size="sm">
              <Dropdown.Toggle size="sm" variant="primary" id="dropdown-basic">
                Flere variable
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item size="sm" href="/mean" target="_blank">
                  2 Kvantitative
                </Dropdown.Item>
                <Dropdown.Item size="sm" href="/toandele" target="_blank">
                  2 Kvalitative
                </Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item size="sm" href="/meanraw" target="_blank">
                  Lineær Regression
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item size="sm" href="/chi2" target="_blank">
                  Chi i anden test
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item size="sm" href="/anova" target="_blank">
                  ANOVA analyse
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item> */}
        </Nav>
        {/* <Nav>
          <Nav.Link href="https://www.tepedu.dk/">Link 1 højre</Nav.Link>
          <Nav.Link eventKey={2} href="https://www.tepedu.dk/">Link 2 højre</Nav.Link>
        </Nav> */}
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);
