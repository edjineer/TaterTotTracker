import React, { useState } from 'react';
import babyData from './babyData.json';

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


  // Potato Sizes
  const averageGramsRussetPotato = 173;
  const averageGramsHashBrown = 60;
  const averageGramsRedPotato = 148;
  const gramsMashedPotato = 1;

  // Calculate the number of potatoes based on the week and potato unit
  const calculatePotatos = (week: number, potatoUnit: string) => {
    const babyDataForWeek = babyData.find((data) => data.week === week);
    if (!babyDataForWeek) return 0;
  
    switch (potatoUnit) {
      case 'Russet Potato':
        return babyDataForWeek.weight / averageGramsRussetPotato;
      case 'Hash Brown':
        return babyDataForWeek.weight / averageGramsHashBrown;
      case 'Red Potato':
        return babyDataForWeek.weight / averageGramsRedPotato;
      case 'Grams of Mashed Potato':
          return babyDataForWeek.weight * gramsMashedPotato;
      default:
        return 0;
    }
  };

  // Get the potato output string based on the week and potato unit
  const getPotatoOutputString = (week: number, potatoUnit: string) => {
    const potatoValue = calculatePotatos(week, potatoUnit);
    if (potatoValue === 0) {
      return 'Unknown size';
    }
    else{return `${potatoValue} ${potatoUnit}`;}
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
      <div>
        <button
          onClick={() => handlePotatoUnitChange('Russet Potato')}
          className={`p-2 m-2 border rounded ${selectedPotatoUnit === 'Russet Potato' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Russet Potato
        </button>
        <button
          onClick={() => handlePotatoUnitChange('Hash Brown')}
          className={`p-2 m-2 border rounded ${selectedPotatoUnit === 'Hash Brown' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Hash Brown
        </button>
        <button
          onClick={() => handlePotatoUnitChange('Red Potato')}
          className={`p-2 m-2 border rounded ${selectedPotatoUnit === 'Red Potato' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Red Potato
        </button>
        <button
          onClick={() => handlePotatoUnitChange('Grams of Mashed Potato')}
          className={`p-2 m-2 border rounded ${selectedPotatoUnit === 'Grams of Mashed Potato' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Mashed Potato
        </button>
      </div>

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