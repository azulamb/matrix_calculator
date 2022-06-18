((script, init) => {
    if (document.readyState !== 'loading') {
        return init(script);
    }
    document.addEventListener('DOMContentLoaded', () => {
        init(script);
    });
})(document.currentScript, (script) => {
    class MatrixElement extends HTMLElement {
        values = [];
        constructor() {
            super();
            const style = document.createElement('style');
            style.textContent = [
                ':host { display: block; --font-size: 1rem; background: white; }',
                ':host > div { width: 100%; position: relative; display: grid; grid-template-columns: 25% 25% 25% 25%; grid-template-rows: 1fr 1fr 1fr 1fr; box-sizing: border-box; padding: 0.5rem 0.3rem; border-left: 0.2rem solid black; border-right: 0.2rem solid black; }',
                ':host > div > div { position: absolute; top: 0; left: -0.5%; width: 101%; height: 100%; }',
                ':host > div > div::before, :host > div > div::after { content: ""; display: block; position: absolute; top: 0; width: 0.5rem; height: 100%; border-top: 0.2rem solid black; border-bottom: 0.2rem solid black; box-sizing: border-box; }',
                ':host > div > div::before { left: 0; }',
                ':host > div > div::after { right: 0; }',
                ':host(:not([readonly])) > div > div { pointer-events: none; }',
                'input { font-size: var(--font-size); border: none; width: 100%; box-sizing: border-box; outline: none; text-align: right; }',
            ].join('');
            const matrix = document.createElement('div');
            for (let i = 0; i < 16; ++i) {
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
            for (let i = 0; i < 16 && i < value.length; ++i) {
                this.values[i].value = value[i] + '';
            }
        }
        get readonly() {
            return this.hasAttribute('readonly');
        }
        set readonly(value) {
            if (!value) {
                this.removeAttribute('readonly');
            }
            else {
                this.setAttribute('readonly', '');
            }
        }
        clone() {
            const clone = new MatrixElement();
            clone.value = this.value;
            return clone;
        }
        reset() {
            for (const value of this.values) {
                value.value = '0';
            }
        }
    }
    ((component, tagname = 'matrix-value') => {
        if (customElements.get(tagname)) {
            return;
        }
        customElements.define(tagname, component);
    })(MatrixElement, script.dataset.tagname);
});
((script, init) => {
    if (document.readyState !== 'loading') {
        return init(script);
    }
    document.addEventListener('DOMContentLoaded', () => {
        init(script);
    });
})(document.currentScript, (script) => {
    class VectorMatrix extends HTMLElement {
        values = [];
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
            }
            else {
                this.setAttribute('readonly', '');
            }
        }
        clone() {
            const clone = new VectorMatrix();
            clone.value = this.value;
            return clone;
        }
        reset() {
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
    })(VectorMatrix, script.dataset.tagname);
});
((script, init) => {
    if (document.readyState !== 'loading') {
        return init(script);
    }
    document.addEventListener('DOMContentLoaded', () => {
        init(script);
    });
})(document.currentScript, (script) => {
    ((component, tagname = 'value-item') => {
        if (customElements.get(tagname)) {
            return;
        }
        customElements.define(tagname, component);
    })(class extends HTMLElement {
        item;
        itemArea;
        label;
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
    }, script.dataset.tagname);
});
Promise.all([
    customElements.whenDefined('matrix-value'),
    customElements.whenDefined('vector-value'),
    customElements.whenDefined('value-item'),
]).then(() => {
    const list = document.getElementById('list');
    const formula = document.getElementById('formula');
    document.getElementById('calc').addEventListener('click', () => {
        const r = Calc(Parse(formula.value || '', GetValues()));
        const m = new (customElements.get(r.length < 16 ? 'vector-value' : 'matrix-value'))();
        m.value = r;
        result.insertBefore(m, result.children[0] || null);
    });
    const result = document.getElementById('result');
    const modal = document.getElementById('add_modal');
    const matrix = document.getElementById('matrix');
    const vector = document.getElementById('vector');
    modal.addEventListener('click', () => {
        modal.close();
    });
    modal.children[0].addEventListener('click', (event) => {
        event.stopPropagation();
    });
    document.getElementById('select_matrix').addEventListener('click', () => {
        modal.classList.remove('vector');
    });
    document.getElementById('select_vector').addEventListener('click', () => {
        modal.classList.add('vector');
    });
    document.getElementById('create').addEventListener('click', () => {
        const item = new (customElements.get('value-item'))();
        const value = modal.classList.contains('vector') ? vector : matrix;
        item.value = value;
        list.insertBefore(item, list.children[0] || null);
        modal.close();
        value.reset();
    });
    document.getElementById('add').addEventListener('click', () => {
        modal.classList.remove('vector');
        modal.showModal();
    });
    function GetValues() {
        const values = {};
        for (const item of list.children) {
            const key = item.name;
            if (key) {
                values[key] = item.value;
            }
        }
        return values;
    }
    function Parse(str, values) {
        const token = [];
        let tmp = '';
        [...str].forEach((char) => {
            if (char.match(/\s/)) {
                return;
            }
            if (char === '*') {
                if (tmp) {
                    token.push(tmp);
                }
                tmp = '';
                token.push('*');
            }
            else {
                tmp += char;
            }
        });
        if (tmp) {
            token.push(tmp);
        }
        let ast;
        for (const t of token) {
            if (t === '*') {
                const node = { type: 'multiple' };
                if (!ast || ast.type !== 'value') {
                    throw new Error(`Token error: ${t} position is invalid.`);
                }
                node.left = ast;
                ast = node;
            }
            else {
                const value = values[t];
                if (!value) {
                    throw new Error(`Token error: Notfound value[${t}].`);
                }
                const node = { type: 'value', value: value };
                if (!ast) {
                    ast = node;
                }
                else if (ast.type === 'multiple') {
                    ast.right = node;
                }
                else {
                    throw new Error(`Token error: ${t} position is invalid.`);
                }
            }
        }
        if (!ast) {
            throw new Error('Parse error:');
        }
        return ast;
    }
    function Calc(node) {
        if (node.type === 'value') {
            return node.value.value;
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
