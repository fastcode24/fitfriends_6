export const handleInputChange = <S,>(setState: React.Dispatch<React.SetStateAction<S>>, e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value, type } = e.target;
  let parsedValue: string | number = value;

  if (type === 'number') {
    parsedValue = value === '' ? '' : +value.replace(/^0+/, '');
  }

  if (type === 'range') {
    parsedValue = value === '' ? 0 : Number(value);
  }

  setState(prevData => {
    if (prevData === null) {
      return prevData;
    }
    return { ...prevData, [name]: parsedValue };
  });
};
