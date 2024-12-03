import { resolveRange } from "jsr:@oazmi/kitchensink@0.8.5/typedbuffer"
import type { NumericArray } from "jsr:@oazmi/kitchensink@0.8.5/typedefs"


export { zipArrays, zipArraysMapperFactory } from "jsr:@oazmi/esbuild-generic-loader/funcdefs"
export { abs, diff_right, neg, transpose2D } from "jsr:@oazmi/kitchensink@0.8.5/numericarray"
export { max, min, sum } from "jsr:@oazmi/kitchensink@0.8.5/numericmethods"

// TODO: fix the implementation in kitchensink
export const diff = <A extends NumericArray = any>(arr: A, start?: number, end?: number): A => {
	[start, end] = resolveRange(start, end, arr.length)
	const diff_arr = arr.slice(start + 1, end) as A
	for (let i = 0; i < diff_arr.length; i++) { diff_arr[i] -= arr[start + i] }
	return diff_arr
}
