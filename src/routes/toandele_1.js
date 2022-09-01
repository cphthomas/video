import React, { useState } from 'react';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import { Tooltip, OverlayTrigger, FormControl, Button } from 'react-bootstrap';
// import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import { Form, Row, Col } from 'react-bootstrap';
// import InputGroup from 'react-bootstrap/InputGroup';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import Spreadsheet from 'react-spreadsheet';
// import 'handsontable/dist/handsontable.full.css';
// import 'handsontable/dist/handsontable.min.css';
// import { std, min, max, median, quantileSeq, sum } from 'mathjs';
import 'handsontable/languages/de-DE';
import { HotTable, HotColumn } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';

import 'handsontable/dist/handsontable.min.css';

import numbro from 'numbro';
import languages from 'numbro/dist/languages.min.js';
numbro.registerLanguage(languages['ja-JP']);
numbro.registerLanguage(languages['tr-TR']);
numbro.registerLanguage(languages['da-DK']);
registerAllModules();
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

export default function ToandeleTest() {
  const formatDK = {
    pattern: '0,0.00',
    culture: 'da-DK',
  };

  const hotSettings = {
    data: [
      {
        productName: 'Product A',
        JP_price: 1.32,
        DK_price: 100.56,
      },
      {
        productName: 'Product B',
        JP_price: 2.22,
        DK_price: 453.5,
      },
      {
        productName: 'Product C',
        JP_price: 3.1,
        DK_price: 678.1,
      },
    ],
    autoRowSize: true,
    autoColumnSize: true,
    colHeaders: ['Produkt', 'Mængde', 'Pris'],

    height: 'auto',
    licenseKey: 'non-commercial-and-evaluation',
  };

  const firstColumnSettings = {
    data: 'JP_price',
    type: 'numeric',
    width: '120',
    readOnly: false,
  };
  const [data, setData] = useState([
    [{ value: +23 }, { value: +23 }, { value: +23 }],
    [{ value: +23 }, { value: +23 }, { value: +23 }],
    [{ value: +23 }, { value: +23 }, { value: +23 }],
  ]);

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
                                      Vores bedste gæt på, også kaldet estimat for, den sande middelværdi i populationen
                                      er stikprøvegennemsnittet.{numberFormat4(1.3321)}
                                      <hr></hr>
                                      <Spreadsheet data={data} onChange={setData} />
                                      <hr></hr>
                                      {/* <Spreadsheet data={data} /> */}
                                      <hr></hr>
                                      {console.table(data)}
                                      <hr></hr>
                                      <div>{data.length}</div>
                                      <div>{Math.min(data)}</div>
                                      <hr></hr>
                                      <pre>{JSON.stringify(data, null, 2)}</pre>
                                      <hr></hr>
                                      <HotTable settings={hotSettings}>
                                        <HotColumn data="productName" type="text" width="120" />
                                        <HotColumn settings={firstColumnSettings} numericFormat={formatDK} />
                                        <HotColumn
                                          data="DK_price"
                                          type="numeric"
                                          numericFormat={formatDK}
                                          width="120"
                                        />
                                      </HotTable>
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
