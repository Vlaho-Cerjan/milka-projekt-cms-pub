import { Box, styled, LinearProgress, Button } from '@mui/material';
import React from 'react';
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Clear, ClearRounded, CropRounded, DoneRounded, FileUploadOutlined, InsertDriveFileSharp } from "@mui/icons-material";
import { StyledText } from '../styledText/styledText';
import Image from 'next/image';
import { CustomThemeContext } from '../../../../store/customThemeContext';
import { fileToBase64 } from '../../../../utility/fileToBase64';
import { StyledButton } from '../styledButtons/styledButton';
import StyledButtonIconOnly from '../styledButtons/styledButtonIconOnly';
import { IconContainerGrey, IconContainerWhite } from '../../styledComponents/styledIconContainer';
import FileResizer from 'react-image-file-resizer';

const StyledUploadContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledUploadImageContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    borderRadius: "8px",
    position: "relative",
    marginBottom: "15px",
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.default : theme.palette.grey[300],

    '& .cropper-drag-box, & .cropper-bg, & .cropper-canvas': {
        borderRadius: "8px",
    }
}))

const StyledUploadImageFrame = styled(Box)(() => ({
    position: "relative",
    borderRadius: "8px",
    '& img': { borderRadius: "8px" }
}))

const StyledUploadButtonsContainer = styled(Box)(() => ({
    width: "100%",
    padding: "8px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
}))

const StyledDragAndDropContainer = styled(Box)(({ theme }) => ({
    margin: "0 0 15px 0",
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.default : theme.palette.grey[300],
    minHeight: "44px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    borderRadius: "8px"
}))

const StyledUploadDragAndDropIconContainer = styled(Box)(({ theme }) => ({
    minHeight: "32px",
    minWidth: "32px",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "6px",
    marginRight: "26px",
}))

interface StyledUploadProps {
    file: string,
    setFile: (file: string) => void,
    type: "image" | "video",
    noPreview?: boolean,
    aspectRatio?: number,
    resizeSizes?: { width: number, height?: number },
}

const StyledUpload = ({ file, aspectRatio, setFile, type, noPreview, resizeSizes }: StyledUploadProps) => {
    const cropperRef = React.useRef<ReactCropperElement>(null);
    const imageContainerRef = React.useRef<HTMLImageElement>(null);
    const { theme, isDark } = React.useContext(CustomThemeContext);
    const inputFileRef = React.useRef<HTMLInputElement>(null);
    const dropArea = React.useRef<HTMLButtonElement>(null);

    const [highlight, setHighlight] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [uploading, setUploading] = React.useState(false);
    const [enableCropper, setEnableCropper] = React.useState(false);
    const [originalFile, setOriginalFile] = React.useState(file);
    const [imageContainerHeight, setImageContainerHeight] = React.useState(0);

    function preventDefaults(e: any) {
        e.preventDefault()
        e.stopPropagation()
    }

    const onCrop = () => {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        console.log(cropper);
    };

    const handleCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;

        if (cropper) setFile(cropper.getCroppedCanvas().toDataURL());
        setEnableCropper(false);
    }

    const resetCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        if (cropper) {
            cropper.reset();
            setFile(originalFile);
        }

    }

    const handleOpenCrop = () => {
        resetCrop();
        setEnableCropper(true);
    }

    const handleCloseCrop = () => {
        resetCrop();
        setEnableCropper(false);
    }

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLButtonElement>) => {
        setValue(0);
        setUploading(true);
        let files;

        if (event.type === "change") {
            const target = event.target as HTMLInputElement;
            files = target.files;
        } else if (event.type === "drop") {
            const ev = event as React.DragEvent;
            files = ev.dataTransfer.files;
        }

        if (files && files.length) {
            const file = files[0];
            const reader = new FileReader();

            const onProgress = (event: ProgressEvent<FileReader>) => {
                if (event.lengthComputable) {
                    setValue((event.loaded / event.total) * 100);
                }
            }
            reader.addEventListener("progress", onProgress);

            if (resizeSizes) {
                const resizeHeight = resizeSizes.height ? resizeSizes.height : (typeof aspectRatio !== "undefined") ? resizeSizes.width / aspectRatio : resizeSizes.width;

                console.log(resizeHeight);

                FileResizer.imageFileResizer(
                    file,
                    resizeSizes.width,
                    resizeHeight,
                    'JPEG',
                    100,
                    0,
                    (uri) => {
                        if (typeof uri === 'string') {
                            setOriginalFile(uri);
                            setFile(uri);
                        }
                        else if (uri instanceof Blob || uri instanceof File) {
                            fileToBase64(uri).then((base64) => {
                                if (typeof base64 === 'string') {
                                    setOriginalFile(base64);
                                    setFile(base64);
                                }
                            })
                        }
                    },
                    'base64',
                    resizeSizes.width ? resizeSizes.width : undefined,
                    resizeSizes.height ? resizeSizes.height : undefined
                )

            } else {
                fileToBase64(file).then((base64) => {
                    if (typeof base64 === "string") {
                        setFile(base64);
                        setOriginalFile(base64);
                    }
                })
            }
        }
        setUploading(false);
        setValue(100);
    }

    /*React.useEffect(() => {
        if(uploading) {
            if(value < 100) {
                setTimeout(() => {
                    setValue(value + 1);
                }, 200);
            }
        }

        return () => {
            setValue(0);
        }
    }, [uploading])
    */


    React.useEffect(() => {
        const uploadFunc = setTimeout(() => {
            if (uploading) {
                if (value < 100) {
                    setValue(value + 1);
                } else {
                    setUploading(false);
                }
            }
        }, 200);

        return () => clearTimeout(uploadFunc);
    }, [uploading, value]);

    React.useEffect(() => {
        if (!file.includes("data:image")) {
            setUploading(false);
            setValue(0);
        }
    }, [file])

    React.useEffect((): any => {
        if (typeof imageContainerRef !== "undefined" && imageContainerRef.current) {
            const width = imageContainerRef.current.clientWidth;
            setImageContainerHeight(width / (typeof aspectRatio !== "undefined" ? aspectRatio : (16 / 9)));
            //if(!file){
            //   const height = (width / (typeof aspectRatio !== "undefined"?aspectRatio:(16/9)));
            //    setFile("https://via.placeholder.com/"+width+"x"+height+".png");
            //}
        }
    }, [imageContainerRef, aspectRatio])

    return (
        <StyledUploadContainer
            ref={imageContainerRef}
        >
            {file && file.length > 0 && !noPreview ?
                <StyledUploadImageContainer
                >
                    {!enableCropper ?
                        <StyledUploadImageFrame
                            sx={{
                                height: imageContainerHeight
                            }}
                        >
                            <Image
                                src={file}
                                alt="background image"
                                layout="fill"
                                objectFit="contain"
                                objectPosition={"center"}
                            />
                        </StyledUploadImageFrame>
                        :
                        <Cropper
                            src={file}
                            crossOrigin="anonymous"
                            style={{ width: "100%", height: imageContainerHeight, objectFit: "contain", objectPosition: "center" }}
                            // Cropper.js options
                            viewMode={1}
                            initialAspectRatio={aspectRatio ? aspectRatio : 16 / 9}
                            aspectRatio={aspectRatio ? aspectRatio : 16 / 9}
                            zoomable={false}
                            crop={onCrop}
                            ref={cropperRef}
                        />
                    }
                    <StyledUploadButtonsContainer>
                        <StyledText text={"Izrežite sliku"} sx={{ marginRight: "10px" }} />
                        {!enableCropper ?
                            <StyledButton sx={{ boxShadow: "none !important" }} onClick={handleOpenCrop}>
                                <IconContainerGrey>
                                    <CropRounded />
                                </IconContainerGrey>
                            </StyledButton>
                            :
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                            }}>
                                <StyledButton
                                    onClick={handleCrop}
                                    sx={{ marginRight: "4px", boxShadow: "none !important" }}
                                >
                                    <IconContainerGrey>
                                        <DoneRounded />
                                    </IconContainerGrey>
                                </StyledButton>
                                <StyledButton sx={{ boxShadow: "none !important" }} onClick={handleCloseCrop}>
                                    <IconContainerGrey>
                                        <ClearRounded />
                                    </IconContainerGrey>
                                </StyledButton>
                            </Box>
                        }
                    </StyledUploadButtonsContainer>
                </StyledUploadImageContainer>
                :
                null}
            <StyledDragAndDropContainer>
                <StyledUploadDragAndDropIconContainer>
                    <IconContainerGrey sx={{ minWidth: "24px", minHeight: "24px", fontSize: "24px" }}>
                        <InsertDriveFileSharp />
                    </IconContainerGrey>
                </StyledUploadDragAndDropIconContainer>
                <StyledText sx={{ marginRight: "26px" }} text={(value !== 0) ? (value !== 100) ? "Učitavanje" : "Učitano" : ""} />
                <Box sx={{ flexGrow: 1 }} >
                    <LinearProgress sx={{ marginRight: "20px", borderRadius: "2px" }} variant="determinate" value={value} />
                </Box>
                <Box sx={{ marginRight: "9px" }}>
                    <StyledButtonIconOnly
                        buttonFunction={() => {
                            setValue(0);
                            setFile("");
                            setUploading(false);
                        }}
                        sx={{
                            backgroundColor: theme.palette.grey[500],
                            borderRadius: "50%",
                            boxShadow: "none !important",

                            '&:hover': {
                                backgroundColor: isDark ? theme.palette.grey[400] : theme.palette.grey[700],
                            }
                        }}
                        icon={
                            <IconContainerWhite sx={{ fontSize: "16px" }}>
                                <Clear />
                            </IconContainerWhite>
                        } />
                </Box>
            </StyledDragAndDropContainer>
            <Button
                sx={{
                    minWidth: 0,
                    height: "125px",
                    width: "100%",
                    backgroundColor: highlight ? (isDark ? theme.palette.grey[800] : theme.palette.grey[400]) : (isDark ? theme.palette.background.default : theme.palette.grey[300]),
                    borderRadius: "8px",
                    padding: "6px",

                    '&:hover': {
                        backgroundColor: isDark ? theme.palette.grey[800] : theme.palette.grey[400],
                    },
                }}
                onClick={() => {
                    inputFileRef.current?.click();
                }}
                onDragEnter={(event) => {
                    preventDefaults(event);
                }}
                onDragLeave={(event) => {
                    preventDefaults(event);
                    setHighlight(false);
                }}
                onDragOver={(event) => {
                    preventDefaults(event);
                    setHighlight(true);
                }}
                onDrop={(event) => {
                    preventDefaults(event);
                    setHighlight(false);

                    handleFileInputChange(event);
                }}
                ref={dropArea}
            >
                <Box className="borderBox" sx={{
                    height: "100%",
                    width: "100%",
                    border: "2px dashed " + (highlight ? theme.palette.primary.main : theme.palette.grey[500]),
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                }}>
                    <IconContainerGrey sx={{
                        marginBottom: "15px", fontSize: "24px", lineHeight: "24px", padding: "10px", borderRadius: "50%", backgroundColor: isDark ? theme.palette.grey[600] : theme.palette.grey[300] }}>
                        <FileUploadOutlined />
                    </IconContainerGrey>
                    <StyledText text={type === "video" ? "Ispustite MP4 ili MOV ovdje" : "Ispustite JPG ili PNG ovdje"} />
                    <input ref={inputFileRef} onChange={handleFileInputChange} accept={type === "video" ? "video/mp4, video/mov" : "image/png, image/jpeg"} type="file" style={{ display: "none" }} />
                </Box>
            </Button>
        </StyledUploadContainer>
    )
}

export default StyledUpload;