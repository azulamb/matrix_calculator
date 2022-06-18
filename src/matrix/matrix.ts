/// <reference path="./matrix4.ts" />
/// <reference path="./vector4.ts" />
/// <reference path="./vector3.ts" />

interface Matrix {
	multiply(a: Float32Array, b: Float32Array, m?: Float32Array): Float32Array;
}

declare const Matrix: Matrix;

(<{ Matrix: Matrix }> (<any> window)).Matrix = (() => {
	function multiply4x1(a: Float32Array, b: Float32Array, m?: Float32Array) {
		if (!m) {
			m = b.length < 16 ? Vector4.create() : Matrix4.create();
		}
		const A = a[0],
			B = a[1],
			C = a[2],
			D = a[3],
			E = a[4],
			F = a[5],
			G = a[6],
			H = a[7],
			I = a[8],
			J = a[9],
			K = a[10],
			L = a[11],
			M = a[12],
			N = a[13],
			O = a[14],
			P = a[15];

		[m[0], m[1], m[2], m[3]] = [
			b[0] * A + b[1] * E + b[2] * I + b[3] * M,
			b[0] * B + b[1] * F + b[2] * J + b[3] * N,
			b[0] * C + b[1] * G + b[2] * K + b[3] * O,
			b[0] * D + b[1] * H + b[2] * L + b[3] * P,
		];
		if (4 < m.length) {
			[m[4], m[5], m[6], m[7]] = [
				b[4] * A + b[5] * E + b[6] * I + b[7] * M,
				b[4] * B + b[5] * F + b[6] * J + b[7] * N,
				b[4] * C + b[5] * G + b[6] * K + b[7] * O,
				b[4] * D + b[5] * H + b[6] * L + b[7] * P,
			];
			[m[8], m[9], m[10], m[11]] = [
				b[8] * A + b[9] * E + b[10] * I + b[11] * M,
				b[8] * B + b[9] * F + b[10] * J + b[11] * N,
				b[8] * C + b[9] * G + b[10] * K + b[11] * O,
				b[8] * D + b[9] * H + b[10] * L + b[11] * P,
			];
			[m[12], m[13], m[14], m[15]] = [
				b[12] * A + b[13] * E + b[14] * I + b[15] * M,
				b[12] * B + b[13] * F + b[14] * J + b[15] * N,
				b[12] * C + b[13] * G + b[14] * K + b[15] * O,
				b[12] * D + b[13] * H + b[14] * L + b[15] * P,
			];
		}

		return m;
	}

	return {
		multiply: multiply4x1,
	};
})();
