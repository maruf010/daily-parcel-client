import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { v4 as uuidv4 } from "uuid"; // for tracking ID
import useAxiosSecure from "../../Hooks/useAxiosSecure";



const SendParcel = () => {

    const serviceCenters = useLoaderData();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [uniqueRegions, setUniqueRegions] = useState([]);
    const [senderDistricts, setSenderDistricts] = useState([]);
    const [receiverDistricts, setReceiverDistricts] = useState([]);

    const senderRegion = watch("sender_region");
    const receiverRegion = watch("receiver_region");
    const type = watch("type");

    //unique region
    useEffect(() => {
        const regions = Array.from(new Set(serviceCenters.map((sc) => sc.region)));
        setUniqueRegions(regions);
    }, [serviceCenters]);

    useEffect(() => {
        const districts = serviceCenters
            .filter((sc) => sc.region === senderRegion)
            .map((sc) => sc.district);
        setSenderDistricts(districts);
    }, [serviceCenters, senderRegion]);

    useEffect(() => {
        const districts = serviceCenters
            .filter((sc) => sc.region === receiverRegion)
            .map((sc) => sc.district);
        setReceiverDistricts(districts);
    }, [serviceCenters, receiverRegion]);

    const generateTrackingId = () => {
        return uuidv4(); // Can customize later if needed (e.g. prefix with 'TRK-')
    };

    const onSubmit = (data) => {
        const isSameDistrict = data.sender_center === data.receiver_center;
        const deliveryZone = isSameDistrict ? "Within City" : "Outside City/District";

        // === Cost Calculation Start ===
        let baseCost = 0;
        let extraCharge = 0;
        let extraText = "";

        if (data.type === "document") {
            baseCost = isSameDistrict ? 60 : 80;
        } else {
            const weight = parseFloat(data.weight || 0);
            if (weight <= 3) {
                baseCost = isSameDistrict ? 110 : 150;
            } else {
                const extraKg = weight - 3;
                const extraPerKg = 40;
                const extraCost = Math.ceil(extraKg) * extraPerKg;
                const outsideExtra = isSameDistrict ? 0 : 40;
                extraCharge = extraCost + outsideExtra;
                baseCost = isSameDistrict ? 110 : 150;
                extraText = `(${extraPerKg}tk * ${Math.ceil(extraKg)}kg = ৳${extraCost}${outsideExtra > 0 ? ` + ৳${outsideExtra} for outside delivery` : ""})`;
            }
        }

        const totalCost = baseCost + extraCharge;
        // === Cost Calculation End ===

        Swal.fire({
            title: 'Parcel Summary',
            icon: 'info',
            html: `<div style="text-align: left">
            <p><strong>Title:</strong> ${data.title}</p>
            <p><strong>Type:</strong> ${data.type}</p>
            <p><strong>Weight:</strong> ${data.weight || '-'} kg</p>
            <p><strong>Delivery Zone:</strong> ${deliveryZone}</p>
            <p><strong>Base Cost:</strong> ৳${baseCost}</p>
            <p><strong>Extra Charges:</strong> ৳${extraCharge} ${extraText}</p>
            <p><strong>Total Estimated Cost:</strong> ৳${totalCost}</p>
            <hr>
            <p><strong>Sender:</strong> ${data.sender_name} (${data.sender_center})</p>
            <p><strong>Receiver:</strong> ${data.receiver_name} (${data.receiver_center})</p>
            <p><strong>Email:</strong> ${user?.email || 'unknown'}</p>
        </div>`,
            showCancelButton: true,
            confirmButtonText: 'Proceed to Payment',
            cancelButtonText: 'Edit Information'
        }).then((result) => {
            if (result.isConfirmed) {
                // === Save to DB Starts payload->parcel data ===
                const payload = {
                    ...data,
                    cost: totalCost,
                    email: user?.email || "unknown",
                    createdAt: new Date().toISOString(),
                    status: "Pending",
                    payment_status: 'unpaid',
                    tracking_id: generateTrackingId(),
                    trackingHistory: [
                        {
                            status: "Created",
                            timestamp: new Date().toISOString(),
                        },
                    ],
                };
                console.log("Saved:", payload);

                // === save data to server ===
                axiosSecure.post('parcels', payload)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            // todo: redirect to the payment page
                            Swal.fire({
                                title: "Redirecting...",
                                text: "Processing to payment gateway.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false
                            });
                        }
                    })

                // await fetch('/api/parcels', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(payload)
                // });


                // === Save to DB Ends ===
            }
        });
    };




    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">Send a Parcel</h2>
            <p className="text-gray-600 mb-4">Please fill all required fields.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Parcel Info */}
                <fieldset className="border p-4 rounded">
                    <legend className="text-lg font-semibold">Parcel Info</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="label">Parcel Type</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="document"
                                        {...register("type", { required: true })}
                                        className="radio"
                                    />
                                    Document
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="non-document"
                                        {...register("type", { required: true })}
                                        className="radio"
                                    />
                                    Non-Document
                                </label>
                            </div>
                            {errors.type && <span className="text-red-500 text-sm">Select a type</span>}
                        </div>

                        {type === "non-document" && (
                            <div>
                                <label className="label">Weight (kg)</label>
                                <input type="number" step="0.1" {...register("weight", { required: true })} className="input input-bordered w-full" />
                                {errors.weight && <span className="text-red-500 text-sm">Required</span>}
                            </div>
                        )}

                        <div className="md:col-span-2">
                            <label className="label">Title</label>
                            <input {...register("title", { required: true })} className="input input-bordered w-full" />
                            {errors.title && <span className="text-red-500 text-sm">Required</span>}
                        </div>
                    </div>
                </fieldset>

                {/* Sender & Receiver */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sender Info */}
                    <fieldset className="border p-4 rounded">
                        <legend className="text-lg font-semibold">Sender Info</legend>
                        <div className="space-y-3">
                            <input {...register("sender_name", { required: true })} placeholder="Name" className="input input-bordered w-full" />
                            <input {...register("sender_contact", { required: true })} placeholder="Contact" className="input input-bordered w-full" />
                            <select {...register("sender_region", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Region</option>
                                {uniqueRegions.map((region) => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                            <select {...register("sender_center", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Service Center</option>
                                {senderDistricts.map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                            <input {...register("sender_address", { required: true })} placeholder="Address" className="input input-bordered w-full" />
                            <textarea {...register("pickup_instruction", { required: true })} placeholder="Pickup Instruction" className="textarea textarea-bordered w-full"></textarea>
                        </div>
                    </fieldset>

                    {/* Receiver Info */}
                    <fieldset className="border p-4 rounded">
                        <legend className="text-lg font-semibold">Receiver Info</legend>
                        <div className="space-y-3">
                            <input {...register("receiver_name", { required: true })} placeholder="Name" className="input input-bordered w-full" />
                            <input {...register("receiver_contact", { required: true })} placeholder="Contact" className="input input-bordered w-full" />
                            <select {...register("receiver_region", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Region</option>
                                {uniqueRegions.map((region) => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                            <select {...register("receiver_center", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Service Center</option>
                                {receiverDistricts.map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                            <input {...register("receiver_address", { required: true })} placeholder="Address" className="input input-bordered w-full" />
                            <textarea {...register("delivery_instruction", { required: true })} placeholder="Delivery Instruction" className="textarea textarea-bordered w-full"></textarea>
                        </div>
                    </fieldset>
                </div>

                <button type="submit" className="btn btn-primary w-full">Submit</button>
            </form>
        </div>
    );
};

export default SendParcel;