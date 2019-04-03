const CATEGORY_SIZE_0_TO_50_KEY_VALUE = 'CalculateCategorySize0To50';
const CATEGORY_SIZE_50_TO_200_KEY_VALUE = 'CalculateCategorySize50To200';
const CATEGORY_SIZE_200_TO_526_KEY_VALUE = 'CalculateCategorySize200To526';

const CATEGORY_SIZE_0_TO_50_LABEL = 'Size category 0 - 50';
const CATEGORY_SIZE_50_TO_200_LABEL = 'Size category 50 - 200';
const CATEGORY_SIZE_200_TO_526_LABEL = 'Size category 200 - 526';

const checkCategorySizeValueIsBetween0And50 = item =>
  item.properties.area_ >= 0 && item.properties.area_ <= 50;

const checkCategorySizeValueIsBetween50And200 = item =>
  item.properties.area_ >= 50 && item.properties.area_ <= 200;

const checkCategorySizeValueIsBetween200And526 = item =>
  item.properties.area_ >= 200 && item.properties.area_ <= 526;

export {
  CATEGORY_SIZE_0_TO_50_KEY_VALUE,
  CATEGORY_SIZE_50_TO_200_KEY_VALUE,
  CATEGORY_SIZE_200_TO_526_KEY_VALUE,
  CATEGORY_SIZE_0_TO_50_LABEL,
  CATEGORY_SIZE_50_TO_200_LABEL,
  CATEGORY_SIZE_200_TO_526_LABEL,
  checkCategorySizeValueIsBetween0And50,
  checkCategorySizeValueIsBetween50And200,
  checkCategorySizeValueIsBetween200And526
};
