"use strict";
// Gerado a partir de src/main.ts (rode "npm.cmd run build" para regenerar)
const WHATSAPP = "5521999999999";
const itens = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("js");
    const io = new IntersectionObserver(entries => entries.forEach(i => {
        if (i.isIntersecting) {
            i.target.classList.add("visivel");
            io.unobserve(i.target);
        }
    }), { threshold: 0.05 });
    itens.forEach(el => io.observe(el));
    setTimeout(() => itens.forEach(el => el.classList.add("visivel")), 2500);
}
function mensagem(nome, nascimento, consulta) {
    const [a, m, d] = nascimento.split("-");
    return `Olá! Meu nome é ${nome}, nasci em ${d}/${m}/${a} e gostaria de agendar uma consulta ${consulta.toLowerCase()}.`;
}
const form = document.querySelector("#form-agendar");
const erro = document.querySelector("#erro");
form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const dados = new FormData(form);
    const nome = String(dados.get("nome") ?? "").trim();
    const nascimento = String(dados.get("nascimento") ?? "");
    const consulta = dados.get("consulta");
    if (nome.length < 3 || !nascimento || !consulta) {
        if (erro)
            erro.textContent = "Preencha nome, data de nascimento e tipo de consulta.";
        return;
    }
    if (erro)
        erro.textContent = "";
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem(nome, nascimento, consulta))}`;
    window.open(url, "_blank", "noopener");
});
const toggle = document.querySelector("#menu-toggle");
const nav = document.querySelector("#nav");
toggle?.addEventListener("click", () => {
    const aberto = nav?.classList.toggle("aberto");
    toggle.setAttribute("aria-expanded", String(!!aberto));
});
nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("aberto")));