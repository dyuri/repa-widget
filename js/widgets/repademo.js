import Widget from '../core/widget.js';

class RepaDemo extends Widget {
  constructor () {
    super({signal: "demo", template: "demo"});
  }
}
customElements.define('repa-demo', RepaDemo);

export default RepaDemo;
