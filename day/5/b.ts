/** question link: [day5-part2](https://adventofcode.com/2024/day/5#part2)
 * 
 * @module
*/

import { sum } from "../deps.ts"
import { formatInput, getMiddleNumber, validateTopologicalSorting, type DAG, type ID, type PrintingJob } from "./funcdefs.ts"
import inputB from "./input_b.ts"


const topologicallySort = (dag: DAG, ids: PrintingJob): PrintingJob => {
	const
		already_visited = new Set<ID>(),
		next_batch_ids: Set<ID> = new Set(ids)
	while (next_batch_ids.size > 0) {
		const current_batch_ids = [...next_batch_ids]
		next_batch_ids.clear()
		for (const id of current_batch_ids) {
			const
				dependants = dag.get(id) ?? new Set(),
				unvisit_dependants = already_visited.intersection(dependants)
			for (const dependant_id of unvisit_dependants) {
				already_visited.delete(dependant_id)
				next_batch_ids.add(dependant_id)
			}
			already_visited.add(id)
		}
	}
	return [...already_visited]
}

export const run = (input_str: string): number => {
	const { dag, printingJobs } = formatInput(input_str)
	return sum(printingJobs.map((printing_job) => {
		return validateTopologicalSorting(dag, printing_job)
			? 0
			: getMiddleNumber(topologicallySort(dag, printing_job))
	}))
}

console.log(run(inputB))
