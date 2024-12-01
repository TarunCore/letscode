import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { LeetCodeQuestionProps, Example, Constraint } from "@/types/leetcode-questions"

export default function LeetCodeQuestion({
  number,
  title,
  difficulty,
  description,
  examples,
  constraints
}: LeetCodeQuestionProps) {
  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
  }[difficulty]

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold dark:text-white">{number}. {title}</h1>
            <Badge variant="secondary" className={difficultyColor}>{difficulty}</Badge>
          </div>
          
          <div className="space-y-4">
            <section>
              <div className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: description }} />
            </section>

            {examples.map((example, index) => (
              <section key={index}>
                <h2 className="text-xl font-semibold mb-2 dark:text-white">Example {index + 1}:</h2>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <code className="text-gray-800 dark:text-gray-200">
                    {`Input: ${example.input}
Output: ${example.output}${example.explanation ? `\nExplanation: ${example.explanation}` : ''}`}
                  </code>
                </pre>
              </section>
            ))}

            <section>
              <h2 className="text-xl font-semibold mb-2 dark:text-white">Constraints:</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {constraints.map((constraint, index) => (
                  <li key={index}>
                    <code className="bg-gray-100 dark:bg-gray-700 p-1 rounded">{constraint.text}</code>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

