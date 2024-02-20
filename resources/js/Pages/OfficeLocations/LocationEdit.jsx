import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';


export default function CategoryEdit({ auth,location, countries }) {
    console.log(countries);
    const { data, setData, put, processing, errors, reset } = useForm(location);
    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        put(route('officelocations.update',location.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Office Locations (Edit)</h2>}
        >
            <Head title="Office Locations" />
           
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="grid grid-cols-2 gap-4">
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
                                        <InputLabel htmlFor="country_id" value="Country" />
                                        <SelectInput
                                            id="country_id"
                                            options={countries}
                                            selected={data.country_id}
                                            placeholder="Select Country"
                                            valuecol="id"
                                            namecol="country_nicename"
                                            name="parent_id"
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('country_id', e.target[e.target.selectedIndex].value)}
                                        />
                                        <InputError message={errors.country_id} className="mt-2" />
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