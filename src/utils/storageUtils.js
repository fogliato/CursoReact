/**
 * Storage utility functions for persisting form state to localStorage
 * @module storageUtils
 */

const STORAGE_KEY = 'CursoReact_FormState'

/**
 * Persists complete form state to localStorage
 * @param {Object} state - The form state object containing all fields
 * @param {string} state.nome - Employee name
 * @param {string} state.cargo - Employee role/position
 * @param {string} state.imagem - Employee image URL
 * @param {string} state.time - Employee team
 * @param {string} state.especialidade - Employee specialty
 * @returns {boolean} true if persisted successfully, false on error
 */
export const persistFormState = (state) => {
  try {
    const jsonState = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, jsonState)
    return true
  } catch (error) {
    console.error('Error persisting form state to localStorage:', error)
    return false
  }
}

/**
 * Loads form state from localStorage
 * @returns {Object|null} The saved form state or null if not found or error
 */
export const loadFormState = () => {
  try {
    const jsonState = localStorage.getItem(STORAGE_KEY)
    if (!jsonState) {
      return null
    }
    return JSON.parse(jsonState)
  } catch (error) {
    console.error('Error loading form state from localStorage:', error)
    return null
  }
}

/**
 * Clears the form state from localStorage
 * @returns {boolean} true if cleared successfully, false on error
 */
export const clearFormState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Error clearing form state from localStorage:', error)
    return false
  }
}
