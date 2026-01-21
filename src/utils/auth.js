const FAKE_TOKEN = "fake-token-123";

export function register(name, email, password) {
  return new Promise((resolve) => {
    resolve({
      data: {
        _id: "fake-user-id",
        name: name || "Fake User",
        email,
      },
    });
  });
}

export function authorize(email, password) {
  return new Promise((resolve, reject) => {
    resolve({ token: FAKE_TOKEN });
  });
}

export function checkToken(token) {
  return new Promise((resolve, reject) => {
    if (token !== FAKE_TOKEN) {
      reject("Invalid token");
      return;
    }

    resolve({
      data: {
        _id: "fake-user-id",
        name: "Fake User",
        email: "fake@example.com",
      },
    });
  });
}

export function logout() {
  return Promise.resolve();
}
