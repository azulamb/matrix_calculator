declare class Matrix4 {
    static create(): Float32Array;
    static identity(m?: Float32Array): Float32Array;
    static multiply4x1(a: Float32Array, b: Float32Array, m?: Float32Array): Float32Array;
    static translation(x: number, y: number, z: number, m?: Float32Array): Float32Array;
    static scaling(x: number, y: number, z: number, m?: Float32Array): Float32Array;
    static rotation4(roll: number, pitch: number, yaw: number, m?: Float32Array): Float32Array;
    static inverse4(a: Float32Array, m?: Float32Array): Float32Array;
    static transpose(a: Float32Array, m?: Float32Array): Float32Array;
    static lookAt(eye: number[], center: number[], up: number[], m?: Float32Array): Float32Array;
}
declare class Vector4 {
    static create(): Float32Array;
}
declare class Vector3 {
    static create(): Float32Array;
    static normalize(a: Float32Array, m?: Float32Array): Float32Array;
}
interface Matrix {
    multiply(a: Float32Array, b: Float32Array, m?: Float32Array): Float32Array;
}
declare const Matrix: Matrix;
