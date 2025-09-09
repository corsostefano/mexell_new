/* menu */
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");

// Abrir/cerrar menú
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll("#nav-menu a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// Detectar archivo actual y hash (ej: index.html#services o #services)
let currentPage = window.location.pathname.split("/").pop();
if (currentPage === "" || currentPage === "/") {
  currentPage = "index.html"; // tratar raíz como index.html
}
const currentHash = window.location.hash; // ej: "#services"

// Si estamos en index.html → activar scrollspy con IntersectionObserver
if (currentPage === "index.html") {
  const sections = document.querySelectorAll("section[id]");
  const navLinksHighlight = document.querySelectorAll(".nav__links a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`.nav__links a[href="#${id}"]`);

        if (entry.isIntersecting) {
          document.querySelectorAll(".nav__links a").forEach((l) => l.classList.remove("active"));
          if (link) link.classList.add("active");
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    }
  );

  // Observar todas las secciones
  sections.forEach((section) => observer.observe(section));

  // Al cargar, marcar Inicio o la sección indicada en el hash
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".nav__links a").forEach((l) => l.classList.remove("active"));

    if (currentHash) {
      // Si viene con hash (#services, #faq, etc.)
      const hashLink = document.querySelector(`.nav__links a[href="${currentHash}"]`);
      if (hashLink) hashLink.classList.add("active");
    } else {
      // Si no hay hash, marcar Inicio
      document.querySelector('.nav__links a[href="index.html"]')?.classList.add("active");
    }
  });

  // Mantener "Inicio" activo al estar arriba del todo (solo si no hay hash)
  window.addEventListener("scroll", () => {
    if (window.scrollY < 100 && !currentHash) {
      navLinksHighlight.forEach((l) => l.classList.remove("active"));
      document.querySelector('.nav__links a[href="index.html"]')?.classList.add("active");
    }
  });

} else {
  // Para páginas distintas a index.html → marcar el enlace correspondiente
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".nav__links a").forEach((l) => l.classList.remove("active"));

    const activeLink = document.querySelector(`.nav__links a[href="${currentPage}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  });
}

const headerTop = document.getElementById("header-top");
const headerMain = document.querySelector(".header__main");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 50) {
    // Scroll hacia abajo → ocultar top y subir main
    headerTop.style.transform = "translateY(-100%)";
    headerMain.style.top = "0";
  } else {
    // Scroll hacia arriba → mostrar top y empujar main hacia abajo
    headerTop.style.transform = "translateY(0)";
    headerMain.style.top = "32px"; // misma altura que header__top
  }

  lastScroll = currentScroll;
});


ScrollReveal().reveal('[data-sr="fade-right"]', {
    origin: 'right',
    distance: '50px',
    duration: 1000,
    delay: 200,
    easing: 'ease-out',
    reset: false
  });

  ScrollReveal().reveal('[data-sr="fade-up"]', {
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 400,
    easing: 'ease-out',
    reset: false
  });

  ScrollReveal().reveal('[data-sr="fade-left"]', {
    origin: 'left',
    distance: '50px',
    duration: 1000,
    delay: 600,
    easing: 'ease-out',
    reset: false
  });

  ScrollReveal().reveal('.hero__content', {
    origin: 'left',
    distance: '70px',
    duration: 1200,
    delay: 200,
    easing: 'ease-out',
    reset: false
  });

  /* swipe confían*/ 

  const swiper = new Swiper(".mySwiper", {
  slidesPerView: 5,        // cantidad de logos visibles
  spaceBetween: 30,        // espacio entre ellos
  loop: true,              // loop infinito
  speed: 4000,             // velocidad del scroll (ms)
  autoplay: {
    delay: 0,              // sin pausas
    disableOnInteraction: false,
  },
  allowTouchMove: false,   // opcional: bloquea swipe manual
  breakpoints: {
    320: { slidesPerView: 2, spaceBetween: 10 },
    768: { slidesPerView: 3, spaceBetween: 20 },
    1024: { slidesPerView: 5, spaceBetween: 30 }
  }
});

/*---- rotar imágenes card -----*/

 document.addEventListener("DOMContentLoaded", () => {
    const sliders = document.querySelectorAll(".card-slider");

    sliders.forEach(slider => {
      const images = slider.querySelectorAll(".card__img");
      let index = 0;

      setInterval(() => {
        images[index].classList.remove("active");
        index = (index + 1) % images.length;
        images[index].classList.add("active");
      }, 3000); // cambia cada 3s
    });
  });

/* ================= CONTACT SECTION INTERACTIVO ================= */

// ====== MODALES ======
const modalBtns = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");
const closeBtns = document.querySelectorAll(".modal__close");

modalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.modal);
    target.classList.add("active");
  });
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").classList.remove("active");
  });
});

// Cerrar modal al hacer click fuera
modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });
});

// ====== BACKGROUND DINÁMICO (Burbujas animadas) ======
function createBubbles() {
  const bg = document.querySelector(".contact__background");

  for (let i = 0; i < 20; i++) {
    const bubble = document.createElement("span");
    const size = Math.random() * 60 + 20;
    const pos = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 8;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${pos}%`;
    bubble.style.animationDelay = `${delay}s`;
    bubble.style.animationDuration = `${duration}s`;

    bg.appendChild(bubble);
  }
}

document.addEventListener("DOMContentLoaded", createBubbles);


// ==== EMAIL MODAL ==== 
const emailModal = document.getElementById("emailModal");
const emailModalClose = emailModal.querySelector(".email-modal__close");
const emailModalForm = document.getElementById("emailModalForm");
const emailModalToast = document.getElementById("emailModalToast");

// Abrir modal -> lo puedes llamar con un botón: onclick="emailModal.classList.add('active')"
function openEmailModal() {
  emailModal.classList.add("active");
}

// Cerrar modal
emailModalClose.addEventListener("click", () => {
  emailModal.classList.remove("active");
});

// Enviar formulario
emailModalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(emailModalForm.action, {
    method: "POST",
    body: new FormData(emailModalForm)
  }).then(() => {
    emailModalToast.classList.add("show");
    setTimeout(() => {
      emailModalToast.classList.remove("show");
    }, 3000);

    emailModalForm.reset();
    emailModal.classList.remove("active");
  }).catch(() => {
    emailModalToast.textContent = "❌ Error al enviar el mensaje.";
    emailModalToast.style.background = "#d9534f";
    emailModalToast.classList.add("show");
    setTimeout(() => {
      emailModalToast.classList.remove("show");
      emailModalToast.style.background = "#0B3558";
      emailModalToast.textContent = "✅ ¡Mensaje enviado con éxito!";
    }, 3000);
  });
});

//modal location

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openLocation");
  const modal = document.getElementById("modalLocation");
  const closeBtn = document.getElementById("closeLocation");

  // Abrir modal
  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
  });

  // Cerrar modal
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // Cerrar al hacer clic fuera del contenido
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
});
