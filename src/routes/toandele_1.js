import React, { useState, useRef, useEffect } from 'react';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import { Tooltip, OverlayTrigger, FormControl, Button } from 'react-bootstrap';
// import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import { Form, Row, Col } from 'react-bootstrap';
// import InputGroup from 'react-bootstrap/InputGroup';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import Spreadsheet from 'react-spreadsheet';
import 'handsontable/dist/handsontable.full.css';
import 'handsontable/dist/handsontable.min.css';
import { std, min, max, median, quantileSeq, sum } from 'mathjs';
import 'handsontable/languages/de-DE';

const config = {
  loader: { load: ['[tex]/html'] },
  tex: {
    packages: { '[+]': ['html'] },
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
  },
};

const numberFormat4 = (value) =>
  new Intl.NumberFormat([], {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  }).format(value);

const App = () => {
  const [data, setData] = useState([
    [{ value: 'Vanilla' }, { value: 'Chocolate' }],
    [{ value: 'Strawberry' }, { value: 'Cookies' }],
  ]);
  return <Spreadsheet data={data} onChange={setData} />;
};

export default function ToandeleTest() {
  return (
    <MathJaxContext hideUntilTypeset={'first'} config={config} version={3}>
      <main style={{ padding: '1rem 0' }}>
        <Container className="p-0">
          <div class="p-3 mb-2 bg-white text-black">
            <div class="card">
              <Container>
                <div class="p-3 mb-2 bg-white">
                  <Form>
                    <div className="controls"></div>
                    <span class="lead text-muted"></span>
                    <h2>2 Andele</h2>
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
                                      <App />
                                      <hr></hr>
                                      <App />
                                      Vores bedste gæt på, også kaldet estimat for, den sande middelværdi i populationen
                                      er stikprøvegennemsnittet.
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
                  </Form>
                </div>
              </Container>
            </div>
          </div>
        </Container>
      </main>
    </MathJaxContext>
  );
}
