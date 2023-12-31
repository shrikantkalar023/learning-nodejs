const generateErrorMessages = (fieldName, minLength, maxLength) => ({
  "string.min": `"${fieldName}" should have a minimum length or value of ${minLength}`,
  "string.max": `"${fieldName}" should have a minimum length or value of ${maxLength}`,
  "string.empty": `"${fieldName}" is a required field`,
});

exports.generateErrorMessages = generateErrorMessages;
