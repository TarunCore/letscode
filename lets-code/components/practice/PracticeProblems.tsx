import React from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


import { Button } from '../ui/button'
import Link from 'next/link';

const problems = [
  {
    id: 1,
    title: "2Sum",
    description: "Adding two numbers, you should get the target sum",
    tags: ["dp", "graphs"]
  },
  {
    id: 2,
    title: "Binary Search",
    description: "Find the position of a target element in a sorted array",
    tags: ["binary-search", "arrays"]
  },
  {
    id: 3,
    title: "Longest Common Subsequence",
    description: "Find the length of the longest subsequence common in two strings",
    tags: ["dp", "strings"]
  },
  {
    id: 4,
    title: "Graph Traversal",
    description: "Perform BFS/DFS to traverse through a graph",
    tags: ["graphs", "bfs", "dfs"]
  },
  {
    id: 5,
    title: "Knapsack Problem",
    description: "Determine the maximum value you can carry given weight constraints",
    tags: ["dp", "greedy"]
  },
  {
    id: 6,
    title: "Merge Intervals",
    description: "Merge overlapping intervals and return the result",
    tags: ["sorting", "arrays"]
  },
  {
    id: 7,
    title: "Palindrome Partitioning",
    description: "Partition a string such that every substring is a palindrome",
    tags: ["backtracking", "dp"]
  }
];

const PracticeProblems = () => {
  // const router = useRouter();
  const problems2= [
    {
      id: 1,
      title: "Uou",
      description: "yous",
      tags: ["dp","graphs"]
    }
  ]

  return (
    <>
    <Table>
      <TableCaption>A list of your recent problems.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Go to</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {problems.map((problem) => (
          <TableRow key={problem.title}>
            <TableCell className="font-medium">{problem.title}</TableCell>
            <TableCell>{problem.description}</TableCell>
            <TableCell className="text-right">
            <Link href={"/practice/"+problem.id}>
            <Button>{problem.id}</Button>
            </Link>
              
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
          

      </TableFooter>
    </Table>
    <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">1</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext href="#" />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
  </>
  )
}

export default PracticeProblems