import Chart from "chart.js/auto";
import { transitionEndEvent } from "../../utils/transition-block/transition-blocker";
import "./donut-chart.scss";

let legend = document.querySelector(".donut-chart__legend");
let chartMiddle = document.querySelector(".donut-chart__middle");
let votesNumberEl = chartMiddle.querySelector(".donut-chart__votes-number");
let votesText = chartMiddle.querySelector(".donut-chart__votes-text");
let middleHiddenClass = "donut-chart__middle--hidden";
let votes = [0, 65, 65, 130];
let votesTextForms = ["голос", "голоса", "голосов"];
let votesSum = votes.reduce((acc, el) => acc + el);
let legendLabels = ["Разочарован", "Удовлетворительно", "Хорошо", "Великолепно"];
let gradientsBorders = [
  ["#909090", "#3D4975"],
  ["#BC9CFF", "#8BA4F9"],
  ["#6FCF97", "#66D2EA"],
  ["#FFE39C", "#FFBA9C"],
];
//configuring and drawing chart
const ctx = document.getElementById("votes-chart").getContext("2d");
let canvasGradients = gradientsBorders.map((colors) => {
  let gradient = ctx.createLinearGradient(20, 20, 20, 140);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);
  return gradient;
});
const votesChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: legendLabels,
    datasets: [
      {
        label: "Votes",
        data: votes,
        backgroundColor: canvasGradients,
        hoverBackgroundColor: canvasGradients,
        radius: "77.5%",
        cutout: "90.32258%",
        borderWidth: 2,
        borderColor: "#ffffff",
        hoverBorderColor: "transparent",
        hoverOffset: 2,
      },
    ],
  },
  options: {
    onHover: chartHoverEventHandlerWrapper(),
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  },
  plugins: [
    {
      beforeInit: beforeChartInit,
    },
  ],
});

function beforeChartInit(chart) {
  var data = chart.data.datasets[0].data;
  var isAllZero = data.reduce((a, b) => a + b) > 0 ? false : true;
  if (!isAllZero) return;
  // when all data values are zero...
  chart.data.datasets[0].data = data.map((e, i) => (i > 0 ? 0 : 1)); //add one segment
  chart.data.datasets[0].backgroundColor = "#d2dee2"; //change bg color
  chart.data.datasets[0].hoverBackgroundColor = "#d2dee2"; //change hover bg color
  chart.data.datasets[0].borderWidth = 0; //no border
  chart.data.datasets[0].hoverOffset = 0; //no border
  chart.options.tooltips = false; //disable tooltips
  chart.options.onHover = () => {}; // disable hover func
  chartMiddle.style.color = "rgba(31, 32, 65, 0.3)";
  legend.style.display = "none";
}

function chartHoverEventHandlerWrapper() {
  let prevArcIndex = null;

  return function (e, elements, chart) {
    if (!elements.length) {
      if (prevArcIndex === null) {
        return;
      }
      prevArcIndex = null;
      updateMiddle(votesSum);
      return;
    }

    let arcIndex = elements[0].index;

    if (prevArcIndex !== arcIndex) {
      if (votes[arcIndex] !== 0) updateMiddle(votes[arcIndex]);
      prevArcIndex = arcIndex;
    }
  };
}

function updateMiddleValues(votes) {
  votesNumberEl.textContent = votes;
  votesText.textContent = votesTextForms[getCaseIndex(votes)];
}

function updateMiddle(votes) {
  chartMiddle.classList.toggle(middleHiddenClass);
  chartMiddle.addEventListener(
    transitionEndEvent(),
    function (e) {
      updateMiddleValues(votes);
      chartMiddle.classList.remove(middleHiddenClass);
    },
    { once: true }
  );
}

//building legend
legendLabels.forEach((label, index) => {
  let item = document.createElement("li");
  item.classList.add("donut-chart__legend-label");
  item.innerHTML = `<div class="donut-chart__label-icon" style="background: linear-gradient(${gradientsBorders[index][0]}, ${gradientsBorders[index][1]})"></div><div class="donut-chart__label-text">${label}</div>`;
  legend.prepend(item);
});

updateMiddleValues(votesSum);

//helper function
function getCaseIndex(counter) {
  if (Math.floor(counter / 10) % 10 === 1) {
    return 2;
  } else {
    if (counter % 10 === 1) {
      return 0;
    } else if (1 < counter % 10 && counter % 10 <= 4) {
      return 1;
    } else {
      return 2;
    }
  }
}
