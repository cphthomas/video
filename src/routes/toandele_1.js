import React, { useState, useRef, useEffect } from 'react';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import { Tooltip, OverlayTrigger, FormControl, Button } from 'react-bootstrap';
// import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import { Form, Row, Col } from 'react-bootstrap';
// import InputGroup from 'react-bootstrap/InputGroup';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { HotTable } from '@handsontable/react';
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

const data2 = [
  [1, 2, 2],
  [2, 10, 11],
  [3, 20, 11],
  [4, 30, 15],
  [5, 33, 15],
  [6, 30, 15],
  [7, 30, 15],
  [8, 30, 15],
  [9, 30, 15],
  [10, 30, 15],
];

const hotSettings = {
  data: data2,
  colHeaders: true,
  height: 'auto',
  licenseKey: 'non-commercial-and-evaluation',
  copyPaste: true,
  contextMenu: true,
  //colHeaders: ['ID', 'Full name', 'Position','Country', 'City'], => For columns custom labels
  //contextMenu: ["copy", "cut", "paste"], => For copy/paste
  //maxCols: 2, => For max limit of columns
  //minCols: 1 => For min limit of columns
  hiddenColumns: true,
  language: 'de-DE',
  type: 'numeric',
  numericFormat: { culture: 'de-DE', pattern: '0,0' },
};

export default function ToandeleTest() {
  const hotTableComponent = useRef(null);
  const [colarray, setcolarray] = useState([1.4, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [isContainText, setIsContainText] = useState(false);

  useEffect(() => {}, [hotTableComponent]);

  const afterUpdateCell = (changes, source) => {
    if (changes) {
      let totalSum = 0;
      let allValuesOfCol = [];
      changes.forEach(([row, col, oldValue, newValue]) => {
        allValuesOfCol = hotTableComponent.current.hotInstance.getDataAtCol(col);

        for (const cell of allValuesOfCol) {
          const convertedCell = cell.toLocaleString('en-US', {
            minimumFractionDigits: 2,
          });

          totalSum += parseFloat(convertedCell.replace(',', '.').replace(' ', ''));
        }
      });
      if (isNaN(totalSum)) {
        setIsContainText(true);
        alert('Non numeric values are pasted in column');
      } else {
        setcolarray(allValuesOfCol);
      }
    }
  };

  return (
    <MathJaxContext hideUntilTypeset={'first'} config={config} version={3}>
      <main style={{ padding: '1rem 0' }}>
        <Container className="p-0">
          <div class="p-3 mb-2 bg-white text-black">
            <div class="card">
              <Container>
                <div class="p-3 mb-2 bg-white">
                  <Form>
                    <div className="controls">
                      <HotTable
                        ref={hotTableComponent}
                        settings={hotSettings}
                        afterChange={afterUpdateCell}
                        colHeaders={true}
                        rowHeaders={true}
                      />
                      <hr></hr>
                      {colarray}
                      <br></br>
                      Antal observationer length {colarray.length}
                      <br></br>
                      Mindste obs min {!isContainText && min(...colarray)}
                      <br></br>
                      Største obs max {!isContainText && max(...colarray)}
                      <br></br>
                      std from mathjs {!isContainText && std(...colarray)}
                      <br></br>
                      median from mathjs {!isContainText && median(...colarray)}
                      <br></br>
                      Quantile from mathjs {!isContainText && quantileSeq(colarray, 0.9)}
                      <br></br>
                      Sum from mathjs {!isContainText && sum(...colarray)}
                      <br></br>
                    </div>
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
                                      <hr></hr>
                                      Vores bedste gæt på, også kaldet estimat for, den sande middelværdi i populationen
                                      er stikprøvegennemsnittet{' '}
                                      <span>{`$\\bar{x}=${numberFormat4(sum(...colarray))}$`}</span>.
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
