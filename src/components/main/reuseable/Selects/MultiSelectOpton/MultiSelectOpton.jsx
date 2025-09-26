"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";

const MultiSelectOptonItems = ({
  item,
  list,
  selectedItems,
  setSelectedItems,
}) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Checkbox
          id={item.id}
          onCheckedChange={() => {
            selectedItems.includes(item.id)
              ? setSelectedItems(
                  selectedItems.filter(
                    (currentItemId) => currentItemId !== item.id
                  )
                )
              : setSelectedItems((previousSelectedItemsId) => [
                  ...previousSelectedItemsId,
                  item.id,
                ]);
          }}
          checked={selectedItems.includes(item.id) ? true : false}
          className="cursor-pointer"
        />
        <Label htmlFor={item.id} className="cursor-pointer">
          {item.title}
        </Label>
      </div>
    </div>
  );
};

export default MultiSelectOptonItems;
