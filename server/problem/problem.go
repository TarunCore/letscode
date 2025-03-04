package problem

type Problem struct {
	ID          int64  `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type TestCases struct {
	ID        int64  `json:"id"`
	ProblemID int64  `json:"problem_id"`
	Input     string `json:"input"`
	Output    string `json:"output"`
}

type CreateProblemReq struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	// testcases
	TestCases []TestCases `json:"testcases"`
}
