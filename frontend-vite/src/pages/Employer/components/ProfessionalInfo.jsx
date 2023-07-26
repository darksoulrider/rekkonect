import React, { useEffect, useState } from 'react'


// *** library imports ****
import styled from "styled-components"
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify"
import { ThreeDots } from "react-loader-spinner"
import { BiSolidEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import { Dialog } from '@headlessui/react'

// ** api call imports **
import { useUploadFileMutation, useDeleteFileMutation, useGetAdditionalInfoQuery, useSendwhyMutation, useSendHeadQuarterMutation, useSendWebsiteMutation, useSendRecommendMutation, useSendSocialMutation, useChangSocailLinkMutation, useDeletLinkMutation } from '../../../redux/apicall/employer/userProfile';

const ProfessionalInfo = ({ userdata }) => {
    //  ** useStates **

    const [isUploadclicked, SetisUploadclicked] = useState(false);
    const [whyValue, setWhyValue] = useState('');
    const [headQuarter, SetheadQuarter] = useState('');
    const [website, Setwebsite] = useState('');
    const [recommend, Setrecommend] = useState('');
    const [addSocial, SetaddSocial] = useState('');
    const [changeSocial, SetchangeSocial] = useState('');
    let [isEditSocial, SetisEditSocial] = useState(false); // head less UI
    const [idLink, SetidLink] = useState('');

    // *********** Fetcing all Info for additinal section ******
    const { data: getinfodata, isLoading: isLoadinginfo, isSuccess: isSuccessinfo, isError: isErrorinfo } = useGetAdditionalInfoQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });




    //  **********   useForm for file uplaod [ complete ] **************
    const { register: registerFile, handleSubmit: handleSubmitFile, formState: { errors: errorsFile } } = useForm();
    // api call upload file
    const [upload, { isError: isFileError, isSuccess: isSuccessFile, isLoading: isLoadingFile }] = useUploadFileMutation();
    const uploadFile = async (data) => {
        if (data.files.length === 0) {
            return toast.error("No files selected", {
                autoClose: 1000,
            });
        }
        SetisUploadclicked(!isUploadclicked);
        const myForm = new FormData();
        myForm.append('files', data.files[0])
        try {
            const response = await upload(myForm);
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (isSuccessFile) {
            toast.success("successfully uploaded")
            SetisUploadclicked(!isUploadclicked);
        }
        if (isFileError) {
            toast.error("failed to upload")
            SetisUploadclicked(!isUploadclicked);
        }
    }, [isSuccessFile, isFileError]);


    // ************** api call delete file [complete] *********************
    const [deleteFile, { isError: isDeleteError, isSuccess: isDeleteSucces, isLoading: isDeleteLoading }] = useDeleteFileMutation();

    const DeleteFile = async (id) => {
        const data = await deleteFile(id);
    }

    const getFile = async (url) => {
        try {
            window.open(url, '_blank');
        } catch (error) {
            toast.error("Couldn't get the file");
            console.log(url);
        }
    }

    // ************* Why company detatils [ complete ] ****************
    // useForm for it ->



    const [sendingWhy, { isSuccess: isSendTrue, isError: isWhyError }] = useSendwhyMutation();
    const sendWhy = async (e) => {
        e.preventDefault();
        const why = await sendingWhy({ why: whyValue });
    }

    useEffect(() => {
        if (isSendTrue) {
            toast.success("successfully updated...");
        }
        if (isWhyError) {
            toast.error("Error occured");
        }
    }, [isSendTrue, isWhyError]);


    // ************* Head Quarter details [complete] ****************
    const [sendingHeadquerter, { isSuccess: isHeadqurterTrue, isError: isHeadquarterError }] = useSendHeadQuarterMutation();
    const sendHeadquarter = async () => {
        const headquarter = await sendingHeadquerter({ headquarter: headQuarter });
    }
    useEffect(() => {
        if (isHeadqurterTrue) {
            toast.success("successfully updated...");
        }
        if (isHeadquarterError) {
            toast.error("Error occured");
        }
    }, [isHeadqurterTrue, isHeadquarterError]);

    // ************* Website details [complete] ****************

    const [sendingWebsite, { isSuccess: isWebsiteTrue, isError: isWebsiteError }] = useSendWebsiteMutation();
    const sendweb = async () => {
        const web = await sendingWebsite({ website: website });
    };
    useEffect(() => {
        if (isWebsiteTrue) {
            toast.success("successfully updated...");
        }
        if (isWebsiteError) {
            toast.error("Error occured");
        }
    }, [isWebsiteTrue, isWebsiteError]);



    // ************ Recommendate details [ complete] *********************
    // const []

    const [sendingRecommend, { isSuccess: isRecommendSuccess, isError: isRecommendError }] = useSendRecommendMutation();

    const sendRecommend = async () => {
        const rec = await sendingRecommend({ recommend: recommend })
    }
    useEffect(() => {
        if (isRecommendSuccess) {
            toast.success("successfully updated...");
        }
        if (isRecommendError) {
            toast.error("Not Valid email or Already recommended mentor");
        }
    }, [isRecommendSuccess, isRecommendError]);


    // ************ Add social Accounts ***********
    const [sendingSocial, { isSuccess: isSocialuccess, isError: isSocialError }] = useSendSocialMutation();

    const sendSocial = async () => {
        const res = await sendingSocial({
            socialAccount: addSocial
        })
    }
    useEffect(() => {
        if (isSocialuccess) {
            toast.success("successfully updated...");
        }
        if (isSocialError) {
            toast.error("Invalid link or link already exists");
        }
    }, [isSocialuccess, isSocialError]);


    // ************ Edit social Accounts ***********
    const EditLink = (link) => {
        SetisEditSocial(!isEditSocial);
        SetchangeSocial(link.link);
        SetidLink(link._id);

    }
    const [changingLink, { isError: isChangeLinkError, isSuccess: isChangeLinkSuccess, isLoading: isChangeLinkLoading }] = useChangSocailLinkMutation();
    const sendChangeLink = async () => {
        const res = await changingLink({
            link: { Changedlink: changeSocial },
            id: idLink,
        })
        SetisEditSocial(!isEditSocial);
    }
    const [deletingLink, { isError: isDeleteLinkError, isSuccess: isDeleteLinkSuccess, isLoading: isDeleteLinkLoading }] = useDeletLinkMutation();

    const sendDeleteLink = async () => {
        const res = await deletingLink({
            id: idLink,
        })
        SetisEditSocial(!isEditSocial);
    }

    // updating globle values for this component
    useEffect(() => {
        if (getinfodata) {
            setWhyValue(getinfodata.addinfo.aboutCompany)
            SetheadQuarter(getinfodata.addinfo.headquarter)
            Setwebsite(getinfodata.addinfo.website)

        }
    }, [getinfodata,])


    if (isLoadinginfo) {
        // ! can show loader here
        return <h1>Loading.....</h1>
    }


    return (
        <Container className="  mb-36" >
            <h1>Additional Information</h1>
            <div className='cstm-why-cp mb-10'>
                <p className="">Why {userdata.user.companyName} ? </p>

                <form onSubmit={sendWhy} className='cstm-textarea'>
                    <textarea spellCheck="false" placeholder='About company..' value={whyValue} onChange={(e) => setWhyValue(e.target.value)} rows="4" cols="100" className='cstm-text-area p-3 text-2xl w-[80%] border bg-slate-50 text-gray-600'>

                    </textarea>
                    <button type='submit' className='cstm-btn bg-orange-300 text-black-700 w-32 h-10 rounded-md'>Submit</button>
                </form>
            </div>
            <div className='cstm-addinfo-layer'>
                <div className='cstm-all cstm-headQurter'>
                    <p>{userdata.user.companyName} Head Quarter</p>
                    <div className='cstm-input-btn'>
                        <input placeholder='headquarter...' value={headQuarter} onChange={(e) => SetheadQuarter(e.target.value)} type="text" />
                        <button onClick={() => sendHeadquarter()} className='btn'>Submit</button>
                    </div>
                </div>
                <div className='cstm-all cstm-website'>
                    <p>Website</p>
                    <div className='cstm-input-btn'>
                        <input placeholder='write your website' value={website} onChange={(e) => Setwebsite(e.target.value)} type="text" />
                        <button onClick={() => sendweb()} className='btn'>Submit</button>
                    </div>
                </div>
                <div className='cstm-all cstm-fileupload '>
                    <p>File Uploads- [ jpg / pdf / mp4 ] upto 15mb</p>
                    <form onSubmit={handleSubmitFile(uploadFile)} className='cstm-input-btn'>
                        <input {...registerFile('files')} type="file" multiple={true} />
                        <button type='submit' className='btn'>
                            {
                                isUploadclicked ?
                                    <ThreeDots
                                        height="25"
                                        width="40"
                                        radius="9"
                                        color="#0f5680"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{
                                            marginLeft: "3.2rem",
                                        }}
                                    /> : "Upload"
                            }
                        </button>
                    </form>
                    <div className="files">
                        {/* defualt button style comming from globle */}
                        {
                            getinfodata?.addinfo.files.map((file) => {
                                const filename = file.public_id.split("-").pop();
                                const ext = filename.split(".").pop();

                                return (
                                    <div key={file?.public_id} className='file-delete '>
                                        <p className="file lowercase w-36">{
                                            filename?.substring(0, 6) + ".. " + ext
                                        }</p>
                                        <button onClick={() => getFile(file?.secure_url)
                                        } type="button">get</button>

                                        <button style={{ backgroundColor: "#f70909" }} onClick={() => DeleteFile(file?._id)
                                        } type="button">delete</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='cstm-recommend-layer ml-20 '>
                <p className="text-2xl tracking-wider mb-1">Recommend Mentor</p>
                <div className="cstm-recommend ">
                    <input onChange={(e) => Setrecommend(e.target.value)} value={recommend} placeholder='Enter email  ' className="text-gray-700" />
                    <button onClick={() => sendRecommend()} className=''>Recommend</button>
                </div>
            </div>
            <div className='cstm-recommend-layer ml-20'>
                <p className="text-2xl tracking-wider mb-5 ">Social Links</p>
                <div className="cstm-recommend ">
                    <input onChange={(e) => SetaddSocial(e.target.value)} value={addSocial} placeholder='linkdin, facebook, etc. ' className="text-gray-700" />
                    <button onClick={() => sendSocial()} className=''>Submit</button>
                </div>
                {/*  can add map here */}
                <div className='cstm-top-layer'>
                    {
                        getinfodata?.addinfo?.socialMedia?.map(link => {
                            return (
                                <div className='' key={link._id}>

                                    <div className=' cstm-social-layer flex items-center  shadow-sm rounded-md '>

                                        <a href={link.link} target='_blank' >{link.link.substring(0, 25)}...</a>

                                        <button onClick={() => { EditLink(link) }} >
                                            <BiSolidEdit />
                                        </button>
                                    </div>
                                </div>
                            )
                        })

                    }

                    <div>
                        {
                            isEditSocial ?
                                <div className='cstm-popup' >
                                    <div className='cstm-popup-social'>
                                        <h3>Edit</h3>
                                        <div>
                                            <input type="text" value={changeSocial} onChange={(e) => { SetchangeSocial(e.target.value) }} />
                                            <div>
                                                <button className='btn-close' onClick={() => { SetisEditSocial(!isEditSocial) }}>Close</button>
                                                <button className='btn-submit' onClick={() => { sendChangeLink() }}>Submit</button>
                                                <button className='btn-delete' onClick={() => { sendDeleteLink() }}>delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div> : <div></div>
                        }
                    </div>
                </div>
            </div >

        </Container >
    )
}
{/* <div className='cstm-social-layer  '> */ }
{/* <p>{link.link}</p> */ }
{/* <button> Edit</button> */ }
{/* </div> */ }
{/* <div></div> */ }

export default ProfessionalInfo


const Container = styled.div`


    @media(max-width: ${props => props.theme.isMobile})    {
        font-family: "roboto";
        .cstm-recommend-layer{
            margin-top:2rem;
            >.cstm-recommend{
                display: flex;
                flex-direction:column;
                >input{
                    width:28rem;
                }
            }
            button{
                background-color: #f2c571;
                height: 3.5rem;
                width: 11rem;
                border-radius: 0.5rem;
                cursor: pointer;
                font-weight: 700;
                font-size: 1.3rem;
                &:hover{
                    background-color: #157499;
                    color: white;
                }
            }
        }
        h1{
            font-size:1.9rem;
            font-weight:800;
            margin: 1.4rem 3rem;
            letter-spacing: 0.1rem;
            color: #272626;
            font-family: "roboto";
        }
        input{
            border: 0.1px solid rgba(54, 54, 54, 0.2);
            background-color: #f4f0f0;
            width:36rem;
            color: #1a1717;
            &:focus{
                outline:none;
            }
        }
        .cstm-why-cp{
            margin-left: 5rem;
            >p{
                font-size:1.6rem;
                font-weight:bold;
                margin-bottom: 1rem;
                letter-spacing:0.04rem;
            }
            >.cstm-textarea{
                display: flex;
                flex-direction: column;
                >textarea{
                    resize: none;
                    border: 1px solid lightblue;
                    overflow-y: auto;
                    height: 25rem;
                    
                    &:focus{
                        background:rgba(194, 194, 183, 0.3);
                        outline:none;
                    }
                }
                >.cstm-btn{
                    background-color: #f2c571;
                    height: 3.5rem;
                    width: 11rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 1.3rem;
                    &:hover{
                        background-color: #157499;
                        color: white;
                    }
                }
            }    
        }
        .cstm-addinfo-layer{
            margin-left:5rem;
            >.cstm-all{
                display:flex;
                flex-direction: column;
                align-items: flex-start;

                >p{
                    font-size:1.6rem;
                    font-weight:bold;
                    letter-spacing:0.04rem;
                    margin-bottom: 1rem;
                }
              
                >.cstm-input-btn{
                    display: flex;
                    flex-direction:column;
                    >input{
                        width: 28rem;
                    }
                    >.btn{
                        background-color: #f2c571;
                        height: 3.5rem;
                        width: 11rem;
                        border-radius: 0.5rem;
                        cursor: pointer;
                        font-weight: 700;
                        font-size: 1.3rem;
                        &:hover{
                            background-color: #157499;
                            color: white;
                        }
                    }
                }
                >.files{
                    width: 35rem;
                    margin-top: 1rem;
                    margin-bottom: 2rem;
                    >.file-delete{
                        display:flex;
                        align-items: center;
                        
                        width: 100%;
                        margin-bottom: 1rem;
                        margin-left: 2rem;
                        
                        >button{
                            background-color: #157499;
                            height: 3rem;
                            width: 7rem;
                            margin:0rem;
                            margin-right: 1.3rem;
                            color:white;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            font-weight: 700;
                            font-size: 1.3rem;
                            &:hover{
                                background-color: #031319;
                                color: white;
                            }
                            
                        }
                        >p{
                            font-size:1.6rem;
                            font-weight:bold;
                            letter-spacing:0.04rem;
                            margin-right: 3rem;
                        }
                    }
                }
            } 
        }


        .cstm-social-layer {
            display: flex;
            gap: 4.5rem;
            background-color: #f2ecec;
            width: 32rem;
            padding: 0.3rem 0rem;
            padding-left: 1rem;
            border-radius: 4px;
            >a{
                font-size:1.5rem;
                color: #030332;
                width:20rem;
                
                
            }
            >button{
                margin:0rem;
                
                display: flex;
                justify-content: center;
                align-items: center;
                background-color:#f35703; 
                color: white;
                font-size:2.1rem;
                width: 4rem;
            }
        }

        .cstm-popup{
            
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(2px); 


            >.cstm-popup-social{
                background-color: #fff;
                padding: 20px;
                z-index: 100;
                border-radius:1rem;

                >div{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items:center;
                    >input{
                        width:27rem;
                    }
                }


                .btn-close{
                    background-color: black;
                    color: white;
                    width: 6rem;
                    margin-left:1rem;
                    font-size:1rem;
                    &:hover{
                        background-color: black;
                    }
                }
                .btn-submit{
                    background-color: #08a9a6;
                    color: white;
                    width: 6rem;
                    margin-left:1rem;
                    font-size:1rem;
                    &:hover{
                        background-color: #006384;
                    }
                }
                .btn-delete{
                    background-color: #860b0b;
                    color: white;
                    width: 6rem;
                    margin-left:1rem;
                    font-size:1rem;
                    &:hover{
                        background-color: #3f0707;
                    }
                }
                >h3{
                    font-size: 1.7rem;
                    font-weight: bold;
                    margin-bottom:1rem;
                }
                
            }
        }

    }



    @media(min-width: ${props => props.theme.isMobile}) and (max-width: ${props => props.theme.isTab})    {
        font-family: "roboto";



        .cstm-recommend-layer{
            >.cstm-recommend{
                display: flex;
                flex-direction:column;
                >input{
                    min-width:28rem;
                }
            }
            button{
                background-color: #f2c571;
                height: 3.5rem;
                width: 11rem;
                border-radius: 0.5rem;
                
                cursor: pointer;
                font-weight: 700;
                font-size: 1.3rem;
                &:hover{
                    background-color: #157499;
                    color: white;
                }
            }
        }
        h1{
            font-size:1.9rem;
            font-weight:800;
            margin: 1.4rem 3rem;
            letter-spacing: 0.1rem;
            color: #272626;
            font-family: "roboto";
        }
        input{
            border: 0.1px solid rgba(54, 54, 54, 0.2);
            background-color: #f4f0f0;
            width:36rem;
            color: #1a1717;
            &:focus{
                outline:none;
            }
        }
        .cstm-why-cp{
            margin-left: 5rem;
            >p{
                font-size:1.6rem;
                font-weight:bold;
                margin-bottom: 1rem;
                letter-spacing:0.04rem;
            }
            >.cstm-textarea{
                display: flex;
                flex-direction: column;
                >textarea{
                    resize: none;
                    border: 1px solid lightblue;
                    overflow-y: auto;
                    height: 25rem;
                    
                    &:focus{
                        background:rgba(194, 194, 183, 0.3);
                        outline:none;
                    }
                }
                >.cstm-btn{
                    background-color: #f2c571;
                    height: 3.5rem;
                    width: 11rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 1.3rem;
                    &:hover{
                        background-color: #157499;
                        color: white;
                    }
                }
            }    
        }
        .cstm-addinfo-layer{
            margin-left:5rem;
            >.cstm-all{
                display:flex;
                flex-direction: column;
                align-items: flex-start;

                >p{
                    font-size:1.6rem;
                    font-weight:bold;
                    letter-spacing:0.04rem;
                    
                }
              
                >.cstm-input-btn{
                    display: flex;
                    align-items: center;
                    gap:2.9rem;
                    >.btn{
                        background-color: #f2c571;
                        height: 3.5rem;
                        width: 11rem;
                        border-radius: 0.5rem;
                        cursor: pointer;
                        font-weight: 700;
                        font-size: 1.3rem;
                        &:hover{
                            background-color: #157499;
                            color: white;
                        }
                    }
                }
                >.files{
                    width: 35rem;
                    margin-top: 1rem;
                    margin-bottom: 2rem;
                    >.file-delete{
                        display:flex;
                        align-items: center;
                        /* gap:15rem; */
                        /* border:1px solid black; */
                        width: 100%;
                        margin-bottom: 1rem;
                        margin-left: 2rem;
                        
                        >button{
                            background-color: #157499;
                            height: 3rem;
                            width: 7rem;
                            margin:0rem;
                            margin-right: 1.3rem;
                            color:white;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            font-weight: 700;
                            font-size: 1.3rem;
                            &:hover{
                                background-color: #031319;
                                color: white;
                            }
                            
                        }
                        >p{
                            font-size:1.6rem;
                            font-weight:bold;
                            letter-spacing:0.04rem;
                            margin-right: 7rem;
                        }
                    }
                }
            } 
        }
        
        .cstm-social-layer {
            display: flex;
            gap: 10rem;
            background-color: #f2ecec;
            width: 37rem;
            padding: 0.3rem 0rem;
            padding-left: 1rem;
            border-radius: 4px;
            >a{
                font-size:1.5rem;
                color: #030332;
                width:20rem;
                
                
            }
            >button{
                margin:0rem;
                
                display: flex;
                justify-content: center;
                align-items: center;
                background-color:#f35703; 
                color: white;
                font-size:2.1rem;
                width: 4rem;
            }
        }

        .cstm-popup{
            
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(2px); 


            >.cstm-popup-social{
                background-color: #fff;
                padding: 20px;
                z-index: 100;
                border-radius:1rem;

                >div{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items:center;
                }



                .btn-close{
                    background-color: black;
                    color: white;
                    width: 6rem;
                    margin-left:1rem;
                    font-size:1rem;
                    &:hover{
                        background-color: black;
                    }
                }
                .btn-submit{
                    background-color: #08a9a6;
                    color: white;
                    width: 6rem;
                    margin-left:1rem;
                    font-size:1rem;
                    &:hover{
                        background-color: #006384;
                    }
                }
                .btn-delete{
                    background-color: #860b0b;
                    color: white;
                    width: 6rem;
                    margin-left:1rem;
                    font-size:1rem;
                    &:hover{
                        background-color: #3f0707;
                    }
                }
                >h3{
                    font-size: 1.7rem;
                    font-weight: bold;
                    margin-bottom:1rem;
                }
                
            }
        }





    }

    @media (min-width: ${props => props.theme.isTab}) and (max-width: ${props => props.theme.isLargeTab}) {
        font-family: "roboto";
        .cstm-recommend-layer{
            button{
                background-color: #f2c571;
                height: 3.5rem;
                width: 11rem;
                border-radius: 0.5rem;
                margin-left:3.1rem;
                cursor: pointer;
                font-weight: 700;
                font-size: 1.3rem;
                &:hover{
                    background-color: #157499;
                    color: white;
                }
            }
        }
        h1{
            font-size:1.9rem;
            font-weight:800;
            margin: 1.4rem 3rem;
            letter-spacing: 0.1rem;
            color: #272626;
            font-family: "roboto";
        }
        input{
            border: 0.1px solid rgba(54, 54, 54, 0.2);
            background-color: #f4f0f0;
            width:36rem;
            color: #1a1717;
            &:focus{
                outline:none;
            }
        }
        .cstm-why-cp{
            margin-left: 5rem;
            >p{
                font-size:1.6rem;
                font-weight:bold;
                margin-bottom: 1rem;
                letter-spacing:0.04rem;
            }
            >.cstm-textarea{
                display: flex;
                flex-direction: column;
                >textarea{
                    resize: none;
                    border: 1px solid lightblue;
                    overflow-y: auto;
                    height: 25rem;
                    
                    &:focus{
                        background:rgba(194, 194, 183, 0.3);
                        outline:none;
                    }
                }
                >.cstm-btn{
                    background-color: #f2c571;
                    height: 3.5rem;
                    width: 11rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 1.3rem;
                    &:hover{
                        background-color: #157499;
                        color: white;
                    }
                }
            }    
        }
        .cstm-addinfo-layer{
            margin-left:5rem;
            >.cstm-all{
                display:flex;
                flex-direction: column;
                align-items: flex-start;

                >p{
                    font-size:1.6rem;
                    font-weight:bold;
                    letter-spacing:0.04rem;
                    
                }
              
                >.cstm-input-btn{
                    display: flex;
                    align-items: center;
                    gap:2.9rem;
                    >.btn{
                        background-color: #f2c571;
                        height: 3.5rem;
                        width: 11rem;
                        border-radius: 0.5rem;
                        cursor: pointer;
                        font-weight: 700;
                        font-size: 1.3rem;
                        &:hover{
                            background-color: #157499;
                            color: white;
                        }
                    }
                }
                >.files{
                    width: 35rem;
                    margin-top: 1rem;
                    margin-bottom: 2rem;
                    >.file-delete{
                        display:flex;
                        align-items: center;
                        /* gap:15rem; */
                        /* border:1px solid black; */
                        width: 100%;
                        margin-bottom: 1rem;
                        margin-left: 2rem;
                        
                        >button{
                            background-color: #157499;
                     
                            height: 3rem;
                            width: 7rem;
                            margin:0rem;
                            margin-right: 1.3rem;
                            color:white;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            font-weight: 700;
                            font-size: 1.3rem;
                            &:hover{
                                background-color: #031319;
                                color: white;
                            }
                            
                        }
                        >p{
                            font-size:1.6rem;
                            font-weight:bold;
                            letter-spacing:0.04rem;
                            margin-right: 7rem;
                        }
                    }
                }
            } 
        }


        .cstm-social-layer {
            display: flex;
            gap: 10rem;
            background-color: #f2ecec;
            width: 37rem;
            padding: 0.3rem 0rem;
            padding-left: 1rem;
            border-radius: 4px;
            >a{
                font-size:1.5rem;
                color: #030332;
                width:20rem;
                
                
            }
            >button{
                margin:0rem;
                
                display: flex;
                justify-content: center;
                align-items: center;
                background-color:#f35703; 
                color: white;
                font-size:2.1rem;
                width: 4rem;
            }
        }

        .cstm-popup{
            
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(2px); 


            >.cstm-popup-social{
                background-color: #fff;
                padding: 20px;
                z-index: 100;
                border-radius:1rem;

                >div{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items:center;
                }


           

                .btn-close{
                    background-color: black;
                    color: white;
                    width: 6rem;
                    margin-left:1rem;
                    font-size:1rem;
                    &:hover{
                        background-color: black;
                    }
                }
                .btn-submit{
                    background-color: #08a9a6;
                    color: white;
                    width: 6rem;
                    margin-left:1rem;
                    font-size:1rem;
                    &:hover{
                        background-color: #006384;
                    }
                }
                .btn-delete{
                    background-color: #860b0b;
                    color: white;
                    width: 6rem;
                    margin-left:1rem;
                    font-size:1rem;
                    &:hover{
                        background-color: #3f0707;
                    }
                }
                >h3{
                    font-size: 1.7rem;
                    font-weight: bold;
                    margin-bottom:1rem;
                }
                
            }
        }




    }





    @media (min-width: ${props => props.theme.isLargeTab}) and (max-width: ${props => props.theme.isDesktop}) {
        font-family: "roboto";
        .cstm-recommend-layer{

            button{
                background-color: #f2c571;
                height: 3.5rem;
                width: 11rem;
                border-radius: 0.5rem;
                margin-left:3.1rem;
                cursor: pointer;
                font-weight: 700;
                font-size: 1.3rem;
                &:hover{
                    background-color: #157499;
                    color: white;
                }
            }
        }
        h1{
            font-size:1.9rem;
            font-weight:800;
            margin: 1.4rem 3rem;
            letter-spacing: 0.1rem;
            color: #272626;
            font-family: "roboto";
        }
        input{
            border: 0.1px solid rgba(54, 54, 54, 0.2);
            background-color: #f4f0f0;
            width:36rem;
            color: #1a1717;
            &:focus{
                outline:none;
            }
        }
        .cstm-why-cp{
            margin-left: 5rem;
            >p{
                font-size:1.6rem;
                font-weight:bold;
                margin-bottom: 1rem;
                letter-spacing:0.04rem;
            }
            >.cstm-textarea{
                display: flex;
                flex-direction: column;
                >textarea{
                    resize: none;
                    border: 1px solid lightblue;
                    overflow-y: auto;
                    &:focus{
                        background:rgba(194, 194, 183, 0.3);
                        outline:none;
                    }
                }
                >.cstm-btn{
                    background-color: #f2c571;
                    height: 3.5rem;
                    width: 11rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 1.3rem;
                    &:hover{
                        background-color: #157499;
                        color: white;
                    }
                }
            }    
        }
        .cstm-addinfo-layer{
            margin-left:5rem;
            >.cstm-all{
                display:flex;
                flex-direction: column;
                align-items: flex-start;

                >p{
                    font-size:1.6rem;
                    font-weight:bold;
                    letter-spacing:0.04rem;
                    
                }
              
                >.cstm-input-btn{
                    display: flex;
                    align-items: center;
                    gap:2.9rem;
                    >.btn{
                        background-color: #f2c571;
                        height: 3.5rem;
                        width: 11rem;
                        border-radius: 0.5rem;
                        cursor: pointer;
                        font-weight: 700;
                        font-size: 1.3rem;
                        &:hover{
                            background-color: #157499;
                            color: white;
                        }
                    }
                }
                >.files{
                    width: 35rem;
                    margin-top: 1rem;
                    margin-bottom: 2rem;
                    >.file-delete{
                        display:flex;
                        align-items: center;
                        
                        /* gap:15rem; */
                        /* border:1px solid black; */
                        width: 100%;
                        margin-bottom: 1rem;
                        margin-left: 2rem;
                        
                        >button{
                            background-color: #157499;
                            
                            height: 3rem;
                            width: 7rem;
                            margin:0rem;
                            margin-right: 1.3rem;
                            color:white;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            font-weight: 700;
                            font-size: 1.3rem;
                            &:hover{
                                background-color: #031319;
                                color: white;
                            }
                            
                        }
                        >p{
                            font-size:1.6rem;
                            font-weight:bold;
                            letter-spacing:0.04rem;
                            margin-right: 7rem;
                        }
                    }
                }
            } 
        }

        .cstm-social-layer {
            display: flex;
            gap: 10rem;
            background-color: #f2ecec;
            width: 37rem;
            padding: 0.3rem 0rem;
            padding-left: 1rem;
            border-radius: 4px;
            >a{
                font-size:1.5rem;
                color: #030332;
                width:20rem;
                
                
            }
            >button{
                margin:0rem;
                
                display: flex;
                justify-content: center;
                align-items: center;
                background-color:#f35703; 
                color: white;
                font-size:2.1rem;
                width: 4rem;
            }
        }

        .cstm-popup{
            
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(2px); 


            >.cstm-popup-social{
                background-color: #fff;
                padding: 20px;
                z-index: 100;
                border-radius:1rem;

                >div{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items:center;
                }


              

                .btn-close{
                    background-color: black;
                    color: white;
                    width: 6rem;
                    margin-left:1rem;
                    font-size:1rem;
                    &:hover{
                        background-color: black;
                    }
                }
                .btn-submit{
                    background-color: #08a9a6;
                    color: white;
                    width: 6rem;
                    margin-left:1rem;
                    font-size:1rem;
                    &:hover{
                        background-color: #006384;
                    }
                }
                .btn-delete{
                    background-color: #860b0b;
                    color: white;
                    width: 6rem;
                    margin-left:1rem;
                    font-size:1rem;
                    &:hover{
                        background-color: #3f0707;
                    }
                }
                >h3{
                    font-size: 1.7rem;
                    font-weight: bold;
                    margin-bottom:1rem;
                }
                
            }
        }

    }

`

