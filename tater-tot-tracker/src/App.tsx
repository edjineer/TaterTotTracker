import React, { useState } from 'react';
import babyData from './babyData.json';
import potatoData from './potatoData.json'; 


interface FetusSize {
  weeks: number;
  sizeInPotatoes: string;
}

const App: React.FC = () => {
  const [week, setWeek] = useState<number>(0); // Start with 16 weeks for the example
  const [selectedPotatoUnit, setSelectedPotatoUnit] = useState<string>('Russet Potato'); // Track selected potato unit
  const [size, setSize] = useState<FetusSize>({
    weeks: babyData.find((data) => data.week === week) ? week : 0, // If the week is not found, set the week to 0
    sizeInPotatoes: "no potatoes :(", //Initalized value is silly, bc why not
  });

  // Calculate the number of potatoes based on the week and potato unit
  const calculatePotatos = (week: number, potatoUnit: string) => {
    const babyDataForWeek = babyData.find((data) => data.week === week);
    if (!babyDataForWeek) return 0;
    const potatoInfo = potatoData.find((potato) => potato.displayName === potatoUnit);
    if (!potatoInfo) return 0;
    const potatoValue = babyDataForWeek.weight / potatoInfo.avgGrams;
    return potatoValue.toFixed(2);
  };

  // Get the potato output string based on the week and potato unit
  const getPotatoOutputString = (week: number, potatoUnit: string) => {
    const potatoValue = calculatePotatos(week, potatoUnit);
    if (potatoValue === 0) {
      return 'Unknown size';
    }
    const potatoInfo = potatoData.find((potato) => potato.displayName === potatoUnit);
    if (!potatoInfo) return 0;
    else{return `${potatoValue} ${potatoInfo.pluralName}`;}
  }

  const handleWeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWeek = parseInt(event.target.value, 10);
    setWeek(newWeek);
    setSize({
      weeks: newWeek,
      sizeInPotatoes: getPotatoOutputString(newWeek, selectedPotatoUnit),
    });
  };

  const handlePotatoUnitChange = (potatoUnit: string) => {
    setSelectedPotatoUnit(potatoUnit);
    setSize({
      weeks: week,
      sizeInPotatoes: getPotatoOutputString(week, potatoUnit),
    });
  };

  return (
    <div className="App">
      <h1>Tater Tot Tracker</h1>

      {/* Potato Unit Buttons */}
      {potatoData.map((potato) => (
        <button
          onClick={() => handlePotatoUnitChange(potato.displayName)}
          className={`p-2 m-2 border rounded ${selectedPotatoUnit === potato.displayName ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {potato.displayName}
        </button>
      ))}

      {/* Week Input */}
      <div>
        <label>Enter week number: </label>
        <input
          type="number"
          value={week}
          onChange={handleWeekChange}
          className="border rounded p-2"
        />
      </div>

      {/* Display Baby Size */}
      <div>
        <p>
          At {size.weeks} weeks, your baby is about {size.sizeInPotatoes}
        </p>
      </div>
    </div>
  );
};

export default App;