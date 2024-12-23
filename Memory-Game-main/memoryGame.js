document.querySelector(".start span").onclick = function () {
  const startElement = document.querySelector(".start");
  startElement.style.display = "none";
  // container.classList.remove("no-clicking");
  document.querySelector(".right-sec span").innerHTML = "0";
};

var container = document.querySelector(".game-blocks");

var blocks = Array.from(container.children);
console.log(blocks)
var range = [
  .../*...=>Spreed Operator expands val into a new array*/ Array(
    blocks.length
  ).keys(),
];

shuffle(range);

for (var index = 0; index < blocks.length; index++) {
  const block = blocks[index];

  block.style.order = range[index];

  block.addEventListener("click", function () {
    flip(block);
  });
}

function checkMatching(fBlock, sBlock) {
  var attempts = document.querySelector(".right-sec span");

  if (fBlock.dataset.prog === sBlock.dataset.prog) {
    fBlock.classList.remove("flip");
    sBlock.classList.remove("flip");
    fBlock.classList.add("matched");
    sBlock.classList.add("matched");
  } else {
    attempts.innerHTML = parseInt(attempts.innerHTML) + 1;

    if (parseInt(attempts.innerHTML) === 10) {
      const startElement = document.querySelector(".start");
      startElement.style.display = "flex";
      startElement.classList.add("game-over");
      document.querySelector(".start div").innerHTML = "Game Over &#x1F622;";
      document.querySelector(".start span").innerHTML = "Restart";
      document.querySelector(".start span").onclick = function () {
        location.reload();
      };
      container.classList.add("no-clicking");
    }

    setTimeout(function () {
      fBlock.classList.remove("flip");
      sBlock.classList.remove("flip");
    }, 700);
  }
}

function flip(selBlock) {
  selBlock.classList.add("flip");

  let flipBlocks = Array.from(blocks).filter(function (flipBlock) {
    return flipBlock.classList.contains("flip");
  });

  if (flipBlocks.length === 2) {
    noAction();
    checkMatching(flipBlocks[0], flipBlocks[1]);
  }
}


function noAction() {
  container.classList.add("no-clicking");

  setTimeout(function () {
    container.classList.remove("no-clicking");
  }, 700);
}

function shuffle(array) {
  var curr = array.length - 1;
  var temp;
  var rand;
  while (curr > 0) {
    rand = Math.floor(Math.random() * curr);
    temp = array[curr];
    array[curr] = array[rand];
    array[rand] = temp;
    curr--;
  }
  return array;
}

