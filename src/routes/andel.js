import { Form, Row, Col, FormControl, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
// import Toggle from './ToggleRenderProps';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';

import InputGroup from 'react-bootstrap/InputGroup';

// import 'katex/dist/katex.min.css';
// import { InlineMath, BlockMath } from 'react-katex';

// import norminv from 'norminv';

// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

export default function Andel() {
  var [a, seta] = useState(+(421).toFixed(2));
  var [b, setb] = useState(+(421).toFixed(2));
  var [sig, setsig] = useState(['5% signifikansniveau']);
  var sigSelect = (e) => {
    setsig(e);
  };
  return (
    <>
      <Container className="p-0">
        <div class="p-3 mb-2 bg-white text-black">
          <div class="card">
            <Container>
              <div class="p-3 mb-2 bg-white">
                <Form>
                  <span class="lead text-muted">
                    1 ANDEL{' '}
                    <OverlayTrigger
                      placement="auto"
                      overlay={
                        <Tooltip>
                          <p style={{ textAlign: 'left' }}>
                            Vi benytter analyse af en andel, når vi har en kvalitativ binær variabel.<br></br>
                            En kvalitativ binær variabel kan fx. være mænd og kvinder, tilfreds og utilfreds, variabelt
                            lån og fast lån etc.
                            <hr></hr>
                            Har man indsamlet en stikprøve med fx {b} respondenter angiver man dette antal i feltet med
                            stikprøvestørrelse, og ønsker at analysere andelen af tilfredse, optæller man antallet af
                            tilfredse som fx kunne være {a} disse intaster vi i feltet med successer.{' '}
                          </p>
                        </Tooltip>
                      }
                    >
                      <i class="fas fa-question-circle"></i>
                    </OverlayTrigger>
                  </span>
                  <p class="lead text-muted">Analyse af en kvalitativ binær variabel.</p>

                  {/* Signifikansniveau########################################################################################################################################################################################## */}
                  <Row>
                    <Col>
                      <InputGroup>
                        <div class="btndown">
                          <DropdownButton
                            size="sm"
                            // alignleft
                            // variant="warning"
                            title={sig}
                            id="sig"
                            // id="dropdown-split-basic"
                            onSelect={sigSelect}
                          >
                            <Dropdown.Item eventKey="1% signifikansniveau">
                              <p test />
                              1% signifikansniveau
                            </Dropdown.Item>
                            <Dropdown.Item btn-sm eventKey="5% signifikansniveau">
                              5% signifikansniveau
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="10% signifikansniveau">10% signifikansniveau</Dropdown.Item>
                          </DropdownButton>
                        </div>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Container>
          </div>
        </div>
      </Container>
    </>
  );
}
