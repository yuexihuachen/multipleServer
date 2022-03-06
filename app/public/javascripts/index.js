const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);

const fd = new FormData();

function uploadFile(){
  if (fd.has("time")) {
    fetch('/media/setFile', {
      method: 'POST',
      body: fd
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response)
      });
  }
}


function handleFiles() {
  fd.append("sampleFile", this.files[0]);
  fd.append("time", Date.now());
}




document.getElementById("submit").onclick = function () {
  const html = document.getElementById("htmlText").value
  const js = document.getElementById("jsText").value
  const page = document.getElementById("state").value

  const url = '/media/write';
  const data = { 
    html: encodeURIComponent(html),
    js: encodeURIComponent(js),
    page
  };

  fetch(url, {
    method: 'POST', 
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())
    .catch(error => {
      console.log('Error:', error)
      alert('Error:')
    })
    .then(response => {
      console.log('Success:', response)
      alert('Success:')
    });

    uploadFile()

}

