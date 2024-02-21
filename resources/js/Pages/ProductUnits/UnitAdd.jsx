import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';


export default function UnitAdd({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        unit_name: '',
    });
    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('productunits.add'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Product Units (Add)</h2>}
        >
            <Head title="Product Units" />
           
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div >
                                        <InputLabel htmlFor="unit_name" value="Unit Name" />
                                        <TextInput
                                            id="unit_name"
                                            type="text"
                                            name="unit_name"
                                            value={data.unit_name}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData('unit_name', e.target.value)}
                                        />
                                        <InputError message={errors.unit_name} className="mt-2" />
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