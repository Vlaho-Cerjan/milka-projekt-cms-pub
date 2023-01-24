import sendgrid from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

const api_key = process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY : "";

sendgrid.setApiKey(api_key);

type Data = {
    error: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
  try {
    // console.log("REQ.BODY", req.body);
    await sendgrid.send({
      to: "recepcija@varela.hr", // Your email where you'll receive emails
      from: "info@varela.hr", // your website email address here
      subject: "Varela.hr - Kontakt forma",
      html: `<div>
        <p>Ime: ${req.body.name+" "+req.body.lastName}</p>
        ${(typeof req.body.email !== "undefined" && req.body.email)
            ? "<p>Email: "+req.body.email+"</p>"
            : ""
        }
        <p>Telefon: ${req.body.phone}</p>
        <p>Poruka:</p>
        <p>${req.body.message}</p>
      </div>`,
    });
  } catch (error: any) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}
