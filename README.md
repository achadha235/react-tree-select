# react-tree-select

A very simple component to select options organized in a tree structure

## [👉 Try it out](https://main--66096c98835a62cb2461bc8e.chromatic.com/?path=/docs/example-treeselect--docs)

![DEMO](https://github.com/achadha235/react-tree-select/assets/1176261/a0e880dd-51b5-4469-a5d3-dc2f0f03d8f2)



## Install
```
pnpm add @achadha235/react-tree-select
```
## Usage
```ts
import React, { useState } from "react";

// Default styles for the component
import "@achadha235/react-tree-select/style"
import { TreeSelect } from "@achadha235/react-tree-select"

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
  },
};

const tags = [
  "Tag 1",
  "Tag 2",
  {
    value: "Tag 3",
    subtags: [
      "Tag 3.1",
      "Tag 3.2",
      {
        value: "Tag 3.3",
        subtags: ["Tag 3.3.1", "Tag 3.3.2"],
      },
    ],
  },
];

export function MyComponent() {
  const [selected, setSelected] = useState({});
  return (
    <div style={styles.container}>
      <TreeSelect
        tags={tags}
        onSelect={(newSelected) => setSelected(newSelected)}
        selected={selected}
      />
    </div>
  );
}
```

## Avaliable Props 

| prop       	| description                                                                    	| type                                       	|
|------------	|--------------------------------------------------------------------------------	|--------------------------------------------	|
| selected   	| An object where the options are keys and values are true if they are selected  	| Record<string, boolean>                    	|
| onSelected 	| Callback that is triggered when the selected options are changed               	| (updated: Record<string, boolean>) => void 	|
| tags       	| An nested array containing all the available options                           	| Array                             




