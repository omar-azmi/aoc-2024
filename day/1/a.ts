/** question link: [day1-part1](https://adventofcode.com/2024/day/1#part1)
 * 
 * @module
*/

import { abs, sum, transpose2D } from "../deps.ts"
import inputA from "./input_a.ts"


type FormattedInput = Array<[left_id: number, right_id: number]>

const findSortedDistance = (input: FormattedInput): number => {
	const distances = abs(input.map(([left_id, right_id]) => {
		return left_id - right_id
	}))
	return sum(distances)
}

const sortTwoTuple = (input: FormattedInput): FormattedInput => {
	const [col1, col2] = transpose2D(input)
	return transpose2D([
		col1.toSorted(),
		col2.toSorted(),
	]) as FormattedInput
}

const findDistance = (input: FormattedInput): number => {
	return findSortedDistance(sortTwoTuple(input))
}

export const run = (input: string): number => {
	input = input
		.replaceAll(/[ \h]+/g, ",")
		.split("\n")
		.map((row: string) => { return `[ ${row} ]` })
		.join(",")
	const input_array = JSON.parse(`[ ${input} ]`) as FormattedInput
	return findDistance(input_array)
}

console.log(run(inputA))
