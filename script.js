
  
  // ==========================
  // 2. زر الرجوع للأعلى
  // ==========================
  const topBtn = document.createElement("button");
  topBtn.innerText = "⬆";
  topBtn.id = "topBtn";
  document.body.appendChild(topBtn);
  
  topBtn.style.cssText = `
    position: fixed;
    bottom: 25px;
    right: 25px;
    background:#3e2c1c;
    color: white;
    border:none;
    padding:10px 15px;
    border-radius:50%;
    font-size:18px;
    cursor:pointer;
    display:none;
  `;
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      topBtn.style.display = "block";
    } else {
      topBtn.style.display = "none";
    }
  });
  
  topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  
  // ==========================
  // 3. اظهار العناصر أثناء التمرير (Fade in)
  // ==========================
  const items = document.querySelectorAll(".menu-section, .about-section, .intro, .contact-section");
  
  function showOnScroll() {
    items.forEach(item => {
      const position = item.getBoundingClientRect().top;
      if (position < window.innerHeight - 100) {
        item.classList.add("show");
      }
    });
  }
  
  window.addEventListener("scroll", showOnScroll);
  showOnScroll();
  
  // ==========================
  // 4. تفعيل النموذج برسالة ناجحة وبسيطة
  // ==========================
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("✔ تم إرسال رسالتك بنجاح! سيتم الرد عليك قريبًا ☕");
      form.reset();
    });
  }
  
  