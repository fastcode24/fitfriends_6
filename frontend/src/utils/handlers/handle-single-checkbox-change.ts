export const handleSingleCheckboxChange = (
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { checked } = e.target;
  setState(checked);
};
