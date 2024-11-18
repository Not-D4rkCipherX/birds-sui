import { createLogger, format, transports } from 'winston';
import a5_0x230b6d from 'fs';
const {
  combine,
  timestamp,
  printf,
  colorize
} = format;
const customFormat = printf(({
  level: _0x5d7115,
  message: _0x4e0f17,
  timestamp: _0x192535
}) => {
  return _0x192535 + " [" + _0x5d7115 + "]: " + _0x4e0f17;
});
class Logger {
  constructor() {
    this.logger = createLogger({
      'level': "debug",
      'format': combine(timestamp({
        'format': "YYYY-MM-DD HH:mm:ss"
      }), colorize(), customFormat),
      'transports': [new transports.File({
        'filename': 'log/app.log'
      })],
      'exceptionHandlers': [new transports.File({
        'filename': 'log/app.log'
      })],
      'rejectionHandlers': [new transports.File({
        'filename': 'log/app.log'
      })]
    });
  }
  ['info'](_0x445c33) {
    this.logger.info(_0x445c33);
  }
  ['warn'](_0x188b55) {
    this.logger.warn(_0x188b55);
  }
  ["error"](_0x192698) {
    this.logger.error(_0x192698);
  }
  ["debug"](_0x2c8613) {
    this.logger.debug(_0x2c8613);
  }
  ["setLevel"](_0x1fabc9) {
    this.logger.level = _0x1fabc9;
  }
  ["clear"]() {
    a5_0x230b6d.truncate('log/app.log', 0x0, _0x25bed8 => {
      if (_0x25bed8) {
        this.logger.error("Failed to clear the log file: " + _0x25bed8.message);
      } else {
        this.logger.info("Log file cleared");
      }
    });
  }
}
export default new Logger();