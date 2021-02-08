var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://API_ID.execute-api.API_REGION.amazonaws.com/STAGE/');
xhr.onreadystatechange = function(event) {
  console.log(event.target);
}
xhr.send();