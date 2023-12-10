# UI Components

## searchbar

Usage: 

`import { Searchbar } from '../../components/UI/searchbar/searchbar';`

Searchbar components support props:

```
setQueryString=<useState set function>
searchByQuery=<function>
filterByClass=<function>
filterByTag=<function>
```

example:

```
<Searchbar 
setQueryString={setSearchQuery} 
searchByQuery={searchByQuery} 
filterByClass={filterClass} 
filterByTag={filterTag}
/>