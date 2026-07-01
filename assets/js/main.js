document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav-links");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
  }

  const nextNet = new Date();
  const day = nextNet.getDay();
  const daysUntilThu = (4 - day + 7) % 7 || 7;
  nextNet.setDate(nextNet.getDate() + daysUntilThu);
  nextNet.setHours(20, 0, 0, 0);

  function updateClock(){

    const now = new Date();

    // Local Time
    document.getElementById("localTime").innerHTML =
        now.toLocaleTimeString([],{
            hour:'2-digit',
            minute:'2-digit',
            second:'2-digit'
        });

    // UTC Time
    document.getElementById("utcTime").innerHTML =
        now.toUTCString().split(" ")[4] + " UTC";

}

updateClock();

setInterval(updateClock,1000);

  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.querySelector(".lightbox img");
  document.querySelectorAll(".gallery img").forEach(img => {
    img.addEventListener("click", () => {
      if(lightbox && lightboxImg){
        lightboxImg.src = img.src;
        lightbox.style.display = "flex";
      }
    });
  });
  if(lightbox) lightbox.addEventListener("click", () => lightbox.style.display = "none");
});
