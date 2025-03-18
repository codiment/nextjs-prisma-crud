"use client"

import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import axios from "axios";
import {useEffect} from "react";
import {use} from "react";

function NewPage({params} :{params: { id: string }}) {

    const {handleSubmit, register, setValue} = useForm();
    const router = useRouter()
    
    // @ts-expect-error - Ignorar advertencia de Next.js sobre params
    const unwrappedParams = use(params) as { id: string };

    useEffect(() => {
        if (unwrappedParams.id) {
            axios.get(`/api/tasks/${unwrappedParams.id}`)
                .then(res => {
                    setValue('title', res.data.title)
                    setValue('description', res.data.description)
                })
        }
    }, [setValue, unwrappedParams.id]);

    const onSubmit = handleSubmit(async (data) => {
        if (unwrappedParams.id) {
            await axios.put(`/api/tasks/${unwrappedParams.id}`, data)

        }   else {
                await axios.post('/api/tasks', data);

        }
        router.push('/');
        router.refresh()
    })

    return (
        <div>
        <section className="h-screen flex items-center justify-center">
            <form onSubmit={onSubmit}>
                <label htmlFor='title' className='font-bold text-xs'>Write your title:</label>
                <input id='title'
                       type="text"
                       placeholder='write a title'
                    className="px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-white block w-full mb-2"
                       {...register('title')}
                />
                <label htmlFor='description' className='font-bold text-xs'>Write your description:</label>
                <textarea id='description'
                          placeholder='write a description'
                          className="px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-white block w-full"
                          {...register('description')}
                ></textarea>
                <div className='flex justify-between'>
                    <button type='submit'
                            className='bg-sky-500 px-3 py-1 rounded-md text-white mt-2 hover:bg-sky-400 hover:cursor-pointer'>
                        {unwrappedParams.id ? 'Update' : 'Create'}
                    </button>
                    <button type='button'
                            className='bg-red-500 px-3 py-1 rounded-md text-white mt-2 hover:bg-red-400 hover:cursor-pointer'
                            onClick={async () => {
                              await axios.delete(`/api/tasks/${unwrappedParams.id}`);
                              router.push('/');
                            }}>
                        Delete
                    </button>
                </div>
            </form>
        </section>
        </div>
    )
}

export default NewPage;
