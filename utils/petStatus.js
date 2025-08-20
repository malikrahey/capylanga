import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for AsyncStorage
const LAST_FED_KEY = '@lastFedTs';
export const FOOD_COUNT_KEY = '@food_count';

// How long it takes to go from 0 → 100 % hunger (1 day)
export const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Convert the timestamp of the last feeding into a hunger percentage (0-100).
 * 0   → just fed, completely full
 * 100 → 24 h without food (or more – capped at 100)
 */
export const calcHungerPercentage = (lastFedTs) => {
  if (!lastFedTs) {
    return 0;
  }

  const elapsed = Date.now() - lastFedTs;
  const pct = Math.floor((elapsed / DAY_MS) * 100);

  // Clamp between 0 and 100
  return Math.min(Math.max(pct, 0), 100);
};

/**
 * Load persisted pet status from AsyncStorage and compute hunger/energy.
 * Ensures sane defaults when keys are missing/corrupt.
 */
export const loadPetStatus = async (defaultFoodCount = 5) => {
  try {
    const [[, lastTsStr], [, foodCountStr]] = await AsyncStorage.multiGet([
      LAST_FED_KEY,
      FOOD_COUNT_KEY,
    ]);

    let lastFedTs = Number(lastTsStr);
    if (!lastTsStr || Number.isNaN(lastFedTs)) {
      lastFedTs = Date.now();
      await AsyncStorage.setItem(LAST_FED_KEY, String(lastFedTs));
    }

    let foodCount = Number(foodCountStr);
    if (!foodCountStr || Number.isNaN(foodCount)) {
      foodCount = defaultFoodCount;
      await AsyncStorage.setItem(FOOD_COUNT_KEY, String(foodCount));
    }

    const hunger = calcHungerPercentage(lastFedTs);

    return {
      hunger,
      energy: hunger, // energy mirrors hunger for now
      foodCount,
      lastFedTs,
    };
  } catch (err) {
    console.error('loadPetStatus error', err);
    throw err;
  }
};

/**
 * Feed the pet once. Requires at least 1 food item.
 * Persists new timestamp + food count, returns fresh state object.
 */
export const feedPet = async (currentFoodCount) => {
  if (currentFoodCount <= 0) {
    throw new Error('No food to feed');
  }

  const newFoodCount = currentFoodCount - 1;
  const newLastFedTs = Date.now();

  try {
    await AsyncStorage.multiSet([
      [LAST_FED_KEY, String(newLastFedTs)],
      [FOOD_COUNT_KEY, String(newFoodCount)],
    ]);

    const hunger = 0; // just fed – fully satisfied

    return {
      hunger,
      energy: hunger,
      foodCount: newFoodCount,
      lastFedTs: newLastFedTs,
    };
  } catch (err) {
    console.error('feedPet error', err);
    throw err;
  }
}; 