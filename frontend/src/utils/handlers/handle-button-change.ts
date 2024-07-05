import { isObject } from "..";

export const handleButtonChange = <T extends Record<string, any>>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  e: React.MouseEvent<HTMLButtonElement>
) => {
  const { name } = e.currentTarget;
  if (!name) return;

  setState(prevData => {
    if (!prevData || !isObject(prevData) || !(name in prevData)) {
      return prevData;
    }

    const newValue = !prevData[name as keyof T] as boolean;
    return { ...prevData, [name]: newValue };
  });
};
