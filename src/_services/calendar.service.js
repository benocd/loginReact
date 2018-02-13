export const calendarService = { calEvents };

function calEvents(initDate, endDate) {
  let token = JSON.parse(sessionStorage.getItem("token"));
  const AuthStr = "Bearer ".concat(token.access_token);
  console.log(token.access_token);

  return axios
    .get(
      "http://meetingsapi.azurewebsites.net/api/MeetingRoles/MyMeetingsCalendar" +
        "?initDate=" +
        initDate +
        "&endDate=" +
        endDate,
      {
        headers: { Authorization: AuthStr, "Content-Type": "application/json" }
      }
    )
    .then(function(response) {
      return response.data;
    });
}
