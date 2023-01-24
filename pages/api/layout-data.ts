// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../app/utility/prisma'

type Data = {
  socials: any,
  company_info: any,
  navigation: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const socials = await prisma.socials.findMany();
    const company_info = await prisma.company_info.findFirst();
    const navigation = await prisma.navigation.findMany({
        orderBy: {
            nav_order: 'asc'
        }
    });

    res.status(200).json({ socials, company_info, navigation })
}
