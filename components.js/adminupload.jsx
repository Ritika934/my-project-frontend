// import { useParams } from "react-router";
// import {useState} from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import axiosclient from "../axiosclient";

// function Adminupload(){

//     const {problemId} = useParams()

//     const[uploading,setuploading]=useState(false)
//     const[uploadingprogress,setuploadingprogress]=useState(0);
//     const[uploadvideo,setuploadvideo]=useState(null);


//     const {register,handleSubmit,watch,formState:{errors},reset,setError,clearErrors}=useForm();

//     const selected_file=watch ("videoFile")?.[0]
    
//     const onSubmit = async(data)=>{
          
//         const file = data.videoFile[0]

//         setuploading(true);
//         setuploadingprogress(0);
//         clearErrors()
    

//     try{
    
//     const signatureResponse =await axiosclient.get(`video/create/${problemId}`)
      
//     const{signature,timestamp,public_id,api_key,cloud_name,upload_url} = signatureResponse.data


//     const formData=new FormData()
//     formData.append("api_key",api_key)
//     formData.append("file",file)
//     formData.append("public_id",public_id)
//     formData.append("timestamp",timestamp)
//     formData.append("signature",signature)
    

//   const response=  await axios.post(upload_url,formData,
//         {
//             headers:{
//             "Content-Type":"multipart/form-data"
//         },
//           onUploadProgress:(ProgressEvent)=>{
         
//        const progress =  Math.round((ProgressEvent.loaded*100)/ProgressEvent.total);
//        setuploadingprogress(progress)
//           }
//     }
//     )



//        const cloudinaryResult =response.data


//        const metaresponse = await axiosclient.post("/video/save",{

//               problemId:problemId,
//               cloudinaryPublicId:cloudinaryResult.public_id,
//               secureUrl:cloudinaryResult.secure_url,
//               duration:cloudinaryResult.duration


//        })

//        setuploadvideo(metaresponse.data)
// console.log(metaresponse.data)
       
//        reset()



//        setuploadingprogress(0)
//        setuploading(false)
// }
// catch (err) {
//           console.error('Upload error:', err.response?.data);
//           setuploading(false)
//           setError('root', {
//             type: 'manual',
//             message: err.response?.data?.message || 'Upload failed. Please try again.'
//           });
//         }
//     }


//     const formatFileSize=(bytes)=>{
//         if (bytes==0) return "0 bytes";

//         const k=1024;

//         const sizes=["Bytes","KB","MB","GB"]

//         const i=Math.floor(Math.log(bytes)/Math.log(k))

//         return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//     }

// const formatDuration=(seconds)=>{
//     const mins=Math.floor(seconds/60)
//     const secs=Math.floor(seconds%60)
//     return `${mins} mins:${secs.toString().padStart(2,"0")} secs`
// }

// return(
// <>
// <div className="max-w-md mx-auto p-6">

// <div className="card bg-base-100 shadow-xl">
//     <div className="card-body">

//         <h2 className="card-title">Upload video</h2>

//     <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4">

//         <div className="form-control w-full">
//             <label className="label">
//                 <span className="label-text">Choose video file</span>
//             </label>


// <input 
// type="file"
//  accept="video/*"
//  {...register("videoFile",
//     {required:"Please select video file",
//     validate:{
//         isVideo: (files) => {
//         if(!files || !files[0]) return "Please select video file";
//             const file = files[0]
//         return file.type.startsWith("video/")||"Please select a valid video file"
//     },
//     filesize:(files)=>{
//         if(!files||!files[0])
//             return true;
//         const file=files[0]
//         const maxsize=100*1024*1024;
//         return file.size<=maxsize|| "File size must be less than 100MB"
//     }
// }

//  })}

//  className={`file-input file-input-bordered w-full ${errors.videoFile?"file-input-error":""}`}
//  disabled={uploading}
// />
// {errors.videoFile && (
//                     <label className="label">
//                       <span className="label-text-alt text-error">{errors.videoFile.message}</span>
//                     </label>
//                   )}
//  </div>
// {selected_file &&(
//     <>
//     <div className="alert alert-info mt-3">
//         <div>

//             <h3 className="font-bold">Selected file:</h3>
//             <p className="text-sm p-2">{selected_file.name}</p>
//             <p className="text-sm">Size:{formatFileSize(selected_file.size)}</p>


  
//         </div>
//         </div>
//         </>
// )}

// {uploading &&

// <div className="space-y-2">

//     <div className="flex justify-between text-sm">

//         <span>Uploading...</span>
//         <span>{uploadingprogress}%</span>
//     </div>
//  <progress className="progress progress-primary w-full"
//  value={uploadingprogress}></progress>





// </div>
// }

//                 {errors.root && (
//                   <div className="alert alert-error">
//                     <span>{errors.root.message}</span>
//                   </div>
//                 )}

// {   uploadvideo&&(
//         <div className="alert alert-success">

//             <div>
//                 <h3 className="font-bold">{uploadvideo.message}</h3>

//                 <p className="text-sm">Duration:{formatDuration(uploadvideo.videoSolution.duration)}</p>
//                 <p className="text-sm">Uploaded:{new Date(uploadvideo.videoSolution.uploadedAt).toLocaleString()}</p>

//             </div>

//         </div>
//     )
// }

// <div className="card-actions justify-end"> 
//     <button type="Submit" 
//     disabled={uploading} 
//     className={`btn btn-primary ${uploading?"loading":""}`}>
//          {uploading ? 'Uploading...' : 'Upload Video'}
//     </button>
// </div> 
//     </form>
//     </div>
// </div>
// </div>


// </>


// )
// }
// export default Adminupload;

























import { useParams } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import axiosclient from "../axiosclient";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileVideo, XCircle, CheckCircle, AlertTriangle, Loader } from 'lucide-react';

function Adminupload() {
    const { problemId } = useParams();
    const [uploading, setUploading] = useState(false);
    const [uploadingProgress, setUploadingProgress] = useState(0);
    const [uploadResult, setUploadResult] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const { register, handleSubmit, watch, formState: { errors }, reset, setError, clearErrors } = useForm();

    const selectedFile = watch("videoFile")?.[0];

    const onSubmit = async (data) => {
        const file = data.videoFile[0];
        if (!file) return;

        setUploading(true);
        setUploadingProgress(0);
        setUploadResult(null);
        clearErrors();

        try {
            const signatureResponse = await axiosclient.get(`video/create/${problemId}`);
            const { signature, timestamp, public_id, api_key, cloud_name, upload_url } = signatureResponse.data;

            const formData = new FormData();
            formData.append("api_key", api_key);
            formData.append("file", file);
            formData.append("public_id", public_id);
            formData.append("timestamp", timestamp);
            formData.append("signature", signature);

            const response = await axios.post(upload_url, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadingProgress(progress);
                }
            });

            const cloudinaryResult = response.data;
            const metaResponse = await axiosclient.post("/video/save", {
                problemId: problemId,
                cloudinaryPublicId: cloudinaryResult.public_id,
                secureUrl: cloudinaryResult.secure_url,
                duration: cloudinaryResult.duration
            });

            setUploadResult({ type: 'success', data: metaResponse.data });
            reset();
        } catch (err) {
            console.error('Upload error:', err.response?.data);
            const errorMessage = err.response?.data?.message || 'Upload failed. Please try again.';
            setUploadResult({ type: 'error', message: errorMessage });
            setError('root', { type: 'manual', message: errorMessage });
        } finally {
            setUploading(false);
            setUploadingProgress(0);
        }
    };

    const handleRemoveFile = () => {
        reset();
        setUploadResult(null);
        clearErrors();
    };
    
    // Helper functions
    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins} min ${secs.toString().padStart(2, "0")} sec`;
    };
    
    const dragProps = {
        onDragEnter: () => setIsDragging(true),
        onDragLeave: () => setIsDragging(false),
        onDrop: () => setIsDragging(false),
    };

    return (
        <div className="min-h-screen bg-base-100 p-4 sm:p-6 md:p-8 font-sans flex items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-base-100 via-base-200/5 to-base-100 -z-10"></div>
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-2xl"
            >
                <div className="bg-base-200/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-base-300/20 border-l-4 border-l-primary">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-extrabold text-primary-focus">Video Upload</h1>
                        <p className="text-base-content/70 mt-1">Upload the video solution for problem ID: {problemId}</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {uploading ? (
                                <motion.div key="uploading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center p-8 space-y-4">
                                    <div className="radial-progress text-primary" style={{"--value": uploadingProgress, "--size": "8rem", "--thickness": "8px"}} role="progressbar">
                                        {uploadingProgress}%
                                    </div>
                                    <p className="font-semibold text-lg">Uploading...</p>
                                    <p className="text-sm text-base-content/60 truncate">{selectedFile?.name}</p>
                                </motion.div>
                            ) : (
                                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    {!selectedFile ? (
                                        <div className="form-control">
                                            <label 
                                                htmlFor="videoFile" 
                                                className={`relative block w-full h-48 rounded-lg border-2 border-dashed flex items-center justify-center text-center cursor-pointer transition-colors ${isDragging ? 'border-primary bg-primary/10' : 'border-base-300 hover:border-primary'}`}
                                                {...dragProps}
                                            >
                                                <div className="space-y-2 text-base-content/70">
                                                    <UploadCloud className="mx-auto h-12 w-12" />
                                                    <span className="font-semibold">Click to upload or drag and drop</span>
                                                    <p className="text-xs">MP4, AVI, MOV (max 100MB)</p>
                                                </div>
                                            </label>
                                            <input 
                                                id="videoFile"
                                                type="file" 
                                                accept="video/*"
                                                {...register("videoFile", {
                                                    required: "Please select a video file.",
                                                    validate: {
                                                        isVideo: files => files?.[0]?.type.startsWith("video/") || "Please select a valid video file.",
                                                        fileSize: files => files?.[0]?.size <= 100 * 1024 * 1024 || "File size must be less than 100MB."
                                                    }
                                                })}
                                                className="hidden"
                                            />
                                            {errors.videoFile && <span className="label-text-alt text-error mt-2">{errors.videoFile.message}</span>}
                                        </div>
                                    ) : (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-base-100 p-4 rounded-lg flex items-center justify-between shadow">
                                            <div className="flex items-center gap-4">
                                                <FileVideo className="h-8 w-8 text-primary" />
                                                <div>
                                                    <p className="font-semibold text-base-content truncate max-w-xs">{selectedFile.name}</p>
                                                    <p className="text-sm text-base-content/60">{formatFileSize(selectedFile.size)}</p>
                                                </div>
                                            </div>
                                            <button type="button" onClick={handleRemoveFile} className="btn btn-ghost btn-circle">
                                                <XCircle className="h-6 w-6 text-base-content/50 hover:text-error"/>
                                            </button>
                                        </motion.div>
                                    )}

                                    <AnimatePresence>
                                        {uploadResult && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                                {uploadResult.type === 'success' && (
                                                    <div className="alert alert-success text-white">
                                                        <CheckCircle size={20}/>
                                                        <div>
                                                            <h3 className="font-bold">{uploadResult.data.message}</h3>
                                                            <p className="text-sm">Duration: {formatDuration(uploadResult.data.videoSolution.duration)}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {uploadResult.type === 'error' && (
                                                    <div className="alert alert-error text-white">
                                                        <AlertTriangle size={20}/>
                                                        <span>{uploadResult.message}</span>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    
                                    <div className="card-actions justify-end pt-4"> 
                                        <button type="submit" disabled={!selectedFile || uploading} className="btn btn-primary btn-lg shadow-lg">
                                            {uploading ? <Loader className="animate-spin" /> : <UploadCloud className="mr-2"/>}
                                            Upload Video
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

export default Adminupload;

