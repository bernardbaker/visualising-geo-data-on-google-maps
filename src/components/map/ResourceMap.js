import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper, Polygon } from 'google-maps-react';

import './ResourceMap.scss';

import { getData } from '../../util/data/GetData';

import {
  CATEGORY_SIZE_0_TO_50_KEY_VALUE,
  CATEGORY_SIZE_50_TO_200_KEY_VALUE,
  CATEGORY_SIZE_200_TO_526_KEY_VALUE,
  CATEGORY_SIZE_0_TO_50_LABEL,
  CATEGORY_SIZE_50_TO_200_LABEL,
  CATEGORY_SIZE_200_TO_526_LABEL,
  checkCategorySizeValueIsBetween0And50,
  checkCategorySizeValueIsBetween50And200,
  checkCategorySizeValueIsBetween200And526
} from '../../util/data/CalculateCategorySize';

import getDetailsOfDataPoint from '../../util/data/GetDetailsOfDataPoint';

import { connect } from 'react-redux';

import { featuresAction } from '../../actions/featuresAction';
import { showingDetailsAction } from '../../actions/showingDetailsAction';
import { showingDataPointItemAction } from '../../actions/showingDataPointItemAction';
import { materialListAction } from '../../actions/materialListAction';
import { selectMaterialAction } from '../../actions/selectMaterialAction';
import { selectSizeForCategoryAction } from '../../actions/selectSizeForCategoryAction';
import { viewportBoundsAction } from '../../actions/viewportBoundsAction';

class ResourceMap extends Component {
  async loadData() {
    const data = await getData();
    const constructionMaterialList = this.parseDataForConstructionMaterials(
      data
    );

    this.props.featuresAction(data);
    this.props.materialListAction(constructionMaterialList);
  }

  parseDataForConstructionMaterials(data) {
    let list = [];
    for (var i = 0; i < data.length; i++) {
      list.push(data[i].properties.material);
    }
    let unique = list.filter((item, index) => {
      return list.indexOf(item) === index;
    });
    return unique;
  }

  filterDataSetByMaterial = event => {
    this.props.selectMaterialAction(event.target.value);
  };

  filterDataSetBySizeCategory = event => {
    this.props.selectSizeForCategoryAction(event.target.value);
  };

  renderMaterialList = () => {
    return (
      <select
        defaultValue={this.props.selectValueForMaterial}
        onChange={this.filterDataSetByMaterial}
      >
        {this.renderMaterialListOptions()}
      </select>
    );
  };

  renderMaterialListOptions = () => {
    let options = [
      <option key={'All'} value={'All'}>
        {'All'}
      </option>
    ];
    for (let i = 0; i < this.props.materialList.length; i++) {
      options.push(
        <option
          key={this.props.materialList[i]}
          value={this.props.materialList[i]}
        >
          {this.props.materialList[i]}
        </option>
      );
    }
    return options;
  };

  renderSizeCategoryList = () => {
    return (
      <select
        defaultValue={this.props.selectValueForSizeCategory}
        onChange={this.filterDataSetBySizeCategory}
      >
        {this.renderSizeCategoryListOptions()}
      </select>
    );
  };

  renderSizeCategoryListOptions = () => {
    return [
      <option key={'All'} value={'All'}>
        {'All'}
      </option>,
      <option
        key={CATEGORY_SIZE_0_TO_50_KEY_VALUE}
        value={CATEGORY_SIZE_0_TO_50_KEY_VALUE}
      >
        {CATEGORY_SIZE_0_TO_50_LABEL}
      </option>,
      <option
        key={CATEGORY_SIZE_50_TO_200_KEY_VALUE}
        value={CATEGORY_SIZE_50_TO_200_KEY_VALUE}
      >
        {CATEGORY_SIZE_50_TO_200_LABEL}
      </option>,
      <option
        key={CATEGORY_SIZE_200_TO_526_KEY_VALUE}
        value={CATEGORY_SIZE_200_TO_526_KEY_VALUE}
      >
        {CATEGORY_SIZE_200_TO_526_LABEL}
      </option>
    ];
  };

  renderDataPointDetails = () => {
    if (this.props.selectedDataPointItem.details !== undefined) {
      return (
        <div>
          <p>
            <b>Type</b>: {this.props.selectedDataPointItem.details.type}
          </p>
          <p>
            <b>Status</b>: {this.props.selectedDataPointItem.details.status}
          </p>
          <p>
            <b>Material</b>: {this.props.selectedDataPointItem.details.material}
          </p>
          <p>
            <b>Asset Number</b>:
            {this.props.selectedDataPointItem.details.asset_numb}
          </p>
          <p>
            <b>Shape Area</b>:
            {this.props.selectedDataPointItem.details.shape_area}
          </p>
          <p>
            <b>Shape Length</b>:
            {this.props.selectedDataPointItem.details.shape_leng}
          </p>
        </div>
      );
    } else {
      return <div />;
    }
  };

  renderPolygon = item => {
    if (
      this.props.selectValueForMaterial !== item.properties.material &&
      this.props.selectValueForMaterial !== 'All'
    ) {
      return;
    }

    if (
      this.props.selectValueForSizeCategory ===
        CATEGORY_SIZE_0_TO_50_KEY_VALUE &&
      !checkCategorySizeValueIsBetween0And50(item) &&
      this.props.selectValueForSizeCategory !== 'All'
    ) {
      return;
    }

    if (
      this.props.selectValueForSizeCategory ===
        CATEGORY_SIZE_50_TO_200_KEY_VALUE &&
      !checkCategorySizeValueIsBetween50And200(item) &&
      this.props.selectValueForSizeCategory !== 'All'
    ) {
      return;
    }

    if (
      this.props.selectValueForSizeCategory ===
        CATEGORY_SIZE_200_TO_526_KEY_VALUE &&
      !checkCategorySizeValueIsBetween200And526(item) &&
      this.props.selectValueForSizeCategory !== 'All'
    ) {
      return;
    }

    let inViewport = true;

    let points = [];
    for (let i = 0; i < item.geometry.coordinates[0][0].length; i++) {
      let coordinates = item.geometry.coordinates[0][0];
      let point = { lng: coordinates[0][0], lat: coordinates[0][1] };

      if (
        point.lat > this.props.geo.ne.lat() ||
        point.lng > this.props.geo.ne.lng() ||
        point.lat < this.props.geo.sw.lat() ||
        point.lng < this.props.geo.sw.lng()
      ) {
        inViewport = false;
        break;
      }

      points.push(point);
    }

    if (inViewport === false) return;

    return (
      <Polygon
        key={item.id}
        paths={points}
        strokeColor="#FF0000"
        strokeOpacity={0.8}
        strokeWeight={20}
        fillColor="#FF0000"
        fillOpacity={0.35}
        onClick={this.onMarkerClick}
        id={item.id}
      />
    );
  };

  onMarkerClick = props => {
    const data = this.props.features.filter(item => item.id === props.id)[0];

    this.props.showingDataPointItemAction(getDetailsOfDataPoint(data));
    this.props.showingDetailsAction(true);
  };

  onMapClicked = () => {
    if (this.props.showingDetails) {
      this.props.showingDetailsAction(false);
      this.props.showingDataPointItemAction({});
    }
  };

  onMapReady = async (mapProps, map) => {
    mapProps.google.maps.event.addListener(map, 'idle', () => {
      var bounds = map.getBounds();
      var ne = bounds.getNorthEast();
      var sw = bounds.getSouthWest();

      const geo = { ne: ne, sw: sw };
      this.props.viewportBoundsAction(geo);
      this.loadData();
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="resource-map-info-container">
          <div className="info-dashboard">
            <h2>Dashboard</h2>

            <p>Filter by construction material.</p>

            {this.renderMaterialList()}

            <br />

            <br />

            <p>Filter by size category.</p>

            {this.renderSizeCategoryList()}

            <br />

            <br />

            {this.renderDataPointDetails()}
          </div>
        </div>
        <div className="resource-map-container">
          {/*eslint-disable */}
          <Map
            google={this.props.google}
            zoom={11}
            initialCenter={{
              lat: -28,
              lng: 153.4
            }}
            onClick={this.onMapClicked}
            onReady={this.onMapReady}
          >
            {this.props.features.map(item => {
              return this.renderPolygon(item);
            })}
          </Map>
          {/*eslint-enable */}
        </div>
      </React.Fragment>
    );
  }
}

ResourceMap.propTypes = {
  featuresAction: PropTypes.func,
  materialListAction: PropTypes.func,
  selectMaterialAction: PropTypes.func,
  selectSizeForCategoryAction: PropTypes.func,
  showingDataPointItemAction: PropTypes.func,
  showingDetailsAction: PropTypes.func,
  viewportBoundsAction: PropTypes.func,
  selectValueForMaterial: PropTypes.func,
  materialList: PropTypes.array,
  selectValueForSizeCategory: PropTypes.string,
  selectedDataPointItem: PropTypes.object,
  geo: PropTypes.object,
  features: PropTypes.array,
  showingDetails: PropTypes.bool,
  children: PropTypes.node
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  featuresAction: features => dispatch(featuresAction(features)),
  showingDetailsAction: showing => dispatch(showingDetailsAction(showing)),
  showingDataPointItemAction: item =>
    dispatch(showingDataPointItemAction(item)),
  materialListAction: list => dispatch(materialListAction(list)),
  selectMaterialAction: material => dispatch(selectMaterialAction(material)),
  selectSizeForCategoryAction: selection =>
    dispatch(selectSizeForCategoryAction(selection)),
  viewportBoundsAction: geo => dispatch(viewportBoundsAction(geo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  GoogleApiWrapper({
    apiKey: 'AIzaSyCm2M6bDGFoK_n28_j7O-mjZgF_0XepVKE'
  })(ResourceMap)
);
