# UI Components

## Charts

Usage:

`import { PassFailPie, LineChart, SubmissionBarChart } from './components/UI/UI';`

Formatted charts using chartjs

**Linechart:**

```
titlex=<string>
titley=<string>
labels=<array<string>>
data=<array<float>>
min=<integer>
max=<integer>
tooltip=<string>
```

**PassFailPie:**

```
mode=<string> ('past' for past tense tooltips)
data=<array<integer>> ([# of passing, # of failing])
```

**SubmissionBarChart:**

```
data=<array<float>>
filter=<array< boolean, <array<float>> >> ([])
points=<float> (Max points possible)
testCase=<integer || undefined> (If chart should use test case score instead)
click=<function> (When a bar is clicked)
selected={selected}
```

Example:

```
<LineChart
  titlex='Submissions'
  titley={`Points / ${assignment.totalPoints}`}
  labels={submissions.map((x, i) => i + 1)}
  data={submissions.map((submission) => submission.submissionPoints)}
/>
```