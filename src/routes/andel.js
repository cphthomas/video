import { Form, Row, Col, FormControl } from 'react-bootstrap';
// import { Form, Row, Col, FormControl, Button, Alert } from 'react-bootstrap';
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
  var [b, setb] = useState(+(500).toFixed(2));
  var [c, setc] = useState(+(85).toFixed(2));
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
                    1 ANDEL {seta}
                    {setb}{' '}
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
                  <br></br>
                  <Row>
                    <Col>
                      {a > b && (
                        <div class="alert alert-danger">
                          <strong>Bemærk!</strong> Antallet af successer skal være mindre end stikprøvens størrelse.
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Text className="text-muted">Successer</Form.Text>
                      <InputGroup size="sm">
                        <OverlayTrigger
                          placement="auto"
                          delay={{
                            show: 100,
                            hide: 100,
                          }}
                          overlay={
                            <Tooltip>
                              {a} successer i en samlet stikprøve på {b}
                              .<br />
                            </Tooltip>
                          }
                        >
                          <FormControl
                            type="number"
                            // max="-0.000000001"
                            step={1}
                            precision={0}
                            //mobile={true}
                            value={+a}
                            onChange={(e) => seta(e.target.value)}
                            placeholder="0"
                          />
                        </OverlayTrigger>
                        {/* <InputGroup.Append>
													<InputGroup.Text
														inputGroup-sizing-sm
														id="basic-addon2"
													>
														Successer
													</InputGroup.Text>
												</InputGroup.Append> */}
                      </InputGroup>
                    </Col>
                    <br></br>
                    <Col>
                      <Form.Text className="text-muted">Stikprøvestørrelse</Form.Text>
                      <InputGroup size="sm">
                        <OverlayTrigger
                          placement="auto"
                          delay={{
                            show: 100,
                            hide: 100,
                          }}
                          overlay={<Tooltip>Den samlede stikprøvestørrelse er her {b}</Tooltip>}
                        >
                          <FormControl
                            type="number"
                            // max="-0.000000001"
                            step={1}
                            precision={0}
                            //mobile={true}
                            value={+b}
                            onChange={(e) => setb(e.target.value)}
                            placeholder="0"
                          />
                        </OverlayTrigger>
                      </InputGroup>
                    </Col>
                  </Row>
                  {c > 99.9999 && <br></br>}
                  <Row>
                    <Col>
                      {c > 99.9999 && (
                        <div class="alert alert-danger">
                          <strong>Bemærk!</strong> Sandsynligheden skal være mindre en 100%
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Text className="text-muted">Test af population andel p angivet i %</Form.Text>
                      <InputGroup size="sm">
                        <OverlayTrigger
                          placement="auto"
                          delay={{
                            show: 100,
                            hide: 100,
                          }}
                          overlay={
                            <Tooltip>
                              Du tester nu andel {c}%. Andelen skal være mellem 0% og 100%! .<br />
                            </Tooltip>
                          }
                        >
                          <FormControl
                            type="number"
                            // max="-0.000000001"
                            step={1}
                            precision={0}
                            //mobile={true}
                            value={+c}
                            onChange={(e) => setc(e.target.value)}
                            placeholder="0"
                          />
                        </OverlayTrigger>
                      </InputGroup>
                    </Col>
                    <br></br>
                    <Col></Col>
                  </Row>
                  <Row>
                    {/* <Col class="col-6">
                      <Form.Text className="text-muted">Test af population andel p angivet i %</Form.Text>
                      <InputGroup size="sm">
                        <OverlayTrigger
                          placement="auto"
                          delay={{
                            show: 100,
                            hide: 100,
                          }}
                          overlay={<Tooltip>Du tester nu andel {c}%. Andelen skal være mellem 0% og 100%!</Tooltip>}
                        >
                          <FormControl
                            type="number"
                            // max="-0.000000001"
                            step={1}
                            precision={0}
                            //mobile={true}
                            value={+c}
                            onChange={(e) => setc(e.target.value)}
                            placeholder="0"
                          />
                        </OverlayTrigger>
                        <InputGroup.Append>
                          <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Col>
                    <Col class="col-6"></Col> */}
                  </Row>
                  <hr></hr>
                </Form>
              </div>
            </Container>
          </div>
        </div>
      </Container>
    </>
  );
}
