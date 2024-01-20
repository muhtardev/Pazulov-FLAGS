document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btn");
  const flag = document.getElementById("flag");
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      btn.addEventListener("click", function () {
        const div = document.createElement("div");
        div.classList.add("flagd");
        const currentCountry = data[Math.floor(Math.random() * data.length)];
        div.innerHTML = `
          <img src="${currentCountry.flags.png}" alt="Flag">
          <h2>${currentCountry.name.common}</h2>
        `;
        flag.append(div);
      });
    });
});
document.addEventListener("DOMContentLoaded", function () {
  const btn1 = document.getElementById("btn1");
  const btn2 = document.getElementById("btn2");
  const btn3 = document.getElementById("btn3");
  const flag = document.getElementById("flag");

  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((countriesData) => {

      btn1.addEventListener("click", function () {
        const div = document.createElement("div");
        div.classList.add("flagd");
        const highPopulationCountry = getCountryByCriteria("population", countriesData);
        div.innerHTML =` 
          <img src="${highPopulationCountry.flags.png}" alt="Flag">
          <h2>${highPopulationCountry.name.common}</h2>
        `;
        flag.append(div);
      });

      btn2.addEventListener("click", function () {
        const div = document.createElement("div");
        div.classList.add("flagd");
        const largestCountry = getCountryByCriteria("area", countriesData);
        div.innerHTML = `
          <img src="${largestCountry.flags.png}" alt="Flag">
          <h2>${largestCountry.name.common}</h2>
        `;
        flag.append(div);
      });

      btn3.addEventListener("click", function () {
        const div = document.createElement("div");
        div.classList.add("flagd");
        const smallestCountry = getCountryByCriteria("area", countriesData, true);
        div.innerHTML =` 
          <img src="${smallestCountry.flags.png}" alt="Flag">
          <h2>${smallestCountry.name.common}</h2>
        `;
        flag.append(div);
      });

      function getCountryByCriteria(criteria, data, smallest = false) {
        if (criteria === "population") {
          return data.reduce((prev, current) => (
            prev.population > current.population ? prev : current
          ));
        } else if (criteria === "area") {
          return data.reduce((prev, current) => (
            smallest ? (prev.area < current.area ? prev : current) : (prev.area > current.area ? prev : current)
          ));
        }
      }
    });
});