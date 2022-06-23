import React, { useState, useRef, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import 'handsontable/dist/handsontable.min.css';
import { transpose, multiply, inv, subtract, mean } from 'mathjs';
var cdft = require('@stdlib/stats/base/dists/t/cdf');
var quantilet = require('@stdlib/stats-base-dists-t-quantile');
var cdff = require('@stdlib/stats-base-dists-f-cdf');

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

export default function Lr() {
  // function dimension(element) {
  //   return [element.length, element[0].length];
  // }
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
      const betas = multiply(xTOfxInverse, xTOfy);
      const predicted = multiply(x, betas);
      const residuals = subtract(y, predicted);
      const SSR = multiply(transpose(residuals), residuals);
      const SST = multiply(transpose(subtract(y, mean(y))), subtract(y, mean(y)));
      const R2 = 1 - SSR / SST;
      const RMSE = Math.sqrt(SSR / (y.length - betas.length));
      // const betaserror = multiply(SSR / (y.length - betas.length), xTOfxInverse);

      const betaserrors = [];
      // const diagonal = xTOfxInverse.map((x[n][n],) => x[0]);
      for (let i = 0; i < xTOfxInverse.length; i++) {
        for (let j = 0; j < xTOfxInverse[0].length; j++) {
          if (i === j) {
            betaserrors[i] = RMSE * Math.pow(xTOfxInverse[i][j], 0.5);
          }
        }
      }
      const tstats = betas.map((e, i) => e / betaserrors[i]);
      const observations = y.length;
      const degreesOfFreedom = observations - betas.length;
      const pvalues = tstats.map((e) => 2 * (1 - cdft(Math.abs(e), degreesOfFreedom)));
      const tstar = Math.abs(quantilet(0.025, degreesOfFreedom));
      const lowerBetaKi = betas.map((e, i) => e - tstar * betaserrors[i]);
      const upperBetaKi = betas.map((e, i) => e + tstar * betaserrors[i]);
      const Fstat = (SST - SSR) / (betas.length - 1) / (SSR / (observations - betas.length));
      const Fpvalue = 1 - cdff(Fstat, betas.length - 1, degreesOfFreedom);
      setLinearRegression([
        betas,
        predicted,
        residuals,
        SSR,
        SST,
        R2,
        RMSE,
        betaserrors,
        tstats,
        pvalues,
        observations,
        degreesOfFreedom,
        lowerBetaKi,
        upperBetaKi,
        Fstat,
        Fpvalue,
      ]);
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
              <div class="p-3 mb-2 bg-white">
                <HotTable
                  ref={hotTableComponent}
                  settings={hotSettings}
                  afterChange={afterUpdateCell}
                  afterLoadData={afterDataLoaded}
                />
              </div>
              Fpvalue linearRegression[15] = {linearRegression[15]}
              <br />
              Fstat linearRegression[14] = {linearRegression[14]}
              <br />
              upperBetaKi linearRegression[13] = {linearRegression[13]}
              <br />
              lowerBetaKi linearRegression[12] = {linearRegression[12]}
              <br />
              degreesOfFreedom linearRegression[11] = {linearRegression[11]}
              <br />
              observations linearRegression[10] = {linearRegression[10]}
              <br />
              Betas linearRegression[0] = {linearRegression[0]}
              <br />
              {/* Predicted linearRegression[1] = {linearRegression[1]} */}
              <br />
              {/* Residuals linearRegression[2] = {linearRegression[2]} */}
              <br />
              SSR linearRegression[3] = {linearRegression[3]}
              <br />
              SST linearRegression[4] = {linearRegression[4]}
              <br />
              R2 linearRegression[5] = {linearRegression[5]}
              <br />
              RSME linearRegression[6] = {linearRegression[6]}
              <br />
              betaserrors linearRegression[7] = {linearRegression[7]}
              <br />
              tstats linearRegression[8] = {linearRegression[8]}
              <br />
              pvalues linearRegression[9] = {linearRegression[9]}
              <br />
            </Container>
          </div>
        </div>
      </Container>
    </main>
    // </MathJaxContext>
  );
}
