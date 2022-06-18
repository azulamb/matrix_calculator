/// <reference path="./matrix-value.ts" />
/// <reference path="./vector-value.ts" />
/// <reference path="./value-item.ts" />

interface HTMLDialogElement_ extends HTMLElement {
	close(): unknown;
	showModal(): unknown;
}
interface OperatorNode {
	type: 'multiple';
	left?: CalcNode;
	right?: CalcNode;
}
interface ValueNode {
	type: 'value';
	value: ValueElement;
	inv: boolean;
}
type CalcNode = OperatorNode | ValueNode;
Promise.all([
	customElements.whenDefined('matrix-value'),
	customElements.whenDefined('vector-value'),
	customElements.whenDefined('value-item'),
]).then(() => {
	const baseValues: { [keys: string]: ValueElement } = {};
	const list = <HTMLElement> document.getElementById('list');
	const formula = <HTMLInputElement> document.getElementById('formula');
	(<HTMLButtonElement> document.getElementById('calc')).addEventListener('click', () => {
		const f = formula.value || '';
		const r = Calc(Parse(f, GetValues()));
		const m = new (<{ new (): ValueElement }> customElements.get(r.length < 16 ? 'vector-value' : 'matrix-value'))();
		m.value = r;

		const key = `$${result.children.length + 1}`;
		const header = document.createElement('div');
		const area = document.createElement('div');
		area.appendChild(header);
		if (m.isValid) {
			baseValues[key] = m;
			header.textContent = `${key} = ${f}`;
			area.appendChild(m);
		} else {
			header.textContent = `Invalid ... ${f}`;
		}

		result.insertBefore(area, result.children[0] || null);
	});
	const result = <HTMLElement> document.getElementById('result');
	const modal = <HTMLDialogElement_> document.getElementById('add_modal');
	const matrix = <ValueElement> document.getElementById('matrix');
	const vector = <ValueElement> document.getElementById('vector');
	modal.addEventListener('click', () => {
		modal.close();
	});
	modal.children[0].addEventListener('click', (event) => {
		event.stopPropagation();
	});
	(<HTMLElement> document.getElementById('select_matrix')).addEventListener('click', () => {
		modal.classList.remove('vector');
	});
	(<HTMLElement> document.getElementById('select_vector')).addEventListener('click', () => {
		modal.classList.add('vector');
	});
	(<HTMLElement> document.getElementById('create')).addEventListener('click', () => {
		const item = new (<{ new (): ValueItemElement }> customElements.get('value-item'))();
		const value = modal.classList.contains('vector') ? vector : matrix;
		item.value = value;
		list.insertBefore(item, list.children[0] || null);
		modal.close();
		value.reset();
	});
	(<HTMLButtonElement> document.getElementById('add')).addEventListener('click', () => {
		modal.classList.remove('vector');
		modal.showModal();
	});
	function GetValues() {
		const values = Object.assign(baseValues, {});
		for (const item of list.children) {
			const key = (<ValueItemElement> item).name;
			if (key) {
				values[key] = (<ValueItemElement> item).value;
			}
		}
		return values;
	}
	function Parse(str: string, values: { [keys: string]: ValueElement }) {
		const token: string[] = [];
		let tmp: string = '';
		[...str].forEach((char) => {
			if (char.match(/\s/)) {
				return;
			}
			if (char === '*' || char === '^') {
				if (tmp) {
					token.push(tmp);
				}
				tmp = '';
				token.push(char);
			} else {
				tmp += char;
			}
		});
		if (tmp) {
			token.push(tmp);
		}

		let ast: CalcNode | undefined;
		let inv: boolean = false;

		for (const t of token) {
			if (t === '*') {
				const node: OperatorNode = { type: 'multiple' };
				if (!ast || ast.type !== 'value') {
					throw new Error(`Token error: ${t} position is invalid.`);
				}
				node.left = ast;
				ast = node;
			} else if (t === '^') {
				inv = !inv;
			} else {
				const value = values[t];
				if (!value) {
					throw new Error(`Token error: Notfound value[${t}].`);
				}
				const node: ValueNode = { type: 'value', value: value, inv: inv };
				if (!ast) {
					ast = node;
				} else if (ast.type === 'multiple') {
					ast.right = node;
				} else {
					throw new Error(`Token error: ${t} position is invalid.`);
				}
				inv = false;
			}
		}

		if (!ast) {
			throw new Error('Parse error:');
		}

		return ast;
	}
	function Calc(node: CalcNode): Float32Array {
		if (node.type === 'value') {
			return node.inv ? Matrix4.inverse4(node.value.value) : node.value.value;
		}
		if (!node.left || !node.right) {
			throw new Error('Node error:');
		}
		const left = Calc(node.left);
		const right = Calc(node.right);
		if (left.length === 4) {
			throw new Error('Calc error:');
		}

		return Matrix.multiply(left, right);
	}
});
