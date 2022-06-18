import React, { useState, useRef, useEffect } from 'react';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import { Tooltip, OverlayTrigger, FormControl, Button } from 'react-bootstrap';
// import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
// import { Form, Row, Col } from 'react-bootstrap';
// import InputGroup from 'react-bootstrap/InputGroup';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import 'handsontable/dist/handsontable.min.css';
// import { std, min, mean, max, median, quantileSeq, sum } from 'mathjs';
import MLR from 'ml-regression-multivariate-linear';
import { matrix, transpose, multiply, inv } from 'mathjs';

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
    [1, 49, 124],
    [1, 69, 95],
    [1, 89, 71],
    [1, 99, 45],
    [1, 109, 18],
  ],
  // colHeaders: true,
  height: 'auto',
  licenseKey: 'non-commercial-and-evaluation',
  copyPaste: true,
  contextMenu: true,
  colHeaders: ['Hidden', 'Price(X)', 'Demand(Y)'],
  hiddenColumns: { columns: [0] },
  language: 'en-US',
  type: 'numeric',
  numericFormat: { culture: 'de-DE', pattern: '0,0' },
  allowInvalid: false,
  allowEmpty: false,
  // columns: [{ hidden: true }, {}, {}],
};

export default function MeanrawTest() {
  const hotTableComponent = useRef(null);
  const [linearRegression, setLinearRegression] = useState(0);

  useEffect(() => {}, [hotTableComponent]);

  const afterUpdateCell = (changes, source) => {
    if (changes) {
      let allData = [[]];
      allData = hotTableComponent.current.hotInstance.getData();
      const y = hotTableComponent.current.hotInstance.getDataAtCol(allData[0].length - 1);
      let x = [];
      for (let i = 0; i < allData.length; i++) {
        let innerArr = [];
        for (let j = 0; j < allData[0].length - 1; j++) {
          innerArr.push(allData[i][j]);
        }
        x.push(innerArr);
      }
      console.log('Y', y);
      console.log('X', x);
      const yMatrix = matrix(y);
      const xMatrix = matrix(x);
      console.log('yMatrix', yMatrix);
      console.log('xMatrix', xMatrix);
      //Transpose of xMatrix
      const transposeXMatrix = transpose(x);
      console.log('transposeXMatrix', transposeXMatrix);
      // X transpose * X
      const xTOfx = multiply(transposeXMatrix, x);
      console.log('xTOfx', xTOfx);
      // X transpose * Y
      const xTOfy = multiply(transposeXMatrix, y);
      console.log('xTOfy', xTOfy);
      // X transpose * X inverse
      const xTOfxInverse = inv(xTOfx);
      console.log('xTOfxInverse', xTOfxInverse);
      const finalResult = multiply(xTOfxInverse, xTOfy);
      console.log('finalResult', finalResult);
      setLinearRegression(finalResult);
    }
  };

  return (
    <MathJaxContext hideUntilTypeset={'first'} config={config} version={3}>
      <main style={{ padding: '1rem 0' }}>
        <Container className="p-0">
          <div class="p-3 mb-2 bg-white text-black">
            <div class="card">
              <Container>
                <ul>
                  <li>Last column will be Y axis</li>
                  <li>Other columns will be X axis</li>
                </ul>
                <div class="p-3 mb-2 bg-white">
                  <HotTable ref={hotTableComponent} settings={hotSettings} afterChange={afterUpdateCell} />
                </div>
                <br />

                {JSON.stringify(linearRegression, null, 2)}
              </Container>
            </div>
          </div>
        </Container>
      </main>
    </MathJaxContext>
  );
}
