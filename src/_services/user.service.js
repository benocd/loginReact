import { authHeader } from "../_helpers";

export const userService = {
  login,
  logout,
  getAll
};

function login(username, password) {
  var params = {
    client_id: "UserClient",
    client_secret: "usersecret",
    grant_type: "password",
    username: username,
    password: password
  };

  var formData = new FormData();

  for (var k in params) {
    formData.append(k, params[k]);
  }

  return axios
    .post(
      "https://identityindustries.azurewebsites.net/Connect/Token",
      formData
    )

    .then(function(response) {
      console.log(response.data);
      if (response.data) {
        const AuthStr = "Bearer ".concat(response.data.access_token);
        sessionStorage.setItem("token", JSON.stringify(response.data));
        return axios
          .get(
            "https://identityindustries.azurewebsites.net/Connect/UserInfo",
            { headers: { Authorization: AuthStr } }
          )
          .then(function(responseInfo) {
            sessionStorage.setItem(
              "user",
              JSON.stringify(responseInfo.data.sub)
            );
            return responseInfo.data.sub;
          })
          .then(function(identityId) {
            return axios
              .get(
                "https://companyindustries.azurewebsites.net/api/Employees/ByIdentityId?identityId=" +
                  identityId,
                { headers: { Authorization: AuthStr } }
              )
              .then(function(responseInfo) {
                sessionStorage.setItem(
                  "employee",
                  JSON.stringify(responseInfo.data)
                );
                return {
                  ...responseInfo.data,
                  IdentityId: identityId
                };
              });
          });
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

function logout() {
  // remove user from local storage to log user out
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("token");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch("/users", requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
