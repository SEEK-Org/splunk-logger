'use strict';

const levels = { error : 5, warn : 4, info : 3, debug : 2 };

/**
 A bare-bones logger utility for generating structured
 logs inside a node 4.3.2 lambda.

### Install
```
npm install --save node-lambda-tools-logger
```

### Usage
Provides the usual {@link Logger#error}, {@link Logger#warn}, {@link Logger#info}, and {@link Logger#debug}

Logs messages are formatted like this where the `name` component will only be used if given in the logger's constructor :
```
name=<name>, level=<level>, msg=<msg>
```

*/
class Logger {

    /**
     * Create a logger
     *
     * @param  {string} [name]  Optional name to give the logger. This will be added to all log bodies.
     * @param  {string} [level=info] Optional minimum level to output. Defaults to `info`
     */
    constructor(name, level = 'info') {
        // 'name' will be used as the first keyval pair of the log string... if given
        this.formattedName = name ? `name=${name}, ` : '';
        this.setLevel(level);
    }

    /**
     * Set the minimum log level to output
     *
     * @param  {string} level Should be one of `error`, `warn`, `info`, `debug`
     * @return {Logger}       this Logger instance
     */
    setLevel(level) {
        if (!levels[level]) {
            throw new Error(`unknown error level ${level}`);
        }
        this.level = levels[level];
        return this;
    }


    /**
     * Emit a log message at the given level
     *
     * @param  {string} msg   Message to be logged
     * @param  {string} [level= info] Optional log level to be used in `error`, `warn`, `info`, `debug`. Defaults to `info`.
     */
    log(msg, level = 'info') {
        if (levels[level] && levels[level] >= this.level)
            console.log(`${this.formattedName}level=${level}, msg=${msg}`);
    }

    /**
     * Emit error level log
     * @param  {string} msg Error message to be logged
     */
    error(msg) { this.log(msg, 'error'); }
    /**
     * Emit warn level log
     * @param  {string} msg Warning message to be logged
     */
    warn(msg) { this.log(msg, 'warn'); }
    /**
     * Emit info level log
     * @param  {string} msg Info message to be logged
     */
    info(msg) { this.log(msg, 'info'); }
    /**
     * Emit debug level log
     * @param  {string} msg Debug message to be logged
     */
    debug(msg) { this.log(msg, 'debug'); }
}

module.exports = Logger;