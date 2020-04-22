import { create } from '@storybook/theming';

const colors = {
  primary: '#56cc71',
  primaryDarker: '#4ac867',
  base: '#24282a',
  white: '#FFFFFF'
}

export default create({
  base: 'dark',

  colorPrimary: colors.primary,
  colorSecondary: colors.primaryDarker,

  // UI
  appBg: colors.base,
  appContentBg: colors.base,
  appBorderColor: colors.white,
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: colors.white,
  textInverseColor: colors.white,

  // Toolbar default and active colors
  barTextColor: colors.white,
  barSelectedColor: colors.white,
  barBg: colors.base,

  // Form colors
  inputBg: colors.base,
  inputBorder: colors.white,
  inputTextColor: colors.white,
  inputBorderRadius: 4,

  brandTitle: 'Dave Bitter Portfolio'
});
