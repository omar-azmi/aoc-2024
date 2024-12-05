/** question link: [day5-part1](https://adventofcode.com/2024/day/5#part1)
 * 
 * solution: build a DAG (directed acyclic graph) from the list of rules,
 * and then, for each printing order, verify that it forms a topologically sorted list when traversing the DAG in that order.
 * 
 * @module
*/

import { sum } from "../deps.ts"
import { formatInput, getMiddleNumber, validateTopologicalSorting } from "./funcdefs.ts"
import inputA from "./input_a.ts"


export const run = (input_str: string): number => {
	const { dag, printingJobs } = formatInput(input_str)
	return sum(printingJobs.map((printing_job) => {
		return validateTopologicalSorting(dag, printing_job)
			? getMiddleNumber(printing_job)
			: 0
	}))
}

console.log(run(inputA))
