// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
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
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const hnb_res = await fetch("https://api.hnb.hr/tecajn/v2?valuta=EUR");

    const hnb_data = await hnb_res.json();

    const data: {
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
    } = hnb_data[0]

    res.status(200).json({ hnb_data: data })
}
