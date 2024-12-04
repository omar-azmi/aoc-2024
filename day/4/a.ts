/** question link: [day4-part1](https://adventofcode.com/2024/day/4#part1)
 * 
 * here, we will transcode each letter to numeric id, such that there should be an increment of `1` in the ids along the direction of the word "XMAS".
 * i.e., we transform the letter matrix by applying the following map to the letters:
 * `{ "x": 0, "m": 1, "a": 2, "s": 3 }`.
 * 
 * and now, the word "xmas" will transform to the array `[0, 1, 2, 3]`, and the difference in each successive element will become: `[1, 1, 1]`.
 * 
 * now, all we need to do is identify the seeding 2d indexes (i.e. the starting points) where a zero-id exists, and evaluate the diff along various directions.
 * (i.e. left-to-right, top-to-bottom, right-to-left, both diagonal directions, etc...)
 * and then sum up the number of correct words identified from each direction (since they are non-redundant).
 * 
 * also, there is technically no need to first identify the seeding points, since it is impossible for a letter's id to be greater than `4`,
 * and thus it is impossible for more than `3` successive diff of `1` to exist, but I'll use the seeding point strategy anyway.
 * 
 * doing this in numpy would be so much simpler :(
 * 
 * @module
*/

import { diff, transpose2D } from "../deps.ts"
import { formatInput, type FormattedInput, type Index2D } from "./funcdefs.ts"
import inputA from "./input_a.ts"


const getSeedIndexes = (input: FormattedInput): Array<Index2D> => {
	const seed_indexes: Array<Index2D> = []
	input.forEach((row_data, row) => {
		row_data.forEach((id, col) => {
			if (id === 0) { seed_indexes.push({ row, col }) }
		})
	})
	return seed_indexes
}

const xmasMatches_LeftToRight = (input: FormattedInput): number => {
	const
		seed_indexes = getSeedIndexes(input),
		input_diff = input.map((row_data) => diff(row_data)),
		word_length = 4
	let total_matches = 0
	for (const { row, col } of seed_indexes) {
		const diff_slice = input_diff[row].slice(col, col + word_length - 1)
		if (
			diff_slice.length === word_length - 1
			&& diff_slice.every((id_diff) => (id_diff === 1))
		) {
			total_matches++
		}
	}
	return total_matches
}

const xmasMatches_TopLeftToBottomRightDiagonal = (input: FormattedInput): number => {
	const
		seed_indexes = getSeedIndexes(input),
		word_length = 4
	let total_matches = 0
	for (const { row, col } of seed_indexes) {
		const
			slice = Array(word_length)
				.fill(0)
				.map((v, index) => { return input[row + index]?.[col + index] }),
			diff_slice = diff(slice)
		if (
			diff_slice.length === word_length - 1
			&& diff_slice.every((id_diff) => (id_diff === 1))
		) {
			total_matches++
		}
	}
	return total_matches
}

export const run = (input_str: string): number => {
	const input = formatInput(input_str)
	const
		lr_matches = xmasMatches_LeftToRight(input),
		rl_matches = xmasMatches_LeftToRight(input.map((row_data) => (row_data.toReversed()))),
		tb_matches = xmasMatches_LeftToRight(transpose2D(input)),
		bt_matches = xmasMatches_LeftToRight(transpose2D(input.toReversed())),
		tl_br_diag_matches = xmasMatches_TopLeftToBottomRightDiagonal(input),
		tr_bl_diag_matches = xmasMatches_TopLeftToBottomRightDiagonal(input.map((row_data) => (row_data.toReversed()))),
		bl_tr_diag_matches = xmasMatches_TopLeftToBottomRightDiagonal(input.toReversed()),
		br_tl_diag_matches = xmasMatches_TopLeftToBottomRightDiagonal(input.toReversed().map((row_data) => (row_data.toReversed())))

	return lr_matches + rl_matches + tb_matches + bt_matches + tl_br_diag_matches + tr_bl_diag_matches + bl_tr_diag_matches + br_tl_diag_matches
}

console.log(run(inputA))
