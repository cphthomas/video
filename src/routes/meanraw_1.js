import React, { useState, useRef, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import 'handsontable/dist/handsontable.min.css';
import { transpose, multiply, inv } from 'mathjs';

const handsOnData = [
  [49, 124],
  [69, 95],
  [89, 71],
  [99, 45],
  [109, 18],
  [16, 19],
  [77, 88],
];

const hotSettings = {
  data: handsOnData,
  // colHeaders: true,
  // height: 'auto',
  licenseKey: 'non-commercial-and-evaluation',
  copyPaste: true,
  contextMenu: true,
  colHeaders: ['Demand(Y)', 'Price(X)'],
  // width: '100%',
  height: 320,
  // rowHeights: 23,
  // rowHeaders: true,

  // hiddenColumns: { columns: [1] },
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

  const lastColumnOfTwoDArray = (arr, n) => arr.map((x) => x[n]);

  const afterDataLoaded = () => {
    const y = lastColumnOfTwoDArray(handsOnData, 0);
    calculateLinearRegression(handsOnData, y);
  };

  const afterUpdateCell = (changes, source) => {
    if (changes) {
      let allData = [[]];
      allData = hotTableComponent.current.hotInstance.getData();
      const y = hotTableComponent.current.hotInstance.getDataAtCol(0);
      calculateLinearRegression(allData, y);
    }
  };

  const calculateLinearRegression = (allData, y) => {
    try {
      let x = [];
      for (let i = 0; i < allData.length; i++) {
        let innerArr = [];
        innerArr.push(1);
        for (let j = 1; j < allData[0].length; j++) {
          innerArr.push(allData[i][j]);
        }
        x.push(innerArr);
      }
      //Transpose of xMatrix
      const transposeXMatrix = transpose(x);
      // X transpose * X
      const xTOfx = multiply(transposeXMatrix, x);
      // X transpose * Y
      const xTOfy = multiply(transposeXMatrix, y);
      // X transpose * X inverse
      const xTOfxInverse = inv(xTOfx);
      const finalResult = multiply(xTOfxInverse, xTOfy);
      setLinearRegression(finalResult);
    } catch (e) {
      console.error('Error:' + e);
      alert('Something went wrong, please check your data again');
    }
  };

  return (
    // <MathJaxContext hideUntilTypeset={'first'} config={config} version={3}>
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
                <HotTable
                  ref={hotTableComponent}
                  settings={hotSettings}
                  afterChange={afterUpdateCell}
                  afterLoadData={afterDataLoaded}
                />
              </div>
              <br />

              {JSON.stringify(linearRegression, null, 2)}
            </Container>
          </div>
        </div>
      </Container>
    </main>
    // </MathJaxContext>
  );
}
