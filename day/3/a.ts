/** question link: [day3-part1](https://adventofcode.com/2024/day/3#part1)
 * 
 * @module
*/

import { sum } from "../deps.ts"
import inputA from "./input_a.ts"


export interface BinaryOpTree {
	op: string
	left: number
	right: number
}

export interface BinaryOp extends BinaryOpTree {
	left: number
	right: number
}

export type FormattedInput = Array<BinaryOpTree>

const mul_operation_regex = /mul\((?<left>\d{1,3})\,(?<right>\d{1,3})\)/g

const formatInput = (input: string): FormattedInput => {
	const formatted_input: FormattedInput = []
	for (const match of input.matchAll(mul_operation_regex)) {
		const { left, right } = match.groups!
		formatted_input.push({
			op: "mul",
			left: parseInt(left),
			right: parseInt(right),
		})
	}
	return formatted_input
}

export const run = (input: string): number => {
	return sum(formatInput(input).map((leaf_node: BinaryOp) => {
		return leaf_node.left * leaf_node.right
	}))
}

console.log(run(inputA))
