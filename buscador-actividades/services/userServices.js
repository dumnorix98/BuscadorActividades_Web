import config from "config";

export const userServices = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
};

function login(username, password) {}

function logout() {
  localStorage.removeItem("user");
}

function getById(id) {}

function register(user) {}

function update(user) {}

function _delete(id) {}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if (response.status === 401) {
        logout();
        location.reload();
      }

      const error = data & data.message || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
