function UserException(message) {
  this.message = message;
  this.name = "UserException";
}

export function getTime(dateStr) {
  const date = new Date(dateStr);
  return `${date.getHours()}:${date.getMinutes()}`;
}

export function getDate(dateStr) {
  const date = new Date(dateStr);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${month[date.getMonth() - 1]} ${date.getDate()}`;
}

export function isToday(dateStr) {
  const today = new Date();
  const date = new Date(dateStr);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function times(item, multiple) {
  const result = [];
  for (let i = 0; i < multiple; i++) {
    result.push(item);
  }
  return result;
}
export function getUserIdFromSession() {
  try {
    let user = sessionStorage.getItem("selectedUser");
    if (user) {
      user = JSON.parse(user);
      return user.id;
    } else {
      throw new UserException("USER_NOT_FOUND");
    }
  } catch (e) {
    throw new UserException("USER_NOT_FOUND");
  }
}
