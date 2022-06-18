class Vector3 {
	static create() {
		return new Float32Array(3);
	}

	static normalize(a: Float32Array, m?: Float32Array) {
		let len = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
		if (len > 0) {
			len = 1 / Math.sqrt(len);
		}

		if (!m) {
			m = this.create();
		}

		m[0] = a[0] * len;
		m[1] = a[1] * len;
		m[2] = a[2] * len;

		return m;
	}
}
