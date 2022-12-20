let contexts;
let isImageReady = false;
let previousDelta = 0;
const frameRate = 30;

let currentHoverX = 0;
let currentHoverY = 0;

const BerlinGermany = new Image();
BerlinGermany.src = "Berlin_Germany.png";
BerlinGermany.onload = () => (isImageReady = true);

const ImageCarousel = [BerlinGermany];
const PlaceNames = ["Berlin, Germany"];

const loadNewImage = (placeName) => {
  const NewImage = new Image();
  NewImage.src = placeName.replaceAll(",", "").replaceAll(" ", "_") + ".png";
  ImageCarousel.push(NewImage);
  PlaceNames.push(placeName);
};

loadNewImage("Dublin, Ireland");
loadNewImage("Prague, Czechia");
loadNewImage("Rotterdam, The Netherlands");
loadNewImage("Belfast, UK");
loadNewImage("Stockholm, Sweden");

const birthday = moment.utc("1997-08-19 02:00");

let cursorFadeInCounter = 0;
let cursorFadeInId = -1;

const drawMenuPosition = (ctx, menuText, menuPosition) => {
  ctx.save();
  const grd = ctx.createLinearGradient(0, 135 + menuPosition * 25, 300, 24);
  grd.addColorStop(0, "rgba(0,0,0,0.70)");
  grd.addColorStop(1, "rgba(0,0,0,0.20)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 135 + menuPosition * 25 - 18, 300, 24);
  ctx.restore();

  if (
    currentHoverX < 300 &&
    currentHoverY > 135 + (menuPosition - 1) * 25 &&
    currentHoverY < 135 + menuPosition * 25
  ) {
    if (cursorFadeInId !== menuPosition) {
      cursorFadeInCounter = 0;
      cursorFadeInId = menuPosition;
    }
    ctx.save();
    ctx.globalAlpha = (cursorFadeInCounter / frameRate) * 4;
    if (cursorFadeInCounter <= frameRate / 4) cursorFadeInCounter++;

    ctx.strokeText("►", 46 + cursorFadeInCounter, 137 + menuPosition * 25);
    ctx.fillText("►", 46 + cursorFadeInCounter, 137 + menuPosition * 25);
    ctx.restore();
  }
  ctx.strokeText(menuText, 80, 135 + menuPosition * 25);
  ctx.fillText(menuText, 80, 135 + menuPosition * 25);
};

const MenuPositions = [
  {
    name: "Tumblr",
    url: "https://golybidoof.tumblr.com/",
  },
  {
    name: "Twitter (GolyBidoof)",
    url: "https://twitter.com/GolyBidoof",
  },
  {
    name: "Twitter (amelachs0)",
    url: "https://twitter.com/amelachs0",
  },
  {
    name: "Letterboxd",
    url: "https://letterboxd.com/Szymbar/",
  },
  {
    name: "GitHub",
    url: "https://github.com/GolyBidoof",
  },
  {
    name: "Medium",
    url: "https://medium.com/@amelachs0",
  },
  {
    name: "Steam",
    url: "https://steamcommunity.com/id/golybidoof/",
  }
];

const handleClick = () => {
  if (
    currentHoverX < 300 &&
    currentHoverY > 110 &&
    currentHoverY < 110 + 25 * MenuPositions.length
  ) {
    for (i = 0; i < MenuPositions.length; i++) {
      if (currentHoverY > 110 + i * 25 && currentHoverY < 110 + (i + 1) * 25)
        window.open(MenuPositions[i].url, "_blank").focus();
    }
  }
};
const handleMenuClick = () => {};

let backgroundImageFirstRun = true;
let backgroundImageCounter = 0;
let backgroundImageId = 0;

const fadeImages = (ctx) => {
  ctx.save();
  if (backgroundImageCounter < frameRate * 2) {
    if (backgroundImageId !== 0 || !backgroundImageFirstRun) {
      ctx.globalAlpha =
        (frameRate * 2 - backgroundImageCounter) / (frameRate * 2);
      ctx.drawImage(
        ImageCarousel[
          (backgroundImageId - 1 + ImageCarousel.length) % ImageCarousel.length
        ],
        0,
        0,
        1280,
        720
      );
    }
  }
  ctx.globalAlpha =
    backgroundImageFirstRun && backgroundImageId === 0
      ? 1
      : Math.min(backgroundImageCounter / (frameRate * 2), 1);
  ctx.drawImage(ImageCarousel[backgroundImageId], 0, 0, 1280, 720);
  ctx.restore();
};

const drawCanvas = (currentDelta) => {
  requestAnimationFrame(drawCanvas);
  const delta = currentDelta - previousDelta;

  if (frameRate && delta < 1000 / frameRate) {
    return;
  }

  contexts.forEach((ctx) => {
    ctx.clearRect(0, 0, 1280, 720);

    if (isImageReady) {
      backgroundImageCounter++;
      if (backgroundImageCounter > frameRate * 20) {
        backgroundImageCounter = 0;
        backgroundImageId = (backgroundImageId + 1) % ImageCarousel.length;
        if (backgroundImageId === 0) backgroundImageFirstRun = false;
      }
      fadeImages(ctx);
    }
    ctx.save();

    const topgrd = ctx.createLinearGradient(0, 0, 0, 72);
    topgrd.addColorStop(0, "rgba(0,0,0,0.20)");
    topgrd.addColorStop(1, "rgba(0,0,0,0.65)");
    ctx.fillStyle = topgrd;

    ctx.fillRect(0, 0, 1280, 72);

    const botgrd = ctx.createLinearGradient(0, 720 - 72, 0, 720);
    botgrd.addColorStop(0, "rgba(0,0,0,0.65)");
    botgrd.addColorStop(1, "rgba(0,0,0,0.20)");
    ctx.fillStyle = botgrd;

    ctx.fillRect(0, 720 - 72, 1280, 72);

    ctx.fillStyle = "rgba(0, 0, 0, 0.10)";
    ctx.fillRect(0, 0, 1280, 720);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(0, 70);
    ctx.lineTo(1280, 70);
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.moveTo(0, 720 - 70);
    ctx.lineTo(1280 * (backgroundImageCounter / (frameRate * 20)), 720 - 70);
    ctx.stroke();

    ctx.restore();

    ctx.lineWidth = 10;

    ctx.font = "25px Jura";

    ctx.font = "20px Jura";

    // Menu
    ctx.save();

    // Main menu text + bar
    ctx.textAlign = "right";
    ctx.lineWidth = 3;
    ctx.strokeText("Main Menu", 300 - 10, 100);
    ctx.fillText("Main Menu", 300 - 10, 100);
    ctx.lineWidth = 1;

    // Menu bar
    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(0, 105);
    ctx.lineTo(300, 105);
    ctx.stroke();

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.textAlign = "left";

    if (
      !(
        currentHoverX < 300 &&
        currentHoverY > 110 &&
        currentHoverY < 110 + MenuPositions.length * 25
      )
    ) {
      cursorFadeInId = -1;
      cursorFadeInCounter = 0;
    }

    for (let i = 0; i < MenuPositions.length; i++) {
      drawMenuPosition(ctx, MenuPositions[i].name, i);
    }

    //Date
    const d = new Date();
    ctx.lineWidth = 2;
    ctx.fillStyle = "#ffffff";
    ctx.strokeText(d.toLocaleString(), 80, 60);
    ctx.fillText(d.toLocaleString(), 80, 60);

    // Age
    const m = moment.utc("1997-08-19T00:00:00+02:00");
    const years = moment().diff(m, "years", false);
    const days = moment().diff(m.add(years, "years"), "days", false);

    ctx.strokeText(`⏱ ${years}y ${days}d`, 80, 720 - 72 + 28);
    ctx.fillText(`⏱ ${years}y ${days}d`, 80, 720 - 72 + 28);

    ctx.textAlign = "right";
    ctx.strokeText(PlaceNames[backgroundImageId], 1280 - 20, 60);
    ctx.fillText(PlaceNames[backgroundImageId], 1280 - 20, 60);

    ctx.font = "25px Jura";
    ctx.strokeText("GolyBidoof#8143", 1280 - 20, 720 - 72 - 80);
    ctx.fillText("GolyBidoof#8143", 1280 - 20, 720 - 72 - 80);

    ctx.font = "70px Jura";
    ctx.lineWidth = 6;
    ctx.strokeText("Amelia Szymanska", 1280 - 20, 720 - 72 - 20);
    ctx.fillText("Amelia Szymanska", 1280 - 20, 720 - 72 - 20);

    previousDelta = currentDelta;
  });
};

window.onload = () => {
  const canvas = document.getElementById("maincanvas");
  const secondaryCanvas = document.getElementById("secondarycanvas");
  canvas.addEventListener(
    "click",
    function () {
      handleClick();
    },
    false
  );
  canvas.addEventListener(
    "mousemove",
    function (event) {
      let rect = canvas.getBoundingClientRect();
      currentHoverX = event.clientX - rect.left;
      currentHoverY = event.clientY - rect.top;
    },
    false
  );

  contexts = [canvas.getContext("2d"), secondaryCanvas.getContext("2d")];

  WebFont.load({
    google: {
      families: ["Jura:400"],
    },
    active: function () {
      drawCanvas();
    },
  });
};
