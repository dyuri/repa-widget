import { LitElement, html, css } from '../../web_modules/lit-element.js';
import { createLogger, intersection, discover } from "./utils.js";

/**
 * Widget baseclass
 */
class Widget extends LitElement {
  /**
   * Create a widget
   * @param {Object} cfg - configuration
   *
   * > `cfg` may have:
   * - `name` - widget name
   * - `signal` - signal name or list of signal names
   * - `template` - template to render (`function` or `function name as dotted path`
   * - `placeholder` - DOM element to render the widget into
   */
  constructor(cfg={
    name: null,
    signal: null,
    template: null,
    placeholder: null
  }) {
    super();

    this.cfg = cfg;
    this.name = cfg.name || this.constructor.name || "RepaWidget";
    this.signal = cfg.signal && (Array.isArray(cfg.signal) ? cfg.signal : [cfg.signal]);
    this.template = cfg.template;
    this.logprefix = cfg.logprefix || [`%c[${this.name}]`, "background: #cddc39; color: #000"];
    this.logger = createLogger(this.logprefix);

    this.init();
  }

  /**
   * Initialize widget - add event listeners and such
   *
   * Implement in subclasses, call `super.init()` at the beginning of the method.
   */
  init() {
    // subscribe for events
    if (this.signal) {
      document.addEventListener("repamsg", this._handleEvent.bind(this));
    }

    this.logger.log(`widget initialized:`, this);
  }

  _handleEvent(event) {
    let det = event.detail || {};
    if (
      this.signal === "*" ||
      this.signal.includes(det.signal) ||
      intersection(this.signal, Object.keys(det.data || {})).length
    ) {
      this.process(det.data);
    }
  }

  /**
   * Preprocess data to be easily renderable by the `template`
   * @param {Object} data - data to transform
   * @return {Object} transformed data
   */
  preprocess(data) {
    return data;
  }

  /**
   * Renders the `template` with the provided `data`
   * @param {Object} data - data for the template
   * @return {string} the rendered content
   */
  renderContent(data) {
    let template = this.template && (typeof this.template === "function" ? this.template : discover(this.template));

    if (template) {
      return template(data);
    }

    return null;
  }

  /**
   * Called with the event's `data` if `signal` matches
   * @param {Object} data
   *
   * By default renders the `template` into the <slot> of the component with `data`, if they are defined.
   */
  process(data) {
    let procdata = this.preprocess(data),
        content = this.renderContent(procdata);

    if (content !== null) {
      this.innerHTML = content;
    }
  }

  /**
   * WebComponent render method
   */
  render() {
    return html`<slot></slot>`;
  }

  /**
   * WebComponent properties
   */
  static get properties() {
    return {
      template: { type: String },
      signal: { type: String }
    };
  }

  /**
   * WebComponent scoped style
   */
  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
    `;
  }
}

customElements.define('repa-widget', Widget);

export default Widget;
