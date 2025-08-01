
let selectedEvent = null;

document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    events: {
      url: "https://calendar.google.com/calendar/ical/你的日曆ID/public/basic.ics",
      format: "ics",
    },
    eventClick: function (info) {
      selectedEvent = info.event;
      document.getElementById("modal-title").innerText = `${info.event.title}\n${info.event.start.toLocaleDateString()}`;
      document.querySelector(".modal").style.display = "block";
    },
  });

  calendar.render();
});

function closeModal() {
  document.querySelector(".modal").style.display = "none";
  document.getElementById("name").value = "";
}

function submitRegistration() {
  const name = document.getElementById("name").value;
  if (!name || !selectedEvent) return;

  fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      eventDate: selectedEvent.start.toISOString().split("T")[0],
      name,
    }),
  })
    .then(() => {
      alert("報名成功！");
      closeModal();
    })
    .catch((err) => alert("報名失敗：" + err.message));
}
