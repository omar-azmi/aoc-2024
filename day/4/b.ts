/** question link: [day4-part2](https://adventofcode.com/2024/day/4#part2)
 * 
 * > I look back _quizzically_ at the elf,
 * > hinting that she thould consider unaliving herself for wanting to solve dumb crossword puzzles.
 * 
 * @module
*/

import { formatInput, type FormattedInput, type Index2D } from "./funcdefs.ts"
import inputB from "./input_b.ts"


const abs = (value: number) => (value *= value < 0 ? -1 : 1)

const getSeedIndexes = (input: FormattedInput): Array<Index2D> => {
	const seed_indexes: Array<Index2D> = []
	input.forEach((row_data, row) => {
		row_data.forEach((id, col) => {
			if (id === 2) { seed_indexes.push({ row, col }) }
		})
	})
	return seed_indexes
}

const xMasMatches = (input: FormattedInput): number => {
	const seed_indexes = getSeedIndexes(input)
	let total_matches = 0
	for (const { row, col } of seed_indexes) {
		// ensure that each leg of the X shape is either `1` id higher or `1` id lower that "A"
		if (abs(input[row - 1]?.[col - 1] - 2) !== 1) { continue }
		if (abs(input[row - 1]?.[col + 1] - 2) !== 1) { continue }
		if (abs(input[row + 1]?.[col - 1] - 2) !== 1) { continue }
		if (abs(input[row + 1]?.[col + 1] - 2) !== 1) { continue }
		// ensure that each diagonal of the X consists of unique ids
		if (input[row - 1][col - 1] === input[row + 1][col + 1]) { continue }
		if (input[row - 1][col + 1] === input[row + 1][col - 1]) { continue }
		total_matches++
	}
	return total_matches
}

export const run = (input_str: string): number => {
	const input = formatInput(input_str)
	return xMasMatches(input)
}

console.log(run(inputB))
