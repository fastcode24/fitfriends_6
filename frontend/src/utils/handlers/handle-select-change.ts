export const handleSelectChange = <S,>(
  setState: React.Dispatch<React.SetStateAction<S>>,
  e: React.ChangeEvent<HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setState(prevData => ({
    ...prevData,
    [name]: value
  }));
};
