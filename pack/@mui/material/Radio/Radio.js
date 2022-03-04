import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["checked", "checkedIcon", "color", "icon", "name", "onChange", "size"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { refType } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/core';
import { alpha } from '@mui/system';
import SwitchBase from '../internal/SwitchBase';
import useThemeProps from '../styles/useThemeProps';
import RadioButtonIcon from './RadioButtonIcon';
import capitalize from '../utils/capitalize';
import createChainedFunction from '../utils/createChainedFunction';
import useRadioGroup from '../RadioGroup/useRadioGroup';
import radioClasses, { getRadioUtilityClass } from './radioClasses';
import styled, { rootShouldForwardProp } from '../styles/styled';
import { jsx as _jsx } from "react/jsx-runtime";

const useUtilityClasses = ownerState => {
  const {
    classes,
    color
  } = ownerState;
  const slots = {
    root: ['root', `color${capitalize(color)}`]
  };
  return _extends({}, classes, composeClasses(slots, getRadioUtilityClass, classes));
};

const RadioRoot = styled(SwitchBase, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiRadio',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`color${capitalize(ownerState.color)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: alpha(ownerState.color === 'default' ? theme.palette.action.active : theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}, ownerState.color !== 'default' && {
  [`&.${radioClasses.checked}`]: {
    color: theme.palette[ownerState.color].main
  }
}, {
  [`&.${radioClasses.disabled}`]: {
    color: theme.palette.action.disabled
  }
}));

function areEqualValues(a, b) {
  if (typeof b === 'object' && b !== null) {
    return a === b;
  } // The value could be a number, the DOM will stringify it anyway.


  return String(a) === String(b);
}

const defaultCheckedIcon = /*#__PURE__*/_jsx(RadioButtonIcon, {
  checked: true
});

const defaultIcon = /*#__PURE__*/_jsx(RadioButtonIcon, {});

const Radio = /*#__PURE__*/React.forwardRef(function Radio(inProps, ref) {
  var _defaultIcon$props$fo, _defaultCheckedIcon$p;

  const props = useThemeProps({
    props: inProps,
    name: 'MuiRadio'
  });

  const {
    checked: checkedProp,
    checkedIcon = defaultCheckedIcon,
    color = 'primary',
    icon = defaultIcon,
    name: nameProp,
    onChange: onChangeProp,
    size = 'medium'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const ownerState = _extends({}, props, {
    color,
    size
  });

  const classes = useUtilityClasses(ownerState);
  const radioGroup = useRadioGroup();
  let checked = checkedProp;
  const onChange = createChainedFunction(onChangeProp, radioGroup && radioGroup.onChange);
  let name = nameProp;

  if (radioGroup) {
    if (typeof checked === 'undefined') {
      checked = areEqualValues(radioGroup.value, props.value);
    }

    if (typeof name === 'undefined') {
      name = radioGroup.name;
    }
  }

  return /*#__PURE__*/_jsx(RadioRoot, _extends({
    type: "radio",
    icon: /*#__PURE__*/React.cloneElement(icon, {
      fontSize: (_defaultIcon$props$fo = defaultIcon.props.fontSize) != null ? _defaultIcon$props$fo : size
    }),
    checkedIcon: /*#__PURE__*/React.cloneElement(checkedIcon, {
      fontSize: (_defaultCheckedIcon$p = defaultCheckedIcon.props.fontSize) != null ? _defaultCheckedIcon$p : size
    }),
    ownerState: ownerState,
    classes: classes,
    name: name,
    checked: checked,
    onChange: onChange,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Radio.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,

  /**
   * The icon to display when the component is checked.
   * @default <RadioButtonIcon checked />
   */
  checkedIcon: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),

  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the ripple effect is disabled.
   */
  disableRipple: PropTypes.bool,

  /**
   * The icon to display when the component is unchecked.
   * @default <RadioButtonIcon />
   */
  icon: PropTypes.node,

  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,

  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,

  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,

  /**
   * If `true`, the `input` element is required.
   */
  required: PropTypes.bool,

  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   * @default 'medium'
   */
  size: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['medium', 'small']), PropTypes.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value: PropTypes.any
} : void 0;
export default Radio;