import React, { useState } from 'react';
import babyData from './babyData.json';
import potatoData from './potatoData.json';

interface FetusSize {
  weeks: number;
  sizeInPotatoes: string;
}

const App: React.FC = () => {
  const [week, setWeek] = useState<string>('0');
  const [selectedPotatoUnit, setSelectedPotatoUnit] =
    useState<string>('Russet Potato'); // Track selected potato unit, hard coded for now
  const [size, setSize] = useState<FetusSize>({
    weeks: parseInt(week, 10),
    sizeInPotatoes: '',
  });

  // Calculate the number of potatoes based on the week and potato unit
  const calculatePotatos = (week: number, potatoUnit: string) => {
    const babyDataForWeek = babyData.find((data) => data.week === week);
    if (!babyDataForWeek) return 0;
    const potatoInfo = potatoData.find(
      (potato) => potato.displayName === potatoUnit,
    );
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
    const potatoInfo = potatoData.find(
      (potato) => potato.displayName === potatoUnit,
    );
    if (!potatoInfo) return '0';
    else {
      return `${potatoValue} ${potatoInfo.pluralName}`;
    }
  };

  const handleWeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const rawWeekNumber = parseInt(value, 10);
    if (rawWeekNumber > 40) {
      setWeek('40'); // Clamp to maximum if greater than 40
    } else {
      setWeek(value);
    }
  };

  const handleBlur = () => {
    let weekNumber = parseInt(week, 10);
    if (isNaN(weekNumber) || weekNumber < 4) {
      weekNumber = 4; // Clamp to minimum if less than 4
    } else if (weekNumber > 40) {
      weekNumber = 40; // Clamp to maximum if greater than 40
    }
    setWeek(weekNumber.toString());
    setSize({
      weeks: weekNumber,
      sizeInPotatoes: getPotatoOutputString(weekNumber, selectedPotatoUnit),
    });
  };

  const handlePotatoUnitChange = (potatoUnit: string) => {
    setSelectedPotatoUnit(potatoUnit);
    const weekNum = parseInt(week, 10);
    if (week !== '0') {
      setSize({
        weeks: weekNum,
        sizeInPotatoes: getPotatoOutputString(weekNum, potatoUnit),
      });
    }
  };

  // Find the selected potato's image path
  const selectedPotato = potatoData.find(
    (potato) => potato.displayName === selectedPotatoUnit,
  );
  const potatoImagePath = selectedPotato?.img || '';
  const minImgSize: number = parseInt(week, 10) * 10;

  return (
    <div className="App">
      <h1>Tater Tot Tracker</h1>
      <h2>Track your baby&apos;s size in potatoes!</h2>

      <div className="flex-container">
        {/* Potato Unit Buttons */}
        {potatoData.map((potato) => (
          <button
            key={potato.displayName}
            onClick={() => handlePotatoUnitChange(potato.displayName)}
            className={
              selectedPotatoUnit === potato.displayName
                ? 'selected-button'
                : 'unselected-button'
            }
          >
            {potato.displayName}
          </button>
        ))}
      </div>

      {/* Week Input */}
      <div className="flex-container">
        <label>Enter week number: </label>
        <input
          type="number"
          value={week}
          onChange={handleWeekChange}
          onBlur={handleBlur}
          className="border rounded p-2"
          min={4}
          max={40}
          step={1}
        />
      </div>

      {/* Display Baby Size */}
      <div className="flex-container">
        {week === '0' ? (
          <p>
            Enter your weeks to measure your baby in the most exciting unit of
            all: potatoes!
          </p>
        ) : (
          <p>
            At <strong>{size.weeks} weeks</strong>, your baby is about as heavy
            as <strong>{size.sizeInPotatoes}</strong>.
          </p>
        )}
      </div>

      {/* Display Potato Image */}
      {potatoImagePath && (
        <div className="flex-container">
          <img
            src={potatoImagePath}
            alt={`${selectedPotatoUnit}`}
            width={minImgSize}
            className="potato-image"
          />
        </div>
      )}
    </div>
  );
};

export default App;
