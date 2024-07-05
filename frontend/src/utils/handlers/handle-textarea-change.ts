export const handleTextareaChange = <S,>(setState: React.Dispatch<React.SetStateAction<S>>, e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  setState(prevData => {
    if (prevData === null) {
      return prevData;
    }
    return { ...prevData, [name]: value };
  });
};
