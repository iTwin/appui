import { R as ReactDOM } from "./index-Cm_5MPU1.js";
var renderElement = async (node, el) => new Promise((resolve) => {
  ReactDOM.render(node, el, () => resolve(null));
}), unmountElement = (el) => {
  ReactDOM.unmountComponentAtNode(el);
};
export {
  renderElement as r,
  unmountElement as u
};
