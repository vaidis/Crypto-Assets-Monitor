import React, { FC } from 'react';
import { useDispatch } from "react-redux";
import { Container, Row, Col, Stack, ButtonToolbar, ButtonGroup, Button, CloseButton } from 'react-bootstrap';
import { timeParse } from "d3-time-format";
import { AppDispatch } from "../store";

import { useGetDataQuery } from '../chart/chart-service'
import { delChart } from '../chartList/chartList-slice';
import Sticks from './Sticks';
import { IProps, IintervalValues } from './chart-types';

import './chart.css'

// Wraps the Sticks component and provide it with the chart data
const ChartComponent: FC<IProps> = (props): JSX.Element => {

  var currentWidth: number | undefined = document.getElementById('chartAdd')?.offsetWidth;
  var initialWidth = currentWidth ? currentWidth : 540;
  const [width, setWidth] = React.useState<number>(initialWidth - 40 );

  const parseDate = timeParse("%s");
  const dispatch: AppDispatch = useDispatch();
  const { id, pair } = props;
  const [intervalSelected, setIntervalSelected] = React.useState<number>(5);
  const { data, error, isLoading, isSuccess, refetch } = useGetDataQuery(
    { pair: pair, interval: intervalSelected }
  );


  // kraken api available options
  const intervalValues: IintervalValues = [
    { label: "1m", value: 1 },
    { label: "5m", value: 5 },
    { label: "15m", value: 15 },
    { label: "30m", value: 30 },
    { label: "1h", value: 60 },
    { label: "4h", value: 240 },
    { label: "1d", value: 1440 },
    { label: "1w", value: 10080 },
    { label: "2w", value: 21600 }
  ];

  // Update chart data
  React.useEffect(() => {
    setInterval(() => {
      refetch();
    }, intervalSelected * 60000);
  }, [refetch, intervalSelected])

  // Format kraken api chart data
  function formatChartData(pair: string, data: any): any {
    return data.map(function (value: any) {
      return {
        date: parseDate(value[0]),
        open: parseFloat(value[1]),
        high: parseFloat(value[2]),
        low: parseFloat(value[3]),
        close: parseFloat(value[4]),
        volume: parseFloat(value[6]),
        split: 0,
        dividend: 0,
        absoluteChange: 0,
        percentChange: 0
      };
    });
  }

  // Delete chart
  function handleDelete(id: string) {
    dispatch(delChart(id))
  }

  // Change interval
  const handleInterval = (value: number) => {
    setIntervalSelected(() => value)
  }


  const intervalButtons = (intervalValues: IintervalValues) => {
    return intervalValues.map(
      (item: {
        label: string;
        value: number
      }) => {
        return (
          <Button
            className={item.value === intervalSelected ? 'active' : ''}
            key={item.value}
            value={item.value}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleInterval(item.value)}>{item.label}</Button>
        )
      }
    )
  }

  // on resize set the chart width according to the width of the header
  React.useEffect(() => {
    function handleResize() {
      var width = document.getElementById('chartAdd')?.offsetWidth;
      const divWidth: number = width ? width : 540;
      setWidth(divWidth - 40);
    }
    window.addEventListener('resize', handleResize)
  }, []);

  return (
    <Container className="item">
      <Row className="header">
        <Stack direction="horizontal">

          <Col xs={2}>
            <h2>{pair}</h2>
          </Col>

          <Col xs={8}>
            <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
              <ButtonGroup className="me-2" aria-label="First group">
                {intervalButtons(intervalValues)}
              </ButtonGroup>
            </ButtonToolbar>
          </Col>

          <Col xs={2} className="d-md-flex justify-content-md-end">
            <CloseButton onClick={() => handleDelete(id)} variant="white" />
          </Col>

        </Stack>
      </Row>

      <Row className="body">
        <Stack direction="horizontal" gap={3}>
          {isLoading && <div>Loading data...</div>}
          {error && <div>Error loading data...</div>}
          {isSuccess && data?.result && <Sticks itemWidth={width} data={formatChartData(pair, data.result[pair])} />}
        </Stack>
      </Row>

    </Container>
  )
}

export default ChartComponent;
