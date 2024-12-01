import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import LeetCodeQuestion from './LeetCodeQuestions'

const questionData = {
  number: 1,
  title: "Two Sum",
  difficulty: "Easy" as const,
  description: `Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.<br><br>
  You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.<br><br>
  You can return the answer in any order.`,
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]"
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]"
    }
  ],
  constraints: [
    { text: "2 ≤ nums.length ≤ 10^4" },
    { text: "-10^9 ≤ nums[i] ≤ 10^9" },
    { text: "-10^9 ≤ target ≤ 10^9" },
    { text: "Only one valid answer exists." }
  ]
}

const QuestionDescription = ({id}:{id: number}) => {
  return <LeetCodeQuestion {...questionData} />
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold dark:text-white">1. Two Sum</h1>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Easy</Badge>
          </div>
          
          <div className="space-y-4">
            <section>
              <p className="text-gray-700 dark:text-gray-300">
                Given an array of integers <code className="bg-gray-100 dark:bg-gray-700 p-1 rounded">nums</code> and an integer <code className="bg-gray-100 dark:bg-gray-700 p-1 rounded">target</code>, return <em>indices of the two numbers such that they add up to <code className="bg-gray-100 dark:bg-gray-700 p-1 rounded">target</code></em>.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                You can return the answer in any order.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2 dark:text-white">Example 1:</h2>
              <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <code className="text-gray-800 dark:text-gray-200">
                  {`Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`}
                </code>
              </pre>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2 dark:text-white">Example 2:</h2>
              <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <code className="text-gray-800 dark:text-gray-200">
                  {`Input: nums = [3,2,4], target = 6
Output: [1,2]`}
                </code>
              </pre>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2 dark:text-white">Example 3:</h2>
              <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <code className="text-gray-800 dark:text-gray-200">
                  {`Input: nums = [3,3], target = 6
Output: [0,1]`}
                </code>
              </pre>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2 dark:text-white">Constraints:</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li><code className="bg-gray-100 dark:bg-gray-700 p-1 rounded">2 ≤ nums.length ≤ 10^4</code></li>
                <li><code className="bg-gray-100 dark:bg-gray-700 p-1 rounded">-10^9 ≤ nums[i] ≤ 10^9</code></li>
                <li><code className="bg-gray-100 dark:bg-gray-700 p-1 rounded">-10^9 ≤ target ≤ 10^9</code></li>
                <li><strong>Only one valid answer exists.</strong></li>
              </ul>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuestionDescription