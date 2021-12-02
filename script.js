const countriesContainer = document.querySelector(".countries-section");

const regionFilter = document.querySelectorAll(".region");

const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault()
})

fetch("https://restcountries.com/v2/all")
  .then((resolved) => {
    let result = resolved.json();
    return result;
  })
  .then((result) => {
    apiFunciton(result);
  });

function apiFunciton(result) {
  document.querySelector(".loading").style.display = "none";
  let i = 0;
  result.forEach((country) => {
    i++;
    countriesContainer.innerHTML += `
  <div  class="country" data-index = "${i}">
    <div class="img">
      <img src="${country.flags.svg}" alt="" />
    </div>
      <div class="info">
        <h3 class = "country-name">${country.name}</h3>
        <p>Population: <span class = "population">${country.population}</span></p>
        <p>Region: <span class = "country-region">${country.region}</span></p>
        <p>Capital: <span>${country.capital}</span></p>
      </div>
  </div>`;
  });
  darkModeFunction();
  document.querySelectorAll(".country").forEach((coun) => {
    coun.addEventListener("click", () => {
      appendModalelements(result[coun.dataset.index - 1]);
    });
  });

  regionFilter.forEach((regionC) => {
    regionC.addEventListener("click", () => {
      document.querySelectorAll(".country-region").forEach((region) => {
        if (regionC.innerHTML === "All") {
          document.querySelectorAll(".country").forEach((count) => {
            count.style.display = "block";
          });
        } else {
          if (region.innerHTML === regionC.innerHTML) {
            region.parentElement.parentElement.parentElement.style.display =
              "block";
          } else {
            region.parentElement.parentElement.parentElement.style.display =
              "none";
          }
        }
      });
    });
  });

  let searchBox = document.getElementById("searchBox");

  searchBox.addEventListener("input", () => {
    inputFunction(document.querySelectorAll(".country-name"));
  });
}

let filterUl = document.getElementById("filterUl");
let filterClick = document.getElementById("filterBtn");

function openFilter() {
  filterUl.classList.toggle("open");
}

filterClick.addEventListener("click", () => {
  openFilter();
});

function inputFunction(countryName) {
  countryName.forEach((name) => {
    if (name.innerHTML.toLowerCase().includes(searchBox.value.toLowerCase())) {
      name.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.style.display = "none";
    }
  });
}
let modal = document.querySelector(".modal");

function darkModeFunction() {
  let nightBtn = document.getElementById("night-btn");
  let header = document.querySelector(".header");
  let informations = document.querySelectorAll(".country p span");

  nightBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    document.querySelector(".countreis").classList.toggle("dark-mode");

    header.classList.toggle("dark-mode");

    nightBtn.classList.toggle("dark-mode");

    filterUl.classList.toggle("dark-mode");

    filterClick.classList.toggle("dark-mode");

    searchBox.classList.toggle("dark-mode");

    modal.classList.toggle("dark-mode");

    informations.forEach((info) => {
      info.classList.toggle("dark-mode");
    });

    document.querySelectorAll(".country").forEach((count) => {
      count.classList.toggle("dark-mode");
    });
  });
}

function appendModalelements(country) {
  let modalContainer = document.querySelector(".modal .container");
  modal.classList.add("open");

  modalContainer.innerHTML = `
   <div class="close-btn">
               <i class="fas fa-angle-left"></i>  Back 
            </div>
            <img src="${country.flags.svg}" alt="">
        <div class="infos">
                <h3>${country.name}</h3>
            <div class="details">
                <ul>
                    <li>Native Name: <span>${country.nativeName}</span></li>
                    <li>Population: <span>${country.population}</span></li>
                    <li>Region: <span>${country.region}</span></li>
                    <li>Sub Region: <span>${country.subregion}</span></li>
                    <li>Capital: <span>${country.capital}</span></li>
                </ul>
                <ul>
                    <li>Top Level Domain: <span>${
                      country.topLevelDomain[0]
                    }</span></li>
                    <li>currencies: <span>${country.currencies.map(
                      (ele) => ele.name
                    )}</span></li>
                    <li>langueages: <span>${country.languages.map(
                      (ele) => ele.name
                    )}</span></li>
                </ul>
            </div>
        </div>
`;

  let closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
    modalContainer.innerHTML = ``;
  });
  nightModeModal();
}
let ngiht = document.getElementById("night-btn");
function nightModeModal() {
  ngiht.addEventListener("click", () => {
    let closeB = document.querySelector(".close-btn");
    closeB.classList.toggle("dark-mode");
  });
}
