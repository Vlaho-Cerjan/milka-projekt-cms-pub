import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();


    prisma.admins.findFirst({
        where: {
            email: req.body.email,
            active: 1,
        }
    })
        .then((data) => {
            if (data) {
                const secret = process.env.HASH_SECRET;
                const bytes = CryptoJS.HmacSHA256(req.body.password, secret ? secret : "");
                const hash = bytes.toString(CryptoJS.enc.Hex);

                if (hash === data.password) {
                    res.status(200).json(data);
                }
                else {
                    res.status(400).json({ error: "Wrong password" });
                }
            }
            else {
                res.status(400).json({ error: "Wrong or inactive email" });
            }
        }
        )
        .catch((error) => {
            res.status(400).json(error);
        }
        )
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
}