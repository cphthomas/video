// import { Form, Row, Col, FormControl } from 'react-bootstrap';
import { Form, Row, Col, FormControl, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
// import Toggle from './ToggleRenderProps';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';

import InputGroup from 'react-bootstrap/InputGroup';
import norminv from 'norminv';
// import { numberFormat4 } from './lib'; //ændrer til komma og pct + DKK
import { numberFormat4 } from './numbers'; //ændrer til komma og pct + DKK

// import 'katex/dist/katex.min.css';
// import { InlineMath, BlockMath } from 'react-katex';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/modules/annotations')(Highcharts);

var cdf = require('@stdlib/stats-base-dists-normal-cdf');
var pdf = require('@stdlib/stats/base/dists/normal/pdf');
var quantile = require('@stdlib/stats/base/dists/normal/quantile');

export default function Andel() {
  var [a, seta] = useState(+(421).toFixed(2));
  var [b, setb] = useState(+(500).toFixed(2));
  var [c, setc] = useState(+(85).toFixed(2));
  var [f, setf] = useState(+(b * 10).toFixed(2));
  var [sig, setsig] = useState(['5% signifikansniveau']);
  var sigSelect = (e) => {
    setsig(e);
  };

  const [show, setShow] = useState(false);
  var [show2, setShow2] = useState(false);
  var [show3, setShow3] = useState(false);
  var [show4, setShow4] = useState(false);
  var [show5, setShow5] = useState(false);
  var [show6, setShow6] = useState(false);
  var [show7, setShow7] = useState(false);

  var significancelevel = 0.05;
  if (sig === '5% signifikansniveau') {
    significancelevel = 0.05;
  } else {
    if (sig === '10% signifikansniveau') {
      significancelevel = 0.1;
    } else {
      if (sig === '1% signifikansniveau') {
        significancelevel = 0.01;
      }
    }
  }

  var p = a / b;
  var ptest = c / 100;
  var [fpctext, setfpctext] = useState('Sæt kendt endelig populationsstørrelse');
  const toggleDisplay = () => {
    if (fpctext === 'Sæt kendt endelig populationsstørrelse') {
      setfpctext('Fjern kendt endelig populationsstørrelse');
    } else {
      setfpctext('Sæt kendt endelig populationsstørrelse');
    }
  };
  var fpc = 1;
  fpctext === 'Sæt kendt endelig populationsstørrelse' ? (fpc = 1) : (fpc = +Math.sqrt((f - b) / (f - 1)));
  var stdev = Math.sqrt((p * (1 - p)) / b) * fpc;
  var percentile = norminv(1 - significancelevel / 2, 0, 1);
  var lower = p - percentile * stdev;
  var upper = p + percentile * stdev;
  var forudsætning = b * p * (1 - p);
  var fejlmargin = (upper * 100 - lower * 100) / 2;
  var [d, setd] = useState(+Math.floor(fejlmargin).toFixed(2));
  var ztest = (p - ptest) / Math.sqrt((ptest * (1 - ptest)) / b);
  var pv1ned = cdf(ztest, 0, 1);
  var pv1op = 1 - cdf(ztest, 0, 1);
  var pv2 = 2 * Math.min(+pv1ned, +pv1op);
  var factor = 1;

  Math.abs(ztest) < 5 ? (factor = 1) : (factor = Math.abs(ztest / 5));

  var minsample = (norminv(1 - significancelevel / 2, 0, 1) / (d / 100)) ** 2 * (p * (1 - p)) * fpc;
  var N = 500;
  var x = [...Array(N + 1).keys()].map((i) => (factor * (i - N / 2)) / 50);
  var y = x.map((x) => pdf(x, 0.0, 1.0));
  var coordinates = x.map(function (v, i) {
    return [v, y[i]];
  });
  var qop = quantile(1 - significancelevel, 0, 1);
  var qned = quantile(significancelevel, 0, 1);
  var q2 = quantile(1 - significancelevel / 2, 0, 1);

  var xciop = x.filter(function (x) {
    return x > qop;
  });
  xciop.unshift(qop, qop);
  xciop.sort((a, b) => a - b);
  var yciop = xciop.map((xciop) => pdf(xciop, 0, 1.0));
  yciop[0] = +0;
  var coordinatesciop = xciop.map(function (v, i) {
    return [v, yciop[i]];
  });

  var xcined = x.filter(function (x) {
    return x < qned;
  });
  xcined.push(qned);
  var ycined = xcined.map((xcined) => pdf(xcined, 0, 1.0));
  xcined.push(qned);
  ycined.push(0);
  var coordinatescined = xcined.map(function (v, i) {
    return [v, ycined[i]];
  });

  var xci2op = x.filter(function (x) {
    return x > q2;
  });
  xci2op.unshift(q2, q2);
  xci2op.sort((a, b) => a - b);
  var yci2op = xci2op.map((xci2op) => pdf(xci2op, 0, 1.0));
  yci2op[0] = +0;
  var coordinatesci2op = xci2op.map(function (v, i) {
    return [v, yci2op[i]];
  });

  var xci2ned = x.filter(function (x) {
    return x < -q2;
  });
  xci2ned.push(-q2);
  var yci2ned = xci2ned.map((xci2ned) => pdf(xci2ned, 0, 1.0));
  xci2ned.push(-q2);
  yci2ned.push(0);
  var coordinatesci2ned = xci2ned.map(function (v, i) {
    return [v, yci2ned[i]];
  });

  var xned = x.filter(function (x) {
    return x < ztest;
  });
  xned.push(ztest);
  var yned = xned.map((xned) => pdf(xned, 0.0, 1.0));
  xned.push(ztest);
  yned.push(0);
  // var coordinatesned = xned.map(function (v, i) {
  //   return [v, yned[i]];
  // });

  var xop = x.filter(function (x) {
    return x > ztest;
  });
  xop.unshift(ztest);
  var yop = xop.map((xop) => pdf(xop, 0.0, 1.0));
  xop.unshift(ztest);
  xop.push(5);
  yop.unshift(0);
  yop.push(0);

  // const inlineFormula = '\\cos (2\\theta) = \\cos^2 \\theta - \\sin^2 \\theta = \\frac{2x}{34y}';
  // const blockFormula = `\\frac{n!}{k!(n-k)!} = \\binom{n}{k} = \\frac{2x}{34y}`;
  // var phatFormula =
  //   `\\hat{p} = \\frac{succeser}{n} = \\frac{${a}}{${b}} = ` + a + '/' + b + ' \\approx ' + numberFormat4(p);
  // var KIFormula =
  //   (1 - significancelevel) * 100 +
  //   `\\% \\ KI\\ = \\hat{p} \\pm z_{1-\\frac{\\alpha}{2}}\\cdot \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}} \\approx `;
  // var KIFormula2 = `${numberFormat4(p)} \\pm ${numberFormat4(q2)} \\cdot \\sqrt{\\frac{${numberFormat4(
  //   p
  // )}(1-${numberFormat4(p)})}{${b}}} \\approx `;
  // var KIFormula3 = `[${numberFormat4(lower * 100)}\\%;${numberFormat4(upper * 100)}\\%]`;

  const optionsop = {
    title: {
      text: 'Z-fordelingen et-sidet alternativ hypotese op',
    },
    annotations: [
      {
        labelOptions: {
          // backgroundColor: "rgba(255,255,255,1)",
          // backgroundColor: "rgba(252, 255, 197, 1)",
          verticalAlign: 'top',
          padding: 2,

          style: {
            fontSize: '0.6em',
          },
        },
        labels: [
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: ztest,
              y: 0.45,
            },
            text:
              +pv1op <= significancelevel
                ? 'z-teststørrelsen er ' +
                  numberFormat4(ztest) +
                  '<br/>Forkast nulhypotesen' +
                  '<br/>P-værdien er ' +
                  numberFormat4(pv1op * 100) +
                  '%'
                : 'z-teststørrelsen er ' +
                  numberFormat4(ztest) +
                  '<br/>Forkast IKKE nulhypotesen' +
                  '<br/>P-værdien er ' +
                  numberFormat4(pv1op * 100) +
                  '%',
            borderWidth: 1,
            borderColor: +pv1op <= significancelevel ? 'red' : 'green',
            backgroundColor: +pv1op <= significancelevel ? 'red' : 'green',
            style: { color: 'white' },
          },
          {
            distance: 10,
            point: {
              xAxis: 0,
              yAxis: 0,
              x: qop,
              y: pdf(qop, 0.0, 1.0),
            },
            text:
              'Kritisk værdi ' +
              numberFormat4(qop) +
              '<br />Det røde hale areal er ' +
              numberFormat4(significancelevel * 100) +
              '%<br />dvs. signifikansniveauet',
            borderWidth: 1,
            borderColor: 'red',
            backgroundColor: 'red',
            style: { color: 'white' },
          },
        ],
      },
    ],
    chart: {
      type: 'spline',
    },

    credits: {
      enabled: false,
    },
    series: [
      {
        // color: 'blue',
        name: 'Forkast ikke',
        data: coordinates,
        color: 'green',
      },
      // {
      //   name: 'p-værdi',
      //   type: 'spline',
      //   data: coordinatesned,
      //   color: 'black',
      // },
      {
        name: 'Forkast',
        type: 'spline',
        data: coordinatesciop,
        color: 'rgb(255,0,0,1)',
      },
      {
        type: 'line',
        useHTML: true,
        color: +pv1op <= significancelevel ? 'red' : 'green',
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
        },
        name: 'z-teststørrelse',
        data: [
          [ztest, 0],
          [ztest, 0.45],
        ],
      },
    ],
  };

  const optionsned = {
    title: {
      text: 'Z-fordelingen et-sidet alternativ hypotese ned',
    },
    annotations: [
      {
        labelOptions: {
          // backgroundColor: "rgba(255,255,255,1)",
          // backgroundColor: "rgba(252, 255, 197, 1)",
          verticalAlign: 'top',
          padding: 2,

          style: {
            fontSize: '0.6em',
          },
        },
        labels: [
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: ztest,
              y: 0.45,
            },
            text:
              +pv1ned <= significancelevel
                ? 'z-teststørrelsen er ' +
                  numberFormat4(ztest) +
                  '<br/>Forkast nulhypotesen' +
                  '<br/>P-værdien er ' +
                  numberFormat4(pv1ned * 100) +
                  '%'
                : 'z-teststørrelsen er ' +
                  numberFormat4(ztest) +
                  '<br/>Forkast IKKE nulhypotesen' +
                  '<br/>P-værdien er ' +
                  numberFormat4(pv1ned * 100) +
                  '%',
            borderWidth: 1,
            borderColor: +pv1ned <= significancelevel ? 'red' : 'green',
            backgroundColor: +pv1ned <= significancelevel ? 'red' : 'green',
            style: { color: 'white' },
          },
          {
            distance: 10,
            point: {
              xAxis: 0,
              yAxis: 0,
              x: qned,
              y: pdf(qned, 0.0, 1.0),
            },
            text:
              'Kritisk værdi ' +
              numberFormat4(qned) +
              '<br />Det røde hale areal er ' +
              numberFormat4(significancelevel * 100) +
              '%<br />dvs. signifikansniveauet',
            borderWidth: 1,
            borderColor: 'red',
            backgroundColor: 'red',
            style: { color: 'white' },
          },
        ],
      },
    ],
    chart: {
      type: 'spline',
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        // color: 'blue',
        name: 'Forkast ikke',
        data: coordinates,
        color: 'green',
      },
      {
        type: 'line',
        useHTML: true,
        color: +pv1ned <= significancelevel ? 'red' : 'green',
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
        },
        name: 'z-teststørrelse',
        data: [
          [ztest, 0],
          [ztest, 0.45],
        ],
      },
      // {
      //   name: 'p-værdi',
      //   type: 'spline',
      //   data: coordinatesop,
      //   color: 'black',
      // },
      {
        name: 'Forkast',
        type: 'spline',
        data: coordinatescined,
        color: 'rgb(255,0,0,1)',
      },
    ],
  };

  const options2 = {
    annotations: [
      {
        labelOptions: {
          // backgroundColor: "rgba(255,255,255,1)",
          // backgroundColor: "rgba(252, 255, 197, 1)",
          verticalAlign: 'top',
          padding: 2,

          style: {
            fontSize: '0.6em',
          },
        },

        labels: [
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: ztest,
              y: 0.45,
            },
            text:
              +pv2 <= significancelevel
                ? 'z-teststørrelsen er ' +
                  numberFormat4(ztest) +
                  '<br/>Forkast nulhypotesen' +
                  '<br/>P-værdien er ' +
                  numberFormat4(pv2 * 100) +
                  '%'
                : 'z-teststørrelsen er ' +
                  numberFormat4(ztest) +
                  '<br/>Forkast IKKE nulhypotesen' +
                  '<br/>P-værdien er ' +
                  numberFormat4(pv2 * 100) +
                  '%',
            borderWidth: 1,
            borderColor: +pv2 <= significancelevel ? 'red' : 'green',
            backgroundColor: +pv2 <= significancelevel ? 'red' : 'green',
            style: { color: 'white' },
          },
          {
            distance: 10,
            point: {
              // verticalAlign: 'right',
              xAxis: 0,
              yAxis: 0,
              x: q2,
              y: pdf(q2, 0.0, 1.0),
            },
            text:
              'Kritisk værdi ' +
              numberFormat4(q2) +
              '<br />Højre røde hale areal er ' +
              numberFormat4(significancelevel * 50) +
              '%<br />dvs. halvdelen af signifikansniveauet',
            borderWidth: 1,
            borderColor: 'red',
            backgroundColor: 'red',
            style: { color: 'white' },
          },

          {
            distance: 10,
            point: {
              xAxis: 0,
              yAxis: 0,
              x: -q2,
              y: pdf(-q2, 0.0, 1.0),
            },
            text:
              'Kritisk værdi ' +
              numberFormat4(-q2) +
              '<br />Venstre røde hale areal er ' +
              numberFormat4(significancelevel * 50) +
              '%<br />dvs. halvdelen af signifikansniveauet',
            borderWidth: 1,
            borderColor: 'red',
            backgroundColor: 'red',
            style: { color: 'white' },
          },
        ],
      },
    ],
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Z-fordelingen 2-sidet alternativ hypotese',
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        // color: 'blue',
        name: 'Forkast ikke',
        data: coordinates,
        color: 'green',
      },
      {
        type: 'line',
        useHTML: true,
        color: +pv2 <= significancelevel ? 'red' : 'green',
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
        },
        name: 'z-teststørrelse',
        data: [
          [-ztest, 0],
          [-ztest, pdf(ztest, 0.0, 1.0)],
        ],
      },
      {
        type: 'line',
        useHTML: true,
        color: +pv2 <= significancelevel ? 'red' : 'green',
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
        },
        name: 'z-teststørrelse',
        data: [
          [ztest, 0],
          [ztest, 0.45],
        ],
      },
      // {
      //   name: 'p-værdi',
      //   type: 'spline',
      //   data: coordinatesop2,
      //   color: 'black',
      // },
      // {
      //   name: 'p-værdi',
      //   type: 'spline',
      //   data: coordinatesned2,
      //   color: 'black',
      // },
      {
        name: 'Forkast',
        type: 'spline',
        data: coordinatesci2op,
        color: 'rgb(255,0,0,1)',
      },
      {
        name: 'Forkast',
        type: 'spline',
        data: coordinatesci2ned,
        color: 'rgb(255,0,0,1)',
      },
    ],
  };
  return (
    <>
      <Container className="p-0">
        <div class="p-3 mb-2 bg-white text-black">
          <div class="card">
            <Container>
              <div class="p-3 mb-2 bg-white">
                <Form>
                  <span class="lead text-muted">
                    1 ANDEL {seta}
                    {setb}{' '}
                    <OverlayTrigger
                      placement="auto"
                      overlay={
                        <Tooltip>
                          <p style={{ textAlign: 'left' }}>
                            Vi benytter analyse af en andel, når vi har en kvalitativ binær variabel.<br></br>
                            En kvalitativ binær variabel kan fx. være mænd og kvinder, tilfreds og utilfreds, variabelt
                            lån og fast lån etc.
                            <hr></hr>
                            Har man indsamlet en stikprøve med fx {b} respondenter angiver man dette antal i feltet med
                            stikprøvestørrelse, og ønsker at analysere andelen af tilfredse, optæller man antallet af
                            tilfredse som fx kunne være {a} disse intaster vi i feltet med successer.{' '}
                          </p>
                        </Tooltip>
                      }
                    >
                      <i class="fas fa-question-circle"></i>
                    </OverlayTrigger>
                  </span>
                  <p class="lead text-muted">Analyse af en kvalitativ binær variabel.</p>

                  {/* Signifikansniveau########################################################################################################################################################################################## */}
                  <Row>
                    <Col>
                      <InputGroup>
                        <div class="btndown">
                          <DropdownButton
                            size="sm"
                            // alignleft
                            // variant="warning"
                            title={sig}
                            id="sig"
                            // id="dropdown-split-basic"
                            onSelect={sigSelect}
                          >
                            <Dropdown.Item eventKey="1% signifikansniveau">
                              <p test />
                              1% signifikansniveau
                            </Dropdown.Item>
                            <Dropdown.Item btn-sm eventKey="5% signifikansniveau">
                              5% signifikansniveau
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="10% signifikansniveau">10% signifikansniveau</Dropdown.Item>
                          </DropdownButton>
                        </div>
                      </InputGroup>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col>
                      {a > b && (
                        <div class="alert alert-danger">
                          <strong>Bemærk!</strong> Antallet af successer skal være mindre end stikprøvens størrelse.
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Text className="text-muted">Successer</Form.Text>
                      <InputGroup size="sm">
                        <OverlayTrigger
                          placement="auto"
                          delay={{
                            show: 100,
                            hide: 100,
                          }}
                          overlay={
                            <Tooltip>
                              {a} successer i en samlet stikprøve på {b}
                              .<br />
                            </Tooltip>
                          }
                        >
                          <FormControl
                            type="number"
                            // max="-0.000000001"
                            step={1}
                            precision={0}
                            //mobile={true}
                            value={+a}
                            onChange={(e) => seta(e.target.value)}
                            placeholder="0"
                          />
                        </OverlayTrigger>
                        {/* <InputGroup.Append>
													<InputGroup.Text
														inputGroup-sizing-sm
														id="basic-addon2"
													>
														Successer
													</InputGroup.Text>
												</InputGroup.Append> */}
                      </InputGroup>
                    </Col>
                    <br></br>
                    <Col>
                      <Form.Text className="text-muted">Stikprøvestørrelse</Form.Text>
                      <InputGroup size="sm">
                        <OverlayTrigger
                          placement="auto"
                          delay={{
                            show: 100,
                            hide: 100,
                          }}
                          overlay={<Tooltip>Den samlede stikprøvestørrelse er her {b}</Tooltip>}
                        >
                          <FormControl
                            type="number"
                            // max="-0.000000001"
                            step={1}
                            precision={0}
                            //mobile={true}
                            value={+b}
                            onChange={(e) => setb(e.target.value)}
                            placeholder="0"
                          />
                        </OverlayTrigger>
                      </InputGroup>
                    </Col>
                  </Row>
                  {c > 99.9999 && <br></br>}
                  <Row>
                    <Col>
                      {c > 99.9999 && (
                        <div class="alert alert-danger">
                          <strong>Bemærk!</strong> Sandsynligheden skal være mindre en 100%
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Text className="text-muted">Test af population andel p angivet i %</Form.Text>
                      <InputGroup size="sm">
                        <OverlayTrigger
                          placement="auto"
                          delay={{
                            show: 100,
                            hide: 100,
                          }}
                          overlay={
                            <Tooltip>
                              Du tester nu andel {c}%. Andelen skal være mellem 0% og 100%! .<br />
                            </Tooltip>
                          }
                        >
                          <FormControl
                            type="number"
                            // max="-0.000000001"
                            step={1}
                            precision={0}
                            //mobile={true}
                            value={+c}
                            onChange={(e) => setc(e.target.value)}
                            placeholder="0"
                          />
                        </OverlayTrigger>
                      </InputGroup>
                    </Col>
                    <br></br>
                    <Col></Col>
                  </Row>
                  <Row></Row>
                  <hr></hr>
                  <Row>
                    <Col>
                      <>
                        {show && b * p * (1 - p) < 9 && (
                          <>
                            <Alert variant="warning" onClose={() => setShow(false)} dismissible>
                              Er stikprøven er tilstrækkeligt stor, kan man med tilstrækkelig sikkerhed udtale sig om
                              populationen. Her er forudsætningen ikke opfyldt, hvilket bør oplyses, inden den videre
                              analyse. Den lille stikprøvestørrelse kan eventuelt give problemer med kvaliteten af
                              analysen.<br></br>
                              <i>Se flere detaljer herunder:</i>
                            </Alert>
                          </>
                        )}
                      </>
                    </Col>
                  </Row>
                  {/* Forudsætninger########################################################################################################################################################################################## */}
                  <Row>
                    <Col class="col-6">
                      <div>
                        <Button size="sm" onClick={() => setShow2(!show2)}>
                          {show2 && 'Skjul forudsætninger'}
                          {!show2 && 'Forudsætninger'}
                        </Button>

                        {show2 && (
                          <div>
                            <br></br>
                            <div class="card">
                              <div class={+forudsætning > +9 ? 'card-body bg-success' : 'card-body bg-warning'}>
                                <p class="card-text text-white">
                                  <h5>
                                    Forudsætning for testet{' '}
                                    <OverlayTrigger
                                      placement="auto"
                                      overlay={
                                        <Tooltip>
                                          <p style={{ textAlign: 'left' }}>Forudsætning for testet</p>
                                        </Tooltip>
                                      }
                                    >
                                      <i class="fas fa-question-circle"></i>
                                    </OverlayTrigger>
                                  </h5>
                                  <hr></hr>

                                  <span>
                                    For at sikre at stikprøven er tilstrækkeligt stor, til at vi med tilstrækkelig
                                    sikkerhed kan udtale om populationen, bør forudsætningen herunder være opfyldt:{' '}
                                    <br></br>
                                    <span class="serif">n·p&#770;(1-p&#770;)&gt;9</span>
                                    <br></br>
                                    Hvor <span class="serif">n</span> er stikprøvestørrelsen {b} og{' '}
                                    <span class="serif">p&#770;</span> er punktestimatet for andelen {p}.<br></br>
                                    Kontrolleres ved udregning af:
                                    <br />
                                    {numberFormat4(b)}*{numberFormat4(p)}
                                    *(1-
                                    {numberFormat4(p)}) = {numberFormat4(forudsætning)}
                                  </span>

                                  {+forudsætning > 9 && (
                                    <span>
                                      <br></br>Da {numberFormat4(forudsætning)} er større end 9, er forudsætningen
                                      opfyldt. Havde forudsætningen ikke været opfyldt, bemærkes i den videre analyse,
                                      at der kan være problemer med kvaliteten af analysen.
                                    </span>
                                  )}
                                  {+forudsætning <= 9 && (
                                    <span>
                                      <br></br>Da {numberFormat4(forudsætning)} ikke er større end 9, er forudsætningen
                                      ikke opfyldt.
                                      <br></br>
                                      Dette bør bemærkes i den videre analyse. Der kan være problemer med kvaliteten af
                                      analysen. Man gennemfører typisk analysen til trods for at forudsætningen ikke er
                                      opfyldt.
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                            <br></br>
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                  {/* Punktestimat########################################################################################################################################################################################## */}
                  <Row>
                    <Col class="col-6">
                      <Button size="sm" onClick={() => setShow3(!show3)}>
                        {show3 && 'Skjul Punktestimat'}
                        {!show3 && 'Punktestimat'}
                      </Button>
                      <div>
                        {show3 && (
                          <div>
                            <div>
                              <br></br>
                              <div class="card">
                                <div class="card-body">
                                  <div></div>
                                  <p class="card-text">
                                    Vores bedste gæt på den sande andel i populationen kaldet p hat skrevet som{' '}
                                    <span class="serif">p&#770;</span> (også kaldet punktestimatet) kan beregnes som:
                                    <br />
                                    antal successer/stikprøvestørrelse = {a}/{b} = {numberFormat4(a / b)} =
                                    <span style={{ backgroundColor: '#80ff00' }}>{numberFormat4((100 * a) / b)}%</span>
                                  </p>
                                </div>
                              </div>
                              <br></br>
                            </div>
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                  {/* Konfidensinterval########################################################################################################################################################################################## */}
                  <Row>
                    <Col class="col-6">
                      <Button size="sm" onClick={() => setShow6(!show6)}>
                        {show6 && 'Skjul Konfidensinterval'}
                        {!show6 && 'Konfidensinterval'}
                      </Button>
                      <div>
                        {show6 && (
                          <>
                            <div>
                              <br></br>
                              <div class="card">
                                <div class="card-body">
                                  <div></div>
                                  <p class="card-text">
                                    Konfidensintervallet angiver i hvilket interval den sande andel p i populationen
                                    ligger med en vis sandsynlighed.<br></br>Den nedre grænse for konfidensintervallet
                                    kan beregnes som {numberFormat4(lower * 100)}%, og den øvre grænse for
                                    konfidensintervallet kan beregnes som {numberFormat4(upper * 100)}%<br></br>
                                    Med {100 - significancelevel * 100}% sandsynlighed ligger den sande andel i
                                    populationen, mellem{' '}
                                    <span style={{ backgroundColor: '#80ff00' }}>{numberFormat4(lower * 100)}%</span>
                                    og <span style={{ backgroundColor: '#80ff00' }}>{numberFormat4(upper * 100)}%</span>
                                  </p>
                                </div>
                              </div>
                              <br></br>
                            </div>
                          </>
                        )}
                      </div>
                    </Col>
                  </Row>
                  {/* ########################################################################################################################################################################################## */}
                  {/* Hypoteser */}
                  <Row>
                    <Col class="col-6">
                      <Button size="sm" onClick={() => setShow4(!show4)}>
                        {show4 && 'Skjul Hypoteser'}
                        {!show4 && 'Hypoteser'}
                      </Button>
                      <div>
                        {show4 && (
                          <div>
                            <br></br>
                            <div class="card">
                              <div class={+pv2 > significancelevel ? 'card-body bg-success' : 'card-body bg-danger'}>
                                <p class="card-text text-white">
                                  <h5>
                                    Hypotesetest med to-sidet alternativ hypotese{' '}
                                    <OverlayTrigger
                                      placement="auto"
                                      overlay={
                                        <Tooltip>
                                          <p style={{ textAlign: 'left' }}>
                                            Vi benytter hypotesetest med to-sidet alternativ hypotese H<sub>1</sub>, når
                                            vi kan ende med at forkaste nulhypotesen H<sub>0</sub> af 2 årsager, hvis
                                            andelen i stikprøven er signifikant mindre end eller signifikant større end{' '}
                                            {numberFormat4(100 * p)}%
                                            <br />
                                            Vi benytter dette test, hvis vi skal teste:<br></br>
                                            Er andelen p lig med dvs. = {numberFormat4(100 * p)}%<br></br>
                                            Er andelen p forskellig fra dvs. ≠ {numberFormat4(100 * p)}%<br></br>
                                          </p>
                                        </Tooltip>
                                      }
                                    >
                                      <i class="fas fa-question-circle"></i>
                                    </OverlayTrigger>
                                  </h5>
                                  <hr></hr>H<sub>0</sub>: p = {numberFormat4(c)}%<br></br>H<sub>1</sub>: p ≠{' '}
                                  {numberFormat4(c)}%<br></br>
                                  {+pv2 > significancelevel && (
                                    <p>
                                      Da p-værdien/signifikanssandsynligheden {numberFormat4(100 * pv2)}% er større end
                                      5% signifikansniveauet, kan vi ikke afvise nulhypotesen H<sub>0</sub>.<br></br>H
                                      <sub>0</sub>: p = {numberFormat4(c)}% dvs. andelen i populationen p er lig med{' '}
                                      {numberFormat4(c)}%<br></br>
                                      <s>
                                        H<sub>1</sub>: p ≠ {numberFormat4(c)}% dvs. andelen i populationen p er
                                        forskellig fra {numberFormat4(c)}%
                                      </s>
                                      <br></br>
                                      Vi kan således ikke afvise at den sande andel i populationen p er{' '}
                                      {numberFormat4(c)}
                                      %.
                                    </p>
                                  )}
                                  {+pv2 <= significancelevel && (
                                    <p>
                                      Da p-værdien/signifikanssandsynligheden {numberFormat4(100 * pv2)}% er mindre end
                                      5% signifikansniveauet, kan vi afvise H<sub>0</sub>.<br></br>
                                      <s>
                                        H<sub>0</sub>: p = {numberFormat4(c)}% dvs. andelen i populationen p er lig med{' '}
                                        {numberFormat4(c)}%
                                      </s>
                                      <br></br>H<sub>1</sub>: p ≠ {numberFormat4(c)}% dvs. andelen i populationen p er
                                      forskellig fra {numberFormat4(c)}%<br></br>
                                      Vi afviser derfor at den sande andel i populationen p er {numberFormat4(c)}
                                      %.
                                      <br></br>
                                      Der er statistisk belæg, for at konkludere at andelen i populationen p er
                                      forskellig fra {numberFormat4(c)}
                                      %.
                                    </p>
                                  )}
                                </p>
                              </div>
                            </div>
                            <br></br>
                            <div class="card">
                              <div class={+pv1op > significancelevel ? 'card-body bg-success' : 'card-body bg-danger'}>
                                <p class="card-text text-white">
                                  <h5>
                                    Hypotesetest med 1-sidet alternativ hypotese opad{' '}
                                    <OverlayTrigger
                                      placement="auto"
                                      overlay={
                                        <Tooltip>
                                          <p style={{ textAlign: 'left' }}>
                                            Vi benytter hypotesetest med 1-sidet alternativ hypotese H<sub>1</sub> opad,
                                            når vi kan ende med at forkaste nulhypotesen H<sub>0</sub> af 1 årsag, hvis
                                            andelen i stikprøven er signifikant større end {numberFormat4(100 * p)}%
                                            <br />
                                            Vi benytter dette test, hvis vi skal teste:<br></br>
                                            Er andelen p højst eller maksimalt dvs. ≤ {numberFormat4(100 * p)}%<br></br>
                                            Er andelen p større end dvs. &gt; {numberFormat4(100 * p)}%
                                          </p>
                                        </Tooltip>
                                      }
                                    >
                                      <i class="fas fa-question-circle"></i>
                                    </OverlayTrigger>
                                  </h5>
                                  <hr></hr>H<sub>0</sub>: p ≤ {numberFormat4(c)}%<br></br>H<sub>1</sub>: p &gt;{' '}
                                  {numberFormat4(c)}%<br></br>
                                  {+pv1op > significancelevel && (
                                    <p>
                                      Da p-værdien/signifikanssandsynligheden {numberFormat4(100 * pv1op)}% er større
                                      end 5% signifikansniveauet, kan vi ikke afvise nulhypotesen H<sub>0</sub>.
                                      <br></br>H<sub>0</sub>: p ≤ {numberFormat4(c)}% dvs. andelen i populationen p
                                      højst er {numberFormat4(c)}%<br></br>
                                      <s>
                                        H<sub>1</sub>: p &gt; {numberFormat4(c)}% dvs. andelen i populationen p er
                                        større end {numberFormat4(c)}%
                                      </s>
                                      <br></br>
                                      Vi kan således ikke afvise at den sande andel i populationen p højst er{' '}
                                      {numberFormat4(c)}
                                      %.
                                    </p>
                                  )}
                                  {+pv1op <= significancelevel && (
                                    <p>
                                      Da p-værdien/signifikanssandsynligheden {numberFormat4(100 * pv1op)}% er mindre
                                      end 5% signifikansniveauet, kan vi afvise H<sub>0</sub>.<br></br>
                                      <s>
                                        H<sub>0</sub>: p ≤ {numberFormat4(c)}% dvs. andelen i populationen p højst er{' '}
                                        {numberFormat4(c)}%
                                      </s>
                                      <br></br>H<sub>1</sub>: p &gt; {numberFormat4(c)}% dvs. andelen i populationen p
                                      er større end {numberFormat4(c)}%<br></br>
                                      Vi afviser derfor at den sande andel i populationen p højst er {numberFormat4(c)}
                                      %.
                                      <br></br>
                                      Der er statistisk belæg, for at konkludere at andelen i populationen p er større
                                      en {numberFormat4(c)}
                                      %.
                                    </p>
                                  )}
                                </p>
                              </div>
                            </div>
                            <br></br>
                            <div class="card">
                              <div class={+pv1ned > significancelevel ? 'card-body bg-success' : 'card-body bg-danger'}>
                                <p class="card-text text-white">
                                  <h5>
                                    Hypotesetest med 1-sidet alternativ hypotese nedad{' '}
                                    <OverlayTrigger
                                      placement="auto"
                                      overlay={
                                        <Tooltip>
                                          <p style={{ textAlign: 'left' }}>
                                            Vi benytter hypotesetest med 1-sidet alternativ hypotese H<sub>1</sub>{' '}
                                            nedad, når vi kan ende med at forkaste nulhypotesen H<sub>0</sub> af 1
                                            årsag, hvis andelen i stikprøven er signifikant større end{' '}
                                            {numberFormat4(100 * p)}%
                                            <br />
                                            Vi benytter dette test, hvis vi skal teste:<br></br>
                                            Er andelen p mindst eller minimum dvs. ≥ {numberFormat4(100 * p)}%<br></br>
                                            Er andelen p mindre end dvs. &lt; {numberFormat4(100 * p)}%
                                          </p>
                                        </Tooltip>
                                      }
                                    >
                                      <i class="fas fa-question-circle"></i>
                                    </OverlayTrigger>
                                  </h5>
                                  <hr></hr>H<sub>0</sub>: p ≥ {numberFormat4(c)}%<br></br>H<sub>1</sub>: p &lt;{' '}
                                  {numberFormat4(c)}%<br></br>
                                  {+pv1ned > significancelevel && (
                                    <p>
                                      Da p-værdien/signifikanssandsynligheden {numberFormat4(100 * pv1ned)}% er større
                                      end 5% signifikansniveauet, kan vi ikke afvise nulhypotesen H<sub>0</sub>.
                                      <br></br>H<sub>0</sub>: p ≥ {numberFormat4(c)}% dvs. andelen i populationen p
                                      mindst er {numberFormat4(c)}%<br></br>
                                      <s>
                                        H<sub>1</sub>: p &lt; {numberFormat4(c)}% dvs. andelen i populationen p er
                                        mindre end {numberFormat4(c)}%
                                      </s>
                                      <br></br>
                                      <br></br>
                                      Vi kan således ikke afvise at den sande andel i populationen p mindst er{' '}
                                      {numberFormat4(c)}
                                      %.
                                    </p>
                                  )}
                                  {+pv1ned <= significancelevel && (
                                    <p>
                                      Da p-værdien/signifikanssandsynligheden {numberFormat4(100 * pv1ned)}% er mindre
                                      end 5% signifikansniveauet, kan vi afvise H<sub>0</sub>.<br></br>
                                      <s>
                                        H<sub>0</sub>: p ≥ {numberFormat4(c)}% dvs. andelen i populationen p mindst er{' '}
                                        {numberFormat4(c)}%
                                      </s>
                                      <br></br>H<sub>1</sub>: p &lt; {numberFormat4(c)}% dvs. andelen i populationen p
                                      er mindre end {numberFormat4(c)}%<br></br>
                                      <br></br>
                                      Vi afviser derfor at den sande andel i populationen p mindst er {numberFormat4(c)}
                                      %.
                                      <br></br>
                                      Der er statistisk belæg, for at konkludere at andelen i populationen p er mindre
                                      end {numberFormat4(c)}
                                      %.
                                    </p>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <hr></hr>
                  {/* HR---------------------------------------------------------------------------------------------------------------- */}
                  {/* ########################################################################################################################################################################################## */}
                  {/* Formler og figurer */}
                  <Row>
                    <Col class="col-6">
                      <Button size="sm" onClick={() => setShow5(!show5)}>
                        {show5 && 'Skjul Formler og figurer'}
                        {!show5 && 'Formler og figurer'}
                      </Button>
                      <div>
                        {show5 && (
                          <div>
                            <div>
                              <br></br>
                              <div class="card">
                                <div class="card-body">
                                  <div>
                                    <p class="card-text">
                                      <>
                                        <small>
                                          <p>{/* Inline formula: <InlineMath math={inlineFormula} /> */}</p>
                                          <hr></hr>
                                          <p>Block formula:</p>
                                          {/* <BlockMath math={blockFormula} />
                                          <BlockMath math={phatFormula} />
                                          <BlockMath math={KIFormula} />
                                          <BlockMath math={KIFormula2} />
                                          <BlockMath math={KIFormula3} /> */}

                                          <hr></hr>

                                          <HighchartsReact highcharts={Highcharts} options={options2} />
                                          <HighchartsReact highcharts={Highcharts} options={optionsop} />
                                          <HighchartsReact highcharts={Highcharts} options={optionsned} />
                                        </small>
                                      </>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <br></br>
                            </div>
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                  {/* ########################################################################################################################################################################################## */}
                  {/* Fejlmargin */}

                  <Row>
                    <Col class="col-6">
                      <Button size="sm" onClick={() => setShow7(!show7)}>
                        {show7 && 'Skjul fejlmargin'}
                        {!show7 && 'sæt ønsket fejlmargin'}
                      </Button>
                      <div>
                        {show7 && (
                          <div>
                            <br></br>
                            <div class="card">
                              <div class="card-body">
                                <div>
                                  <Form.Text className="text-muted">Ønsket fejlmargin i %</Form.Text>
                                  {/* <Col class="col-6"> */}
                                  <InputGroup size="sm">
                                    <OverlayTrigger
                                      placement="bottom"
                                      delay={{
                                        show: 100,
                                        hide: 100,
                                      }}
                                      overlay={
                                        <Tooltip>
                                          Den nuværende fejlmargin er {numberFormat4(fejlmargin)}%, den ønskede
                                          fejlmargin er {d}%
                                        </Tooltip>
                                      }
                                    >
                                      <FormControl
                                        type="number"
                                        min="0.00000000"
                                        step={1}
                                        precision={0}
                                        //mobile={true}
                                        value={+d}
                                        onChange={(e) => setd(e.target.value)}
                                        placeholder="0"
                                      />
                                    </OverlayTrigger>
                                    {/* InputGroup.Append not working in react 18 */}
                                    {/* <InputGroup.Append>
                                      <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                                    </InputGroup.Append> */}
                                  </InputGroup>
                                  <hr></hr>
                                </div>
                                <p class="card-text">
                                  Man skal mindst have en{' '}
                                  <span style={{ backgroundColor: '#80ff00' }}>
                                    stikprøvestørrelse på {Math.ceil(minsample)}
                                  </span>
                                  , hvis man ønsker en fejlmargin på {d}%.
                                  {+d < +fejlmargin && (
                                    <span>
                                      <br></br>Da den nuværende fejlmargin på {numberFormat4(fejlmargin)}% er større end{' '}
                                      {d}
                                      %, skal man have en stikprøve størrelse på mindst {Math.ceil(minsample)} for at
                                      opnå fejlmarginen på kun {d}%.
                                    </span>
                                  )}
                                  {+fejlmargin < +d && (
                                    <span>
                                      <br></br>Da den nuværende fejlmargin på {numberFormat4(fejlmargin)}% er mindre end{' '}
                                      {d}
                                      %, kunne man have begrænset stikprøve størrelsen til {Math.ceil(minsample)} for at
                                      opnå fejlmarginen på kun {d}%.
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                            <br></br>
                          </div>
                        )}
                      </div>

                      {/* </InputGroup> */}
                    </Col>
                    {/* <Col class="col-6"></Col> */}
                  </Row>
                  {/* FPC########################################################################################################################################################################################## */}
                  <Row>
                    <Col>
                      <div>
                        <button type="button" class="btn btn-primary btn-sm" onClick={toggleDisplay}>
                          {fpctext}
                        </button>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    {fpctext === 'Fjern kendt endelig populationsstørrelse' && (
                      <div>
                        <br></br>
                        <Col>
                          <div class="card">
                            <div class="card-body">
                              <p class="lead text-muted">Populationsstørrelse</p>
                              <>
                                <InputGroup size="sm" class="col-xs-3">
                                  <FormControl
                                    type="number"
                                    // max="-0.000000001"
                                    step={1}
                                    precision={0}
                                    //mobile={true}
                                    value={+f}
                                    onChange={(e) => setf(e.target.value)}
                                    placeholder="0"
                                  />
                                </InputGroup>
                                <hr></hr>
                                <p class="card-text">
                                  Har man som her en endelig kendt populationstørrelse på {f}, bliver konfidensinterval
                                  og stikprøvestørrelse påvirket en smule. Er populationen af en vis størrelse, vil
                                  dette kun ses på yderlige decimaler, der skal således være tale om relativt små
                                  populationer, for at dette har en betydning. Vi sætter kun denne værdi hvis vi kender
                                  den endelige populationsstørrelse.
                                </p>
                              </>
                            </div>
                          </div>
                          <br></br>
                        </Col>
                      </div>
                    )}
                  </Row>
                </Form>
              </div>
            </Container>
          </div>
        </div>
      </Container>
    </>
  );
}
