((script, init) => {
	if (document.readyState !== 'loading') {
		return init(script);
	}
	document.addEventListener('DOMContentLoaded', () => {
		init(script);
	});
})(<HTMLScriptElement> document.currentScript, (script: HTMLScriptElement) => {
	class VectorMatrix extends HTMLElement implements ValueElement {
		protected values: HTMLInputElement[] = [];

		constructor() {
			super();

			const style = document.createElement('style');
			style.textContent = [
				':host { display: block; --font-size: 1rem; background: white; }',
				':host > div { width: 100%; position: relative; display: grid; grid-template-columns: 100%; grid-template-rows: 1fr 1fr 1fr 1fr; box-sizing: border-box; padding: 0.5rem 0.3rem; border-left: 0.2rem solid black; border-right: 0.2rem solid black; }',
				':host > div > div { position: absolute; top: 0; left: -0.5%; width: 101%; height: 100%; }',
				':host > div > div::before, :host > div > div::after { content: ""; display: block; position: absolute; top: 0; width: 0.5rem; height: 100%; border-top: 0.2rem solid black; border-bottom: 0.2rem solid black; box-sizing: border-box; }',
				':host > div > div::before { left: 0; }',
				':host > div > div::after { right: 0; }',
				':host(:not([readonly])) > div > div { pointer-events: none; }',
				'input { font-size: var(--font-size); border: none; width: 100%; box-sizing: border-box; outline: none; text-align: right; }',
			].join('');

			const matrix = document.createElement('div');
			for (let i = 0; i < 4; ++i) {
				const input = document.createElement('input');
				input.type = 'number';
				input.value = '0';
				this.values.push(input);
				matrix.appendChild(input);
			}
			matrix.appendChild(document.createElement('div'));

			const shadow = this.attachShadow({ mode: 'open' });

			shadow.appendChild(style);
			shadow.appendChild(matrix);
		}

		get value() {
			return new Float32Array(this.values.map((input) => {
				return parseFloat(input.value);
			}));
		}
		set value(value) {
			for (let i = 0; i < 4 && i < value.length; ++i) {
				this.values[i].value = value[i] + '';
			}
		}

		get readonly() {
			return this.hasAttribute('readonly');
		}
		set readonly(value) {
			if (!value) {
				this.removeAttribute('readonly');
			} else {
				this.setAttribute('readonly', '');
			}
		}

		public clone() {
			const clone = new VectorMatrix();
			clone.value = this.value;
			return clone;
		}

		public reset() {
			for (const value of this.values) {
				value.value = '0';
			}
		}
	}
	((component, tagname = 'vector-value') => {
		if (customElements.get(tagname)) {
			return;
		}
		customElements.define(tagname, component);
	})(
		VectorMatrix,
		script.dataset.tagname,
	);
});
