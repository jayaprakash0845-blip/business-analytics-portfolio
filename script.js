const projectData = {
  ecommerce: {
    title: "E-Commerce Sales Analytics",
    summary: "A business intelligence case study focused on understanding sales performance, profitability, product trends and customer behavior.",
    problem: "The business needs a clear view of where revenue and profit come from, which products perform well, and where growth opportunities exist.",
    approach: "Cleaned transaction data, analyzed KPIs, compared categories and products, and designed an interactive executive dashboard.",
    tools: "Power BI • SQL • Excel",
    insights: "Revenue trends, category contribution, product performance, order patterns and profitability can be translated into targeted business actions."
  },
  customer: {
    title: "Customer Segmentation",
    summary: "An RFM-based customer analytics project designed to understand customer value and engagement.",
    problem: "Different customers have different purchase frequency, recency and monetary value, so a single marketing strategy may not fit everyone.",
    approach: "Calculated RFM metrics, explored distributions, grouped customers into practical segments and prepared recommendations for retention.",
    tools: "Python • Pandas • SQL",
    insights: "High-value and at-risk segments can be identified for differentiated engagement, retention and reactivation strategies."
  },
  inventory: {
    title: "Inventory Analytics",
    summary: "A stock analytics project focused on inventory health, demand patterns and slow-moving items.",
    problem: "Excess inventory can tie up working capital while stock-outs can affect customer service and sales.",
    approach: "Analyzed stock movement, product velocity, demand patterns and attention areas through KPI-based reporting.",
    tools: "Power BI • SQL • Excel",
    insights: "Fast-moving products, healthy stock levels and slow-moving items can be surfaced to support better replenishment decisions."
  },
  performance: {
    title: "Business Performance Dashboard",
    summary: "A KPI-driven executive dashboard for monitoring revenue, profit, targets and business performance.",
    problem: "Decision-makers need a compact view of current performance and trends without manually reviewing multiple reports.",
    approach: "Created a structured data model, defined business KPIs and built an interactive dashboard with trend and target views.",
    tools: "Power BI • DAX • Excel",
    insights: "A centralized KPI layer helps teams monitor performance consistently and investigate changes faster."
  },
  driftsense: {
    title: "DriftSense",
    summary: "A production ML monitoring concept that connects data drift signals with measurable business impact.",
    problem: "Traditional drift monitoring can flag statistical changes without clearly showing how those changes affect business outcomes.",
    approach: "Combined drift monitoring concepts with machine-learning workflows and a business-impact layer, with Streamlit used for the application interface.",
    tools: "Python • XGBoost • Streamlit",
    insights: "Connecting model/data health signals to business metrics can make ML monitoring more actionable for operational teams."
  }
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

$$(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const sections = $$("section[id]");
const navItems = $$(".nav-links a");

const updateActiveNav = () => {
  const scrollPosition = window.scrollY + 150;
  let current = "home";
  sections.forEach(section => {
    if (scrollPosition >= section.offsetTop) current = section.id;
  });
  navItems.forEach(item => item.classList.toggle("active", item.getAttribute("href") === `#${current}`));
};

window.addEventListener("scroll", () => {
  updateActiveNav();
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
  $("#progressBar").style.width = `${progress}%`;
}, { passive: true });

updateActiveNav();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

$$(".reveal").forEach(el => observer.observe(el));

const filters = $$(".filter");
const projectCards = $$(".project-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");

    const selected = filter.dataset.filter;
    projectCards.forEach(card => {
      const categories = card.dataset.category.split(" ");
      const show = selected === "all" || categories.includes(selected);
      card.classList.toggle("hidden", !show);
    });
  });
});

const modal = $("#projectModal");
const modalClose = $("#modalClose");

function openProject(key) {
  const data = projectData[key];
  if (!data) return;

  $("#modalTitle").textContent = data.title;
  $("#modalSummary").textContent = data.summary;
  $("#modalProblem").textContent = data.problem;
  $("#modalApproach").textContent = data.approach;
  $("#modalTools").textContent = data.tools;
  $("#modalInsights").textContent = data.insights;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeProject() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

$$(".project-link").forEach(button => {
  button.addEventListener("click", () => openProject(button.dataset.project));
});

modalClose?.addEventListener("click", closeProject);
$$("[data-close-modal]").forEach(el => el.addEventListener("click", closeProject));

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeProject();
});

const contactForm = $("#contactForm");
const formNote = $("#formNote");

// Change this address before publishing.
const CONTACT_EMAIL = "your.email@example.com";

contactForm?.addEventListener("submit", event => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "Portfolio enquiry").trim();
  const message = String(formData.get("message") || "").trim();

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message
  ].join("\n");

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
  formNote.textContent = "Your email client should open now. If it does not, check the email address configured in script.js.";
});

$("#year").textContent = new Date().getFullYear();
