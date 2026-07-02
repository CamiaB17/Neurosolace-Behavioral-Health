/* ═══════════════════════════════════════════
   CONTACT / BOOKING FORM SUBMISSION
   ═══════════════════════════════════════════ */

const CONTACT_CONFIG = {
  emailjsPublicKey: "7P8IgrpJMbG7ULk8e",
  emailjsService: "service_pwe0fhv",
  emailjsTemplate: "template_hzjqy4u"
};

document.addEventListener("DOMContentLoaded", () => {
  emailjs.init(CONTACT_CONFIG.emailjsPublicKey);
});

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector(".btn-send");
  const originalText = submitBtn.textContent;

  const preferredDateRaw = document.getElementById("preferredDate").value;
  const preferredDate = preferredDateRaw
    ? new Date(preferredDateRaw + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "No preference given";

  const params = {
    first_name: document.getElementById("firstName").value,
    last_name: document.getElementById("lastName").value,
    patient_name: `${document.getElementById("firstName").value} ${document.getElementById("lastName").value}`.trim(),
    patient_email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    visit_mode: "Telehealth",
    insurance: document.getElementById("insurance").value,
    member_id: document.getElementById("memberId").value || "Not provided",
    date: preferredDate,
    time: document.getElementById("preferredTime").value || "No preference given",
    message: document.getElementById("message").value
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  try {
    await emailjs.send(
      CONTACT_CONFIG.emailjsService,
      CONTACT_CONFIG.emailjsTemplate,
      params
    );

    submitBtn.textContent = "Message Sent ✓";
    submitBtn.style.background = "#4e7260";

    setTimeout(() => {
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.style.background = "";
      submitBtn.disabled = false;
    }, 4000);

  } catch (err) {
    console.error("EmailJS send failed:", err);
    submitBtn.textContent = "Something went wrong — try again";
    submitBtn.style.background = "#a13a3a";

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = "";
      submitBtn.disabled = false;
    }, 3500);
  }
});