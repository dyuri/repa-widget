import RepaDemo from "./widgets/repademo.js";
import { dispatch } from "./core/utils.js";

// DEMO
window.demo = data => `Hello ${data.name || 'World'}!`;

setTimeout(() => {
  dispatch({name: "Repa!"}, "demo");
}, 2000);

export {
  RepaDemo
};
