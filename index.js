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

// add preflight OPTIONS request for all routes
app.options('*', cors(corsOptions));

// Page Info Routes

app.post("/prisma/page_info", async (req, res) => {
    if (typeof req.body.image !== "undefined" && req.body.image) {
        const imageName = await SaveImageToDir(req.body.image, null, "/public/images/page_info/");
        if (imageName) req.body.image = "/images/page_info/" + imageName;
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
        const imageName = await SaveImageToDir(req.body.image, null, "/public/images/page_info/");
        if (imageName) req.body.image = "/images/page_info/" + imageName;
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

app.post("/prisma/doctors", async (req, res) => {
    if (typeof req.body.img_src !== "undefined" && req.body.img_src) {
        const imageName = await SaveImageToDir(req.body.img_src, null, "/public/images/doctors/");
        if (imageName) req.body.img_src = "/images/doctors/" + imageName;
    }

    prisma.doctors.create({
        data: RemoveNullValues({
            first_name: req.body.first_name,
            aditional_names: req.body.aditional_names,
            last_name: req.body.last_name,
            title: req.body.title,
            bio: req.body.bio,
            email: req.body.email,
            phone: req.body.phone,
            img_src: req.body.img_src,
            slug: req.body.slug,
            alt: req.body.alt,
            active: 1,
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

app.put("/prisma/doctors", async (req, res) => {
    if (typeof req.body.img_src !== "undefined" && req.body.img_src) {
        const imageName = await SaveImageToDir(req.body.img_src, null, "/public/images/doctors/");
        if (imageName) req.body.img_src = "/images/doctors/" + imageName;
    }

    prisma.doctors.update({
        where: {
            id: req.body.id,
        },
        data: RemoveNullValues({
            first_name: req.body.first_name,
            aditional_names: req.body.aditional_names,
            last_name: req.body.last_name,
            title: req.body.title,
            bio: req.body.bio,
            email: req.body.email,
            phone: req.body.phone,
            img_src: req.body.img_src,
            slug: req.body.slug,
            alt: req.body.alt,
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

app.delete("/prisma/doctors", (req, res) => {
    prisma.doctors.update({
        where: {
            id: req.body.id,
        },
        data: {
            active: 0,
            update_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
            delete_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        },
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

// get services with subservices based on the service id
app.get("/prisma/services_with_subservices", (req, res) => {
    prisma.services.findMany({
        where: {
            active: 1
        },
        orderBy: {
            item_order: "asc"
        }
    })
        .then((data) => {
            prisma.subservices.findMany({
                where: {
                    active: 1
                },
                orderBy: {
                    item_order: "asc"
                }
            })
                .then((subservices) => {
                    const services = data.map((service) => {
                        return {
                            ...service,
                            subservices: subservices.filter((subservice) => subservice.usluga_id === service.id)
                        }
                    });
                    res.status(200).json(services);
                })
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
                })
                .finally(async () => {
                    await prisma.$disconnect();
                    return;
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
        const imageName = await SaveImageToDir(req.body.img_src, null, "/public/images/home/");
        if (imageName) req.body.img_src = "/images/home/" + imageName;
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
        .then(async (data) => {
            // if body has services_list then create services_list items for this service
            // service list is an array of objects with name description and highlighted fields
            if (typeof req.body.services_list !== "undefined" && req.body.services_list) {
                const services_list = req.body.services_list;
                const errors = [];
                await services_list.forEach((item, index) => {
                    prisma.services_list.create({
                        data: {
                            name: item.name,
                            description: item.description,
                            highlighted: item.highlighted,
                            usluga_id: data.id,
                            services_order: index,
                            active: 1,
                            create_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                        }
                    })
                        .then((data) => {
                            // if services_prices exists then create services_prices items for this service
                            // services_prices is an array of arrays of objects with title, description, value and discount fields
                            if (typeof req.body.services_prices !== "undefined" && req.body.services_prices) {
                                const services_prices = req.body.services_prices;
                                console.log(services_prices, 'services_prices');
                                services_prices[index].forEach((item) => {
                                    prisma.services_price_list.create({
                                        data: {
                                            title: item.title,
                                            description: item.description,
                                            value: parseFloat(item.value),
                                            discount: parseFloat(item.discount),
                                            service_list_id: data.id,
                                            item_order: index,
                                            active: 1,
                                            create_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                                        }
                                    })
                                        .then((data) => {
                                            console.log(data, 'services_prices item created');
                                        })
                                        .catch((error) => {
                                            console.log(error, 'error services_prices item');
                                        })
                                });
                            }

                            console.log(data, 'services_list item created');
                        })
                        .catch((error) => {
                            console.log(error, 'error services_list item');
                            errors.push(error);
                        })
                });

                if (errors.length > 0) {
                    res.status(400).json({
                        success: false,
                        error: errors
                    });
                    return;
                }
                else res.status(200).json({ success: true });
            }
            else res.status(200).json({ success: true });
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
        const imageName = await SaveImageToDir(req.body.img_src, null, "/public/images/home/");
        if (imageName) req.body.img_src = "/images/home/" + imageName;
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
            // if body has services_list and services_list has id then update services_list items for this service
            // service list is an array of objects with name description and highlighted fields
            if (typeof req.body.services_list !== "undefined" && req.body.services_list) {
                // create temp_order variable inside services_list objects to save order of items
                const services_list_all = req.body.services_list.map((item, index) => {
                    item.temp_order = index;
                    return item;
                });

                // create temp_order variable inside services_prices objects to save order of items
                // services_prices is an array of arrays of objects with title, description, value and discount fields
                const services_prices_all = req.body.services_prices.map((item, index) => {
                    item.forEach((tempItem, tempIndex) => {
                        tempItem.temp_order = tempIndex;
                        tempItem.list_index = index;
                    });
                    return item;
                });
                // separate services_list and services_prices if they have id or not
                const services_list_with_id = services_list_all.filter((item) => item.id);
                const services_list_without_id = services_list_all.filter((item) => !item.id);
                // services_prices_all is an array of arrays of objects with id, title, description, value and discount fields
                // services_prices_with_id is an array of objects with id, title, description, value and discount fields
                // services_prices_without_id is an array of arrays of objects with title, description, value and discount fields
                // filter services_prices_all to get services_prices_with_id and services_prices_without_id by checking if objects inside array of arrays have id or not and then filter objects with id and without id
                const services_prices_with_id = services_prices_all.map((item) => item.filter((tempItem) => typeof tempItem.id !== "undefined"));
                const services_prices_without_id = services_prices_all.map((item) => item.filter((tempItem) => typeof tempItem.id === "undefined"));

                console.log(services_list_with_id, 'services_list_with_id');
                console.log(services_list_without_id, 'services_list_without_id');

                console.log(services_prices_with_id, 'services_prices_with_id');
                console.log(services_prices_without_id, 'services_prices_without_id');

                // check if services_list_with_id contains all services_list items from database for this service and if not then soft delete them
                prisma.services_list.findMany({
                    where: {
                        usluga_id: req.body.id,
                        active: 1
                    }
                })
                    .then((data) => {
                        data.forEach((item) => {
                            if (!services_list_with_id.some((sl) => sl.id === item.id)) {
                                prisma.services_list.update({
                                    where: {
                                        id: item.id,
                                    },
                                    data: {
                                        active: 0,
                                        update_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
                                        delete_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                                    }
                                })
                                    .then((data) => {
                                        console.log(data, 'services_list item deleted');
                                    })
                                    .catch((error) => {
                                        console.log(error, 'error services_list item');
                                    })
                            }
                        });
                    })
                    .catch((error) => {
                        console.log(error, 'error services_list item');
                    });

                // update services_list items with id
                services_list_with_id.forEach((item, index) => {
                    prisma.services_list.update({
                        where: {
                            id: item.id,
                        },
                        data: RemoveNullValues({
                            name: item.name,
                            description: item.description,
                            highlighted: item.highlighted,
                            services_order: item.temp_order,
                            update_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                        })
                    })
                        .then((data) => {
                            console.log(services_prices_with_id.find((prices) => prices.some(price => price.list_index === index)), 'services_prices_with_id 1');
                            const tempServicesPricesWithId = services_prices_with_id.find((prices) => prices.some(price => price.list_index === index));
                            // if services_prices exists then update services_prices items for this service
                            // services_prices is an array of arrays of objects with title, description, value and discount fields
                            if (typeof tempServicesPricesWithId !== "undefined" && tempServicesPricesWithId) {
                                // check if services_prices_with_id contains all services_prices items from database for this service and if not then soft delete them
                                prisma.services_price_list.findMany({
                                    where: {
                                        service_list_id: item.id,
                                        active: 1
                                    }
                                })
                                    .then((data) => {
                                        data.forEach((tempItemPrice) => {
                                            if (!tempServicesPricesWithId.some((sl) => sl.id === tempItemPrice.id)) {
                                                prisma.services_price_list.update({
                                                    where: {
                                                        id: tempItemPrice.id,
                                                    },
                                                    data: {
                                                        active: 0,
                                                        update_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
                                                        delete_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                                                    }
                                                })
                                                    .then((data) => {
                                                        console.log(data, 'services_prices item deleted');
                                                    })
                                                    .catch((error) => {
                                                        console.log(error, 'error services_prices item');
                                                    })
                                            }
                                        });
                                    })
                                    .catch((error) => {
                                        console.log(error, 'error services_prices item');
                                    });

                                // update services_prices items with id
                                tempServicesPricesWithId.forEach((tempItemPrice) => {
                                    prisma.services_price_list.update({
                                        where: {
                                            id: tempItemPrice.id,
                                        },
                                        data: RemoveNullValues({
                                            title: tempItemPrice.title,
                                            description: tempItemPrice.description,
                                            value: parseFloat(tempItemPrice.value ? tempItemPrice.value : 0),
                                            discount: parseFloat(tempItemPrice.discount ? tempItemPrice.discount : 0),
                                            item_order: tempItemPrice.temp_order,
                                            update_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                                        })
                                    })
                                        .then((data) => {
                                            console.log(data, 'services_prices item updated');
                                        })
                                        .catch((error) => {
                                            console.log(error, 'error services_prices item');
                                        })
                                });

                            }

                            // create services_prices items without id
                            console.log(services_prices_without_id.find((prices) => prices.some(price => price.list_index === index)), 'services_prices_without_id');
                            const tempServicesPricesWithoutId = services_prices_without_id.find((prices) => prices.some(price => price.list_index === index));
                            if (typeof tempServicesPricesWithoutId !== "undefined" && tempServicesPricesWithoutId) {
                                tempServicesPricesWithoutId.forEach((tempItemPrice) => {
                                    prisma.services_price_list.create({
                                        data: RemoveNullValues({
                                            service_list_id: item.id,
                                            title: tempItemPrice.title,
                                            description: tempItemPrice.description,
                                            value: parseFloat(tempItemPrice.value ? tempItemPrice.value : 0),
                                            discount: parseFloat(tempItemPrice.discount ? tempItemPrice.discount : 0),
                                            item_order: tempItemPrice.temp_order,
                                            create_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                                        })
                                    })
                                        .then((data) => {
                                            console.log(data, 'services_prices item created');
                                        })
                                        .catch((error) => {
                                            console.log(error, 'error services_prices item');
                                        })
                                });
                            }
                        })
                        .catch((error) => {
                            console.log(error, 'error services_list item');
                        })
                });

                // create services_list items without id
                services_list_without_id.forEach((item, index) => {
                    prisma.services_list.create({
                        data: RemoveNullValues({
                            usluga_id: req.body.id,
                            name: item.name,
                            description: item.description,
                            highlighted: item.highlighted,
                            services_order: item.temp_order,
                            create_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                        })
                    })
                        .then((data) => {
                            console.log(services_prices_without_id.find((prices) => prices.some(price => price.list_index === index)), 'tempServicesPricesWithoutId 2')
                            // if services_prices exists then create services_prices items for this service
                            // services_prices is an array of arrays of objects with title, description, value and discount fields
                            const tempServicesPrices = services_prices_without_id.find((prices) => prices.some(price => price.list_index === index));
                            if (typeof tempServicesPrices !== "undefined" && tempServicesPrices) {
                                tempServicesPrices.forEach((tempItemPrice) => {
                                    prisma.services_price_list.create({
                                        data: RemoveNullValues({
                                            service_list_id: data.id,
                                            title: tempItemPrice.title,
                                            description: tempItemPrice.description,
                                            value: parseFloat(tempItemPrice.value ? tempItemPrice.value : 0),
                                            discount: parseFloat(tempItemPrice.discount ? tempItemPrice.discount : 0),
                                            item_order: tempItemPrice.temp_order,
                                            create_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                                        })
                                    })
                                        .then((data) => {
                                            console.log(data, 'services_prices item created');
                                        })
                                        .catch((error) => {
                                            console.log(error, 'error services_prices item');
                                        })
                                });
                            }
                        })
                        .catch((error) => {
                            console.log(error, 'error services_list item');
                        })
                });

                res.status(200).json({
                    success: true,
                    service: data,
                });
            }
        })
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
        const imageName = await SaveImageToDir(req.body.img_src, null, "/public/images/home/");
        if (imageName) req.body.img_src = "/images/home/" + imageName;
    }

    const getOrder = await prisma.subservices.findMany({
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

    prisma.subservices.create({
        data: {
            ...tempData,
            description: req.body.description,
            alt: req.body.alt,
            usluga_id: req.body.usluga_id,
            doctors_id: req.body.doctors_id.toString(),
            create_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
            item_order: getOrder
        },
    })
        .then(async (data) => {
            // if body has services_list then create services_list items for this service
            // service list is an array of objects with name description and highlighted fields
            if (typeof req.body.services_list !== "undefined" && req.body.services_list) {
                const services_list = req.body.services_list;
                const errors = [];
                await services_list.forEach((item, index) => {
                    prisma.services_list.create({
                        data: {
                            name: item.name,
                            description: item.description,
                            highlighted: item.highlighted,
                            pod_usluga_id: data.id,
                            services_order: index,
                            active: 1,
                            create_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                        }
                    })
                        .then((data) => {
                            // if services_prices exists then create services_prices items for this service
                            // services_prices is an array of arrays of objects with title, description, value and discount fields
                            if (typeof req.body.services_prices !== "undefined" && req.body.services_prices) {
                                const services_prices = req.body.services_prices;
                                console.log(services_prices, 'services_prices');
                                services_prices[index].forEach((item) => {
                                    prisma.services_price_list.create({
                                        data: {
                                            title: item.title,
                                            description: item.description,
                                            value: parseFloat(item.value),
                                            discount: parseFloat(item.discount),
                                            service_list_id: data.id,
                                            item_order: index,
                                            active: 1,
                                            create_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                                        }
                                    })
                                        .then((data) => {
                                            console.log(data, 'services_prices item created');
                                        })
                                        .catch((error) => {
                                            console.log(error, 'error services_prices item');
                                        })
                                });
                            }

                            console.log(data, 'services_list item created');
                        })
                        .catch((error) => {
                            console.log(error, 'error services_list item');
                            errors.push(error);
                        })
                });

                if (errors.length > 0) {
                    res.status(400).json({
                        success: false,
                        error: errors
                    });
                    return;
                }
                else res.status(200).json({ success: true });
            }
            else res.status(200).json({ success: true });
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

app.put("/prisma/subservices", async (req, res) => {
    if (typeof req.body.img_src !== "undefined" && req.body.img_src) {
        const imageName = await SaveImageToDir(req.body.img_src, null, "/public/images/home/");
        if (imageName) req.body.img_src = "/images/home/" + imageName;
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
            usluga_id: req.body.usluga_id,
            doctors_id: req.body.doctors_id,
            update_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
    })
        .then((data) => {
            // if body has services_list and services_list has id then update services_list items for this service
            // service list is an array of objects with name description and highlighted fields
            if (typeof req.body.services_list !== "undefined" && req.body.services_list) {
                // create temp_order variable inside services_list objects to save order of items
                const services_list_all = req.body.services_list.map((item, index) => {
                    item.temp_order = index;
                    return item;
                });

                // create temp_order variable inside services_prices objects to save order of items
                // services_prices is an array of arrays of objects with title, description, value and discount fields
                const services_prices_all = req.body.services_prices.map((item, index) => {
                    item.forEach((tempItem, tempIndex) => {
                        tempItem.temp_order = tempIndex;
                        tempItem.list_index = index;
                    });
                    return item;
                });
                // separate services_list and services_prices if they have id or not
                const services_list_with_id = services_list_all.filter((item) => item.id);
                const services_list_without_id = services_list_all.filter((item) => !item.id);
                // services_prices_all is an array of arrays of objects with id, title, description, value and discount fields
                // services_prices_with_id is an array of objects with id, title, description, value and discount fields
                // services_prices_without_id is an array of arrays of objects with title, description, value and discount fields
                // filter services_prices_all to get services_prices_with_id and services_prices_without_id by checking if objects inside array of arrays have id or not and then filter objects with id and without id
                const services_prices_with_id = services_prices_all.map((item) => item.filter((tempItem) => typeof tempItem.id !== "undefined"));
                const services_prices_without_id = services_prices_all.map((item) => item.filter((tempItem) => typeof tempItem.id === "undefined"));

                console.log(services_list_with_id, 'services_list_with_id');
                console.log(services_list_without_id, 'services_list_without_id');

                console.log(services_prices_with_id, 'services_prices_with_id');
                console.log(services_prices_without_id, 'services_prices_without_id');

                // check if services_list_with_id contains all services_list items from database for this service and if not then soft delete them
                prisma.services_list.findMany({
                    where: {
                        pod_usluga_id: req.body.id,
                        active: 1
                    }
                })
                    .then((data) => {
                        data.forEach((item) => {
                            if (!services_list_with_id.some((sl) => sl.id === item.id)) {
                                prisma.services_list.update({
                                    where: {
                                        id: item.id,
                                    },
                                    data: {
                                        active: 0,
                                        update_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
                                        delete_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                                    }
                                })
                                    .then((data) => {
                                        console.log(data, 'services_list item deleted');
                                    })
                                    .catch((error) => {
                                        console.log(error, 'error services_list item');
                                    })
                            }
                        });
                    })
                    .catch((error) => {
                        console.log(error, 'error services_list item');
                    });

                // update services_list items with id
                services_list_with_id.forEach((item, index) => {
                    prisma.services_list.update({
                        where: {
                            id: item.id,
                        },
                        data: RemoveNullValues({
                            name: item.name,
                            description: item.description,
                            highlighted: item.highlighted,
                            services_order: item.temp_order,
                            update_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                        })
                    })
                        .then((data) => {
                            console.log(services_prices_with_id.find((prices) => prices.some(price => price.list_index === index)), 'services_prices_with_id 1');
                            const tempServicesPricesWithId = services_prices_with_id.find((prices) => prices.some(price => price.list_index === index));
                            // if services_prices exists then update services_prices items for this service
                            // services_prices is an array of arrays of objects with title, description, value and discount fields
                            if (typeof tempServicesPricesWithId !== "undefined" && tempServicesPricesWithId) {
                                // check if services_prices_with_id contains all services_prices items from database for this service and if not then soft delete them
                                prisma.services_price_list.findMany({
                                    where: {
                                        service_list_id: item.id,
                                        active: 1
                                    }
                                })
                                    .then((data) => {
                                        data.forEach((tempItemPrice) => {
                                            if (!tempServicesPricesWithId.some((sl) => sl.id === tempItemPrice.id)) {
                                                prisma.services_price_list.update({
                                                    where: {
                                                        id: tempItemPrice.id,
                                                    },
                                                    data: {
                                                        active: 0,
                                                        update_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
                                                        delete_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                                                    }
                                                })
                                                    .then((data) => {
                                                        console.log(data, 'services_prices item deleted');
                                                    })
                                                    .catch((error) => {
                                                        console.log(error, 'error services_prices item');
                                                    })
                                            }
                                        });
                                    })
                                    .catch((error) => {
                                        console.log(error, 'error services_prices item');
                                    });

                                // update services_prices items with id
                                tempServicesPricesWithId.forEach((tempItemPrice) => {
                                    prisma.services_price_list.update({
                                        where: {
                                            id: tempItemPrice.id,
                                        },
                                        data: RemoveNullValues({
                                            title: tempItemPrice.title,
                                            description: tempItemPrice.description,
                                            value: parseFloat(tempItemPrice.value ? tempItemPrice.value : 0),
                                            discount: parseFloat(tempItemPrice.discount ? tempItemPrice.discount : 0),
                                            item_order: tempItemPrice.temp_order,
                                            update_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                                        })
                                    })
                                        .then((data) => {
                                            console.log(data, 'services_prices item updated');
                                        })
                                        .catch((error) => {
                                            console.log(error, 'error services_prices item');
                                        })
                                });

                            }

                            // create services_prices items without id
                            console.log(services_prices_without_id.find((prices) => prices.some(price => price.list_index === index)), 'services_prices_without_id');
                            const tempServicesPricesWithoutId = services_prices_without_id.find((prices) => prices.some(price => price.list_index === index));
                            if (typeof tempServicesPricesWithoutId !== "undefined" && tempServicesPricesWithoutId) {
                                tempServicesPricesWithoutId.forEach((tempItemPrice) => {
                                    prisma.services_price_list.create({
                                        data: RemoveNullValues({
                                            service_list_id: item.id,
                                            title: tempItemPrice.title,
                                            description: tempItemPrice.description,
                                            value: parseFloat(tempItemPrice.value ? tempItemPrice.value : 0),
                                            discount: parseFloat(tempItemPrice.discount ? tempItemPrice.discount : 0),
                                            item_order: tempItemPrice.temp_order,
                                            create_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                                        })
                                    })
                                        .then((data) => {
                                            console.log(data, 'services_prices item created');
                                        })
                                        .catch((error) => {
                                            console.log(error, 'error services_prices item');
                                        })
                                });
                            }
                        })
                        .catch((error) => {
                            console.log(error, 'error services_list item');
                        })
                });

                // create services_list items without id
                services_list_without_id.forEach((item, index) => {
                    prisma.services_list.create({
                        data: RemoveNullValues({
                            pod_usluga_id: req.body.id,
                            name: item.name,
                            description: item.description,
                            highlighted: item.highlighted,
                            services_order: item.temp_order,
                            create_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                        })
                    })
                        .then((data) => {
                            console.log(services_prices_without_id.find((prices) => prices.some(price => price.list_index === index)), 'tempServicesPricesWithoutId 2')
                            // if services_prices exists then create services_prices items for this service
                            // services_prices is an array of arrays of objects with title, description, value and discount fields
                            const tempServicesPrices = services_prices_without_id.find((prices) => prices.some(price => price.list_index === index));
                            if (typeof tempServicesPrices !== "undefined" && tempServicesPrices) {
                                tempServicesPrices.forEach((tempItemPrice) => {
                                    prisma.services_price_list.create({
                                        data: RemoveNullValues({
                                            service_list_id: data.id,
                                            title: tempItemPrice.title,
                                            description: tempItemPrice.description,
                                            value: parseFloat(tempItemPrice.value ? tempItemPrice.value : 0),
                                            discount: parseFloat(tempItemPrice.discount ? tempItemPrice.discount : 0),
                                            item_order: tempItemPrice.temp_order,
                                            create_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                                        })
                                    })
                                        .then((data) => {
                                            console.log(data, 'services_prices item created');
                                        })
                                        .catch((error) => {
                                            console.log(error, 'error services_prices item');
                                        })
                                });
                            }
                        })
                        .catch((error) => {
                            console.log(error, 'error services_list item');
                        })
                });

                res.status(200).json({
                    success: true,
                    service: data,
                });
            }
        })
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

// employees routes

app.post("/prisma/employees", async (req, res) => {
    const { first_name, aditional_names, last_name, title, bio, email, phone, employe_title, img_src, slug, alt } = req.body;

    if (typeof img_src !== "undefined" && img_src) {
        const imageName = await SaveImageToDir(img_src, null, "/public/images/employees/");
        if (imageName) img_src = "/images/employees/" + imageName;
    }

    await prisma.employees.create({
        data: RemoveNullValues({
            first_name: first_name,
            aditional_names: aditional_names,
            last_name: last_name,
            title: title,
            bio: bio,
            email: email,
            phone: phone,
            employe_title: employe_title,
            img_src: img_src,
            slug: slug,
            alt: alt,
            create_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        })
    })
        .then((data) => {
            res.status(200).json({
                success: true,
                employee: data,
            });
        })
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

app.put("/prisma/employees/", async (req, res) => {
    const { id, first_name, aditional_names, last_name, title, bio, email, phone, employe_title, img_src, slug, alt } = req.body;

    if (typeof img_src !== "undefined" && img_src) {
        const imageName = await SaveImageToDir(img_src, null, "/public/images/employees/");
        if (imageName) img_src = "/images/employees/" + imageName;
    }

    await prisma.employees.update({
        where: {
            id: id,
        },
        data: RemoveNullValues({
            first_name: first_name,
            aditional_names: aditional_names,
            last_name: last_name,
            title: title,
            bio: bio,
            email: email,
            phone: phone,
            employe_title: employe_title,
            img_src: img_src,
            slug: slug,
            alt: alt,
            update_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        })
    })
        .then((data) => {
            res.status(200).json({
                success: true,
                employee: data,
            });
        })
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

app.delete("/prisma/employees/:id", async (req, res) => {
    const { id } = req.params;

    await prisma.employees.update({
        where: {
            id: id,
        },
        data: {
            deleted_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
            active: 0
        }
    })
        .then((data) => {
            res.status(200).json({
                success: true,
            });
        })
        .catch((error) => {
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

// faq routes

app.post("/prisma/faq", async (req, res) => {
    const { title, content } = req.body;

    const getOrder = await prisma.faq.findMany({
        orderBy: {
            faq_order: "desc"
        },
        take: 1
    }).then((data) => {
        console.log(data, 'data order');
        return data[0].faq_order + 1;
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

    await prisma.faq.create({
        data: RemoveNullValues({
            title: title,
            content: content,
            faq_order: getOrder,
            create_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        })
    })
        .then((data) => {
            res.status(200).json({
                success: true,
                faq: data,
            });
        })
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

app.put("/prisma/faq", async (req, res) => {
    const { id, title, content } = req.body;

    await prisma.faq.update({
        where: {
            id: id,
        },
        data: RemoveNullValues({
            title: title,
            content: content,
            update_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        })
    })
        .then((data) => {
            res.status(200).json({
                success: true,
                faq: data,
            });
        })
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

app.delete("/prisma/faq/:id", async (req, res) => {
    const { id } = req.params;

    await prisma.faq.update({
        where: {
            id: id,
        },
        data: {
            deleted_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
            active: 0
        }
    })
        .then((data) => {
            res.status(200).json({
                success: true,
            });
        })
        .catch((error) => {
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

app.put("/prisma/faq/order", async (req, res) => {
    const { orderedIds } = req.body;

    let errors = [];

    orderedIds.forEach(async (id, index) => {
        await prisma.faq.update({
            where: {
                id: id,
            },
            data: {
                faq_order: index,
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