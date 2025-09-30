const isProduction = process.env.NODE_ENV === 'production';

type LogArgs = unknown[];

type Logger = {
  info: (...args: LogArgs) => void;
  warn: (...args: LogArgs) => void;
  error: (...args: LogArgs) => void;
  group: (...args: LogArgs) => void;
  groupEnd: () => void;
};

/* eslint-disable no-console */
const consoleLogger: Logger = {
  info: (...args) => {
    if (!isProduction) {
      console.info(...args);
    }
  },
  warn: (...args) => {
    if (!isProduction) {
      console.warn(...args);
    }
  },
  error: (...args) => {
    console.error(...args);
  },
  group: (...args) => {
    if (!isProduction) {
      console.group(...args);
    }
  },
  groupEnd: () => {
    if (!isProduction) {
      console.groupEnd();
    }
  },
};
/* eslint-enable no-console */

export const logger = consoleLogger;
