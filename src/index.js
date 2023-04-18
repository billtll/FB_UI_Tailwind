import "./index.css";

//  ------------- Panel相關 -------------
const plusBtn = document.getElementById("plus-btn");
const msgBtn = document.getElementById("msg-btn");
const notificationBtn = document.getElementById("notification-btn");
const moreBtn = document.getElementById("more-btn");
const plusPanel = document.getElementById("plus-panel");
const msgPanel = document.getElementById("msg-panel");
const notificationPanel = document.getElementById("notification-panel");
const morePanel = document.getElementById("more-panel");

const panels = [plusPanel, msgPanel, notificationPanel, morePanel];

const openPanel = (index) => {
  panels.forEach((panel, i) => {
    if (index === i) {
      panel.classList.toggle("hidden");
      return;
    }

    if (panel.classList.contains("hidden")) {
      return;
    }

    panel.classList.add("hidden");
  });
};

window.addEventListener("click", () => {
  openPanel(-1);
});

plusBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  openPanel(0);
});

msgBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  openPanel(1);
});

notificationBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  openPanel(2);
});

moreBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  openPanel(3);
});

const panel = document.querySelector("#panel");
panel.addEventListener("click", (e) => {
  e.stopPropagation();
});

//  ------------- 左側相關 -------------
const leftBlock = document.getElementById("left-block");

let htmlLeftStr = "";

const leftArr = [
  {
    name: "比爾",
    img: "https://bruce-fe-fb.web.app/image/avator.png",
  },
  {
    name: "活動",
    img: "https://bruce-fe-fb.web.app/image/left/activity.svg",
  },
  {
    name: "天氣",
    img: "https://bruce-fe-fb.web.app/image/left/cloudy.png",
  },
  {
    name: "災害應變中心",
    img: "https://bruce-fe-fb.web.app/image/left/dynamic.svg",
  },
  {
    name: "新冠病毒資訊中心",
    img: "https://bruce-fe-fb.web.app/image/left/facemask.svg",
  },
  {
    name: "社團",
    img: "https://bruce-fe-fb.web.app/image/left/friend.svg",
  },
  {
    name: "企業管理平台",
    img: "https://bruce-fe-fb.web.app/image/left/job.png",
  },
  {
    name: "Messenger",
    img: "https://bruce-fe-fb.web.app/image/left/messenger.svg",
  },
  {
    name: "近期廣告動態",
    img: "https://bruce-fe-fb.web.app/image/left/pay.png",
  },
  {
    name: "朋友名單",
    img: "https://bruce-fe-fb.web.app/image/left/sale.png",
  },
  {
    name: "最愛",
    img: "https://bruce-fe-fb.web.app/image/left/star.svg",
  },
  {
    name: "Marketplace",
    img: "https://bruce-fe-fb.web.app/image/left/store.svg",
  },
  {
    name: "Watch",
    img: "https://bruce-fe-fb.web.app/image/left/watchingTv.svg",
  },
];

leftArr.forEach(
  (obj) =>
    (htmlLeftStr += `
    <div
    class="flex items-center justify-items-center w-full p-2 mb-1 rounded hover:bg-fb-input cursor-pointer"
  >
    <div class="w-[32px] overflow-hidden rounded-full mr-4">
      <img src="${obj.img}" alt="" />
    </div>
    <p class="text-white text-[.9rem]">${obj.name}</p>
  </div>
`)
);

leftBlock.innerHTML = htmlLeftStr;

//  ------------- 透過 unsplash API 取得 person 圖片資訊並進行渲染 -------------
const peopleList = [];
const travelList = [];

const API_URL = "https://api.unsplash.com/search/photos";
const ACCESS_KEY = "dHnu4iB3_-_T52tmRjhDOrGns_g6qDE5uoZeEM0H5Qw";

const getPeople = async () => {
  try {
    const peopleResult = await axios.get(
      `${API_URL}?client_id=${ACCESS_KEY}&query=person&per_page=20`
    );

    const travelResult = await axios.get(
      `${API_URL}?client_id=${ACCESS_KEY}&query=travel&per_page=20`
    );

    peopleList.push(...peopleResult.data.results);
    travelList.push(...travelResult.data.results);

    // 渲染右側聯絡人
    renderContact(peopleList);

    // 渲染限時動態
    renderStory(peopleList, travelList);

    // 渲染包廂輪播
    swiperWrapperLivList(peopleList);
  } catch (error) {
    console.log(error);
  }
};
getPeople();

//  ------------- 右側聯絡人 -------------
const renderContact = (contactList) => {
  const rightBlock = document.getElementById("right-block");

  let htmlRightStr = `<p class="text-gray-400 text-lg mb-2">聯絡人</p>`;

  contactList.forEach((item) => {
    htmlRightStr += `
    <div
    class="flex items-center w-full py-2 px-1 rounded cursor-pointer hover:bg-fb-input"
    >
      <div class="relative w-[32px] cursor-pointer mr-3">
        <div class="overflow-hidden rounded-full">
          <img src="${item.user.profile_image.large}" />
        </div>
        <div
          class="absolute bottom-0 right-0 w-[8px] h-[8px] rounded-full bg-green-500 ring ring-gray-900"
        ></div>
      </div>
      <p class="text-white text-[.9rem]">${item.user.name}</p>
    </div>
    `;
  });

  rightBlock.innerHTML = htmlRightStr;
};

//  ------------- 限時動態 -------------

const renderStory = (story, dynamic) => {
  const storyList = document.getElementById("story-list");

  for (let i = 0; i < 8; i++) {
    const divBox = document.createElement("div");
    divBox.classList.add(
      "flex-1",
      "px-[4px]",
      "min-w-[120px]",
      "cursor-pointer"
    );
    divBox.innerHTML = `
    <div class="relative overflow-hidden" id="story-${i}">
      <div id="story-mask-${i}" class="hidden absolute w-full h-full top-0 left-0 bg-black/20 z-20"></div>
      <div
        class="w-[32px] h-[32px] absolute top-4 left-4 ring-4 ring-fb bg-fb-card rounded-full flex justify-center items-center z-30"
      >
        <div class="overflow-hidden rounded-full">
          <img src="${story[i].user.profile_image.large}" />
        </div>
      </div>
      <div
        class="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-black/30 to-transparent z-20"
      ></div>
      <img
        id="story-image-${i}"
        class="w-full min-h-[168px] object-cover duration-200"
        src="${dynamic[i].urls.regular}"
      />
      <p class="absolute bottom-2 left-2 text-white text-sm">${story[i].user.name}</p>
    </div>
  `;

    divBox.addEventListener("mouseover", () => {
      const mask = document.getElementById(`story-mask-${i}`);
      const image = document.getElementById(`story-image-${i}`);
      image.classList.add("scale-105");
      mask.classList.remove("hidden");
    });

    divBox.addEventListener("mouseout", () => {
      const mask = document.getElementById(`story-mask-${i}`);
      const image = document.getElementById(`story-image-${i}`);
      image.classList.remove("scale-105");
      mask.classList.add("hidden");
    });

    storyList.appendChild(divBox);
  }
};

//  ------------- 包廂輪播 -------------
const swiperWrapperLivList = (liveList) => {
  const swiperWrapperLive = document.getElementById("swiper-wrapper-live");

  liveList.forEach((item) => {
    const divBox = document.createElement("div");
    divBox.classList.add("swiper-slide");

    divBox.innerHTML += `
    <div class="w-[55px]">
      <div class="relative w-[40px] cursor-pointer">
        <div class="overflow-hidden rounded-full">
          <img
            src="${item.user.profile_image.large}"
            alt=""
          />
        </div>
        <div
          class="
            w-[10px]
            h-[10px]
            rounded-full
            bg-green-500
            absolute
            bottom-0
            right-0
            ring-gray-900 ring
          "
        ></div>
      </div>
    </div>
    `;

    swiperWrapperLive.appendChild(divBox);
  });
};

new Swiper(".fb-live", {
  loop: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: "auto",
});
