       document.addEventListener("DOMContentLoaded", start);

       function start() {
           console.log("DOM content loaded");
       }


       let temp = document.querySelector("template");
       let container = document.querySelector("section");
       let json;
       let filter = "alle";

       const link = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";

       async function hentdata() {
           const respons = await fetch(link);
           json = await respons.json();
           addEventListenerToButtons();
           vis(json);
       }

       function vis(retter) {
           console.log(retter);
           container.innerHTML = "";
           retter.feed.entry.forEach(mad => {
               if (filter == "alle" || filter == mad.gsx$kategori.$t) {


                   const klon = temp.cloneNode(true).content;
                   klon.querySelector(".navn").textContent = mad.gsx$navn.$t;
                   klon.querySelector(".kort").textContent = mad.gsx$kort.$t;
                   klon.querySelector(".pris").textContent = "Pris: " + mad.gsx$pris.$t + ",-";
                   klon.querySelector("img").src = "imgs/small/" + mad.gsx$billede.$t + "-sm.jpg";

                   klon.querySelector("article").addEventListener("click", () => visDetaljer(mad));

                   container.appendChild(klon);
               }
           })
       }

       function visDetaljer(mad) {
           popup.style.display = "block";
           popup.querySelector("h2").textContent = mad.gsx$navn.$t;
           popup.querySelector(".lang").textContent = mad.gsx$lang.$t;
           popup.querySelector(".land").textContent = mad.gsx$oprindelse.$t;
           popup.querySelector(".price").textContent = mad.gsx$pris.$t + ",-";
           popup.querySelector("img").src = "imgs/large/" + mad.gsx$billede.$t + ".jpg";
       }

       document.querySelector("#luk").addEventListener("click", () => popup.style.display = "none");

       function addEventListenerToButtons() {
           document.querySelectorAll(".filter").forEach((btn) => {
               btn.addEventListener("click", filterBTNs);
           });
       }

       function filterBTNs() {
           filter = this.dataset.kategori;
           document.querySelector("h2").textContent = this.textContent;
           document.querySelectorAll(".filter").forEach((btn) => {
               btn.classList.remove("valgt");
           })
           this.classList.add("valgt");
           vis(json);
       }

       hentdata();
