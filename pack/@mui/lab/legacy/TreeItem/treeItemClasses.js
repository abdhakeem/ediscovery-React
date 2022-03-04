import { generateUtilityClass, generateUtilityClasses } from '@mui/core';
export function getTreeItemUtilityClass(slot) {
  return generateUtilityClass('MuiTreeItem', slot);
}
var treeItemClasses = generateUtilityClasses('MuiTreeItem', ['root', 'group', 'content', 'expanded', 'selected', 'focused', 'disabled', 'iconContainer', 'label']);
export default treeItemClasses;