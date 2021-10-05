import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { 
  IGetAssetsResponse,
  IGetPairsResponse,
  IGetDataResponse,
  IGetDataRequest} from './chart-types'



const baseUrl = "http://localhost:8080";
const assetsUrl = '/kraken/assets';
const pairsUrl = (asset: string) => `/kraken/assetpairs?asset=${asset}`;
const dataUrl = (pair: string, interval: number) => `/kraken/ohlc?pair=${pair}&interval=${interval}`;



export const chartApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getAssets: builder.query<IGetAssetsResponse, void>({
      query: () => assetsUrl,
    }),
    getPairs: builder.query<IGetPairsResponse, string>({
      query: (asset: string) => pairsUrl(asset),
    }),
    getData: builder.query<IGetDataResponse, IGetDataRequest>({
      query: (payload: {pair: string, interval: number}) => dataUrl(payload.pair, payload.interval),
    }),    
  }),
})

export const { useGetAssetsQuery, useGetPairsQuery, useGetDataQuery } = chartApi
