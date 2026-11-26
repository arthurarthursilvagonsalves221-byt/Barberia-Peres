(() => {
  const root = document.documentElement;
  const intro = document.getElementById("intro");
  const form = document.getElementById("loginForm");
  const password = document.getElementById("password");
  const toggle = document.getElementById("togglePassword");
  const feedback = document.getElementById("feedback");
  const submit = form.querySelector('button[type="submit"]');

  document.getElementById("year").textContent = new Date().getFullYear();

  function finishIntro() {
    root.classList.remove("intro-pending");
    root.classList.add("intro-done");
    window.setTimeout(() => intro.remove(), 750);
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finishIntro();
  } else {
    window.setTimeout(finishIntro, 2300);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && root.classList.contains("intro-pending")) {
        finishIntro();
      }
    });
  }

  toggle.addEventListener("click", () => {
    const showing = password.type === "password";
    password.type = showing ? "text" : "password";
    toggle.setAttribute("aria-pressed", String(showing));
    toggle.setAttribute(
      "aria-label",
      showing ? "Ocultar senha" : "Mostrar senha",
    );
  });

  document.getElementById("forgotLink").addEventListener("click", (event) => {
    event.preventDefault();
    feedback.textContent =
      "Entre em contato com o responsável pelo sistema para redefinir sua senha.";
  });

  form.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      feedback.textContent =
        "Esta opção precisa ser conectada ao sistema para ficar disponível.";
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback.textContent = "";
    if (!form.reportValidity()) return;

    submit.disabled = true;
    submit.querySelector("span").textContent = "Validando acesso...";
    window.setTimeout(() => {
      feedback.textContent =
        "A tela está pronta, mas a autenticação precisa ser conectada ao sistema.";
      submit.disabled = false;
      submit.querySelector("span").textContent = "Entrar na minha agenda";
    }, 850);
  });
})();