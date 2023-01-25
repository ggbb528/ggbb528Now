type ColorType = 'success' | 'info' | 'error' | 'warning' | keyof typeof COLORS;

export default function appLog(message: string, type?: ColorType) {
  let color: string = type || COLORS.Reset;

  switch (type) {
    case 'success':
      color = COLORS.FgGreen;
      break;
    case 'info':
      color = COLORS.FgBlue;
      break;
    case 'error':
      color = COLORS.FgRed;
      break;
    case 'warning':
      color = COLORS.FgYellow;
      break;
  }

  console.log(`%c[` + __APP_NAME__ + `] ${message}`, color);
}

const COLORS = {
  Reset: '',
  FgRed: 'color: red',
  FgGreen: 'color: green',
  FgYellow: 'color: yellow',
  FgBlue: 'color: blue',
} as const;
