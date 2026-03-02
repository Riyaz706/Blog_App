import { useState } from 'react'
import { useForm } from 'react-hook-form'


function FormDemo() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [users, setUsers] = useState([])
    console.log(errors)
    //form submission
    const SubmitForm = (obj) => {
        setUsers([...users, obj])
    }


    return (
        <div className='text-center border-2 bg-orange-200 p-10'>

            <form onSubmit={handleSubmit(SubmitForm)} className='border-2 rounded-xl p-2 rounded-full'>
                <div className='mb-2 b p-2'>
                    <h1 className='text-4xl font-bold p-1'>User Registration Form</h1>
                    <input className='border-2 rounded-xl p-2 rounded-full m-1' type="text" name='firstName' {...register('firstName', { required: true, minLength: 4, maxLength: 6 })} placeholder='Enter First Name' />
                    {errors.firstName?.type === 'required' && <p className='text-red-500'>First Name is required</p>}
                    {errors.firstName?.type === 'minLength' && <p className='text-red-500'>First Name is too short</p>}
                    {errors.firstName?.type === 'maxLength' && <p className='text-red-500'>First Name is too long</p>}
                </div>
                <div className='mb-2 b p-2'>
                    <input className='border-2 rounded-xl p-2 rounded-full ' type="text" name='lastName' {...register('lastName', { required: true, minLength: 4, maxLength: 6 })} placeholder='Enter Last Name' />
                    {errors.lastName?.type === 'required' && <p className='text-red-500'>Last Name is required</p>}
                    {errors.lastName?.type === 'minLength' && <p className='text-red-500'>Last Name is too short</p>}
                    {errors.lastName?.type === 'maxLength' && <p className='text-red-500'>Last Name is too long</p>}
                </div>
                <div className='mb-2 b p-2'>
                    <input className='border-2 rounded-xl p-2 rounded-full' type="text" name='Email' {...register('Email', { required: true, minLength: 3 })} placeholder='Enter Email' />
                    {errors.Email?.type === 'required' && <p className='text-red-500'>Email is required</p>}
                    {errors.Email?.type === 'minLength' && <p className='text-red-500'>Email is too short</p>}
                </div>
                <div className='mb-2 b p-2'>
                    {/* year of birth not before 2020 */}
                    <input className='border-2 rounded-xl p-2 rounded-full' type="date" name="dob" id="" {...register('dob', { required: true, min: '2020-01-01' })} />
                    {errors.dob?.type === 'required' && <p className='text-red-500'>dob is required</p>}
                    {errors.dob?.type === 'min' && <p className='text-red-500'>dob should be greater than 2020</p>}
                </div>
                <div className='text-center mb-2 p-1'>
                    <input className='border-2 rounded-xl p-2 rounded-full bg-yellow-400' type="submit" value="Submit" />
                </div>
            </form>

            <div className='border-2 rounded-xl p-2 rounded-full mt-7 p-2'>
            <h1 className='text-4xl font-bold p-1 text-center'>List of Users</h1>
            <table className='mx-auto border-2 rounded-xl rounded-full mt-2'>
                <thead>
                    <tr>
                        <th className='border-2 rounded-xl p-2 rounded-full text-center'>First Name</th>
                        <th className='border-2 rounded-xl p-2 rounded-full text-center'>Last Name</th>
                        <th className='border-2 rounded-xl p-2 rounded-full text-center'>Email</th>
                        <th className='border-2 rounded-xl p-2 rounded-full text-center'>DOB</th>
                    </tr>
                    </thead>
                <tbody>
                    {users.map((userobj, index) => (
                        <tr key={index}>
                            <td className='border-2 rounded-xl p-2 rounded-full text-center'>{userobj.firstName}</td>
                            <td className='border-2 rounded-xl p-2 rounded-full text-center'>{userobj.lastName}</td>
                            <td className='border-2 rounded-xl p-2 rounded-full text-center'>{userobj.Email}</td>
                            <td className='border-2 rounded-xl p-2 rounded-full text-center'>{userobj.dob}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
        </div>

    )
}
export default FormDemo