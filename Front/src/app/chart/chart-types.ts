export interface IGetAssetsResponse {
  result: { [key: string]: any };
  error: []
}

export interface IGetPairsResponse {
  [key: string]: any ;
}

export interface IGetDataResponse {
  result: { [key: string]: any };
  error: []
}

export interface IGetDataRequest {
  pair: string;
  interval: number;
}

export interface IOHLCData {
  close: number;
  date: Date;
  high: number;
  low: number;
  open: number;
  volume: number;
}

export interface ChartProps {
  data: IOHLCData[]
}

export interface InitialData {
  readonly data: IOHLCData[];
  readonly height: number;
  readonly width: number;
  readonly ratio: number;
  readonly crosshair?: boolean;
}

export interface IProps {
  id: string;
  pair: string;
}

export interface IChartState {
  assets: { [key: string]: any };
  pairs: { [key: string]: any };
  data: { [key: string]: any };
  items: {
    id: string;
    pair: string;
    data?: IOHLCData[]
  }[]
}


export interface IintervalValue {
  label: string;
  value: number;
}

export interface IintervalValues extends Array<IintervalValue> { }