/** question link: [day3-part2](https://adventofcode.com/2024/day/1#part2)
 * 
 * @module
*/

import { sum } from "../deps.ts"
import inputB from "./input_b.ts"


export interface BinaryOp {
	left: number
	right: number
}

export type FormattedInput = Array<BinaryOp>

const
	dont_operation_regex = /don\'t\(\)/g,
	do_operation_regex = /do\(\)/g,
	mul_operation_regex = /mul\((?<left>\d{1,3})\,(?<right>\d{1,3})\)/g

const all_operations_regex = new RegExp(
	`(${dont_operation_regex.source})|(${do_operation_regex.source})|(${mul_operation_regex.source})`,
	"g"
)

const formatInput = (input: string): FormattedInput => {
	const formatted_input: FormattedInput = []
	let do_state = true
	for (const match of input.matchAll(all_operations_regex)) {
		if (match[1] !== undefined) {
			// the first captured (unnamed) group is the "don't()" group
			do_state = false
		} else if (match[2] !== undefined) {
			// the second captured (unnamed) group is the "do()" group
			do_state = true
		} else if (match[3] !== undefined) {
			// the third captured (unnamed) group is the "mul(...)" group
			const { left, right } = match.groups!
			if (do_state) {
				formatted_input.push({
					left: parseInt(left),
					right: parseInt(right),
				})
			}
		} else {
			throw new Error("something unexpected was matched (i.e. the match does not correspond to any of the operation groups)")
		}
	}
	return formatted_input
}

export const run = (input: string): number => {
	return sum(formatInput(input).map((leaf_node: BinaryOp) => {
		return leaf_node.left * leaf_node.right
	}))
}

console.log(run(inputB))
