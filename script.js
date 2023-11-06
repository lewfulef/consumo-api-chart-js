import { fetchApi } from "./fetch.js";

let magnitudes = [];
let geographicReferences = [];
const rgbaRedColor = "rgba(255, 99, 132, 0.2)";
const rgbRedColor = "rgb(255, 99, 132)";
const rgbaOrangeColor = "rgba(255, 159, 64, 0.2)";
const rgbOrangeColor = "rgb(255, 159, 64)";

async function renderData() {
  const earthquakes = await fetchApi(
    "https://api.gael.cloud/general/public/sismos"
  );
  magnitudes = earthquakes.map((earthquake) => earthquake.Magnitud);
  geographicReferences = earthquakes.map(
    (earthquake) => earthquake.RefGeografica
  );

  const backgroundColors = magnitudes.map((magnitud) =>
    magnitud > 3 ? rgbaRedColor : rgbaOrangeColor
  );
  const borderColors = magnitudes.map((magnitud) =>
    magnitud > 3 ? rgbRedColor : rgbOrangeColor
  );
  console.log(backgroundColors);
  const ctx = document.getElementById("myChart");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: geographicReferences,
      datasets: [
        {
          label: "Magnitud de sismos",
          data: magnitudes,
          borderWidth: 1,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";

              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y + "º";
              }
              return label;
            },
          },
        },
      },
    },
  });
}
renderData();
// esta data debemos presentarla en un gráfico
// y para eso iremos a la librería de chartj
// para eso debemos leer la documentación de chartjs para poder usarla
// chartjs espera que le enviemos información
// desde la api

// qudé en 2:30:00

// .map sirve para iterar una estructura de arreglos
