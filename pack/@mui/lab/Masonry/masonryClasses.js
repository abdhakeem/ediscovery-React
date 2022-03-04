import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getMasonryUtilityClass(slot) {
  return generateUtilityClass('MuiMasonry', slot);
}
const masonryClasses = generateUtilityClasses('MuiMasonry', ['root']);
export default masonryClasses;