(function () {
  let muted = true;

  const getSlide = (index) => {
    const container = document.createElement("div");
    container.className = "swiper-slide";
    const videoElement = document.createElement("video");
    videoElement.src = `https://beststatusvideo.com/files/download/id/${200 + index}#t=1`;
    videoElement.controls = false;
    videoElement.id = index;
    videoElement.autoplay = false;
    videoElement.preload = true;
    videoElement.muted = true;
    videoElement.width = window.innerWidth;
    videoElement.height = window.innerHeight;
    container.appendChild(videoElement);
    return container;
  };

  const mySwiper = new Swiper(".swiper-container", {
    // Optional parameters
    direction: "vertical",
    loop: false,
    slidesPerView: 1,
    virtual: {
      slides: (function () {
        const slides = [];
        for (var i = 0; i < 600; i += 1) {
          slides.push(i);
        }
        return slides;
      })(),
      cache: false,
      renderSlide: function (slide, index) {
        return getSlide(index + 1);
      },
    },
  });

  const mute = document.getElementById("mute");
  const muteButton = document.getElementById("muted");
  const unmuteButton = document.getElementById("unmuted");
  muteButton.style.display = "none";
  mute.addEventListener("click", () => {
    muted = !muted;
    if (muted) {
      muteButton.style.display = "none";
      unmuteButton.style.display = "block";
    } else {
      unmuteButton.style.display = "none";
      muteButton.style.display = "block";
    }
    const currentVideo = document.getElementById(mySwiper.activeIndex + 1);
    currentVideo.muted = muted;
  });

  mySwiper.on("transitionEnd", () => {
    const currentVideo = document.getElementById(mySwiper.activeIndex + 1);
    currentVideo.muted = muted;
    var playPromise = currentVideo.play();
    if (playPromise !== undefined) {
      playPromise.then((_) => {
        const previousVideo = document.getElementById(mySwiper.activeIndex);
        const nextVideo = document.getElementById(mySwiper.activeIndex + 2);
        if (previousVideo) {
          previousVideo.currentTime = 0;
          previousVideo.pause();
          previousVideo.muted = true;
        }
        if (nextVideo) {
          nextVideo.currentTime = 0;
          nextVideo.muted = true;
        }
      });
    }
  });
})();
