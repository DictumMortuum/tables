export const useEmail = () => {
  const raw = localStorage.getItem('auth');
  const auth = JSON.parse(raw);

  if (auth === null) {
    return {
      email: null,
      user_id: null,
    }
  }

  const { status } = auth;

  if (status !== "OK") {
    return {
      email: null,
      user_id: null,
    }
  }

  const { user: { id, email }} = auth;

  return {
    email,
    user_id: id,
  }
}
