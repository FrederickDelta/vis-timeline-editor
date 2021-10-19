import { jsonServerUrl } from "./config.js"

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const spanEventId = document.querySelector("#eventId");
const h1 = document.querySelector("h1");
const form = document.querySelector("form")

const getEventData = async () => {
  setSpanEventId(id);

  setCKEditor();

  if (id === null) return;

  let url = `${jsonServerUrl}/events/${id}`;
  const resEvent = await fetch(url);
  const jsonEvent = await resEvent.json();

  form["text-headline"].value = jsonEvent.text.headline || "";
  form["text-text"].value = jsonEvent.text.text || "";
  form["group"].value = jsonEvent.group || "";
  form["displaydate"].value = jsonEvent.display_date || "";

  form["startdate-year"].value = jsonEvent.start_date.year || "";
  form["startdate-month"].value = jsonEvent.start_date.month || "";
  form["startdate-day"].value = jsonEvent.start_date.day || "";
  form["startdate-displaydate"].value = jsonEvent.start_date.display_date || "";

  if (jsonEvent.end_date) {
    form["enddate-year"].value = jsonEvent.end_date.year || "";
    form["enddate-month"].value = jsonEvent.end_date.month || "";
    form["enddate-day"].value = jsonEvent.end_date.day || "";
    form["enddate-displaydate"].value = jsonEvent.end_date.display_date || "";
  }

  if (jsonEvent.media) {
    form["media-url"].value = jsonEvent.media.url || "";
    form["media-caption"].value = jsonEvent.media.caption || "";
    form["media-credit"].value = jsonEvent.media.credit || "";
  }

  console.log(jsonEvent);
}

const setSpanEventId = (id) => {
  if (id === null) {
    spanEventId.innerText = `NEW`;
    h1.classList.add("bg-success");
  } else {
    spanEventId.innerText = `id: ${id}`;
    h1.classList.add("bg-danger");
  }
}

const setCKEditor = () => {
  // CKEDITOR.replace("text-headline", {customConfig: "ckeditor_config.js"});
  CKEDITOR.replace("text-headline", {height: "6em", resize_enabled: true});
  CKEDITOR.replace("text-text", {height: "8em"});
}

const saveEvent = async (e) => {
  e.preventDefault();

  let url = `${jsonServerUrl}/events`
  let method = "POST"
  let event = {}

  if (id) {
    url = `${jsonServerUrl}/events/${id}`;
    method = "PUT";
    event.unique_id = id;
  }
  
  event.text = {};
  event.text.headline = form["text-headline"].value;
  event.text.text = form["text-text"].value || undefined;

  event.group = form["group"].value || undefined;
  event.display_date = form["displaydate"].value || undefined;

  event.start_date = {};
  event.start_date.year = form["startdate-year"].value;
  event.start_date.month = form["startdate-month"].value || undefined;
  event.start_date.day = form["startdate-day"].value || undefined;
  event.start_date.display_date = form["startdate-displaydate"].value || undefined;

  if (form["enddate-year"].value) {
    event.end_date = {};
    event.end_date.year = form["enddate-year"].value;
    event.end_date.month = form["enddate-month"].value || undefined;
    event.end_date.day = form["enddate-day"].value || undefined;
    event.end_date.display_date = form["enddate-displaydate"].value || undefined;
  }

  if (form["media-url"].value) {
    event.media = {};
    event.media.url = form["media-url"].value;
    event.media.caption = form["media-caption"].value || undefined;
    event.media.credit = form["media-credit"].value || undefined;
  }
  
  console.log(event);

  await fetch(url, {
    method: method,
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(event)
  });

  window.location.replace("./index.html");
}

window.addEventListener("DOMContentLoaded", getEventData);
form.addEventListener("submit", saveEvent);