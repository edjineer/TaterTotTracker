import React, { useState } from 'react';
import babyData from './babyData.json';
import potatoData from './potatoData.json'; 


interface FetusSize {
  weeks: number;
  sizeInPotatoes: string;
}

const App: React.FC = () => {
  const [week, setWeek] = useState<number>(0); // Initialize to null
  const [selectedPotatoUnit, setSelectedPotatoUnit] = useState<string>('Russet Potato'); // Track selected potato unit, hard coded for now
  const [size, setSize] = useState<FetusSize>({
    weeks: 0,
    sizeInPotatoes: '',
  });

  // Calculate the number of potatoes based on the week and potato unit
  const calculatePotatos = (week: number, potatoUnit: string) => {
    const babyDataForWeek = babyData.find((data) => data.week === week);
    if (!babyDataForWeek) return 0;
    const potatoInfo = potatoData.find((potato) => potato.displayName === potatoUnit);
    if (!potatoInfo) return '0';
    const potatoValue = babyDataForWeek.weight / potatoInfo.avgGrams;
    return potatoValue.toFixed(2);
  };

  // Get the potato output string based on the week and potato unit
  const getPotatoOutputString = (week: number, potatoUnit: string) => {
    const potatoValue = calculatePotatos(week, potatoUnit);
    if (potatoValue === '0') {
      return 'Unknown size';
    }
    const potatoInfo = potatoData.find((potato) => potato.displayName === potatoUnit);
    if (!potatoInfo) return '0';
    else{return `${potatoValue} ${potatoInfo.pluralName}`;}
  }

  const handleWeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newWeek = value === '' ? 0 : parseInt(value, 10);

    setWeek(newWeek);
    setSize({
      weeks: newWeek,
      sizeInPotatoes: newWeek ? getPotatoOutputString(newWeek, selectedPotatoUnit) : '',
    });
  };

  const handlePotatoUnitChange = (potatoUnit: string) => {
    setSelectedPotatoUnit(potatoUnit);
    if (week !== 0) {
      setSize({
        weeks: week,
        sizeInPotatoes: getPotatoOutputString(week, potatoUnit),
      });
    }
  };


  return (
    <div className="App">
      <h1>Tater Tot Tracker</h1>
      <h2>Track your baby's size in potatoes!</h2>


      <div className="flex-container">
        {/* Potato Unit Buttons */}
        {potatoData.map((potato) => (
          <button
            onClick={() => handlePotatoUnitChange(potato.displayName)}
            className={`p-2 m-2 border rounded ${selectedPotatoUnit === potato.displayName ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {potato.displayName}
          </button>
        ))}
      </div>

      {/* Week Input */}
      <div>
        <label>Enter week number: </label>
        <input
          type="number"
          value={week}
          onChange={handleWeekChange}
          className="border rounded p-2"
          min={4} //Pregnancy first known at 4 weeks
          max={40} //Most pregnancies last 40 weeks
          step={1} 
        />
      </div>

      {/* Display Baby Size */}
      <div>
        {week === 0 ? (
          <p>
            Enter your weeks to start potatoing!
          </p>
        ) : (
          <p>
            At {size.weeks} weeks, your baby is about {size.sizeInPotatoes}.
          </p>
        )}
      </div>
      </div>
  );
};

export default App;