// Creați aceeași galerie ca în prima sarcină, folosind librăria SimpleLightbox, care se va ocupa de procesarea click-urilor pe imagini, de deschiderea și închiderea unei ferestre modale și de listarea imaginilor, folosind tastatura.
// Modificați puțin aspectul cardului de galerie, folosind acest șablon.

// <li class="gallery__item">
//    <a class="gallery__link" href="large-image.jpg">
//       <img class="gallery__image" src="small-image.jpg" alt="Image description" />
//    </a>
// </li>

// Îndepliniți acest task în fișierele 02-lightbox.html și 02-lightbox.js. Împărțiți-l în mai multe subtask-uri:
// 1)Crearea și randarea unui marcaj pe baza datelor din matricea de date galleryItems și a șablonului de articol furnizat din galerie. Refolosiți codul scris din primul exercițiu.
// 2)Conectarea scriptului și a stilurilor librăriei, CDN service cdnjs. Adăugați link-urile pentru fișierele: simple-lightbox.min.js și simple-lightbox.min.css.
// 3)Inițializarea librăriei după ce elementele galeriei sunt create și adăugate în ul.gallery. Pentru a face acest lucru, citiți documentația SimpleLightbox, secțiunile "Usage" și "Markup".
// 4)Căutați în documentație secțiunea "Options" și adăugați un text sugestiv imaginei în atributul alt. Textul alternativ va fi poziționat în partea de jos și va apărea la 250 de milisecunde după deschiderea imaginii.

// Importăm datele galeriei:
import { galleryItems } from "./gallery-items.js";

// Verificăm dacă datele galeriei au fost importate corect:
console.log(galleryItems);

// Selectăm elementul de listă pentru galerie:
const listEl = document.querySelector(".gallery");

// Ne cream elementele listei <ul> cu clasa gallery, tinand cont de sablonul de mai sus:
galleryItems.forEach((item) => {
  const listItemEl = document.createElement("li");
  listItemEl.classList.add("gallery__item");
  listItemEl.innerHTML = `<a 
        class='gallery__link' 
        href='${item.original}'>
          <img 
          class='gallery__image' 
          src='${item.preview}' 
          alt='${item.description}'
          />
        </a>`;
  listEl.append(listItemEl);
});

// Inițializarea librăriei SimpleLightbox:
var lightbox = new SimpleLightbox(".gallery a", {
  sourceAttr: "href",
  captionsData: "alt",
  captionPosition: "bottom",
  navText: ["←", "→"],
  closeText: "×",
  captionDelay: 250,
  animationSpeed: 250,
  fadeSpeed: 300,
  // alte opțiuni pot fi adăugate aici
});
