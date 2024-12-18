const urlInput = document.getElementById("urlInput");
const imageHolder = document.getElementById("qrImg");
const createQRBtn = document.getElementById("genBtn");
const downloadBtn = document.getElementById("downloadBtn");
downloadBtn.setAttribute("disabled", "disabled");
downloadBtn.style.opacity = 0.3;
downloadBtn.style.pointerEvents = "none";

function GenerateQR() {
  imageHolder.alt = urlInput.value;
  let url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${urlInput.value}`;
  console.log("url", url);
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      console.log(blob);
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
        console.log(link);
        link.click();
        URL.revokeObjectURL(url);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

createQRBtn.addEventListener("click", GenerateQR);