const isGmail = (email) => {
  if (/@gmail\.com$/.test(email)) {
    return true; // Reject email addresses with "@gmail.com" domain
  }
  return false; // Accept other email addresses
};

export default isGmail;
