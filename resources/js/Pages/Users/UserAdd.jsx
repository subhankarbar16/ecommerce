import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import SelectInput from '@/Components/SelectInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';


export default function UserAdd({ auth, countries }) {
    //console.log(countries);
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        user_image: '',
        email: '',
        phone:'',
        password: '',
        confirm_password: '',
        street: '',
        city: '',
        state :'',
        country_id:'',
        zipcode:'',
        user_type:1,

    });
    const submit = (e) => {
        e.preventDefault();

        post(route('users.add'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users (Add)</h2>}
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} encType="multipart/form-data">
                                <div className="grid grid-cols-2 gap-4">
                                    <div >
                                        <InputLabel htmlFor="first_name" value="First Name" />
                                        <TextInput
                                            id="first_name"
                                            type="text"
                                            name="first_name"
                                            value={data.first_name}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                        />
                                        <InputError message={errors.first_name} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="street" value="Street" />
                                        <TextInput
                                            id="street"
                                            type="text"
                                            name="street"
                                            value={data.street}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('street', e.target.value)}
                                        />
                                        <InputError message={errors.street} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="last_name" value="Last Name" />
                                        <TextInput
                                            id="last_name"
                                            type="text"
                                            name="last_name"
                                            value={data.last_name}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                        />
                                        <InputError message={errors.last_name} className="mt-2" />
                                    </div>
                                    
                                    <div >
                                        <InputLabel htmlFor="city" value="City" />
                                        <TextInput
                                            id="city"
                                            type="text"
                                            name="city"
                                            value={data.city}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('city', e.target.value)}
                                        />
                                        <InputError message={errors.city} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="email" value="Email" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="state" value="State" />
                                        <TextInput
                                            id="state"
                                            type="text"
                                            name="state"
                                            value={data.state}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('state', e.target.value)}
                                        />
                                        <InputError message={errors.state} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="password" value="Password" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="country_id" value="Country" />
                                        <SelectInput
                                            id="country_id"
                                            options={countries}
                                            selected={data.country_id}
                                            namecol="country_nicename"
                                            valuecol="id"
                                            placeholder="Select Country"
                                            name="country_id"
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('country_id', e.target[e.target.selectedIndex].value)}
                                        />
                                        <InputError message={errors.country_id} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="confirm_password" value="Confirm Password" />
                                        <TextInput
                                            id="confirm_password"
                                            type="password"
                                            name="confirm_password"
                                            value={data.confirm_password}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('confirm_password', e.target.value)}
                                        />
                                        <InputError message={errors.confirm_password} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="zipcode" value="Zipcode" />
                                        <TextInput
                                            id="zipcode"
                                            type="text"
                                            name="zipcode"
                                            value={data.zipcode}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('zipcode', e.target.value)}
                                        />
                                        <InputError message={errors.zipcode} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="user_image" value="User Image" />
                                        <TextInput
                                            id="user_image"
                                            type="file"
                                            name="user_image"
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('user_image', e.target.files[0])}
                                        />
                                        <InputError message={errors.user_image} className="mt-2" />
                                    </div>
                                    <div >
                                        <InputLabel htmlFor="phone" value="Phone" />
                                        <TextInput
                                            id="phone"
                                            type="text"
                                            name="phone"
                                            value={data.phone}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('phone', e.target.value)}
                                        />
                                        <InputError message={errors.phone} className="mt-2" />
                                    </div>
                                    <div className="col-span-2">
                                        <PrimaryButton className="float-right" disabled={processing}>
                                            Submit
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}