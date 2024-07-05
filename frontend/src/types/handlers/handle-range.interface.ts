import { Filter } from "@types";

export interface HandleRange {
  (
    rangeName: string,
    setFilter: React.Dispatch<React.SetStateAction<Filter>>,
    filter: Filter,
    setValues: React.Dispatch<React.SetStateAction<number[]>>
  ): (newValues: number[]) => void;
}
