// CONFIGURE AQUI: DDI + DDD + número, só dígitos
const WHATSAPP = "5521999999999";

type Consulta = "Online" | "Presencial";

// Animação de entrada ao rolar (com segurança: se algo falhar, o conteúdo continua visível)
const itens = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("js");
    const io = new IntersectionObserver(entries => entries.forEach(i => {
        if (i.isIntersecting) { i.target.classList.add("visivel"); io.unobserve(i.target); }
    }), { threshold: 0.05 });
    itens.forEach(el => io.observe(el));
    setTimeout(() => itens.forEach(el => el.classList.add("visivel")), 2500);
}

function mensagem(nome: string, nascimento: string, consulta: Consulta): string {
    const [a, m, d] = nascimento.split("-");
    return `Olá! Meu nome é ${nome}, nasci em ${d}/${m}/${a} e gostaria de agendar uma consulta ${consulta.toLowerCase()}.`;
}

const form = document.querySelector<HTMLFormElement>("#form-agendar");
const erro = document.querySelector<HTMLElement>("#erro");
form?.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const dados = new FormData(form);
    const nome = String(dados.get("nome") ?? "").trim();
    const nascimento = String(dados.get("nascimento") ?? "");
    const consulta = dados.get("consulta") as Consulta | null;

    if (nome.length < 3 || !nascimento || !consulta) {
        if (erro) erro.textContent = "Preencha nome, data de nascimento e tipo de consulta.";
        return;
    }
    if (erro) erro.textContent = "";
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem(nome, nascimento, consulta))}`;
    window.open(url, "_blank", "noopener");
});

// Menu mobile
const toggle = document.querySelector<HTMLButtonElement>("#menu-toggle");
const nav = document.querySelector<HTMLElement>("#nav");
toggle?.addEventListener("click", () => {
    const aberto = nav?.classList.toggle("aberto");
    toggle.setAttribute("aria-expanded", String(!!aberto));
});
nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("aberto")));