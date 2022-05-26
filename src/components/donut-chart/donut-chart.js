import Chart from "chart.js/auto";
import "./donut-chart.scss";

let votes = [130, 65, 65, 0];
let votesTextForms = ["голос", "голоса", "голосов"];
let votesSum = votes.reduce((acc, el) => acc + el);
let legendLabels = ["Великолепно", "Хорошо", "Удовлетворительно", "Разочарован"];
let gradientsBorders = [
  ["#FFE39C", "#FFBA9C"],
  ["#6FCF97", "#66D2EA"],
  ["#BC9CFF", "#8BA4F9"],
  ["#909090", "#3D4975"],
];
//configuring and drawing chart
const ctx = document.getElementById("votes-chart").getContext("2d");
let canvasGradients = gradientsBorders
  .map((colors) => {
    let gradient = ctx.createLinearGradient(20, 20, 20, 140);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(1, colors[1]);
    return gradient;
  })
  .reverse();
const votesChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: legendLabels.slice(0).reverse(),
    datasets: [
      {
        label: "Votes",
        data: votes.slice(0).reverse(),
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
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  },
});

//building legend
let legend = document.querySelector(".donut-chart__legend");
legendLabels.forEach((label, index) => {
  let item = document.createElement("li");
  item.classList.add("donut-chart__legend-label");
  item.innerHTML = `<div class="donut-chart__label-icon" style="background: linear-gradient(${gradientsBorders[index][0]}, ${gradientsBorders[index][1]})"></div><div class="donut-chart__label-text">${label}</div>`;
  legend.appendChild(item);
});

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
