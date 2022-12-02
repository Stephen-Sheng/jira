import { useArray, useMount } from "utils";

export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "Jack", age: 25 },
    { name: "Ma", age: 30 },
  ];
  const { value, clear, removeIndex, add } = useArray(persons);
  useMount(() => {});

  return (
    <div>
      <button onClick={() => add({ name: "jhon", age: 22 })}>add Jhon</button>
      <button onClick={() => removeIndex(0)}>remove first</button>
      <button onClick={() => clear()}>clear</button>
      {value.map((person, index) => (
        <div>
          <span>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};
