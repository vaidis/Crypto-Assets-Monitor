import * as React from "react";

import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateY,
  ZoomButtons,
} from "react-financial-charts";

import { format } from "d3-format";
import { ChartProps, IOHLCData } from './chart-types';



const Sticks = (props: ChartProps): JSX.Element => {
  const { data: InitialData, itemWidth } = props;

  const margin = { left: 0, right: 0, top: 0, bottom: 0 };
  const pricesDisplayFormat = format(".2f");
  const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => d.date);
  const elder = elderRay()

  const ema12 = ema()
    .id(1)
    .options({ windowSize: 12 })
    .merge((d: any, c: any) => {
      d.ema12 = c;
    })
    .accessor((d: any) => d.ema12);

  const ema26 = ema()
    .id(2)
    .options({ windowSize: 26 })
    .merge((d: any, c: any) => {
      d.ema26 = c;
    })
    .accessor((d: any) => d.ema26);


  const calculatedData = elder(ema26(ema12(InitialData)));
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData);

  const max = xAccessor(data[data.length - 1]);
  const min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [min, max];

  const yExtents = (data: { high: number; low: number; }) => [data.high, data.low];

  const openCloseColor = (data: IOHLCData) => {
    return data.close > data.open ? "#26a69a" : "#ef5350";
  };

  const yEdgeIndicator = (data: IOHLCData) => {
    return data.close;
  };

  const barChartExtents = (data: IOHLCData) => {
    return data.volume;
  };

  const volumeColor = (data: IOHLCData) => {
    return data.close > data.open ? "rgba(38, 166, 154, 0.3)" : "rgba(239, 83, 80, 0.3)";
  };

  const volumeSeries = (data: IOHLCData) => {
    return data.volume;
  };

  const elderRayHeight = 100;
  const height = 400;
  const gridHeight = height - margin.top - margin.bottom;

  const barChartHeight = gridHeight / 4;
  const barChartOrigin = (_: number, h: number) => [0, height - barChartHeight - elderRayHeight];
  const chartHeight = gridHeight - elderRayHeight;



  return (
    <div className="candlesticks">
      {
        data
          ? (
            <ChartCanvas
              height={chartHeight + 10}
              ratio={1}
              width={itemWidth}
              data={data}
              displayXAccessor={displayXAccessor}
              seriesName="Data"
              xScale={xScale}
              xAccessor={xAccessor}
              xExtents={xExtents}
              zoomAnchor={lastVisibleItemBasedZoomAnchor}
            >
              <Chart id={2} height={barChartHeight} origin={barChartOrigin} yExtents={barChartExtents}>
                <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
              </Chart>
              <Chart id={3} height={chartHeight} yExtents={yExtents}>
                <XAxis showGridLines showTicks={false} showTickLabel={false} />
                <YAxis showGridLines tickFormat={pricesDisplayFormat} />
                <CandlestickSeries />
                <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
                <CurrentCoordinate yAccessor={ema26.accessor()} fillStyle={ema26.stroke()} />
                <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
                <CurrentCoordinate yAccessor={ema12.accessor()} fillStyle={ema12.stroke()} />
                <MouseCoordinateY rectWidth={margin.right} displayFormat={pricesDisplayFormat} />
                <EdgeIndicator
                  itemType="last"
                  rectWidth={margin.right}
                  fill={openCloseColor}
                  lineStroke={openCloseColor}
                  yAccessor={yEdgeIndicator}
                  displayFormat={pricesDisplayFormat}
                />
                <MovingAverageTooltip
                  origin={[8, 24]}
                  options={[
                    {
                      yAccessor: ema26.accessor(),
                      type: "EMA",
                      stroke: ema26.stroke(),
                      windowSize: ema26.options().windowSize,
                    },
                    {
                      yAccessor: ema12.accessor(),
                      type: "EMA",
                      stroke: ema12.stroke(),
                      windowSize: ema12.options().windowSize,
                    },
                  ]}
                />

                <ZoomButtons zoomMultiplier={10}/>
                <OHLCTooltip origin={[8, 16]} />
              </Chart>

              <CrossHairCursor />
            </ChartCanvas>
          ) : (
            <div>loading candlesticks...</div>
          )
      }
    </div >
  );
}

export default Sticks;
