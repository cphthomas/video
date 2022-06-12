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
import { std, min, mean, max, median, quantileSeq, sum } from 'mathjs';
import MLR from 'ml-regression-multivariate-linear';

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

const hotSettings = {
  data: [
    [1, 2],
    [4, 5],
    [6, 7],
    [8, 9],
  ],
  // colHeaders: true,
  height: 'auto',
  licenseKey: 'non-commercial-and-evaluation',
  copyPaste: true,
  contextMenu: true,
  colHeaders: ['Y', 'X1', 'X2'],
  // contextMenu: ["copy", "cut", "paste"], => For copy/paste
  // maxCols: 2, => For max limit of columns
  // minCols: 1 => For min limit of columns
  hiddenColumns: true,
  language: 'en-US',
  type: 'numeric',
  numericFormat: { culture: 'de-DE', pattern: '0,0' },
  allowInvalid: false,
  allowEmpty: false,
};

export default function MeanrawTest() {
  const hotTableComponent = useRef(null);
  const [linearRegression, setLinearRegression] = useState(0);

  useEffect(() => {}, [hotTableComponent]);

  const afterUpdateCell = (changes, source) => {
    if (changes) {
      let allData = [[]];
      changes.forEach(([row, col, oldValue, newValue]) => {
        allData = hotTableComponent.current.hotInstance.getData();
      });
      const y = [hotTableComponent.current.hotInstance.getDataAtCol(0)];
      let x = [];
      for (let index = 1; index < allData[0].length; index++) {
        const arr = hotTableComponent.current.hotInstance.getDataAtCol(index);
        x.push(arr);
      }
      console.log('Y', y);
      console.log('X', x);
      const mlr = new MLR(x, y);
      // console.log(mlr.predict([3, 3]));
      setLinearRegression(mlr);
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
                  <HotTable ref={hotTableComponent} settings={hotSettings} afterChange={afterUpdateCell} />
                </div>
                <br />
                <br />
                Linear Regression = {JSON.stringify(linearRegression, null, 2)}
              </Container>
            </div>
          </div>
        </Container>
      </main>
    </MathJaxContext>
  );
}
