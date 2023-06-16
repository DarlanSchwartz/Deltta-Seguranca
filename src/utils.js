import FileSaver from "file-saver";

export function formatarTelefone(value) {
    const numero = value.replace(/\D/g, '');
    let numeroFormatado = '';

    if (numero.length >= 3) {
        numeroFormatado = `(${numero.substring(0, 2)}) `;

        if (numero.length >= 8) {
            numeroFormatado += `${numero.substring(2, 7)}-`;

            if (numero.length > 6) {
                numeroFormatado += numero.substring(7);
            }
        } else {
            numeroFormatado += numero.substring(2);
        }
    } else {
        numeroFormatado = numero;
    }

    return numeroFormatado;
}

export function formatValorCombinado(valorCombinado) {
    if (valorCombinado == '') {
        return valorCombinado;
    }

    return 'R$ ' + valorCombinado;
}

export function converterValorPorExtenso(valor) {

    const string = valor.toString().extenso() + ' reais';
    const primeiraLetra = string.charAt(0).toUpperCase();
    const restoDaString = string.slice(1).toLowerCase();
    return primeiraLetra + restoDaString;
}

export function obterMesAtualPorExtenso() {
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth();

    return meses[mesAtual];
}

export function obterAnoAtual() {

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();

    return anoAtual;
}

String.prototype.extenso = function (c) {
    var ex = [
        ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
        ["dez", "vinte", "trinta", "quarenta", "cinqüenta", "sessenta", "setenta", "oitenta", "noventa"],
        ["cem", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"],
        ["mil", "milhão", "bilhão", "trilhão", "quadrilhão", "quintilhão", "sextilhão", "setilhão", "octilhão", "nonilhão", "decilhão", "undecilhão", "dodecilhão", "tredecilhão", "quatrodecilhão", "quindecilhão", "sedecilhão", "septendecilhão", "octencilhão", "nonencilhão"]
    ];
    var a, n, v, i, n = this.replace(c ? /[^,\d]/g : /\D/g, "").split(","), e = " e ", $ = "real", d = "centavo", sl;
    for (var f = n.length - 1, l, j = -1, r = [], s = [], t = ""; ++j <= f; s = []) {
        j && (n[j] = (("." + n[j]) * 1).toFixed(2).slice(2));
        if (!(a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g), v = l % 3 ? [v.slice(0, l % 3)] : [], v = a ? v.concat(a) : v).length) continue;
        for (a = -1, l = v.length; ++a < l; t = "") {
            if (!(i = v[a] * 1)) continue;
            i % 100 < 20 && (t += ex[0][i % 100]) ||
                i % 100 + 1 && (t += ex[1][(i % 100 / 10 >> 0) - 1] + (i % 10 ? e + ex[0][i % 10] : ""));
            s.push((i < 100 ? t : !(i % 100) ? ex[2][i == 100 ? 0 : i / 100 >> 0] : (ex[2][i / 100 >> 0] + e + t)) +
                ((t = l - a - 2) > -1 ? " " + (i > 1 && t > 0 ? ex[3][t].replace("ão", "ões") : ex[3][t]) : ""));
        }
        a = ((sl = s.length) > 1 ? (a = s.pop(), s.join(" ") + e + a) : s.join("") || ((!j && (n[j + 1] * 1 > 0) || r.length) ? "" : ex[0][0]));
        a && r.push(a + (c ? (" " + (v.join("") * 1 > 1 ? j ? d + "s" : (/0{6,}$/.test(n[0]) ? "de " : "") + $.replace("l", "is") : j ? d : $)) : ""));
    }
    return r.join(e);
}

export function saveClients(clients)
{
    saveClientsOnCookies(clients);
}

export function loadClients()
{
   return loadClientsFromCookies();
}

// COOKIE MANIPULATION FUNCTIONS

function saveClientsOnCookies(clients)
{
    localStorage.setItem('clients',JSON.stringify(clients));
}

function loadClientsFromCookies()
{
    const clients = JSON.parse(localStorage.getItem('clients'));

    if( clients == undefined)
    {
        return [];
    }

    return clients;
}

// SAVE CLIENT TEXT FILE BACKUP

export function saveClientsTextFile(clients, fileName = "clients.txt") {
    const data = JSON.stringify(clients, null, 2);
    var blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, fileName);
}
