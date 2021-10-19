import { jsonServerUrl } from "./config.js"

const getTimelineData = async () => {
  let urlEras = `${jsonServerUrl}/eras`;
  let urlEvents = `${jsonServerUrl}/events`;
  
  const resEras = await fetch(urlEras);
  const jsonEras = await resEras.json();

  const resEvents = await fetch(urlEvents);
  const jsonEvents = await resEvents.json();
  
  var tableEras = new Tabulator("#tabulator-eras", {
    data: jsonEras,
    // autoColumns: true,
    columns: [
      {field: "unique_id"},
      {title:"始", field: "start_date.display_date"},
      {title:"年", field: "start_date.year"},
      {title:"月", field: "start_date.month"},
      {title:"日", field: "start_date.day"},
      {title:"止", field: "end_date.display_date"},  
      {title:"年", field: "end_date.year"},
      {title:"月", field: "end_date.month"},
      {title:"日", field: "end_date.day"},
      {field: "text.headline"},
    ]
  });

  var tableEvents = new Tabulator("#tabulator-events", {
    data: jsonEvents,
    layout:"fitDataFill",
    responsiveLayout:"collapse",
    responsiveLayoutCollapseStartOpen:false,
    columns: [
      {responsive:0, formatter:"responsiveCollapse", headerSort:false},
      // {field: "unique_id"},
      // {responsive:0, width:"16rem", title:"时", field: "display_date"},
      // {responsive:0, width:"8rem", title:"始", field: "start_date.display_date"},
      {responsive:0, width:"4rem", sorter:"number", title:"年", field: "start_date.year"},
      {responsive:0, width:"2rem", sorter:"number", title:"月", field: "start_date.month"},
      {responsive:0, width:"2rem", sorter:"number", title:"日", field: "start_date.day"},
      // {responsive:0, width:"8rem", title:"止", field: "end_date.display_date"},
      {responsive:0, width:"4rem", sorter:"number", title:"年", field: "end_date.year"},
      {responsive:0, width:"2rem", sorter:"number", title:"月", field: "end_date.month"},
      {responsive:0, width:"2rem", sorter:"number", title:"日", field: "end_date.day"},
      {responsive:0, field:"text.headline", formatter:"link", formatterParams:{url: getHeadlineLink}},
      {responsive:0, field:"text.text", formatter:"tickCross", formatterParams: {allowEmpty:true, allowTruthy:true, tickElement:"📝"}},
      {responsive:1, width:"80%", title:"Text", field: "text.text", formatter:"textarea"},
      {responsive:0, field:"media.url", formatter:"tickCross", formatterParams: {allowEmpty:true, allowTruthy:true, tickElement:"🖼"}},
      {responsive:1, title:"Media url", field: "media.url"},
      {responsive:1, title:"Media caption", field: "media.caption"},
      {responsive:1, title:"Media credit", field: "media.credit"},
      // {field: "media.thumbnail"},
      // {field: "media.alt"},
      // {field: "media.title"},
      // {field: "media.link"},
      // {field: "media.link_target"},
     {responsive:0,field: "group"}
      // {field: "background.url"},
      // {field: "background.color"},
      // {field: "autolink"},
      
    ]
  });
  
}

const getHeadlineLink = (cell) => {
  let unique_id = cell._cell.row.data.unique_id;
  let url = `event.html?id=${unique_id}`;

  return url;
}

window.addEventListener("DOMContentLoaded", getTimelineData);