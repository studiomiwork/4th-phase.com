const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

const inquiryForm = document.querySelector(".inquiry-form");

if (inquiryForm) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(inquiryForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const inquiry = String(formData.get("inquiry") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = `Fourth Phase Inquiry - ${inquiry || "General"}`;
    const body = [
      "Fourth Phase Website Inquiry",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Inquiry: ${inquiry}`,
      "",
      "Message:",
      message,
    ].join("\n");

    window.location.href = `mailto:info@4th-phase.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  });
}
