import { combineReducers } from 'redux';
import showingDetails from './showingDetailsReducer';
import features from './featuresReducer';
import selectedDataPointItem from './showingDataPointItemReducer';
import materialList from './materialListReducer';
import selectValueForMaterial from './selectMaterialReducer';
import selectValueForSizeCategory from './selectSizeForCategoryReducer';
import geo from './viewportBoundsReducer';

export default combineReducers({
  features,
  showingDetails,
  selectedDataPointItem,
  materialList,
  selectValueForMaterial,
  selectValueForSizeCategory,
  geo
});
