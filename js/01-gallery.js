// Creați o galerie, cu posibilitatea de a da click pe elementele sale și de a vizualiza imaginea la dimensiune completă, într-o fereastră modală. Urmăriți filmulețul demonstrativ al galeriei.
// Îndepliniți acest task în fișierele 01-gallery.html și 01-gallery.js. Împărțiți-l în mai multe subtask-uri:

// 1)Crearea și randarea unui marcaj pe baza datelor din matricea de date galleryItems și a șablonului de articol furnizat din galerie.
// 2)Delegarea la ul.gallery și obținerea unui url a imaginii mari.
// 3)Conectarea scriptului și a stilurilor din librăria ferestrei modale basicLightbox. Folosiți CDN service jsdelivr și adăugați în proiect link-urile fișierelor minimizate (.min) de la librăria folosită.
// 4)Deschiderea unei ferestre modale printr-un click pe un element al galeriei. Pentru a face acest lucru, citiți documentația și exemple deja implementate.
// 5)Înlocuirea valorii atributului src al elementului <img> în fereastra modală înainte deschiderii. Utilizați marcajul deja existent pentru fereastra modală din exemplele librăriei basicLightbox.
// Marcajul elementelor din galerie:
// Link-ul către imaginea originală va fi stocat în data-attribute source pe elementul <img> și specificat în href. Nu adăugați alte tag-uri HTML sau clase CSS, altele decât cele din acest șablon:

// <li class="gallery__item">
//   <a class="gallery__link" href="large-image.jpg">
//     <img
//       class="gallery__image"
//       src="small-image.jpg"
//       data-source="large-image.jpg"
//       alt="Image description"
//     />
//   </a>
// </li>

// Imaginea este înfășurată într-un link, ceea ce înseamnă că atunci când dați click, utilizatorul va fi redirecționat implicit către o altă pagină. Dezactivați acest comportament.
// Închiderea imaginei de la tastatură:
// La apăsarea tastei Escape, ferestra modală se va închide. Acest lucru trebuie să se întâmple doar atunci când fereastra modală este deschisă. Librăria basicLightbox are o metodă de a închide în mod programat o fereastră modală.

// Importăm datele galeriei:
import { galleryItems } from "./gallery-items.js";

// Verificăm dacă datele galeriei au fost importate corect:
console.log(galleryItems);

// Selectăm elementul de listă pentru galerie:
const listEl = document.querySelector(".gallery");

// Funcție pentru crearea elementelor de galerie:
function createGalleryItem(item) {
  const listItemEl = document.createElement("li");
  listItemEl.classList.add("gallery__item");
  listItemEl.innerHTML = `<a 
    class='gallery__link' 
    href='${item.original}'>
      <img 
        class='gallery__image' 
        src='${item.preview}' 
        data-source='${item.original}' 
        alt='${item.description}'
      />
    </a>`;
  return listItemEl;
}

// Funcție pentru deschiderea imaginii în fereastra modală:
function openImageInLightbox(event) {
  const clickedOn = event.target;

  // Verificăm dacă s-a făcut clic pe o imagine:
  if (clickedOn.nodeName !== "IMG") {
    return;
  }

  // Oprim comportamentul implicit al evenimentului de click:
  event.preventDefault();

  // Creăm o instanță a ferestrei modale:
  const instance = basicLightbox.create(
    `<img src='${clickedOn.dataset.source}'/>`,
    {
      onClose: () => {
        // Înlăturăm evenimentul de tastatură pentru închiderea ferestrei, astfel evităm scurgerea de memorie:
        document.removeEventListener("keydown", onEscKeyPress);
      },
    }
  );

  // Funcție pentru închiderea ferestrei la apăsarea tastei Esc:
  const onEscKeyPress = (event) => {
    if (event.key === "Escape") {
      instance.close();
    }
  };

  // Adăugăm evenimentul de tastatură pentru închiderea ferestrei:
  document.addEventListener("keydown", onEscKeyPress);

  // Afișam fereastra modala:
  instance.show();
}

// Iterăm prin fiecare element din galerie și creăm elementele corespunzătoare:
galleryItems.forEach((item) => {
  const galleryItem = createGalleryItem(item);
  listEl.append(galleryItem);
});

// Adăugăm un eveniment de click pentru deschiderea imaginilor în fereastra modală:
listEl.addEventListener("click", openImageInLightbox);
