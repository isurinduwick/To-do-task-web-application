export const VALIDATION_RULES = {
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  INVALID_TITLE_CHARS: /[@#$%^&*()_+|~=`{}\[\]:;"'<>,.?\/]/g,
  MAX_TASKS: 5,
};

export const validateTitle = (title) => {
  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (title.length > 0 && title[0] === ' ') {
    errors.push('Title cannot start with a space');
  }

  if (title.length > VALIDATION_RULES.TITLE_MAX_LENGTH) {
    errors.push(`Title must not exceed ${VALIDATION_RULES.TITLE_MAX_LENGTH} characters`);
  }

  const invalidChars = title.match(VALIDATION_RULES.INVALID_TITLE_CHARS);
  if (invalidChars) {
    const uniqueChars = [...new Set(invalidChars)].join(' ');
    errors.push(`Title contains invalid characters: ${uniqueChars}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateDescription = (description) => {
  const errors = [];

  if (!description || description.trim().length === 0) {
    errors.push('Description is required');
  }

  if (description.length > VALIDATION_RULES.DESCRIPTION_MAX_LENGTH) {
    errors.push(`Description must not exceed ${VALIDATION_RULES.DESCRIPTION_MAX_LENGTH} characters`);
  }

  const consecutiveSpaces = /  +/g;
  if (consecutiveSpaces.test(description)) {
    errors.push('Description cannot contain multiple consecutive spaces');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateTaskLimit = (taskCount, totalTasks) => {
  const errors = [];

  if (totalTasks >= VALIDATION_RULES.MAX_TASKS) {
    errors.push(`You have reached the maximum of ${VALIDATION_RULES.MAX_TASKS} tasks. Please delete completed tasks by clicking "Done" to add more.`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateTask = (task) => {
  const titleValidation = validateTitle(task.title);
  const descriptionValidation = validateDescription(task.description);

  return {
    isValid: titleValidation.isValid && descriptionValidation.isValid,
    errors: {
      title: titleValidation.errors,
      description: descriptionValidation.errors,
    },
  };
};
