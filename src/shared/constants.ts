const needToAddSubPath = window.location.origin === 'https://archibara.github.io';

export const baseUrl = `${new URL(window.location.href).origin}${needToAddSubPath
  ? '/time'
  : ''}`;
