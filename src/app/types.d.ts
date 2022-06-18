/// <reference path="../../docs/matrix.d.ts" />

interface ValueElement extends HTMLElement {
	value: Float32Array;
	readonly: boolean;
	clone(): ValueElement;
	reset(): void;
}
