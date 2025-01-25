import React, { useState } from 'react';

interface FetusSize {
  weeks: number;
  sizeInPotatoes: string;
}

const App: React.FC = () => {
  const [week, setWeek] = useState<number>(16); // Start with 16 weeks for the example
  const [size, setSize] = useState<FetusSize>({
    weeks: 16,
    sizeInPotatoes: '3.5 russet potatoes',
  });

  // Sample data: Replace with actual data or logic to calculate potato sizes
  const potatoSizes: { [key: number]: string } = {
    16: '3.5 russet potatoes',
    20: '4.5 mashed potatoes',
    25: '5 hash browns',
  };

  const getSizeForWeek = (week: number) => {
    return potatoSizes[week] || 'Unknown size';
  };

  const handleWeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWeek = parseInt(event.target.value, 10);
    setWeek(newWeek);
    setSize({
      weeks: newWeek,
      sizeInPotatoes: getSizeForWeek(newWeek),
    });
  };

  return (
    <div className="App">
      <h1>Tater Tot Tracker</h1>
      <div>
        <label>Enter week number: </label>
        <input
          type="number"
          value={week}
          onChange={handleWeekChange}
          className="border rounded p-2"
        />
      </div>
      <div>
        <p>At {size.weeks} weeks, your baby is about {size.sizeInPotatoes}.</p>
      </div>
    </div>
  );
};

export default App;