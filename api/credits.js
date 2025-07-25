import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

const { CREDITS } = STORAGE_KEYS;

// Credit costs and rewards
export const CREDIT_COSTS = {
  CREATE_COURSE: 3,
  GENERATE_LESSON: 1,
};

export const CREDIT_REWARDS = {
  LESSON_COMPLETE: 1,
  REWARDED_VIDEO: 5,
  DEFAULT_CREDITS: 5,
};

/**
 * Get current credits from storage, defaulting to 5 if not found
 * @returns {Promise<number>} Current credit amount
 */
export const getCredits = async () => {
  try {
    const creditsJson = await AsyncStorage.getItem(CREDITS);
    return creditsJson ? JSON.parse(creditsJson) : CREDIT_REWARDS.DEFAULT_CREDITS;
  } catch (error) {
    console.error('Error getting credits:', error);
    return CREDIT_REWARDS.DEFAULT_CREDITS;
  }
};

/**
 * Add credits to the current balance
 * @param {number} amount - Amount of credits to add
 * @returns {Promise<number>} New credit total
 */
export const addCredits = async (amount) => {
  try {
    const currentCredits = await getCredits();
    const newCredits = currentCredits + amount;
    await AsyncStorage.setItem(CREDITS, JSON.stringify(newCredits));
    return newCredits;
  } catch (error) {
    console.error('Error adding credits:', error);
    throw error;
  }
};

/**
 * Deduct credits from current balance with validation
 * @param {number} amount - Amount of credits to deduct
 * @returns {Promise<number>} New credit total
 * @throws {Error} If insufficient credits
 */
export const deductCredits = async (amount) => {
  try {
    const currentCredits = await getCredits();
    
    if (currentCredits < amount) {
      throw new Error(`Insufficient credits. You have ${currentCredits} credits but need ${amount}.`);
    }
    
    const newCredits = currentCredits - amount;
    await AsyncStorage.setItem(CREDITS, JSON.stringify(newCredits));
    return newCredits;
  } catch (error) {
    console.error('Error deducting credits:', error);
    throw error;
  }
};

/**
 * Check if user has enough credits for a specific action
 * @param {number} amount - Amount of credits needed
 * @returns {Promise<boolean>} Whether user has enough credits
 */
export const hasEnoughCredits = async (amount) => {
  try {
    const currentCredits = await getCredits();
    return currentCredits >= amount;
  } catch (error) {
    console.error('Error checking credits:', error);
    return false;
  }
};

/**
 * Reset credits to default amount (for testing/debugging)
 * @returns {Promise<number>} New credit total
 */
export const resetCredits = async () => {
  try {
    await AsyncStorage.setItem(CREDITS, JSON.stringify(CREDIT_REWARDS.DEFAULT_CREDITS));
    return CREDIT_REWARDS.DEFAULT_CREDITS;
  } catch (error) {
    console.error('Error resetting credits:', error);
    throw error;
  }
};

/**
 * Initialize credits if they don't exist (for first-time users)
 * @returns {Promise<number>} Current credit total
 */
export const initializeCredits = async () => {
  try {
    const creditsJson = await AsyncStorage.getItem(CREDITS);
    if (creditsJson === null) {
      await AsyncStorage.setItem(CREDITS, JSON.stringify(CREDIT_REWARDS.DEFAULT_CREDITS));
      return CREDIT_REWARDS.DEFAULT_CREDITS;
    }
    return JSON.parse(creditsJson);
  } catch (error) {
    console.error('Error initializing credits:', error);
    return CREDIT_REWARDS.DEFAULT_CREDITS;
  }
}; 