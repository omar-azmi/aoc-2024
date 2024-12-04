/** question link: [day2-part1](https://adventofcode.com/2024/day/2#part1)
 * 
 * @module
*/

import { diff } from "../deps.ts"
import { formatInput, type FormattedInput } from "./funcdefs.ts"
import inputA from "./input_a.ts"


const increasingReportIsSafe = (input: number[]): boolean => {
	const deltaInput = diff(input)
	return (
		Math.max(...deltaInput) <= 3
		&& Math.min(...deltaInput) >= 1
	)
}

const decreasingReportIsSafe = (input: number[]): boolean => {
	const deltaInput = diff(input)
	return (
		Math.min(...deltaInput) >= -3
		&& Math.max(...deltaInput) <= -1
	)
}

const reportIsSafe = (input: number[]): boolean => {
	const
		deltaInput = diff(input),
		initial_guess_is_increasing = (deltaInput.shift() ?? 0) > 0
	if (initial_guess_is_increasing && deltaInput.findIndex((v) => (v <= 0)) === -1) {
		return increasingReportIsSafe(input)
	} else if (!initial_guess_is_increasing && deltaInput.findIndex((v) => (v >= 0)) === -1) {
		return decreasingReportIsSafe(input)
	}
	return false
}

const evaluateReports = (reports: FormattedInput): number => {
	return reports
		.map(reportIsSafe)
		.filter((v) => (v === true))
		.length
}

export const run = (reports_str: string): number => {
	return evaluateReports(formatInput(reports_str))
}

console.log(run(inputA))
