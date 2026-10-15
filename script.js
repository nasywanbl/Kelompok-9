const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "Tutup" : "Menu";
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "Menu";
      menu.querySelectorAll("a").forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });
}

const profileTabs = [...document.querySelectorAll("[data-profile-tab]")];
const profilePanels = [...document.querySelectorAll("[data-profile-panel]")];

function activateProfile(tab, moveFocus = false) {
  const selectedProfile = tab.dataset.profileTab;

  profileTabs.forEach((item) => {
    const isSelected = item === tab;
    item.classList.toggle("active", isSelected);
    item.setAttribute("aria-selected", String(isSelected));
    item.tabIndex = isSelected ? 0 : -1;
  });

  profilePanels.forEach((panel) => {
    panel.hidden = panel.dataset.profilePanel !== selectedProfile;
  });

  if (moveFocus) tab.focus();
}

profileTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateProfile(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % profileTabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + profileTabs.length) % profileTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = profileTabs.length - 1;

    if (nextIndex !== undefined) {
      event.preventDefault();
      activateProfile(profileTabs[nextIndex], true);
    }
  });
});
