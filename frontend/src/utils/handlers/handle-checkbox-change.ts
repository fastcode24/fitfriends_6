export const handleCheckboxChange = <S>(
  setState: React.Dispatch<React.SetStateAction<S>>,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { name, value, checked } = e.target;

  setState(prevState => {
    const fieldValue = prevState[name as keyof S] as unknown as string[];

    if (Array.isArray(fieldValue)) {
      let updatedArray;
      if (checked) {
        updatedArray = [...fieldValue, value];
      } else {
        updatedArray = fieldValue.filter(item => item !== value);
      }
      return {
        ...prevState,
        [name]: updatedArray,
      };
    } else {
      return prevState;
    }
  });
};
