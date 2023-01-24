import express from 'express';
import cors from 'cors';
import { Prisma, PrismaClient } from "@prisma/client";
import urlServer from './config/server.js';
import fs from 'fs';

const corsOptions = {
    origin: urlServer,
}

const RemoveNullValues = (obj) => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== null) {
            acc[key] = value;
        }
        return acc;
    }, {});
}

const SaveImageToDir = async (image, name, tempPath) => {
    const path = tempPath ? process.cwd() + tempPath : process.cwd() + '/public/images/';
    // set random string if name is not set
    const randomName = Math.random().toString(36).substring(7);
    const tempName = name || randomName;
    // remove data:image/png;base64, from base64 string
    const base64Data = image.split(';base64,').pop();
    // save image to directory
    const pathToSave = path + tempName + ".png";
    fs.writeFile(pathToSave, base64Data, { encoding: "base64" }, function (err) {
        if (err) {
            console.log(err);
        }
    });

    return tempName + ".png";
}

const prisma = new PrismaClient()
// Initialize Express
const app = express();

app.use(cors(corsOptions));
app.use(express.json({
    limit: '50mb'
}));

// Page Info Routes

app.post("/prisma/page_info", async (req, res) => {
    if (typeof req.body.image !== "undefined" && req.body.image) {
        const imageName =  await SaveImageToDir(req.body.image, null, "/public/images/page_info/");
        if(imageName) req.body.image = "/images/page_info/" + imageName;
    }

    prisma.page_info.create({
        data: RemoveNullValues({
            title: req.body.title,
            page_title: req.body.page_title,
            page_description: req.body.page_description,
            openGraphType: req.body.openGraphType,
            image: req.body.image,
            create_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }),
    })
        .then((data) => {
            res.status(200).json(data);
        }
        )
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                    res.status(400).json({
                        success: false,
                        error: "Duplicate entry"
                    });
                }
            }
            res.status(400).json({
                success: false,
                error: error
            })
        }
        )
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
});

app.put("/prisma/page_info", async (req, res) => {
    if (typeof req.body.image !== "undefined" && req.body.image) {
        const imageName =  await SaveImageToDir(req.body.image, null, "/public/images/page_info/");
        if(imageName) req.body.image = "/images/page_info/" + imageName;
    }

    prisma.page_info.update({
        where: {
            id: req.body.id,
        },
        data: RemoveNullValues({
            title: req.body.title,
            page_title: req.body.page_title,
            page_description: req.body.page_description,
            openGraphType: req.body.openGraphType || "website",
            image: req.body.image || "",
            update_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }),
    })
        .then((data) => {
            res.status(200).json(data);
        }
        )
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                    res.status(400).json({
                        success: false,
                        error: "Duplicate entry"
                    });
                }
            }
            res.status(400).json({
                success: false,
                error: error
            })
        }
        )
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
});

// Company Info Routes

app.get("/prisma/company_info", (req, res) => {
    prisma.company_info.findFirst(
        {
            where: {
                id: 1,
            },
        }
    )
        .then((data) => {
            res.status(200).json(data);
        }
        )
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                    res.status(400).json({
                        success: false,
                        error: "Duplicate entry"
                    });
                }
            }
            res.status(400).json({
                success: false,
                error: error
            })
        }
        )
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
});

app.put("/prisma/company_info", (req, res) => {
    prisma.company_info.update({
        where: {
            id: req.body.id,
        },
        data: RemoveNullValues({
            name: req.body.name,
            title: req.body.title,
            email: req.body.email,
            url: req.body.url,
            working_hours: req.body.working_hours,
            address: req.body.address,
            address_short: req.body.address_short,
            address_url: req.body.address_url,
            phone: req.body.phone,
            coords: req.body.coords,
        })
    })
        .then((data) => {
            res.status(200).json(data);
        }
        )
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                    res.status(400).json({
                        success: false,
                        error: "Duplicate entry"
                    });
                }
            }
            res.status(400).json({
                success: false,
                error: error
            })
        }
        )
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
});

// Navigation Routes

app.get("/prisma/navigation", (_req, res) => {
    prisma.navigation.findMany()
        .then((data) => {
            res.status(200).json(data);
        }
        )
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                    res.status(400).json({
                        success: false,
                        error: "Duplicate entry"
                    });
                }
            }
            res.status(400).json({
                success: false,
                error: error
            })
        }
        )
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
});

app.post("/prisma/navigation", (req, res) => {
    const tempData = RemoveNullValues({
        name: req.body.name,
        href: req.body.href,
        type: req.body.href !== "#" ? "link" : "button",
        nav_order: req.body.nav_order,
        active: req.body.active,
    });

    prisma.navigation.create({
        data: {
            ...tempData,
            parent_id: req.body.parent_id !== -1 ? req.body.parent_id : null,
            create_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
    })
        .then((data) => {
            res.status(200).json(data);
        }
        )
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                    res.status(400).json({
                        success: false,
                        error: "Duplicate entry"
                    });
                }
            }
            res.status(400).json({
                success: false,
                error: error
            })
        }
        )
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
});

app.put("/prisma/navigation", (req, res) => {
    const tempData = RemoveNullValues({
        name: req.body.name,
        href: req.body.href,
        type: req.body.href !== "#" ? "link" : "button",
        nav_order: req.body.nav_order,
        active: req.body.active,
    });

    prisma.navigation.update({
        where: {
            id: req.body.id,
        },
        data: {
            ...tempData,
            parent_id: req.body.parent_id !== -1 ? req.body.parent_id : null,
            update_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
    })
        .then((data) => {
            res.status(200).json(data);
        }
        )
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                    res.status(400).json({
                        success: false,
                        error: "Duplicate entry"
                    });
                }
            }
            res.status(400).json({
                success: false,
                error: error
            })
        }
        )
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
});

app.put("/prisma/navigation/order", (req, res) => {
    const { orderedIds } = req.body;

    let errors = [];

    orderedIds.forEach(async (id, index) => {
        await prisma.navigation.update({
            where: {
                id: id,
            },
            data: {
                nav_order: index,
            }
        })
            .then((data) => {
                return data;
            }
            )
            .catch((error) => {
                errors.push(error);
            }
            );
    });

    if (errors.length > 0) {
        res.status(400).json({
            success: false,
            message: "Order not updated",
            errors: errors
        });
    }

    res.status(200).json({
        success: true,
        message: "Order updated"
    });

    prisma.$disconnect();
});

// Social Media Routes

app.get("/prisma/socials", (_req, res) => {
    prisma.socials.findMany({
        where: {
            active: 1,
        }
    })
        .then((data) => {
            res.status(200).json(data);
        }
        )
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                    res.status(400).json({
                        success: false,
                        error: "Duplicate entry"
                    });
                }
            }
            res.status(400).json({
                success: false,
                error: error
            })
        }
        )
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
});

app.post("/prisma/socials", (req, res) => {
    prisma.socials.create({
        data: RemoveNullValues({
            name: req.body.name,
            href: req.body.href,
            type: req.body.type,
            create_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }),
    })
        .then((data) => {
            res.status(200).json(data);
        }
        )
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                    res.status(400).json({
                        success: false,
                        error: "Duplicate entry"
                    });
                }
            }
            res.status(400).json({
                success: false,
                error: error
            })
        }
        )
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
});

// Soft Delete

app.delete("/prisma/socials", (req, res) => {
    prisma.socials.update({
        where: {
            id: req.body.id
        },
        data: {
            active: 0,
            delete_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
    })
        .then((data) => {
            res.status(200).json(data);
        }
        )
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                    res.status(400).json({
                        success: false,
                        error: "Duplicate entry"
                    });
                }
            }
            res.status(400).json({
                success: false,
                error: error
            })
        }
        )
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
});

app.put("/prisma/socials", (req, res) => {
    prisma.socials.update({
        where: {
            id: req.body.id,
        },
        data: RemoveNullValues({
            name: req.body.name,
            href: req.body.href,
            type: req.body.type,
            update_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        })
    })
        .then((data) => {
            res.status(200).json(data);
        }
        )
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                    res.status(400).json({
                        success: false,
                        error: "Duplicate entry"
                    });
                }
            }
            res.status(400).json({
                success: false,
                error: error
            })
        }
        )
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
});

// doctors routes

// get doctors with filter where first_name or last_name has the filter string in it ignore cases

app.post("/prisma/doctors/filter", (req, res) => {
    if (req.body.filter !== "" || req.body.filter !== null || typeof req.body.filter !== undefined) {
        prisma.doctors.findMany({
            where: {
                OR: [
                    {
                        first_name: {
                            startsWith: req.body.filter,
                        },
                    },
                    {
                        aditional_names: {
                            contains: req.body.filter,
                        }
                    },
                    {
                        last_name: {
                            contains: req.body.filter,
                        },
                    },
                ],
            }
        })
            .then((data) => {
                res.status(200).json({
                    success: true,
                    doctors: data,
                });
            }
            )
            .catch((error) => {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    // The .code property can be accessed in a type-safe manner
                    if (error.code === 'P2002') {
                        res.status(400).json({
                            success: false,
                            error: "Duplicate entry"
                        });
                    }
                }
                res.status(400).json({
                    success: false,
                    error: error
                })
            }
            )
            .finally(async () => {
                await prisma.$disconnect();
            }
            );
    }
});

app.post("/prisma/doctors", (req, res) => {
    prisma.doctors.create({
        data: RemoveNullValues({
            name: req.body.name,
            description: req.body.description,
            create_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }),
    })
        .then((data) => {
            res.status(200).json(data);
        }
        )
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                    res.status(400).json({
                        success: false,
                        error: "Duplicate entry"
                    });
                }
            }
            res.status(400).json({
                success: false,
                error: error
            })
        }
        )
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
});

// services routes

app.get("/prisma/services", (req, res) => {
    prisma.services.findMany({
        where: {
            active: 1
        },
        orderBy: {
            item_order: "asc"
        }
    })
        .then((data) => {
            res.status(200).json(data);
        }
        )
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                    res.status(400).json({
                        success: false,
                        error: "Duplicate entry"
                    });

                }
            }
            res.status(400).json({
                success: false,
                error: error.toString()
            })
        }
        )
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
});

app.post("/prisma/services", async (req, res) => {
    if (typeof req.body.img_src !== "undefined" && req.body.img_src) {
        const imageName =  await SaveImageToDir(req.body.img_src, null, "/public/images/home/");
        if(imageName) req.body.img_src = "/images/home/" + imageName;
    }

    const getOrder = await prisma.services.findMany({
        orderBy: {
            item_order: "desc"
        },
        take: 1
    }).then((data) => {
        console.log(data, 'data order');
        return data[0].item_order + 1;
    }).catch((error) => {
        console.log(error, 'error order');
        return -1;
    });

    if (getOrder === -1) {
        res.status(400).json({
            success: false,
            error: "Error getting order"
        });
        return;
    }

    const tempData = RemoveNullValues({
        name: req.body.name,
        slug: req.body.slug,
        active: req.body.active,
        img_src: req.body.img_src
    })

    prisma.services.create({
        data: {
            ...tempData,
            description: req.body.description,
            alt: req.body.alt,
            doctors_id: req.body.doctors_id.toString(),
            create_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
            item_order: getOrder
        },
    })
        .then((data) => {
            res.status(200).json({
                success: true,
                service: data,
            });
        }
        )
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                    res.status(400).json({
                        success: false,
                        error: "Duplicate entry"
                    });
                }
            }

            console.log(error, 'error service');

            res.status(400).json({
                success: false,
                error: error
            })
        })
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
});

app.put("/prisma/services", async (req, res) => {
    if (typeof req.body.img_src !== "undefined" && req.body.img_src) {
        const imageName =  await SaveImageToDir(req.body.img_src, null, "/public/images/home/");
        if(imageName) req.body.img_src = "/images/home/" + imageName;
    }

    const tempData = RemoveNullValues({
        name: req.body.name,
        slug: req.body.slug,
        active: req.body.active,
        img_src: req.body.img_src
    })

    prisma.services.update({
        where: {
            id: req.body.id,
        },
        data: {
            ...tempData,
            description: req.body.description,
            alt: req.body.alt,
            doctors_id: req.body.doctors_id,
            update_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
    })
        .then((data) => {
            res.status(200).json({
                success: true,
                service: data,
            });
        }
        )
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                    res.status(400).json({
                        success: false,
                        error: "Duplicate entry"
                    });
                }
            }

            res.status(400).json({
                success: false,
                error: error
            });

            throw error;
        }
        )
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
});

// delete service route with soft delete and id in route

app.delete("/prisma/services/:id", async (req, res) => {
    prisma.services.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: {
            active: 0,
            update_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
            delete_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
    })
        .then((data) => {
            res.status(200).json({
                success: true,
                service: data,
            });
        }
        )
        .catch((error) => {
            console.log(error, 'error service delete');
            res.status(400).json({
                success: false,
                error: error
            });
        }
        )
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
});

// services order route

app.put("/prisma/services/order", async (req, res) => {
    const { orderedIds } = req.body;

    let errors = [];

    orderedIds.forEach(async (id, index) => {
        await prisma.services.update({
            where: {
                id: id,
            },
            data: {
                item_order: index,
            }
        })
            .then((data) => {
                return data;
            }
            )
            .catch((error) => {
                errors.push(error);
            }
            );
    });

    if (errors.length > 0) {
        res.status(400).json({
            success: false,
            message: "Order not updated",
            errors: errors
        });
    }

    res.status(200).json({
        success: true,
        message: "Order updated"
    });

    prisma.$disconnect();
});

// Subservices routes

app.post("/prisma/subservices", async (req, res) => {
    if (typeof req.body.img_src !== "undefined" && req.body.img_src) {
        const imageName =  await SaveImageToDir(req.body.img_src, null, "/public/images/home/");
        if(imageName) req.body.img_src = "/images/home/" + imageName;
    }

    const tempData = RemoveNullValues({
        name: req.body.name,
        slug: req.body.slug,
        active: req.body.active,
        img_src: req.body.img_src
    })

    prisma.subservices.create({
        data: {
            ...tempData,
            description: req.body.description,
            alt: req.body.alt,
            services_id: req.body.services_id,
            create_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        },
    })
        .then((data) => {
            res.status(200).json({
                success: true,
                subservice: data,
            });
        }
        )
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                    res.status(400).json({
                        success: false,
                        error: "Duplicate entry"
                    });
                }
            }
            res.status(400).json({
                success: false,
                error: error
            })
        })
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
});

app.put("/prisma/subservices", async (req, res) => {
    if (typeof req.body.img_src !== "undefined" && req.body.img_src) {
        const imageName =  await SaveImageToDir(req.body.img_src, null, "/public/images/home/");
        if(imageName) req.body.img_src = "/images/home/" + imageName;
    }

    const tempData = RemoveNullValues({
        name: req.body.name,
        slug: req.body.slug,
        active: req.body.active,
        img_src: req.body.img_src
    })

    prisma.subservices.update({
        where: {
            id: req.body.id,
        },
        data: {
            ...tempData,
            description: req.body.description,
            alt: req.body.alt,
            services_id: req.body.services_id,
            update_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
    })
        .then((data) => {
            res.status(200).json({
                success: true,
                subservice: data,
            });
        }
        )
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                    res.status(400).json({
                        success: false,
                        error: "Duplicate entry"
                    });
                }
            }

            res.status(400).json({
                success: false,
                error: error
            });

            throw error;
        }
        )
        .finally(async () => {
            await prisma.$disconnect();
        }
        );
});

// order subservices

app.post("/prisma/subservices/order", async (req, res) => {
    const { orderedIds } = req.body;

    let errors = [];

    orderedIds.forEach(async (id, index) => {
        await prisma.subservices.update({
            where: {
                id: id,
            },
            data: {
                item_order: index,
            }
        })
            .then((data) => {
                return data;
            }
            )
            .catch((error) => {
                errors.push(error);
            }
            );
    });

    if (errors.length > 0) {
        res.status(400).json({
            success: false,
            message: "Order not updated",
            errors: errors
        });
    }

    res.status(200).json({
        success: true,
        message: "Order updated"
    });

    prisma.$disconnect();
});

// Initialize server
app.listen(5000, () => {
    console.log("Running on port 5000.");
});

export default app;