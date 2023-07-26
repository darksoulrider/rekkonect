import { styled } from 'styled-components'
import { FaBackward } from "react-icons/fa"
import { useForm } from 'react-hook-form'
import { Menu } from '@headlessui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { industryType } from '../../../utils/industryType'
import { Qualification } from '../../../utils/Qualifications'
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { yupResolver } from "@hookform/resolvers/yup"
import { EmpJobCreateYup } from '../../../utils/YupValidation/Employer'
import { toast } from 'react-toastify'

// ***** Api imports ***********
import { usePostJobMutation } from '../../../redux/apicall/employer/Emp_JobAPI'


const CreateJob = () => {
    const [postJob, { isSuccess: isPostjobSuccess, isError: isPostJobError, isLoading: isPostJobLoading }] = usePostJobMutation();

    // ! create front end validation for week days and also, future days, no past day.
    // * States usage 
    const navigate = useNavigate();

    const { register: registerPost, handleSubmit: handlePost, setValue, formState: { errors: errorsPost }, } = useForm({
        resolver: yupResolver(EmpJobCreateYup),

    });

    const jobType = [
        'full time',
        'part time',
        'internship',
        'gig',
        'project based'
    ]
    const location = [
        'Remote',
        'Hybrid',
        'On-site'

    ]
    const optionsQ = Qualification.map((qualification) => ({
        value: qualification.toLowerCase(),
        label: qualification,
    }));

    const options = industryType.map((industry) => ({
        value: industry.toLowerCase(), // Using lowercase for consistency
        label: industry,
    }));


    const [stopEr, setstropEr] = useState(false);
    const showError = (err) => {
        toast.error(err);

    }
    const sendPost = async (data) => {
        console.log("mukesh clicked");
        const job = {
            title: data.title,
            designation: data.designation,
            companyname: data.companyname,
            description: data.description,
            jobtype: data.jobtype,
            location: data.location,
            workdays: {
                firstday: data.firstday,
                lastday: data.lastday,
            },
            contact: data.contact,
            industrytype: data.industrytype,
            qualification: data.qualification,
            experience: data.experience,
            skills: data.skills,
            compensation: {
                salary: data.ctc,
                benefits: data.benefits
            },
            reportingto: data.reportingto,
            deadline: data.date,
        }

        const sending = await postJob(job);


    }
    //  write useEffect to check the request is successful or error
    useEffect(() => {
        if (isPostjobSuccess) {
            toast.success("Job posted successfully");
            navigate('/employer/jobs')
        }
        if (isPostJobError) {
            toast.error(isPostJobError.message);
        }
    }, [isPostjobSuccess, isPostJobError])

    return (
        <Container className="px-0 mb-72">
            <div className="px-10 mb-10 rounded shadow-md flex justify-between pr-20 items-center bg-[#1e5e6c]  md:gap-[20rem]">
                <button onClick={() => navigate("/employer/jobs")} className=' bg-cstmO px-3  rounded-lg text-black font-bold  '><FaBackward className="text-white text-2xl my-1  " /></button>
                <h1 className='font-bold tracking-wider text-white font-roboto text-3xl'>Post Job</h1>
            </div>
            <div className='flex justify-start xl:justify-center'>
                <form className='shadow-md px-32  py-3  bg-white rounded-2xl' onSubmit={handlePost(sendPost)}>
                    <p>Title:</p>
                    <div className='flex flex-col'>
                        <input placeholder='job title' type="text" {...registerPost('title')} />
                        {/* {errorsPost.title && showError(` Title - ${errorsPost.title.message}`)} */}
                        {errorsPost.title && <small>{errorsPost.title.message}</small>}
                    </div>

                    <p>Designation:</p>
                    <div className='flex flex-col'>
                        <input placeholder='designation' type="text" {...registerPost('designation')} />
                        {errorsPost.designation && <small>{errorsPost.designation.message}</small>}
                    </div>

                    <p>company name:</p>
                    <div className='flex flex-col'>
                        <input placeholder='company name' type="text" {...registerPost('companyname')} />
                        {errorsPost.companyname && <small>{errorsPost.companyname.message}</small>}
                    </div>

                    <p>Reporting To:</p>
                    <div className='flex flex-col'>
                        <input placeholder='think if needed or not' type="text" {...registerPost('reportingto')} />
                        {errorsPost.reportingto && <small>{errorsPost.reportingto.message}</small>}
                    </div>

                    <p>Desicription:</p>
                    <div className='flex flex-col'>
                        <textarea spellCheck="false" onChange={() => { }} rows={"4"} cols="100" placeholder='Job Description...' type="text"
                            {...registerPost('description')}
                        />
                        {errorsPost.description && <small>{errorsPost.description.message}</small>}
                    </div>

                    <p>JobType:</p>
                    <Menu>
                        <Menu.Button className="w-full my-2 flex flex-col items-start">
                            <input placeholder='job type' className="" readOnly={true} type="text" {...registerPost('jobtype')} />
                            {errorsPost.jobtype && <small style={{ textTransform: 'capitalize', fontSize: '1.3rem', letterSpacing: '0rem' }} >{errorsPost.jobtype.message}</small>}
                        </Menu.Button>
                        <div className="relative">
                            <Menu.Items className="flex w-72 flex-col gap-3 absolute bg-white border border-slate-200 shadow-md">
                                {
                                    jobType.map(JT => {
                                        return <Menu.Item
                                            as="a"
                                            key={JT}
                                            // onClick={() => handleJobTypeSelection(JT)}
                                            onClick={() => setValue('jobtype', JT, { shouldValidate: true })}
                                            className="cursor-pointer py-2 px-4 hover:bg-slate-200 text-2xl"
                                        >
                                            {JT}
                                        </Menu.Item>
                                    })
                                }
                            </Menu.Items>
                        </div>
                    </Menu>
                    <p>Location:</p>
                    {/* drop down */}

                    <Menu>
                        <Menu.Button className="w-full my-2 flex flex-col items-start ">
                            <input placeholder='Location type' className="" readOnly={true} type="text" {...registerPost('location')} />
                            {errorsPost.location && <small style={{ textTransform: 'capitalize', fontSize: '1.3rem', letterSpacing: '0rem' }} >{errorsPost.location.message}</small>}
                        </Menu.Button>
                        <div className="relative">
                            <Menu.Items className="flex w-72 flex-col gap-3 absolute bg-white border border-slate-200 shadow-md">
                                {
                                    location.map(LT => {
                                        return <Menu.Item
                                            as="a"
                                            key={LT}
                                            // onClick={() => handleJobTypeSelection(JT)}
                                            onClick={() => setValue('location', LT, { shouldValidate: true })}
                                            className="cursor-pointer py-2 px-4 hover:bg-slate-200 text-2xl"
                                        >
                                            {LT}
                                        </Menu.Item>
                                    })
                                }
                            </Menu.Items>
                        </div>
                    </Menu>

                    <p>WorkDays: (Mon-Sat)</p>
                    <div className="cstm-workdays flex gap-10">
                        {/* drop down */}
                        <div className='flex flex-col w-full'>
                            <input className='' placeholder='Start day' type="text" {...registerPost('firstday')} />
                            {errorsPost.firstday && <small >{errorsPost.firstday.message}</small>}
                        </div>
                        <div className="flex flex-col w-full">
                            <input placeholder='End day' type="text" {...registerPost('lastday')} />
                            {errorsPost.lastday && <small>{errorsPost.lastday.message}</small>}
                        </div>
                    </div>

                    <p>Contact:</p>
                    {/* drop down */}
                    <div className='flex flex-col'>
                        <input placeholder='contact' type="text" {...registerPost('contact')} />
                        {errorsPost.contact && <small>{errorsPost.contact.message}</small>}
                    </div>
                    <p>Inudstry type:</p>

                    <div>
                        <CreatableSelect
                            {...registerPost('industrytype')}
                            options={options}
                            isSearchable
                            isClearable
                            placeholder="Industry Type"

                            onChange={(val) => {
                                setValue('industrytype', val ? val.value : null, { shouldValidate: true });
                            }
                            }
                            styles={{
                                input: (baseStyles, state) => ({
                                    ...baseStyles,
                                    height: '1rem',
                                    alignContent: 'center',

                                }),
                                placeholder: (baseStyles, state) => ({
                                    ...baseStyles,
                                    fontSize: '1.3rem',

                                }),
                                control: (provided) => ({
                                    ...provided,
                                    fontSize: '1.5rem',
                                    "@media only screen and (max-width: 640px)": {
                                        ...provided["@media only screen and (max-width: 640px)"],
                                        width: "30rem",
                                    },

                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    fontSize: '1.4rem'
                                }),
                                option: (provided, state) => ({
                                    ...provided,
                                    fontSize: '1.2rem', // Change the font size of the dropdown menu values
                                }),
                                menu: (provided, state) => ({
                                    ...provided,
                                    "@media only screen and (max-width: 640px)": {
                                        ...provided["@media only screen and (max-width: 640px)"],
                                        width: "30rem",
                                    },

                                }),

                            }}
                        />
                        {errorsPost.industrytype && <small>{errorsPost.industrytype.message}</small>}
                    </div>

                    <p>Qualification:</p>
                    {/* drop down */}

                    <div>
                        <CreatableSelect
                            {...registerPost('qualification')}
                            options={optionsQ}
                            isSearchable
                            isClearable
                            placeholder="Qualification"

                            onChange={(val) => {
                                setValue('qualification', val ? val.value : null, { shouldValidate: true });
                            }
                            }
                            styles={{
                                input: (baseStyles, state) => ({
                                    ...baseStyles,
                                    height: '1rem',
                                    alignContent: 'center',

                                }),
                                placeholder: (baseStyles, state) => ({
                                    ...baseStyles,
                                    fontSize: '1.3rem',

                                }),
                                control: (provided) => ({
                                    ...provided,
                                    fontSize: '1.5rem',
                                    "@media only screen and (max-width: 640px)": {
                                        ...provided["@media only screen and (max-width: 640px)"],
                                        width: "30rem",
                                    },

                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    fontSize: '1.4rem'
                                }),
                                option: (provided, state) => ({
                                    ...provided,
                                    fontSize: '1.2rem', // Change the font size of the dropdown menu values
                                }),
                                menu: (provided, state) => ({
                                    ...provided,
                                    "@media only screen and (max-width: 640px)": {
                                        ...provided["@media only screen and (max-width: 640px)"],
                                        width: "30rem",
                                    },

                                }),

                            }}
                        />
                        {errorsPost.qualification && <small>{errorsPost.qualification.message}</small>}
                    </div>
                    {/*                     
                    <div className='flex flex-col'>
                        <input placeholder='Qualification' type="text" {...registerPost('qualification')} />
                        {errorsPost.qualification && <small>{errorsPost.qualification.message}</small>}
                    </div> */}
                    <p>Experience: (Ex- 0-2)</p>
                    {/* drop down */}
                    <div className='flex flex-col'>
                        <input placeholder='Ex- 0-2' type="text" {...registerPost('experience')} />
                        {errorsPost.experience && <small>{errorsPost.experience.message}</small>}
                    </div>
                    <p>Skills Required:</p>
                    {/* drop down */}
                    <div className='flex flex-col'>
                        <input placeholder='Required Skills' type="text" {...registerPost('skills')} />
                        {errorsPost.skills && <small>{errorsPost.skills.message}</small>}
                    </div>
                    <p>Compensation:</p>
                    {/* drop down */}
                    <div className='flex flex-col gap-10'>
                        <div className='flex flex-col'>
                            <input placeholder='CTC in lacks' type="text" {...registerPost('ctc')} />
                            {errorsPost.ctc && <small>{errorsPost.ctc.message}</small>}
                        </div>
                        <div className='flex flex-col'>
                            <textarea spellCheck="false" rows={"4"} cols="100" placeholder='Benefits...' type="text"
                                {...registerPost('benefits')} />
                            {errorsPost.benefits && <small>{errorsPost.benefits.message}</small>}
                        </div>
                    </div>
                    <p>tasks?</p>
                    {/* drop down */}
                    <input placeholder='we can remove this if not needed' type="text" {...registerPost('tasks')} />
                    <p>Deadline</p>
                    {/* drop down */}
                    <div className='flex flex-col'>
                        <input type="date" {...registerPost('date')} />
                        {errorsPost.date && <small>{errorsPost.date.message}</small>}
                    </div>
                    <div className="flex justify-center">
                        <button className='mt-20  bg-cstmO px-5 py-3 text-2xl text-white font-bold rounded-md hover:bg-cstmB' type="submit" >Submit</button>
                    </div>
                </form >
            </div >
        </Container >
    )
}

export default CreateJob

const Container = styled.div`
    

@media (max-width: ${props => props.theme.isMobile}) { 
 

        form{
            margin-left: -2rem;
        }
        input{
            border: 1px solid rgba(51, 57, 65, 0.29);
            border-radius:0.5rem;
            
            height: 3.4rem;
            margin-bottom:0.1rem;
            width: 30rem;
            &:focus{
                border:1px solid rgba(51, 57, 65, 1);
                outline: none;
            }
        }
        p{
            font-size: 1.6rem;
            letter-spacing:0.1rem;
            font-family: 'roboto';
            margin:0.9rem 0rem;
        }
        textarea{
            font-size: 1.6rem;
            border: 1px solid lightblue;
            overflow-y: auto;
            border-radius:0.2rem;
            resize: none;
            width:30rem;
            height:20rem;
            padding:0.6rem;
            &:focus{
                border:1px solid rgba(51, 57, 65, 1);
                outline: none;
                background:rgba(247, 247, 241, 0.3);
            }
        }
        small{
            font-size:1.3rem;
            color:red;

        }
        .cstm-btm{
            display:flex;
            justify-content:start;
            gap:3rem;
            >div>p{
                font-size:1.3rem;
            }

            >button{
                width:8rem;
                font-size:1rem;
                padding:0.5rem 1rem;
                font-weight: 900;
            }
        }
        .cstm-workdays{
            display:flex;
            flex-direction:column;
            gap:1rem;
            margin-bottom:1.4rem;
        }
    }
    @media (min-width: ${props => props.theme.isMobile}) and (max-width: ${props => props.theme.isTab}) { 
        form{
            margin-left: 1rem;
            
        }
        input{
            border: 1px solid rgba(51, 57, 65, 0.29);
            border-radius:0.5rem;
            
            height: 3.4rem;
            margin-bottom:0.1rem;
            width: 42rem;
            &:focus{
                border:1px solid rgba(51, 57, 65, 1);
                outline: none;
            }
        }
        p{
            font-size: 1.6rem;
            letter-spacing:0.1rem;
            font-family: 'roboto';
            margin:0.9rem 0rem;
        }
        textarea{
            font-size: 1.6rem;
            border: 1px solid lightblue;
            overflow-y: auto;
            border-radius:0.2rem;
            resize: none;
            width:42rem;
            height:20rem;
            padding:0.6rem;
            &:focus{
                border:1px solid rgba(51, 57, 65, 1);
                outline: none;
                background:rgba(247, 247, 241, 0.3);
            }
        }
        small{
            font-size:1.3rem;
            color:red;

        }
        .cstm-btm{
            display:flex;
            justify-content:start;
            gap:3rem;
            >div>p{
                font-size:1.3rem;
            }

            >button{
                width:8rem;
                font-size:1rem;
                padding:0.5rem 1rem;
                font-weight: 900;
            }
        }
        .cstm-workdays{
            display:flex;
            flex-direction:column;
            gap:1rem;
            margin-bottom:1.4rem;
        }
    }
    @media (min-width: ${props => props.theme.isTab}) and (max-width: ${props => props.theme.isLargeTab}) { 
        form{
            margin-left: 3rem;
            
        }
        input{
            border: 1px solid rgba(51, 57, 65, 0.29);
            border-radius:0.5rem;
            
            height: 3.4rem;
            margin-bottom:0.1rem;
            width: 62rem;
            &:focus{
                border:1px solid rgba(51, 57, 65, 1);
                outline: none;
            }
        }
        p{
            font-size: 1.6rem;
            letter-spacing:0.1rem;
            font-family: 'roboto';
            margin:0.9rem 0rem;
        }
        textarea{
            font-size: 1.6rem;
            border: 1px solid lightblue;
            overflow-y: auto;
            border-radius:0.2rem;
            resize: none;
            width:62rem;
            height:20rem;
            padding:0.6rem;
            &:focus{
                border:1px solid rgba(51, 57, 65, 1);
                outline: none;
                background:rgba(247, 247, 241, 0.3);
            }
        }
        small{
            font-size:1.3rem;
            color:red;

        }
        .cstm-btm{
            display:flex;
            justify-content:start;
            gap:3rem;
            >div>p{
                font-size:1.3rem;
            }

            >button{
                width:8rem;
                font-size:1rem;
                padding:0.5rem 1rem;
                font-weight: 900;
            }
        }
        .cstm-workdays{
            display:flex;
            flex-direction:column;
            gap:1rem;
            margin-bottom:1.4rem;
        }
    }
    @media (min-width: ${props => props.theme.isLargeTab}) and (max-width: ${props => props.theme.isDesktop}) { 
        form{
            
            
        }
        input{
            border: 1px solid rgba(51, 57, 65, 0.29);
            border-radius:0.5rem;
            
            height: 3.4rem;
            margin-bottom:0.1rem;
            width: 62rem;
            &:focus{
                border:1px solid rgba(51, 57, 65, 1);
                outline: none;
            }
        }
        p{
            font-size: 1.6rem;
            letter-spacing:0.1rem;
            font-family: 'roboto';
            margin:0.9rem 0rem;
        }
        textarea{
            font-size: 1.6rem;
            border: 1px solid lightblue;
            overflow-y: auto;
            border-radius:0.2rem;
            resize: none;
            width:62rem;
            height:20rem;
            padding:0.6rem;
            &:focus{
                border:1px solid rgba(51, 57, 65, 1);
                outline: none;
                background:rgba(247, 247, 241, 0.3);
            }
        }
        small{
            font-size:1.3rem;
            color:red;

        }
        .cstm-btm{
            display:flex;
            justify-content:start;
            gap:3rem;
            >div>p{
                font-size:1.3rem;
            }

            >button{
                width:8rem;
                font-size:1rem;
                padding:0.5rem 1rem;
                font-weight: 900;
            }
        }
        .cstm-workdays{
            display:flex;
            flex-direction:column;
            gap:1rem;
            margin-bottom:1.4rem;
        }
    }

  
`