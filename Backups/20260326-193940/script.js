const body = document.body;
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeStorageKey = "tds-home-theme";
const particlesRoot = document.querySelector("[data-particles]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelectorAll(".nav-links a, .nav-wing a");
const sections = document.querySelectorAll("section[id]");
const sliders = document.querySelectorAll("[data-slider]");
const worksRoot = document.querySelector("[data-works-root]");
const motionRoot = document.querySelector("[data-motion-root]");
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const STAGGER_CONTAINERS = [
  ".hero-meta",
  ".three-card-row",
  ".bottom-side-stack",
  ".works-grid",
  ".event-stack",
  ".slide-visual",
  ".dialog-side",
  ".group-nav-tabs"
];

const CARD_SELECTOR = [
  ".metric",
  ".speech-card",
  ".spotlight-card",
  ".teacher-card",
  ".job-card",
  ".contact-card",
  ".timeline-card",
  ".work-card",
  ".event-block",
  ".page-heading",
  ".slide-copy",
  ".slide-visual",
  ".monitor-screen"
].join(", ");

let reducedMotion = reduceMotionQuery.matches;
let revealObserver = null;
let parallaxNodes = [];
let parallaxRaf = 0;
let sliderTimers = [];
let parallaxScrollHandler = null;

if (body.classList.contains("home-page")) {
  const savedTheme = window.localStorage.getItem(themeStorageKey);
  const theme = savedTheme === "dark" ? "dark" : "light";
  body.setAttribute("data-theme", theme);
}

body.classList.toggle("reduced-motion", reducedMotion);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    triggerThemeTransition(nextTheme);
    body.setAttribute("data-theme", nextTheme);
    window.localStorage.setItem(themeStorageKey, nextTheme);
  });
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    body.classList.toggle("menu-open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
  });
});

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const id = entry.target.id;
        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("active", isActive);
        });
      });
    },
    {
      rootMargin: "-35% 0px -45% 0px",
      threshold: 0.05
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

if (particlesRoot) {
  renderParticles();
}

prepareMotionSurface(document);
initRevealSystem(document);
initParallax();
initSliders();

if (worksRoot) {
  fetch("./works-data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load works-data.json: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const categories = Array.isArray(data.categories) ? data.categories : [];
      worksRoot.innerHTML = categories
        .map((category, categoryIndex) => {
          const events = Array.isArray(category.events) ? category.events : [];
          const sectionPadding = categoryIndex === 0 ? "0" : "48px";

          return `
            <section class="section" style="padding-top: ${sectionPadding};">
              <div class="section-heading fade-in" data-reveal="rise" data-glow-card>
                <div>
                  <span class="eyebrow fade-in" data-reveal="fade">${escapeHtml(category.eyebrow || "")}</span>
                  <h2 class="fade-in" data-reveal="rise" data-reveal-delay="1">${escapeHtml(category.title || "")}</h2>
                </div>
                <p class="fade-in" data-reveal="rise" data-reveal-delay="2">${escapeHtml(category.description || "")}</p>
              </div>
              <div class="event-stack" data-reveal="rise">
                ${events.map(renderEventBlock).join("")}
              </div>
            </section>
          `;
        })
        .join("");

      hydrateDynamicContent(worksRoot);
    })
    .catch(() => {
      worksRoot.innerHTML = `
        <section class="section" style="padding-top: 0;">
          <article class="contact-card fade-in visible" data-glow-card>
            <h3>作品数据加载失败</h3>
            <p>未能读取 <code>works-data.json</code>。如果你是直接双击本地 HTML 打开页面，浏览器可能会拦截本地 fetch。部署到静态服务器后即可正常读取。</p>
          </article>
        </section>
      `;

      hydrateDynamicContent(worksRoot);
    });
}

reduceMotionQuery.addEventListener("change", (event) => {
  reducedMotion = event.matches;
  body.classList.toggle("reduced-motion", reducedMotion);

  if (particlesRoot) {
    renderParticles();
  }

  refreshRevealVisibility();
  initParallax();
});

window.addEventListener("resize", () => {
  if (particlesRoot) {
    renderParticles();
  }

  initParallax();
});

function prepareMotionSurface(root) {
  const scope = root instanceof Element ? root : document;

  scope.querySelectorAll(CARD_SELECTOR).forEach((card) => {
    if (!card.hasAttribute("data-glow-card")) {
      card.setAttribute("data-glow-card", "");
    }
  });

  scope.querySelectorAll("[data-pulse-button]").forEach((button) => {
    button.classList.add("is-pulse-button");
  });

  STAGGER_CONTAINERS.forEach((selector) => {
    scope.querySelectorAll(selector).forEach((container) => {
      if (!container.dataset.staggerReady) {
        applyStagger(container);
      }
    });
  });
}

function applyStagger(container) {
  const children = Array.from(container.children).filter((node) => node.classList && !node.hasAttribute("data-reveal-delay"));
  children.forEach((child, index) => {
    if (child.classList.contains("fade-in")) {
      child.dataset.revealDelay = String(index);
    }
  });
  container.dataset.staggerReady = "true";
}

function initRevealSystem(root) {
  const scope = root instanceof Element ? root : document;
  const revealItems = Array.from(scope.querySelectorAll(".fade-in"));

  revealItems.forEach((item) => {
    const effect = item.dataset.reveal || inferReveal(item);
    const delayIndex = Number(item.dataset.revealDelay || 0);
    item.dataset.reveal = effect;
    item.style.setProperty("--reveal-delay", `${delayIndex * 90}ms`);
  });

  if (reducedMotion) {
    revealItems.forEach((item) => item.classList.add("visible"));
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("visible"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
    );
  }

  revealItems.forEach((item) => {
    if (!item.classList.contains("visible")) {
      revealObserver.observe(item);
    }
  });
}

function refreshRevealVisibility() {
  document.querySelectorAll(".fade-in").forEach((item) => {
    if (reducedMotion) {
      item.classList.add("visible");
      if (revealObserver) {
        revealObserver.unobserve(item);
      }
    }
  });
}

function inferReveal(element) {
  if (element.matches(".page-heading, .hero-artboard")) {
    return "zoom";
  }
  if (element.matches(".group-nav-tabs, .eyebrow")) {
    return "fade";
  }
  return "rise";
}

function renderParticles() {
  const particleCount = reducedMotion ? 12 : window.innerWidth < 768 ? 18 : 34;
  const markup = Array.from({ length: particleCount }, (_, index) => {
    const size = 4 + Math.round(Math.random() * 10);
    const x = `${Math.round(Math.random() * 100)}%`;
    const y = `${Math.round(Math.random() * 100)}%`;
    const alpha = (0.14 + Math.random() * 0.2).toFixed(2);
    const driftX = `${(-18 + Math.random() * 36).toFixed(2)}px`;
    const driftY = `${(-26 + Math.random() * 52).toFixed(2)}px`;
    const duration = `${10 + Math.random() * 12}s`;
    const delay = `${(index * -0.7).toFixed(2)}s`;
    const scale = (0.9 + Math.random() * 0.8).toFixed(2);
    return `<span class="ambient-particle" style="--size:${size}px;--x:${x};--y:${y};--alpha:${alpha};--duration:${duration};--delay:${delay};--drift-x:${driftX};--drift-y:${driftY};--scale:${scale};"></span>`;
  }).join("");

  particlesRoot.innerHTML = markup;
}

function initParallax() {
  if (parallaxScrollHandler) {
    window.removeEventListener("scroll", parallaxScrollHandler);
    parallaxScrollHandler = null;
  }

  if (parallaxRaf) {
    window.cancelAnimationFrame(parallaxRaf);
    parallaxRaf = 0;
  }

  parallaxNodes = reducedMotion
    ? []
    : Array.from(document.querySelectorAll("[data-parallax]")).map((node) => ({
        node,
        speed: Number(node.dataset.parallaxSpeed || 0.12)
      }));

  if (!parallaxNodes.length) {
    document.querySelectorAll("[data-parallax]").forEach((node) => {
      node.style.removeProperty("--parallax-y");
    });
    return;
  }

  const update = () => {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    parallaxNodes.forEach(({ node, speed }) => {
      const offset = (scrollY * speed).toFixed(2);
      node.style.setProperty("--parallax-y", `${offset}px`);
    });
    parallaxRaf = 0;
  };

  parallaxScrollHandler = () => {
    if (!parallaxRaf) {
      parallaxRaf = window.requestAnimationFrame(update);
    }
  };

  window.addEventListener("scroll", parallaxScrollHandler, { passive: true });
  parallaxScrollHandler();
}

function initSliders() {
  sliders.forEach((slider) => {
    if (slider.dataset.sliderReady === "true") {
      return;
    }

    const slides = slider.querySelectorAll(".slide");
    const dots = slider.querySelectorAll(".slider-dot");
    const prev = slider.querySelector("[data-prev]");
    const next = slider.querySelector("[data-next]");
    const sliderMode = slider.dataset.sliderMode || "";
    const controls = slider.querySelector(".slider-controls");
    const autoPlayDelay = reducedMotion ? 8000 : 5000;
    let current = 0;
    let timer = null;

    if (!slides.length) {
      return;
    }

    let progress = slider.querySelector(".slider-progress");
    if (!progress && controls) {
      progress = document.createElement("div");
      progress.className = "slider-progress";
      progress.innerHTML = '<span class="slider-progress-bar"></span>';
      controls.prepend(progress);
    }

    const progressBar = progress?.querySelector(".slider-progress-bar");

    const updateProgress = () => {
      if (!progressBar) {
        return;
      }

      progressBar.classList.remove("is-animating");
      progressBar.style.animation = "none";
      void progressBar.offsetWidth;

      if (slides.length < 2 || reducedMotion) {
        progressBar.style.transform = "scaleX(1)";
        progressBar.style.animation = "none";
        return;
      }

      window.requestAnimationFrame(() => {
        progressBar.style.transform = "scaleX(0)";
        progressBar.style.animation = `sliderProgressFill ${autoPlayDelay}ms linear forwards`;
        progressBar.classList.add("is-animating");
      });
    };

    const showSlide = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === current;
        slide.classList.toggle("active", isActive);
        slide.classList.remove("is-prev", "is-next");

        if (sliderMode === "stacked") {
          const prevIndex = (current - 1 + slides.length) % slides.length;
          const nextIndex = (current + 1) % slides.length;
          slide.classList.toggle("is-prev", slideIndex === prevIndex);
          slide.classList.toggle("is-next", slideIndex === nextIndex);
        }
      });

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === current);
        dot.setAttribute("aria-pressed", dotIndex === current ? "true" : "false");
      });

      slider.style.setProperty("--slider-active-index", current);
      updateProgress();
    };

    const startAutoPlay = () => {
      if (slides.length < 2) {
        return;
      }
      timer = window.setInterval(() => showSlide(current + 1), autoPlayDelay);
      sliderTimers.push(timer);
    };

    const clearTimer = () => {
      if (timer) {
        window.clearInterval(timer);
        sliderTimers = sliderTimers.filter((value) => value !== timer);
        timer = null;
      }
    };

    const resetAutoPlay = () => {
      clearTimer();
      startAutoPlay();
      updateProgress();
    };

    prev?.addEventListener("click", () => {
      showSlide(current - 1);
      resetAutoPlay();
    });

    next?.addEventListener("click", () => {
      showSlide(current + 1);
      resetAutoPlay();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        resetAutoPlay();
      });
    });

    slider.addEventListener("mouseenter", clearTimer);
    slider.addEventListener("mouseleave", resetAutoPlay);

    showSlide(0);
    startAutoPlay();
    slider.dataset.sliderReady = "true";
  });
}

function hydrateDynamicContent(root) {
  prepareMotionSurface(root);
  initRevealSystem(root);
}

function triggerThemeTransition(nextTheme) {
  if (reducedMotion || !motionRoot) {
    return;
  }

  body.classList.remove("theme-shift-light", "theme-shift-dark", "theme-shifting");
  void body.offsetWidth;
  body.classList.add("theme-shifting", nextTheme === "dark" ? "theme-shift-dark" : "theme-shift-light");

  window.setTimeout(() => {
    body.classList.remove("theme-shifting", "theme-shift-light", "theme-shift-dark");
  }, 820);
}

function renderEventBlock(event) {
  const works = Array.isArray(event.works) ? event.works : [];
  return `
    <section class="event-block fade-in" data-reveal="rise" data-glow-card>
      <div class="event-header">
        <div>
          <span class="eyebrow fade-in" data-reveal="fade">${escapeHtml(event.name || "未命名活动")}</span>
          <h3 class="fade-in" data-reveal="rise" data-reveal-delay="1">${escapeHtml(event.name || "未命名活动")}</h3>
        </div>
        <p class="fade-in" data-reveal="rise" data-reveal-delay="2">${escapeHtml(event.description || "活动说明待补。")}</p>
      </div>
      <div class="event-meta">${escapeHtml(event.time || "待补")}</div>
      <div class="works-grid">
        ${works.map((work) => renderWorkCard(work, event)).join("")}
      </div>
    </section>
  `;
}

function renderWorkCard(item, event) {
  const links = Array.isArray(item.links) ? item.links : [];
  const renderedLinks = links
    .map((link) => {
      const disabled = link.disabled || !link.url;
      if (disabled) {
        return `<span class="work-link disabled">${escapeHtml(link.label || "链接待补")}</span>`;
      }
      return `<a class="work-link" href="${escapeAttribute(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label || "查看详情")}</a>`;
    })
    .join("");

  return `
    <article class="work-card fade-in" data-reveal="rise" data-glow-card>
      <div class="work-thumb">
        <strong>${escapeHtml(item.name || "未命名作品")}</strong>
        <img src="./Logo/TDS_LOGO_RED_PUBLIC.png" alt="">
      </div>
      <span class="work-meta">团队：${escapeHtml(item.team || "待补")} · 活动：${escapeHtml((event && event.name) || "待补")} · 时间：${escapeHtml((event && event.time) || "待补")}</span>
      <h3>${escapeHtml(item.title || "作品说明待补")}</h3>
      <p>${escapeHtml(item.description || "项目简介待补。")}</p>
      <div class="work-links">${renderedLinks}</div>
    </article>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
