
/** Environemnt */
const environment = {
  SERVER_URL: "http://localhost",
  LOG_LEVEL : "error"  // debug , info,warn, error, none 
}///~

class Logger  {
  constructor(env) {
    this.env = env;
    this.logLevel =  {
      'DEBUG': 0,
      'INFO': 1, 
      'WARN': 2,
      'ERROR': 3,
      'NONE':  4
    };
  }
  
  getConfigLevel() {
    return this.logLevel[environment.LOG_LEVEL.toUpperCase()]
  }
  debug(msg) {
    let confLevel = this.getConfigLevel();
    return (confLevel >=0)? console.log.bind(window.console): () => {};
  }
  info() {
    let confLevel = this.getConfigLevel();
    return (confLevel >=1)? console.log.bind(window.console): () => {};
  }
  warn() {
    
    let confLevel = this.getConfigLevel();
    return (confLevel >=2)? console.log.bind(window.console): () => {};
  }
  error() {
    let confLevel = this.getConfigLevel();
    return (confLevel >=3)? console.log.bind(window.console): () => {};
  }
}

const logger = new Logger(environment)
const debug = logger.debug()
const info = logger.info()
const warn = logger.warn()
const error = logger.error()

export { environment as default,  debug, info, warn, error }