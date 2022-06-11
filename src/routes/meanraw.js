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

var fcdf = require('@stdlib/stats/base/dists/f/cdf');

var a = 23;

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

const hotSettings = {
  data: [
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
  ],
  colHeaders: ['var1', 'var2', 'var3'],

  height: 'auto',
  licenseKey: 'non-commercial-and-evaluation',
  numericFormat: {
    pattern: '0.0,00',
    culture: 'it-IT', // use this for EUR (German),
    // more cultures available on http://numbrojs.com/languages.html
  },
};

export default function Meanraw() {
  const hotTableComponent = useRef(null);
  const [total, setTotal] = useState(0);

  // const [avg, setAvg] = useState("");
  // const [std23, setstd23] = useState("33");
  const [colarray, setcolarray] = useState([1.4, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const x = [
    [1, 2, 5],
    [1, 2, 7],
    [2, 3, 3],
    [3, 4, 3],
    [7, 4, 1],
    [3, 1, 2],
  ];
  // Y0 = X0 * 2, Y1 = X1 * 2, Y2 = X0 + X1
  const y = [[1], [2], [4], [6], [8], [7]];
  const mlr = new MLR(x, y);
  var tstats = mlr.tStats;
  var stderrors = mlr.stdErrors;

  let MatrixProd = (A, B) =>
    A.map((row, i) => B[0].map((_, j) => row.reduce((acc, _, n) => acc + A[i][n] * B[n][j], 0)));

  function dimension(element) {
    return [element.length, element[0].length];
  }
  function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map((row) => row[i]));
  }

  var predicted = [].concat
    .apply([], MatrixProd(x, mlr.weights))
    .map((n) => n + mlr.weights[mlr.weights.length - 1][0]);

  var residuals = y.map((n, i) => n - predicted[i]);
  var ST = predicted.map((n) => mean(y) - n);

  function squareSum(numbers) {
    return numbers
      .map(function (n) {
        return n * n;
      })
      .reduce(function (sum, n) {
        return sum + n;
      });
  }

  var SSR = squareSum(residuals);
  var SST = squareSum(ST) + SSR;
  var R2 = 1 - SSR / SST;
  // var Ncoef = 2;
  var R2adj = 1 - ((1 - R2) * (y.length - 1)) / (y.length - x[0].length - 1);
  var Fstat = (SST - SSR) / x[0].length / (SSR / (y.length - x[0].length - 1));
  var Fpval = 1 - fcdf(Fstat, x[0].length, y.length - x[0].length - 1);

  useEffect(() => {}, [hotTableComponent]);

  // const isNumber = (n) => {
  //   return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  // };

  const afterUpdateCell = (changes, source) => {
    if (changes) {
      changes.forEach(([row, col, oldValue, newValue]) => {
        const allValuesOfCol = hotTableComponent.current.hotInstance.getDataAtCol(col);
        let totalSum = 0;
        for (const cell of allValuesOfCol) {
          const convertedCell = cell.toLocaleString('en-US', {
            minimumFractionDigits: 2,
          });

          totalSum += parseFloat(convertedCell.replace(',', '.').replace(' ', ''));
        }
        if (isNaN(total)) {
          alert('Non numeric values are pasted in column');
        } else {
          setTotal(totalSum);
          setcolarray(allValuesOfCol);
        }
      });
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
                    <div class="card">
                      <div class="card-body">
                        <p class="card-text">
                          <h2>Lineær regressionsanalyse</h2>
                          <HotTable
                            ref={hotTableComponent}
                            settings={hotSettings}
                            afterChange={afterUpdateCell}
                            colHeaders={true}
                            rowHeaders={true}
                          />
                          <hr></hr>
                          y.flat = {y.flat()}
                          <br></br>
                          resid = {y - predicted}
                          <br></br>
                          dimension([[1], [2], [3], [4]])=
                          {dimension([[1], [2], [3], [4]])}
                          <br></br>
                          predicted {predicted}
                          <br></br>
                          residuals = {residuals}
                          <br></br>
                          squareSum(residuals) = {squareSum(residuals)}
                          <br></br>y = {mean(y)}
                          <br></br>ST = {ST}
                          <br></br>SSR = {SSR}
                          <br></br>SST = {SST}
                          <br></br>R2 = {R2}
                          <br></br>R2adj = {R2adj}
                          <br></br>Fstat = {Fstat}
                          <br></br>Fpval = {Fpval}
                          <br></br>x[0].length = {x[0].length}
                          <br></br>x[0] = {x}
                          <br></br>squareSum = {squareSum(residuals)}
                          <br></br>
                          R2 = {1 - squareSum(residuals) / SST}
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                          flatten-intercept ={' '}
                          {[].concat
                            .apply([], MatrixProd(x, mlr.weights))
                            .map((n) => n + mlr.weights[mlr.weights.length - 1][0])}
                          <br></br>
                          flatten-intercept numberFormat4={' '}
                          {[].concat
                            .apply([], MatrixProd(x, mlr.weights))
                            .map((n) => numberFormat4(n + mlr.weights[2][0]))}
                          <br></br>
                          <br></br>
                          flatten = {[].concat.apply([], MatrixProd(x, mlr.weights))}
                          <br></br>
                          <br></br>x = {x}
                          <br></br>
                          transpose(x) {transpose(x)}
                          <br></br>
                          x[2] = {x[2]}
                          <br></br>
                          <br></br>x {x}
                          <br></br>
                          x[0][1] = {x[0][1]}
                          <br></br>
                          x[0][0] = {x[0][0]}
                          <hr></hr>
                          total = {total}
                          <br></br>
                          mlr.predict([3, 3]) {mlr.predict([3, 3])}
                          <br></br>
                          mlr.stdError {mlr.stdError}
                          <br></br>
                          mlr.rSquared {mlr.rSquared}
                          <br></br>
                          tstats = {tstats}
                          <br></br>
                          {/* rs = {rs} */}
                          <br></br>
                          mlr.tStats {mlr.tStats}
                          <br></br>
                          <br></br>
                          mlr.predict([1, 1]) {mlr.predict([3, 3])}
                          <br></br>
                          mlr.weights {mlr.weights}
                          <br></br>
                          mlr.weights[1] {mlr.weights[1]}
                          <br></br>
                          mlr.weights[2] {mlr.weights[2]}
                          <br></br>
                          stderrors = {stderrors} <br></br>
                          <br></br>
                          colarray {colarray}
                          <br></br>
                          Antal observationer length {colarray.length}
                          <br></br>
                          Mindste obs min {min(...colarray)}
                          <br></br>
                          Største obs max {max(...colarray)}
                          <br></br>
                          std from mathjs {std(...colarray)}
                          <br></br>
                          median from mathjs {median(...colarray)}
                          <br></br>
                          Quantile from mathjs {quantileSeq(colarray, 0.9)}
                          <br></br>
                          Sum from mathjs {sum(...colarray)}
                          <br></br>
                        </p>
                      </div>
                    </div>

                    <span class="lead text-muted"></span>

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
                                    <h2>2 Andele</h2>
                                    <MathJax dynamic>
                                      <hr></hr>
                                      Vores bedste gæt på, også kaldet estimat for, den sande middelværdi i populationen
                                      er stikprøvegennemsnittet <span>{`$\\bar{x}=${numberFormat4(a)}$`}</span>. Dette
                                      estimat skrives <span>{`$\\hat{\\mu}$`}</span> og udtales <i>my hat</i>.<br></br>
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
