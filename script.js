document.addEventListener("DOMContentLoaded", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.6s ease-out";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 50);


  function resetPageState() {
    window.scrollTo(0, 0);

   
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    if (lightbox) {
      lightbox.style.display = "none";
      lightbox.setAttribute("aria-hidden", "true");
    }
    if (lightboxImg) lightboxImg.src = "";

    
    const activities = document.querySelectorAll(".activity");
    activities.forEach((activity) => {
      activity.style.opacity = "0";
      activity.style.transform = "translateY(20px)";
      activity.classList.remove("visible", "touch-overlay");
    });

    
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => form.reset());
  }

  resetPageState();
  window.addEventListener("beforeunload", resetPageState);

  const activities = document.querySelectorAll(".activity");

  function showActivities() {
    activities.forEach((activity, index) => {
      const activityTop = activity.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (activityTop < windowHeight - 50 && !activity.classList.contains("visible")) {
        setTimeout(() => {
          activity.style.opacity = "1";
          activity.style.transform = "translateY(0)";
          activity.classList.add("visible");
        }, index * 100); 
      }
    });
  }

  window.addEventListener("scroll", showActivities);
  setTimeout(showActivities, 200); 


  const closeBtn = document.querySelector(".close-btn");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  window.openLightbox = function (imageEl) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = imageEl.src;
    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", "false");
    if (closeBtn) closeBtn.focus();
  };

  window.closeLightbox = function () {
    if (!lightbox) return;
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
    if (lightboxImg) lightboxImg.src = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });


  (function setupHoverAndTouchOverlays() {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    activities.forEach((card) => {
      if (!isTouch) {
        card.classList.add("hover-enabled");
      } else {
        card.classList.add("touch-enabled");

        card.addEventListener(
          "click",
          function (e) {
            if (card.classList.contains("touch-overlay")) return;

            const isControlClick = e.target.closest(".carousel-btn") || e.target.closest(".dot");
            if (isControlClick) return;

            e.preventDefault();
            e.stopPropagation();
            card.classList.add("touch-overlay");
          },
          { passive: false }
        );
      }
    });

    if (isTouch) {
      document.addEventListener("click", function (e) {
        const clickedCard = e.target.closest(".activity");
        document.querySelectorAll(".activity.touch-overlay").forEach((activeCard) => {
          if (activeCard !== clickedCard) activeCard.classList.remove("touch-overlay");
        });
      });
    }
  })();

  
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Thank you for reaching out! I'll get back to you soon.");
      contactForm.reset();
    });
  }
});
gdx