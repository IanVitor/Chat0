var imgModal = document.getElementById("imgModal");
var imgBtn = document.querySelector("#img_btn");
var imgSpan = document.getElementsByClassName("close")[1];

imgBtn.onclick = function () {
  imgModal.style.display = "block";
  console.log('teste')
};

imgSpan.onclick = function () {
  imgModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == imgModal) {
    imgModal.style.display = "none";
  }
};
