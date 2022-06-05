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
var a = 23;
var b = 23;

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
  colHeaders: ['var1', 'var2', 'var3'],

  height: 'auto',
  licenseKey: 'non-commercial-and-evaluation',
  numericFormat: {
    pattern: '0.0,00',
    culture: 'it-IT', // use this for EUR (German),
    // more cultures available on http://numbrojs.com/languages.html
  },
};

export default function Toandele() {
  const hotTableComponent = useRef(null);
  // const [sum, setSum] = useState(0);
  // const [avg, setAvg] = useState("");
  // const [std23, setstd23] = useState("33");
  const [colarray, setcolarray] = useState([1.4, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  useEffect(() => {}, [hotTableComponent]);

  // const isNumber = (n) => {
  //   return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  // };

  const afterUpdateCell = (changes, source) => {
    if (changes) {
      console.log('changes', changes);
      changes.forEach(([row, col, oldValue, newValue]) => {
        const allValuesOfCol = hotTableComponent.current.hotInstance.getDataAtCol(col);
        // let totalSum = 0;
        //  let average = 0;
        // let standarddeviation = 0;

        // for (const cell of allValuesOfCol) {
        //   if (isNumber(cell)) {
        //     // totalSum += parseFloat(cell);
        //     // average = totalSum/3;
        //     // standarddeviation += pow(parseFloat(cell)-average,2)/3;
        //   }
        // }
        // setSum(totalSum);
        // setAvg(average);
        // setstd23(standarddeviation);
        setcolarray(allValuesOfCol);
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
                    <div className="controls">
                      <HotTable
                        ref={hotTableComponent}
                        settings={hotSettings}
                        afterChange={afterUpdateCell}
                        colHeaders={true}
                        rowHeaders={true}
                      />
                      <hr></hr>
                      <br></br>
                      {colarray}
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
                                      er stikprøvegennemsnittet <span>{`$\\bar{x}=${numberFormat4(a)}$`}</span>. Dette
                                      estimat skrives <span>{`$\\hat{\\mu}$`}</span> og udtales <i>my hat</i>.<br></br>
                                      Den sande ukendte middelværdi i populationen betegnes <span>{`$\\mu$`}</span>, da
                                      vi estimerer, angiver vi dette med hat-symbolet over{' '}
                                      <span>{`$\\hat{\\mu}$`}</span>. Vi kalder også <span>{`$\\hat{\\mu}$`}</span> for
                                      punktestimatet.<br></br>
                                      Her har vi ikke de enkelte observationer, men kun de beregnede deskriptorer
                                      stikprøve -gennemsnit og -standardafvigelse. Havde vi rådata (hver af de {b}{' '}
                                      observationer), kunne vi bestemme punktestimatet som stikprøvegennemsnittet{' '}
                                      <span>{`$\\bar{x}$`}</span> med formlen herunder:
                                      <span>{`$$\\frac{\\sum_{i=1}^{n}{x_{i}}}{n} = \\frac{\\sum_{i=1}^{${b}}{x_{i}}}{${b}}=\\frac{x_{1}+...+x_{${b}}}{${b}}=${a}
                                          
                                        $$`}</span>
                                      <hr></hr>
                                      Vores bedste gæt på, også kaldet estimat for, den sande standardafvigelse i
                                      populationen er . Dette estimat skrives <span>{`$\\hat{\\sigma}$`}</span> og
                                      udtales <i>sigma hat</i>.<br></br>
                                      Den sande ukendte standardafvigelse i populationen betegnes{' '}
                                      <span>{`$\\sigma$`}</span>, da vi estimerer, angiver vi dette med hat-symbolet
                                      over <span>{`$\\hat{\\sigma}$`}</span>. Vi kalder også{' '}
                                      <span>{`$\\hat{\\sigma}$`}</span> for punktestimatet.<br></br>
                                      Her har vi ikke de enkelte observationer, men kun de beregnede deskriptorer
                                      stikprøve -gennemsnit og -standardafvigelse. Havde vi rådata (hver af de {b}{' '}
                                      observationer), kunne vi bestemme estimatet ud fra stikprøve-standardafvigelsen{' '}
                                      <span>{`$\\hat{\\sigma}$`}</span> med formlen herunder:
                                      <span>{`$$\\sqrt{\\frac{\\sum_{i=1}^{n}{(x_{i}-\\bar{x})^2}}{n-1}} = \\sqrt{\\frac{\\sum_{i=1}^{${b}}{(x_{i}-\\bar{x})^2}}{${
                                        b - 1
                                      }}}=$$`}</span>
                                      <span>{`$$\\sqrt{ \\frac{(x_{1}-\\bar{x})^2+...+(x_{${b}}-\\bar{x})^2}{${b - 1}}}=
                                          
                                        $$`}</span>
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
