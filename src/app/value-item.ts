interface ValueItemElement extends HTMLElement {
	value: ValueElement;
	name: string;
}

((script, init) => {
	if (document.readyState !== 'loading') {
		return init(script);
	}
	document.addEventListener('DOMContentLoaded', () => {
		init(script);
	});
})(<HTMLScriptElement> document.currentScript, (script: HTMLScriptElement) => {
	((component, tagname = 'value-item') => {
		if (customElements.get(tagname)) {
			return;
		}
		customElements.define(tagname, component);
	})(
		class extends HTMLElement implements ValueItemElement {
			protected item: ValueElement;
			protected itemArea: HTMLElement;
			protected label: HTMLInputElement;

			constructor() {
				super();

				const style = document.createElement('style');
				style.textContent = [
					':host { display: block; --font-size: 1rem; }',
					':host > div > div:first-child { display: grid; grid-template-columns: calc(100% - var(--font-size)) var(--font-size); grid-template-rows: var(--font-size); width: 100%; height: var(--font-size); }',
					'input { font-size: var(--font-size); }',
					'button { cursor: pointer; font-size: var(--font-size); border: none; padding: 0; line-height: var(--font-size); }',
					'button::before { content: "✕"; }',
				].join('');

				this.label = document.createElement('input');
				this.label.type = 'text';

				const close = document.createElement('button');

				const header = document.createElement('div');
				header.appendChild(this.label);
				header.appendChild(close);

				this.itemArea = document.createElement('div');

				const contents = document.createElement('div');
				contents.appendChild(header);
				contents.appendChild(this.itemArea);

				const shadow = this.attachShadow({ mode: 'open' });

				shadow.appendChild(style);
				shadow.appendChild(contents);
			}

			get value() {
				return this.item;
			}
			set value(value) {
				this.item = value.clone();
				this.itemArea.innerHTML = '';
				this.itemArea.appendChild(this.item);
			}

			get name() {
				return this.label.value || '';
			}
			set name(value) {
				this.label.value = value + '';
			}
		},
		script.dataset.tagname,
	);
});
