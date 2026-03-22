const body = document.body;
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");
const revealItems = document.querySelectorAll(".fade-in");

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

if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

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

const sliders = document.querySelectorAll("[data-slider]");

sliders.forEach((slider) => {
  const slides = slider.querySelectorAll(".slide");
  const dots = slider.querySelectorAll(".slider-dot");
  const prev = slider.querySelector("[data-prev]");
  const next = slider.querySelector("[data-next]");
  let current = 0;
  let timer = null;

  if (!slides.length) {
    return;
  }

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === current);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === current);
      dot.setAttribute("aria-pressed", dotIndex === current ? "true" : "false");
    });
  };

  const startAutoPlay = () => {
    if (slides.length < 2) {
      return;
    }
    timer = window.setInterval(() => {
      showSlide(current + 1);
    }, 5000);
  };

  const resetAutoPlay = () => {
    if (timer) {
      window.clearInterval(timer);
    }
    startAutoPlay();
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

  slider.addEventListener("mouseenter", () => {
    if (timer) {
      window.clearInterval(timer);
    }
  });

  slider.addEventListener("mouseleave", () => {
    resetAutoPlay();
  });

  showSlide(0);
  startAutoPlay();
});

const worksRoot = document.querySelector("[data-works-root]");

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
              <div class="section-heading fade-in visible">
                <div>
                  <span class="eyebrow">${escapeHtml(category.eyebrow || "")}</span>
                  <h2>${escapeHtml(category.title || "")}</h2>
                </div>
                <p>${escapeHtml(category.description || "")}</p>
              </div>
              <div class="event-stack">
                ${events.map(renderEventBlock).join("")}
              </div>
            </section>
          `;
        })
        .join("");
    })
    .catch(() => {
      worksRoot.innerHTML = `
        <section class="section" style="padding-top: 0;">
          <article class="contact-card fade-in visible">
            <h3>作品数据加载失败</h3>
            <p>未能读取 <code>works-data.json</code>。如果你是直接双击本地 HTML 打开页面，浏览器可能会拦截本地 fetch。部署到 GitHub Pages 或使用本地静态服务器后即可正常读取。</p>
          </article>
        </section>
      `;
    });
}

function renderEventBlock(event) {
  const works = Array.isArray(event.works) ? event.works : [];
  return `
    <section class="event-block fade-in visible">
      <div class="event-header">
        <div>
          <span class="eyebrow">${escapeHtml(event.name || "未命名活动")}</span>
          <h3>${escapeHtml(event.name || "未命名活动")}</h3>
        </div>
        <p>${escapeHtml(event.description || "活动说明待补。")}</p>
      </div>
      <div class="event-meta">时间：${escapeHtml(event.time || "待补")}</div>
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
    <article class="work-card fade-in visible">
      <div class="work-thumb">
        <strong>${escapeHtml(item.name || "未命名作品")}</strong>
        <img src="./Logo/TDS_LOGO_RED_PUBLIC.png" alt="">
      </div>
      <span class="work-meta">队伍：${escapeHtml(item.team || "待补")} · 所属活动/赛事：${escapeHtml((event && event.name) || "待补")} · 时间：${escapeHtml((event && event.time) || "待补")}</span>
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
