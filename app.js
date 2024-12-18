const urlInput = document.getElementById("urlInput");
const imageHolder = document.getElementById("qrImg");
const createQRBtn = document.getElementById("genBtn");
const downloadBtn = document.getElementById("downloadBtn");
downloadBtn.setAttribute("disabled", "disabled");
downloadBtn.style.opacity = 0.3;
downloadBtn.style.pointerEvents = "none";

function GenerateQR() {
  if(urlInput.value==""){
    const ele = document.createElement('p')
    ele.innerText="Please Enter somthing! ";
    ele.classList.add('validation')
    urlInput.insertAdjacentElement("afterend",ele);
    return;
  }
  imageHolder.alt = urlInput.value;
  let url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${urlInput.value}`;
  
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      imageHolder.src = url;
      imageHolder.style.opacity = "1";
      downloadBtn.disabled = false;
      downloadBtn.style.pointerEvents = "all";
      downloadBtn.style.opacity = "1";
      downloadBtn.addEventListener("click", () => {
        const link = document.createElement("a");
        link.href = url;
        link.download = `qrImage.png`;
        link.click();
        URL.revokeObjectURL(url);
      });
    })
    .catch((err) => {
      document.body.innerHTML="<h1 style='color:white; padding:2rem;'>Somthing Went Wrong:(</h1>";
    });
}

createQRBtn.addEventListener("click", GenerateQR);