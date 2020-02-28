/**
 * General use helper methods. Nothing in this module should have outside dependecies (unless they are passed in).
 *
 * @module core/utils
 *
 */

/**
 * Helper method to check if developer cookie is set
 *
 * @returns {string|boolean}
 */
const isDeveloper = () => {
  const cks = document.cookie.split(";").map(str => str.replace(/\s*/g, ""));
  const ckvs = cks.map(ck => {
    const kv = ck.split("=");
    if (kv[0] === "developer") {
      return kv[1];
    }
    return false;
  }).filter(ckv => ckv);

  return ckvs[0] || false;
};


/**
 * Discovers a function/attribute under the fully qualified path
 *
 * @param {string} fqpath - the fully qualified (dotted) path of the object/function
 * @param {string} [container=window] - the starting container
 *
 * @returns {object|null} - The discovered member or null if fqpath is not found
 *
 * @example
 * window.cica = { mokus: 12 };
 * //now check if it exists with discover
 * console.log(discover('cica.mokus'));
 * // 12
 */
const discover = (fqpath, container) => {
  let ns = (fqpath && fqpath.split(".")) || null,
    o = container || window;

  if (!ns) {
    return null;
  }

  for (let i = 0, len = ns.length; i < len; i++) {
    o = o[ns[i]] || null;
    if (!o) {
      break;
    }
  }

  return o;
};

/**
 * create logger instance with given prefix
 *
 * @param {string} prefix - log prefix
 * @returns {Object} logger instance
 *
 * @example
 * let logger = createLogger(["!!!", "PREFIX"]);
 * logger.log("cica");
 * // logs:
 * // !!! PREFIX cica
 */
const createLogger = prefix => {
  let cnsl = window.console;
  return {
    log: (...args) => isDeveloper() && cnsl.log(...prefix, ...args),
    info: (...args) => isDeveloper() && cnsl.info(...prefix, ...args),
    warn: (...args) => isDeveloper() && cnsl.warn(...prefix, ...args),
    error: (...args) => isDeveloper() && cnsl.error(...prefix, ...args)
  };
};

const loggerPfx = ["%c[RePa]", "background: #cddc39; color: #000"];

/**
 * default logger
 *
 * @example
 * logger.log("whatever", object);
 * // logs:
 * // "[FDFW]" "whatever" object
 */
const logger = createLogger(loggerPfx);

/**
 * intersection (shared items) of two arrays
 * @param {Array} arr1 - first array
 * @param {Array} arr2 - second array
 * @return {Array} shared items
 *
 * @example
 * let isec = intersection([1, 2, 3], [2, 3, 4]);
 * // isec === [2, 3]
 */
const intersection = (arr1, arr2) => {
  let _is = [];
  for (let elem of arr1) {
    if (arr2.includes(elem)) {
      _is.push(elem);
    }
  }

  return _is;
};

/**
 * dispatch data to the widgets
 *
 * @param {Object} data
 * @param {string} [signal] - signal to use
 */
const dispatch = (data, signal) => {
  let event = new CustomEvent('repamsg', {detail: {data: data, signal: signal}});
  document.dispatchEvent(event);
};

export {
  isDeveloper,
  discover,
  createLogger,
  logger,
  intersection,
  dispatch
};
