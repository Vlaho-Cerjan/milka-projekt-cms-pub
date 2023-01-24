import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { RemoveNullValues } from '../../../app/utility/removeNullValues';
import { SaveImageToDir } from '../../../app/utility/saveImageToDir';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();

    switch (req.body.action) {
        case 'create':
            if(req.body.image){
                req.body.image = SaveImageToDir(req.body.image);
            }

            prisma.page_info.create({
                data: RemoveNullValues({
                    title: req.body.title,
                    page_title: req.body.page_title,
                    page_description: req.body.page_description,
                    openGraphType: req.body.openGraphType,
                    image: req.body.image,
                    create_at: new Date().toString(),
                }),
            })
                .then((data) => {
                    res.status(200).json(data);
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
            break;
        case 'update':
            if(req.body.image){
                req.body.image = SaveImageToDir(req.body.image);
            }

            prisma.page_info.update({
                where: {
                    id: req.body.id,
                },
                data: RemoveNullValues({
                    title: req.body.title,
                    page_title: req.body.page_title,
                    page_description: req.body.page_description,
                    openGraphType: req.body.openGraphType,
                    image: req.body.image,
                    update_at: new Date().toString(),
                }),
            })
                .then((data) => {
                    res.status(200).json(data);
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
            break;
        case 'delete':
            prisma.page_info.delete({
                where: {
                    id: req.body.id,
                },
            })
                .then((data) => {
                    res.status(200).json(data);
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
            break;
        default:
            res.status(400).json({ error: 'Invalid action' });
            break;

    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};