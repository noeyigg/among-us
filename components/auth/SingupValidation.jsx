export function validateId(id) {
  const regex = /^[a-z0-9]{3,16}$/;
  return regex.test(id);
}

export function validatePassword(password) {
  const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?!.*\s).{8,16}$/;
  return regex.test(password);
}

