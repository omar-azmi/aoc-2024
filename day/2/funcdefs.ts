
export type FormattedInput = Array<number[]>

export const formatInput = (input: string): FormattedInput => {
	input = input
		.replaceAll(/[ \h]+/g, ",")
		.split("\n")
		.map((row: string) => { return `[ ${row} ]` })
		.join(",")
	return JSON.parse(`[ ${input} ]`)
}
