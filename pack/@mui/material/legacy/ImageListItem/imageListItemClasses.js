import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getImageListItemUtilityClass(slot) {
  return generateUtilityClass('MuiImageListItem', slot);
}
var imageListItemClasses = generateUtilityClasses('MuiImageListItem', ['root', 'img', 'standard', 'woven', 'masonry', 'quilted']);
export default imageListItemClasses;