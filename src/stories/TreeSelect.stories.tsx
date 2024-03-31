import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TreeSelect } from "..";
import { skillTags } from "./example";

const meta: Meta<any> = {
  title: "Example/TreeSelect",
  component: TreeSelect,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  render: (args) => {
    const [selected, setSelected] = React.useState(args.selected);
    return (
      <>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 4, maxWidth: 800 }}
        >
          <TreeSelect
            {...args}
            selected={selected}
            onSelect={(selected) => {
              setSelected(selected);
            }}
          />
        </div>

        <div
          style={{
            paddingTop: 60,
            opacity: 0.5,
            fontFamily: "sans-serif",
            fontSize: 12,
          }}
        >
          <label style={{}}>Debug</label>
          <pre style={{ maxWidth: 600, textWrap: "pretty" }}>
            {JSON.stringify(selected)}
          </pre>
        </div>
      </>
    );
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSelect: (selected) => {},
    selected: {},
    tags: skillTags,
  },
};
