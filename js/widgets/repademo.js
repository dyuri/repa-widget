import { css } from '../../web_modules/lit-element.js';
import Widget from '../core/widget.js';

class RepaDemo extends Widget {
  constructor () {
    super({signal: "demo", template: "demo"});
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        background: var(--repa-c-black);
        color: var(--repa-c-primary);
      }
    `;
  }
}
customElements.define('repa-demo', RepaDemo);

export default RepaDemo;
