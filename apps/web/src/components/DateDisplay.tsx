import React, { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "ui";

interface DateDisplayProps {
  date: Date | string | number;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ date }) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 60000);

    return () => clearInterval(timer);
  }, []);

  const { relative, absolute } = formatDate(date);

  return (
    <Tooltip>
      <TooltipTrigger>{relative}</TooltipTrigger>
      <TooltipContent>{absolute}</TooltipContent>
    </Tooltip>
  );
};

export default DateDisplay;
