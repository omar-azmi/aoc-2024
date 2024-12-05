
export type ID = number
export type DAG = Map<ID, Set<ID>>
export type PrintingJob = ID[]
export interface FormattedInput {
	allIds: Array<ID>
	dag: DAG
	printingJobs: Array<PrintingJob>
}

const rule_regex = /(?<id1>\d+)\|(?<id2>\d+)/

export const formatInput = (input: string): FormattedInput => {
	const
		[rule_set_str, printing_jobs_str] = input.split("\n\n"),
		rule_set = rule_set_str
			.split("\n")
			.map((rule_str): [id1: ID, id2: number] => {
				// id1 must come before id2
				const { id1, id2 } = rule_regex.exec(rule_str)!.groups!
				return [parseInt(id1), parseInt(id2)]
			}),
		printingJobs = printing_jobs_str
			.split("\n")
			.map((printing_job): PrintingJob => {
				return printing_job.split(",").map((value_str) => parseInt(value_str))
			}),
		dag: DAG = new Map()
	for (const [id1, id2] of rule_set) {
		const dependents_set = dag.get(id1) ?? new Set<ID>()
		dependents_set.add(id2)
		dag.set(id1, dependents_set)
	}
	const allIds = [...new Set(printingJobs.flat())]
	return { allIds, dag, printingJobs }
}

export const validateTopologicalSorting = (dag: DAG, sorted_ids: PrintingJob): boolean => {
	const already_visited = new Set<ID>()
	for (const id of sorted_ids) {
		const dependants = dag.get(id) ?? new Set()
		if (!already_visited.isDisjointFrom(dependants)) {
			return false
		}
		already_visited.add(id)
	}
	return true
}

export const getMiddleNumber = (ids: PrintingJob): number => {
	const index = (ids.length / 2) | 0
	return ids[index]
}
