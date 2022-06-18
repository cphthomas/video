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
import { inv, transpose } from 'mathjs';
// import MLR from 'ml-regression-multivariate-linear';

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
    [2, 5],
    [6, 7],
    [8, 9],
    [2, 3],
  ],
  // colHeaders: true,
  height: 'auto',
  licenseKey: 'non-commercial-and-evaluation',
  copyPaste: true,
  contextMenu: true,
  colHeaders: ['Y', 'X<sub>1</sub>', 'X<sub>2</sub>'],
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

export default function Lr() {
  const hotTableComponent = useRef(null);
  const [X, setX] = useState([
    [1, 2],
    [1, 5],
    [1, 7],
    [1, 9],
    [1, 3],
  ]);
  const [Y, setY] = useState([[1], [2], [6], [8], [2]]);
  function dimension(element) {
    return [element.length, element[0].length];
  }
  // function t(matrix) {
  //   return matrix[0].map((col, i) => matrix.map((row) => row[i]));
  // }
  let MatrixProd = (A, B) =>
    A.map((row, i) => B[0].map((_, j) => row.reduce((acc, _, n) => acc + A[i][n] * B[n][j], 0)));
  useEffect(() => {}, [hotTableComponent]);

  const afterUpdateCell = (changes, source) => {
    if (changes) {
      let allData = [[]];
      changes.forEach(([row, col, oldValue, newValue]) => {
        allData = hotTableComponent.current.hotInstance.getData();
      });
      const y = [hotTableComponent.current.hotInstance.getDataAtCol(0)];
      setY(transpose(y));
      let x = [];
      for (let index = 1; index < allData[0].length; index++) {
        const arr = hotTableComponent.current.hotInstance.getDataAtCol(index);
        x.push(arr);
        setX(transpose(x));
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
                  <HotTable ref={hotTableComponent} settings={hotSettings} afterChange={afterUpdateCell} />
                </div>
                <br />
                <MathJax>$\\Math$</MathJax>
                <br />X = {X}
                <br />Y = {Y}
                <br />
                dimension(X) = {dimension(X)}
                <br />
                dimension(Y) = {dimension(Y)}
                <br />
                transpose(X)= {transpose(X)}
                <br />
                MatrixProd(transpose(X),X)= {MatrixProd(X, transpose(X))}
                <br />
                inv(MatrixProd(transpose(X),X))= {inv(MatrixProd(transpose(X), X))}
                <br />
                MatrixProd(transpose(X),Y)= {MatrixProd(transpose(X), Y)}
                <br />
                MatrixProd(inv(MatrixProd(transpose(X),X)),MatrixProd(transpose(X),Y))=
                {MatrixProd(inv(MatrixProd(transpose(X), X)), MatrixProd(transpose(X), Y))}
                {/* {/* dimension(X) = {dimension(X)} */}
                <br />
                transpose(X) = {transpose(X)}
                <br />Y = {Y}
              </Container>
            </div>
          </div>
        </Container>
      </main>
    </MathJaxContext>
  );
}
