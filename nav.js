// 檔案：/nav.js
(function () {
  const navConfig = [
    { label: "資金與風控", href: "/risk-management/ev-and-bankroll" },
    {
      label: "遊戲教學",
      href: "/game/",
      children: [
        { label: "百家樂", href: "/game/baccarat/" }
        // 未來新增文章，只要在這裡加一行物件，全站選單自動同步
      ]
    },
    { label: "精選實測與工具", href: "/#featured" },
    { label: "內容專區", href: "/#topics" },
    { label: "網站地圖", href: "/sitemap.xml" }
  ];

  function renderNav() {
    const container = document.getElementById("site-nav");
    if (!container) return;

    const html = navConfig
      .map((item) => {
        if (item.children && item.children.length > 0) {
          const subItems = item.children
            .map((child) => `<li><a href="${child.href}">${child.label}</a></li>`)
            .join("");

          return `
            <div class="nav-item has-sub">
              <div class="nav-row">
                <a href="${item.href}">${item.label}</a>
                <button class="sub-toggle" type="button" aria-label="展開${item.label}子選單" aria-expanded="false">▾</button>
              </div>
              <ul class="sub-menu">${subItems}</ul>
            </div>
          `;
        }
        return `<a href="${item.href}">${item.label}</a>`;
      })
      .join("");

    container.innerHTML = `<nav class="site-nav" aria-label="主導覽列">${html}</nav>`;

    // 手機版漢堡選單開合
    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = container.querySelector(".site-nav");
    if (menuToggle && siteNav) {
      menuToggle.addEventListener("click", function () {
        const isOpen = siteNav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
      });
    }

    // 子選單開合
    const subToggle = container.querySelector(".sub-toggle");
    const navItem = container.querySelector(".nav-item.has-sub");
    if (subToggle && navItem) {
      subToggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const expanded = navItem.classList.toggle("open");
        subToggle.setAttribute("aria-expanded", String(expanded));
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderNav);
  } else {
    renderNav();
  }
})();
