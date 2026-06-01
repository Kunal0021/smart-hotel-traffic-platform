import { useEffect, useState } from "react";
import API from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Hotels() {

    const [newName, setNewName] = useState("");
    const [newLocation, setNewLocation] =
        useState("");
    const [newPrice, setNewPrice] =
        useState("");

    const [newDescription, setNewDescription] =
        useState("");

    const [newRooms, setNewRooms] =
        useState("");
    const [hotels, setHotels] = useState([]);

    const [editingHotel, setEditingHotel] =
        useState(null);

    const [name, setName] = useState("");
    const [location, setLocation] =
        useState("");
    const [pricePerNight, setPricePerNight] =
        useState("");

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            const { data } = await API.get(
                "/hotels"
            );

            setHotels(data.hotels);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteHotel = async (id) => {
        try {
            const confirmDelete =
                window.confirm(
                    "Are you sure you want to delete this hotel?"
                );

            if (!confirmDelete) return;

            await API.delete(`/hotels/${id}`);

            fetchHotels();
        } catch (error) {
            console.log(error);
        }
    };

    const startEdit = (hotel) => {
        setEditingHotel(hotel);

        setName(hotel.name);
        setLocation(hotel.location);
        setPricePerNight(
            hotel.pricePerNight
        );
    };

    const updateHotel = async (e) => {
        e.preventDefault();

        try {
            await API.put(
                `/hotels/${editingHotel._id}`,
                {
                    name,
                    location,
                    pricePerNight,
                }
            );

            setEditingHotel(null);

            setName("");
            setLocation("");
            setPricePerNight("");

            fetchHotels();
        } catch (error) {
            console.log(error);
        }
    };

    const createHotel = async (e) => {
        e.preventDefault();

        try {
            await API.post("/hotels", {
                name: newName,
                location: newLocation,
                description: newDescription,
                pricePerNight: Number(newPrice),
                availableRooms: Number(newRooms),
            });

            setNewName("");
            setNewLocation("");
            setNewDescription("");
            setNewPrice("");
            setNewRooms("");

            fetchHotels();
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Hotels Management
                </h1>
            </div>

            <form
                onSubmit={createHotel}
                className="
    bg-white
    p-6
    rounded-xl
    shadow
    mb-6
    "
            >
                <h2 className="text-xl font-bold mb-4">
                    Add Hotel
                </h2>

                <div className="flex flex-wrap gap-3">
                    <input
                        type="text"
                        placeholder="Hotel Name"
                        value={newName}
                        onChange={(e) =>
                            setNewName(e.target.value)
                        }
                        className="border p-2 rounded"
                    />

                    <input
                        type="text"
                        placeholder="Location"
                        value={newLocation}
                        onChange={(e) =>
                            setNewLocation(
                                e.target.value
                            )
                        }
                        className="border p-2 rounded"
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        value={newDescription}
                        onChange={(e) =>
                            setNewDescription(
                                e.target.value
                            )
                        }
                        className="border p-2 rounded"
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={newPrice}
                        onChange={(e) =>
                            setNewPrice(
                                e.target.value
                            )
                        }
                        className="border p-2 rounded"
                    />

                    <input
                        type="number"
                        placeholder="Available Rooms"
                        value={newRooms}
                        onChange={(e) =>
                            setNewRooms(
                                e.target.value
                            )
                        }
                        className="border p-2 rounded"
                    />

                    <button
                        type="submit"
                        className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded
            "
                    >
                        Create Hotel
                    </button>
                </div>
            </form>

            {editingHotel && (
                <form
                    onSubmit={updateHotel}
                    className="
                    bg-white
                    p-6
                    rounded-xl
                    shadow
                    mb-6
                    "
                >
                    <h2 className="text-xl font-bold mb-4">
                        Edit Hotel
                    </h2>

                    <div className="flex gap-3 flex-wrap">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            placeholder="Hotel Name"
                            className="
                            border
                            p-2
                            rounded
                            "
                        />

                        <input
                            type="text"
                            value={location}
                            onChange={(e) =>
                                setLocation(
                                    e.target.value
                                )
                            }
                            placeholder="Location"
                            className="
                            border
                            p-2
                            rounded
                            "
                        />

                        <input
                            type="number"
                            value={
                                pricePerNight
                            }
                            onChange={(e) =>
                                setPricePerNight(
                                    e.target.value
                                )
                            }
                            placeholder="Price"
                            className="
                            border
                            p-2
                            rounded
                            "
                        />
                    </div>

                    <div className="mt-4 flex gap-2">
                        <button
                            type="submit"
                            className="
                            bg-green-600
                            text-white
                            px-4
                            py-2
                            rounded
                            "
                        >
                            Save Changes
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setEditingHotel(
                                    null
                                )
                            }
                            className="
                            bg-gray-500
                            text-white
                            px-4
                            py-2
                            rounded
                            "
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className="p-4 text-left">
                                Name
                            </th>

                            <th className="p-4 text-left">
                                Location
                            </th>

                            <th className="p-4 text-left">
                                Price/Night
                            </th>

                            <th className="p-4 text-left">
                                Rating
                            </th>

                            <th className="p-4 text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {hotels.map((hotel) => (
                            <tr
                                key={hotel._id}
                                className="border-t"
                            >
                                <td className="p-4">
                                    {hotel.name}
                                </td>

                                <td className="p-4">
                                    {
                                        hotel.location
                                    }
                                </td>

                                <td className="p-4">
                                    ₹
                                    {
                                        hotel.pricePerNight
                                    }
                                </td>

                                <td className="p-4">
                                    {
                                        hotel.rating
                                    }
                                </td>

                                <td className="p-4 flex gap-2">
                                    <button
                                        onClick={() =>
                                            startEdit(
                                                hotel
                                            )
                                        }
                                        className="
                                        bg-yellow-500
                                        text-white
                                        px-3
                                        py-1
                                        rounded
                                        "
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteHotel(
                                                hotel._id
                                            )
                                        }
                                        className="
                                        bg-red-500
                                        text-white
                                        px-3
                                        py-1
                                        rounded
                                        "
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}