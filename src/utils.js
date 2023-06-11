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