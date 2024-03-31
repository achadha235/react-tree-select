import React, { useCallback } from "react";

const isNil = (v: unknown) => v === undefined || v === null;

type OptionObject = {
  value: string;
  subtags?: Option[];
};

type Option = string | OptionObject;

interface TreeSelectProps {
  tags: Option[];
  onSelect: (selected: Record<string, boolean>) => void;
  selected: Record<string, boolean>;
}

/**
 * A component that renders a tree of tags that can be selected.
 */
export function TreeSelect(props: TreeSelectProps) {
  const { tags, onSelect, selected } = props;

  const deselectParentAndChildren = (
    tag: OptionObject,
    newSelected: Record<string, boolean>
  ) => {
    delete newSelected[tag.value];
    if (tag.subtags) {
      tag.subtags.forEach((childTag) => {
        if (typeof childTag === "string") {
          delete newSelected[childTag];
        } else if (typeof childTag.value === "string") {
          deselectParentAndChildren(childTag, newSelected);
        }
      });
    }
  };

  const handleTagClick = useCallback(
    (tag: Option) => {
      let tagValue: string;
      let tagSelected: boolean;
      if (typeof tag === "string") {
        tagValue = tag;
      } else if (typeof tag.value === "string") {
        tagValue = tag.value;
      } else {
        throw new Error(
          "Unknown option type: " +
            JSON.stringify(tag) +
            ". Either tag or tag.value must be a string."
        );
      }

      tagSelected =
        typeof selected[tagValue] === "boolean" ? !selected[tagValue] : true;

      const newSelected = { ...selected };
      if (!tagSelected && typeof tag !== "string" && tag.subtags) {
        deselectParentAndChildren(tag, newSelected);
      } else {
        newSelected[tagValue] = tagSelected;
      }
      onSelect(newSelected);
    },
    [selected, onSelect]
  );

  return (
    <>
      {tags.map((tag) => {
        if (typeof tag === "string") {
          return (
            <span
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`tree-select tag ${selected[tag] && "active"}`}
            >
              {tag}
            </span>
          );
        } else if (typeof tag === "object") {
          if (tag.value && isNil(tag.subtags)) {
            return (
              <span
                key={tag.value}
                onClick={() => handleTagClick(tag)}
                className={`tree-select tag ${selected[tag.value] && "active"}`}
              >
                {tag.value}
              </span>
            );
          }

          if (isNil(tag.subtags) || tag.subtags!.length === 0) {
            return null;
          } else {
            return (
              <>
                <span
                  key={tag.value}
                  onClick={() => handleTagClick(tag)}
                  className={`tree-select tag ${selected[tag.value] && "active"}`}
                >
                  {tag.value}
                </span>
                {selected[tag.value] === true && (
                  <TreeSelect
                    tags={tag.subtags!}
                    onSelect={onSelect}
                    selected={selected}
                  />
                )}
              </>
            );
          }
        }
      })}
    </>
  );
}
