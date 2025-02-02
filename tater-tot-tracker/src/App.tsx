import React, { useState } from 'react';
import babyData from './babyData.json';
import potatoData from './potatoData.json';

interface FetusSize {
  weeks: number;
  sizeInPotatoes: string;
}

const App: React.FC = () => {
  const [week, setWeek] = useState<number>(0); // Initialize to null
  const [selectedPotatoUnit, setSelectedPotatoUnit] =
    useState<string>('Russet Potato'); // Track selected potato unit, hard coded for now
  const [size, setSize] = useState<FetusSize>({
    weeks: 0,
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

  const handleWeekChange = (newWeek: number) => {
    setWeek(newWeek);
    setSize({
      weeks: newWeek,
      sizeInPotatoes: getPotatoOutputString(newWeek, selectedPotatoUnit),
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

  // Find the selected potato's image path
  const selectedPotato = potatoData.find(
    (potato) => potato.displayName === selectedPotatoUnit,
  );
  const potatoImagePath = selectedPotato?.img || '';
  const minImgSize: number = week * 10;

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

      {/* Slider for Week Selection */}
      <div className="flex-container">
        <label htmlFor="week-slider">Select week: </label>
        <input
          id="week-slider"
          type="range"
          min={4}
          max={40}
          value={week}
          onChange={(e) => handleWeekChange(parseInt(e.target.value, 10))}
          className="slider"
        />
        <span>{week} weeks</span>
      </div>

      {/* Display Baby Size */}
      <div className="flex-container">
        {week === 0 ? (
          <p>
            Enter your weeks to measure your baby in the most important unit of
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
