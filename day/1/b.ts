/** question link: [day1-part2](https://adventofcode.com/2024/day/1#part2)
 * 
 * @module
*/

import { sum, transpose2D } from "../deps.ts"
import { formatInput, type FormattedInput } from "./funcdefs.ts"
import inputB from "./input_b.ts"


const findSimilarityScore = (input: FormattedInput): number => {
	const [col1, col2] = transpose2D(input)
	// since the multiplicity/number-of-occurrences of each element in the second column (`col2`) is invariant of their order,
	// we can sort `col2` and get the answer quicker by storing the multiplicity in a `Map`
	const
		multiplicity_map = new Map<number, number>(),
		col2_sorted = col2.toSorted()
	col2_sorted.push(NaN) // this extra unique element allows us to add the final `id` in the column to the `multiplicity_map` within the loop
	let
		prev_id = col2_sorted.shift()!,
		prev_multiplicity = prev_id === undefined ? 0 : 1
	for (const id of col2_sorted) {
		if (id !== prev_id) {
			multiplicity_map.set(prev_id, prev_multiplicity)
			prev_id = id
			prev_multiplicity = 0
		}
		prev_multiplicity += 1
	}

	const col1_multiplicities = col1.map((id) => {
		return id * (multiplicity_map.get(id) ?? 0)
	})

	return sum(col1_multiplicities)
}

export const run = (input: string): number => {
	return findSimilarityScore(formatInput(input))
}

console.log(run(inputB))
