# UI Components

## Table

Usage: 

`import { Table } from './components/UI/UI';` 

(Includes Table, Table.Heading, Table.Row, Table.Col)

Table supports props:

```
id=<string>
className=<string>
width= 'auto'(default), 'full'
```

Example:

```
<Table width='full'>
  <Table.Heading>
      <Table.Col>Files</Table.Col>
      <Table.Col>Size</Table.Col>
      <Table.Col>Type</Table.Col>
  </Table.Heading>
  <Table.Row>
      <Table.Col>HW555.pdf</Table.Col>
      <Table.Col>1mb</Table.Col>
      <Table.Col>txt</Table.Col>
  </Table.Row>
  <Table.Row>
      <Table.Col>HW1.pdf</Table.Col>
      <Table.Col>1mb</Table.Col>
      <Table.Col>txt</Table.Col>
  </Table.Row>
</Table>
```