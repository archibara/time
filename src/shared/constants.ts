export const baseUrl = `${new URL(window.location.href).origin}${import.meta.env.DEV
  ? ''
  : '/time'}`;
