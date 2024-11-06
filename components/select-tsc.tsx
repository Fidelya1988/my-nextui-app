"use client";
import React, { useState, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { CardComponent } from "./card";
import { updateScript } from "@/async/updateScript";
import { SET_SCRIPT, useScript } from "@/context/ScriptContext";

export interface ISelectProps {
  label: string;
  data: Array<{ key: string; label: string }>;
  handleSelect?: (selected: Array<string>) => void;
}

export const SelectComponent: React.FC<ISelectProps> = ({
  label,
  data,
}) => {
  const [selected, setSelected] = useState<string>("");
  const {dispatch, state} =  useScript()
  useEffect(() => {
    console.log('Змінився стан користувача:', state);
  }, [state]); 
  const handleDeleteAll = () => {
    setSelected("");
  };
 const handleSelect = (value: string) => {
    console.log(value)

        setSelected(value)
        updateScript({ids: value}).then(data=>dispatch({type: SET_SCRIPT, payload: {text: data}}))
 }
  return (
    <div className="flex w-full flex-col gap-4">
      <Select
        label={label}
        className="w-[30rem]"
        onChange={(e)=>handleSelect(e.target.value)}
        selectionMode="multiple"
        variant="bordered"
      >
        {data.map((item) => (
          <SelectItem key={item.key}>{item.label}</SelectItem>
        ))}
      </Select>

      <CardComponent
        content={selected}
        header="Copy this numbers:"
        isDisabled={selected.length === 0}
        handleDeleteAll={handleDeleteAll}
        textToCopy={selected}
      />
    </div>
  );
};
