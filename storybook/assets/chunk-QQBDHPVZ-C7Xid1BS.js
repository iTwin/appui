import { n as __esmMin } from "./rolldown-runtime-htSClZ5J.js";
//#region ../../node_modules/.pnpm/@storybook+addon-docs@10.5.3_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_79f0c9ed95d1b34ec286c75f3993b3a1/node_modules/@storybook/addon-docs/dist/_browser-chunks/chunk-QQBDHPVZ.js
var getControlId, getControlSetterButtonId;
function init_chunk_QQBDHPVZ() {
	return (init_chunk_QQBDHPVZ = __esmMin((() => {
		getControlId = (value, storyId, controlsId) => {
			let base = value.replace(/\s+/g, "-"), parts = ["control"];
			return controlsId && parts.push(controlsId), storyId && parts.push(storyId), parts.push(base), parts.join("-");
		};
		getControlSetterButtonId = (value, storyId, controlsId) => {
			let base = value.replace(/\s+/g, "-"), parts = ["set"];
			return controlsId && parts.push(controlsId), storyId && parts.push(storyId), parts.push(base), parts.join("-");
		};
	})))();
}
//#endregion
export { getControlSetterButtonId as n, init_chunk_QQBDHPVZ as r, getControlId as t };
