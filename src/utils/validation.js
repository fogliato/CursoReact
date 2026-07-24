/**
 * Validation utility functions for form fields
 * @module validation
 */

/**
 * Validates the especialidade (specialty) field
 * @param {string} especialidade - The especialidade value to validate
 * @returns {Object} Validation result with isValid boolean and optional error message
 * @returns {boolean} result.isValid - Whether the value is valid
 * @returns {string} [result.error] - Error message if validation fails
 */
export const validateEspecialidade = (especialidade) => {
  // Check if empty or whitespace only
  if (!especialidade || especialidade.trim() === '') {
    return {
      isValid: false,
      error: 'Especialidade é obrigatória'
    };
  }

  // Check max length (255 characters)
  if (especialidade.length > 255) {
    return {
      isValid: false,
      error: 'Especialidade deve ter no máximo 255 caracteres'
    };
  }

  // Check allowed character set: alphanumeric, spaces, hyphens, commas, parentheses, slashes
  // Pattern: letters, numbers, spaces, hyphens, commas, parentheses, slashes
  const allowedPattern = /^[a-zA-Z0-9\s\-,()áéíóúâêôãõàèìòùäëïöüçÁÉÍÓÚÂÊÔÃÕÀÈÌÒÙÄËÏÖÜÇ/]+$/;
  
  if (!allowedPattern.test(especialidade)) {
    return {
      isValid: false,
      error: 'Especialidade contém caracteres não permitidos'
    };
  }

  // Validation passed
  return {
    isValid: true
  };
};
