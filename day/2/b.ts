/** question link: [day2-part2](https://adventofcode.com/2024/day/2#part2)
 * 
 * this time around, the problem requires some dynamic-inspection/lookaheads in each element of a report.
 * an easy way to solve it is by:
 * - introducing a "stack" of rules (anonymous functions).
 * - each element must satisfy the condition at the top of the stack.
 * - if it fails to do so, the report will be penalized, and that element will be ignored.
 * - if the number of penalty points exceed the tolerance level (which is `1` in this problem), then the report is unsafe.
 * 
 * note that an easier way to solve this problem would be to evaluate if a report is safe using the solution from part-a,
 * and then if it isn't safe, then we'll identify the index of the offending element and remove it, then follow it with another evaluation.
 * but that is not elegant (albeit being more practical an performant given the nature of the data).
 * 
 * actually, nevermind, I'm just going to do it the dirty bruteforce way: remove the offending element and re-evaluate if the report is safe
 *  
 * @module
*/

import { diff, neg } from "../deps.ts"
import { formatInput, type FormattedInput } from "./funcdefs.ts"
import inputB from "./input_b.ts"


const increasingReportIsSafe = (input: number[]): (number | -1) => {
	const
		deltaInput = diff(input),
		index = deltaInput.findIndex((v) => {
			return (v > 3 || v < 1)
		}) + 1
	return index
}

const reportIsSafe = (input: number[], tolerance = 0): boolean => {
	if (tolerance < 0) { return false }
	const
		deltaInput = diff(input),
		number_of_ups = deltaInput.filter((v) => (v >= 0)).length,
		number_of_downs = deltaInput.filter((v) => (v < 0)).length,
		is_overall_increasing = number_of_ups >= number_of_downs
	if (!is_overall_increasing) { input = neg(input) }
	const index = increasingReportIsSafe(input)
	if (index <= 0) { return true }
	// if `index` is precisely `1`, then we cannot be certain whether or not the true offender is `element[1]` or `element[0]`.
	// similarly, if `index` points to the second to last element, then we cannot know with certainty if _it_ or the last element is the true offender.
	// so we will brute-force to try out both options for the boundary cases
	return reportIsSafe(input.toSpliced(index, 1), tolerance - 1)
		|| reportIsSafe(input.toSpliced(index - 1, 1), tolerance - 1)
}

const evaluateReports = (reports: FormattedInput): number => {
	return reports
		.map((report) => reportIsSafe(report, 1))
		.filter((v) => (v === true))
		.length
}

export const run = (reports_str: string): number => {
	return evaluateReports(formatInput(reports_str))
}

console.log(run(inputB))
