// import React, { useState, useRef, useEffect } from 'react';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import { Tooltip, OverlayTrigger, FormControl, Button } from 'react-bootstrap';
// import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
// import { Form, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
// import InputGroup from 'react-bootstrap/InputGroup';
// import { MathJax, MathJaxContext } from 'better-react-mathjax';
// import { HotTable } from '@handsontable/react';
// import 'handsontable/dist/handsontable.full.css';
// import 'handsontable/dist/handsontable.min.css';
// import { std, min, max, median, quantileSeq, sum } from 'mathjs';
// import 'handsontable/languages/de-DE';

// const config = {
//   loader: { load: ['[tex]/html'] },
//   tex: {
//     packages: { '[+]': ['html'] },
//     inlineMath: [
//       ['$', '$'],
//       ['\\(', '\\)'],
//     ],
//     displayMath: [
//       ['$$', '$$'],
//       ['\\[', '\\]'],
//     ],
//   },
// };

// const numberFormat4 = (value) =>
//   new Intl.NumberFormat([], {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 4,
//   }).format(value);

export default function test() {
  return (
    <div>
      {' '}
      <Container className="p-0">
        <div class="p-3 mb-2 bg-white text-black">
          <div class="card">
            <div class="card-body">
              <div>
                <h2>Videoplaylists Eksamen 2022 CBS BI</h2>
                <h6>
                  Eksamen, data samt løsningsforslag er udviklet af HD BI fagansvarlig Mads Stenbo Nielsen - Department
                  of Finance - CBS
                </h6>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className="p-0">
        <div class="p-3 mb-2 bg-white text-black">
          <div class="card">
            <div class="card-body">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  title="Videoplaylist"
                  className="embed-responsive-item"
                  src="https://vimeo.com/showcase/10024958/embed"
                  frameborder="0"
                  allow="autoplay; fullscreen"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className="p-0">
        <div class="p-3 mb-2 bg-white text-black">
          <div class="card">
            <div class="card-body">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  title="Videoplaylist"
                  className="embed-responsive-item"
                  src="https://vimeo.com/showcase/10028265/embed"
                  frameborder="0"
                  allow="autoplay; fullscreen"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className="p-0">
        <div class="p-3 mb-2 bg-white text-black">
          <div class="card">
            <div class="card-body">
              <div>
                <h6>Materiale brugt i ovenstående videoplaylist.</h6>
                <Button
                  size="sm"
                  href="https://www.dropbox.com/s/urz2s0lr96etgte/BI%2C%20efter%C3%A5r%202022%2C%20ordin%C3%A6r_v3.pdf?dl=1"
                >
                  2022-25-10 CBS BI Eksamenopgave
                </Button>
                <Button
                  size="sm"
                  variant="success"
                  href="https://www.dropbox.com/s/rfqf9t2ncvlklxu/Eksamen%20efter%C3%A5r%202022%2C%20ordin%C3%A6r%20-%20vejledende%20besv_v3.pdf?dl=1"
                >
                  CBS BI Eksamen Løsningsforslag
                </Button>
                {/* <hr></hr> */}
                <Button size="sm" variant="info" href="https://www.dropbox.com/s/i3bw60lxmwd5unl/Fjernvarme.jmp?dl=1">
                  CBS BI Eksamen JMP Data
                </Button>
                {/* <Button size="sm" variant="success" href="README.md">
                  README.md
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* <MathJaxContext hideUntilTypeset={'first'} config={config} version={3}>
        <main style={{ padding: '1rem 0' }}>
          <Container className="p-0">
            <div class="p-3 mb-2 bg-white text-black">
              <div class="card">
                <Container>
                  <div class="p-3 mb-2 bg-white">
                    <Form>
                      <div className="controls">
                        <span class="lead text-muted">
                          <h2>eksamensvideoer</h2>
                          <Row>
                            <Col class="col-6">
                              <div>
                                <div>
                                  <div>
                                    <br></br>
                                    <div class="card">
                                      <div class="card-body">
                                        <div></div>
                                        <p class="card-text">
                                          <MathJax dynamic>
                                            <hr></hr>
                                            CBS test Vores bedste gæt på, også kaldet estimat for, den sande middelværdi
                                            i populationen er stikprøvegennemsnittet{' '}
                                            <span>{`$\\bar{x}=${numberFormat4(a)}$`}</span>.
                                          </MathJax>
                                        </p>
                                      </div>
                                    </div>
                                    <br></br>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </span>
                      </div>
                    </Form>
                  </div>
                </Container>
              </div>
            </div>
          </Container>
        </main>
      </MathJaxContext> */}
    </div>
  );
}
