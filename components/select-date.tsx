"use client";
import React from "react";
import { DateRangePicker, DatePicker, Chip } from "@nextui-org/react";
import { CardComponent } from "./card";
import { Calendar } from "@nextui-org/react";
import type { DateValue } from "@react-types/calendar";
import { parseDate, today, getLocalTimeZone } from "@internationalized/date";
import { updateScript } from "@/async/updateScript";
export const SelectDate = () => {
    const timzone =  getLocalTimeZone()
  const [value, setValue] = React.useState<DateValue>(today(timzone));
  const [content, setContent] = React.useState<string[]>([]);
  
  const handleChange = (value: DateValue) => {
    const date = new Date(`${value.month}-${value.day}-${value.year}`);
    const contentItem = date.toISOString().split("T")[0];
    const list = new Set([...content, contentItem]);
    setContent(Array.from(list));
    setValue(value)
    updateScript({dates: Array.from(list)})

  };
  const handleDelete = (date: string) => {
    const datesSet = new Set(content);
    if (datesSet.has(date)) {
      datesSet.delete(date);
    }
    setContent(Array.from(datesSet));
    updateScript({dates: Array.from(datesSet)})

  };
 const handleDeleteAll = ()=> {
    setContent([])
    setValue(today(timzone))
 }
  return (
    <div className="flex flex-col">
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Calendar
          aria-label="Date (Controlled)"
          onChange={handleChange}
          value={value}
        />
      </div>
      <div>
        <CardComponent header="Copy this dates:" isDisabled={content.length===0} handleDeleteAll={handleDeleteAll} textToCopy={content.join(',')}>
          <div>
            {content.map((date) => (
              <Chip onClose={() => handleDelete(date)} key={date} className="m-1">
                {date}
              </Chip>
            ))}
          </div>
        </CardComponent>
      </div>
    </div>
  );
};
