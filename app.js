(function () {
  const videos = [
    "https://res.cloudinary.com/dqjjjl8cy/video/upload/v1582344026/samples/98f1453c1bd7ac8ffd978733cc0a3bf7_1_vn19mu.mp4",
    "https://res.cloudinary.com/dqjjjl8cy/video/upload/v1586788401/WhatsApp_Video_2020-04-13_at_8.01.44_PM_bvqaca.mp4",
    "https://res.cloudinary.com/dqjjjl8cy/video/upload/v1582344145/0150a1be0221e33dd3f0f35d7684290a_e45e2t.mp4",
    "https://res.cloudinary.com/dqjjjl8cy/video/upload/v1582344152/b83e83a3e38f06a506da5695cd3912c5_kyutgl.mp4",
    "https://res.cloudinary.com/dqjjjl8cy/video/upload/v1582344108/6a87667193d6f13559437cdccafc12d4_ynuxrw.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4",
  ];

  let muted = true;

  const getSlide = (index) => {
    const container = document.createElement("div");
    container.className = "swiper-slide";
    const videoElement = document.createElement("video");
    videoElement.src = videos[index % videos.length];
    videoElement.controls = false;
    videoElement.id = index;
    videoElement.autoplay = false;
    videoElement.preload = false;
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

  const mute = document.getElementById('mute');
  const muteButton = document.getElementById('muted');
  const unmuteButton = document.getElementById('unmuted');
  muteButton.style.display = 'none';
  mute.addEventListener('click', () => {
        muted = !muted;
        if(muted) {
            muteButton.style.display = 'none';
            unmuteButton.style.display = 'block';
        } else {
            unmuteButton.style.display = 'none';
            muteButton.style.display = 'block';
        }
        const currentVideo = document.getElementById(mySwiper.activeIndex + 1);
        currentVideo.muted = muted;
  })  


  mySwiper.on('transitionEnd', () => {
  

    const currentVideo = document.getElementById(mySwiper.activeIndex + 1);
    currentVideo.muted = muted;
    var playPromise = currentVideo.play();
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            const previousVideo = document.getElementById(mySwiper.activeIndex);
            if(previousVideo) {
                previousVideo.pause();
                previousVideo.currentTime = 0;
                previousVideo.muted = true;
            }
                
            const nextVideo = document.getElementById(mySwiper.activeIndex + 2);
            if(nextVideo) {
                nextVideo.pause();
                nextVideo.currentTime = 0;
                nextVideo.muted = true;
            }
        })
      }
  })
})();
