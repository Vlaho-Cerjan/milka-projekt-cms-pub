export const getEUR = async () => {
    const hnb_data = await fetch('/api/getCurrencyData');

    const data: {
        hnb_data: {
        broj_tecajnice: string,
        datum_primjene: string,
        drzava: string,
        drzava_iso: string,
        sifra_valute: string,
        valuta: string,
        jedinica: number,
        kupovni_tecaj: string,
        srednji_tecaj: string,
        prodajni_tecaj: string
        }
    } = await hnb_data.json();

    return data.hnb_data.prodajni_tecaj.replace(',', '.');
}