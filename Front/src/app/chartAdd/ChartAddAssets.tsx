import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import { useGetAssetsQuery } from '../chart/chart-service'
import { AssetProps } from './chartAdd-types';



const ChartAddAssets: React.FC<AssetProps> = ({ assetState: [asset, setAsset] }) => {
  const { data, error, isLoading: isLoadingAssets } = useGetAssetsQuery()
  const assets = data?.result;

  // store the selected asset so that can be used by ChartAddPair component
  const handleAssetSelected = (value: string) => {
    setAsset(() => value)
  }

  // Convert the assets from api response to select option list
  const assetsOptions = (assets: any): any => {
    return Object.keys(assets).map((key, i) => {
      if (assets[key]['altname'].match("^[A-Za-z0-9]+$")) {
        return (
          <Dropdown.Item key={key} onClick={() => handleAssetSelected(key)}>
            {assets[key]['altname']}
          </Dropdown.Item>
        )
      }
    })
  }

  return (
    <div>
      { error && <>fetch assets failed</>}
      { isLoadingAssets && <>Assets Loading...</>}
      { data?.result &&
          <div>
            <DropdownButton className="asset" id="dropdown-basic-button" title={asset === "" ? "Select Asset" : asset}>
              {assetsOptions(assets)}
            </DropdownButton>
          </div>
      }
    </div>
  )
}

export default ChartAddAssets;
