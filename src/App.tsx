import { useState } from "react";
import "./index.css";

type Item = {
  type: "Fruit" | "Vegetable";
  name: string;
  timerId?: number;
};

const items: Item[] = [
  { type: "Fruit", name: "Apple" },
  { type: "Vegetable", name: "Broccoli" },
  { type: "Vegetable", name: "Mushroom" },
  { type: "Fruit", name: "Banana" },
  { type: "Vegetable", name: "Tomato" },
  { type: "Fruit", name: "Orange" },
  { type: "Fruit", name: "Mango" },
  { type: "Fruit", name: "Pineapple" },
  { type: "Vegetable", name: "Cucumber" },
  { type: "Fruit", name: "Watermelon" },
  { type: "Vegetable", name: "Carrot" },
];

function App() {
  const [mainList, setMainList] = useState<Item[]>(items);
  const [columns, setColumns] = useState<Record<string, Item[]>>({
    Fruit: [],
    Vegetable: [],
  });

  const handleMainListClick = (item: Item) => {
    const newColumns = { ...columns };
    newColumns[item.type].push(item);
    setColumns(newColumns);
    setMainList(mainList.filter((i) => i !== item));

    const timerId = setTimeout(() => {
      setColumns((cols) => {
        const updatedCols = { ...cols };
        updatedCols[item.type] = updatedCols[item.type].filter(
          (i) => i !== item
        );
        return updatedCols;
      });
      setMainList((list) => [...list, item]);
    }, 5000);

    item.timerId = timerId;
  };

  const handleColumnClick = (item: Item) => {
    if (item.timerId) {
      clearTimeout(item.timerId);
    }
    setColumns((cols) => {
      const updatedCols = { ...cols };
      updatedCols[item.type] = updatedCols[item.type].filter((i) => i !== item);
      return updatedCols;
    });
    setMainList((list) => [...list, item]);
  };

  return (
    <div className="tw-container tw-mx-auto tw-my-4 tw-p-4">
      <table className="tw-table-auto tw-w-full tw-text-center">
        <thead>
          <tr>
            <th className="tw-px-4 tw-py-2">Main List</th>
            <th className="tw-px-4 tw-py-2">Fruits</th>
            <th className="tw-px-4 tw-py-2">Vegetables</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tw-border tw-px-4 tw-py-2">
              {mainList.map((item) => (
                <div key={item.name} className="tw-mb-2">
                  <button
                    className="tw-border hover:tw-bg-slate-200	 tw-text-inherit tw-px-4 tw-py-2 tw-w-full tw-rounded"
                    onClick={() => handleMainListClick(item)}
                  >
                    {item.name}
                  </button>
                </div>
              ))}
            </td>
            <td className="tw-border tw-px-4 tw-py-2">
              {columns.Fruit.map((item) => (
                <div key={item.name} className="tw-mb-2">
                  <button
                    className="tw-bg-green-500 tw-text-white tw-px-4 tw-py-2 tw-w-full tw-rounded"
                    onClick={() => handleColumnClick(item)}
                  >
                    {item.name}
                  </button>
                </div>
              ))}
            </td>
            <td className="tw-border tw-px-4 tw-py-2">
              {columns.Vegetable.map((item) => (
                <div key={item.name} className="tw-mb-2">
                  <button
                    className="tw-bg-yellow-500 tw-text-white tw-px-4 tw-py-2 tw-w-full tw-rounded"
                    onClick={() => handleColumnClick(item)}
                  >
                    {item.name}
                  </button>
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
