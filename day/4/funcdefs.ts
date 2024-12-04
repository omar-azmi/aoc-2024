
type Letter = "x" | "m" | "a" | "s"
type LetterId = 0 | 1 | 2 | 3
type Array2DRowMajor<T> = T[][]
export type FormattedInput = Array2DRowMajor<LetterId>
export interface Index2D {
	row: number
	col: number
}

const letterToId: Record<Letter, LetterId> = {
	"x": 0,
	"m": 1,
	"a": 2,
	"s": 3,
} as const

export const formatInput = (input: string): FormattedInput => {
	return input
		.split("\n")
		.map((row_str) => (row_str
			.split("")
			.map((letter) => (letterToId[letter.toLowerCase() as Letter]))
		))
}
