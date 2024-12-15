'use client';
import { useState, useEffect } from 'react';
import { supabase } from './server/subapase';

export default function Tumbuhan({ item }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState({ ...item });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({
            ...editedItem,
            [name]: value,
        });
    };

    const handleSave = async () => {
        try {
            const { error } = await supabase
                .from('tumbuhan') // pastikan ini adalah nama table kamu
                .update(editedItem)
                .eq('kode', item.kode); // pastikan 'id' adalah identifier yang benar untuk mengupdate data yang sesuai

            if (error) {
                throw error;
            }
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <div className="p-4 w-full h-full justify-center items-center ">
            <div className="overflow-hidden border border-white w-full max-h-screen lg:h-full rounded-lg">
                <div className="flex flex-col lg:flex-row">
                    <div className="relative h-full w-full lg:w-2/3 border-b lg:h-auto">
                        <img
                            src={item.foto}
                            className="w-full h-[250px] lg:h-full lg:w-full bg-cover bg-center rounded-t-md"
                        />
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 w-full h-14 flex items-center justify-center">
                            <div className="text-center text-white font-bold">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="nama"
                                        value={editedItem.nama}
                                        onChange={handleChange}
                                        className="text-center text-[14px] border-b-2 border-white bg-transparent text-white"
                                    />
                                ) : (
                                    <p className=" text-[14px] border-b-2 border-white">{item.nama}</p>
                                )}
                                <p className="text-[10px] italic">( {item.subLatin} )</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 relative overflow-hidden justify-center w-full h-full items-center">
                        <img
                            src="https://res.cloudinary.com/dgnfgxqem/image/upload/v1732966875/tumbuhan/kgt0pkfa1jjyqfx1mill.jpg"
                            className="w-full h-full lg:h-full object-cover"
                        />
                        <div className="overflow-hidden absolute bg-black bg-opacity-50 top-0 left-1/2 transform -translate-x-1/2 rounded-b-lg max-lg:rounded-r-none w-full h-full px-2 text-xs lg:max-h-screen">
                            <div className="border text-white mx-2 px-2 text-justify h-full overflow-y-auto no-scrollbar">
                                <div className="font-bold mt-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="subNama"
                                            value={editedItem.subNama}
                                            onChange={handleChange}
                                            className="text-white bg-transparent border-b-2 w-full border-white"
                                        />
                                    ) : (
                                        item.subNama
                                    )}
                                </div>
                                {isEditing ? (
                                    <textarea
                                        name="nutrisi"
                                        value={editedItem.namaLatin}
                                        onChange={handleChange}
                                        className="mt-2 text-white bg-transparent w-full h-28 border border-white"
                                    />
                                ) : (
                                    item.namaLatin
                                )}
                                <div className="absolute bottom-0 p-4 flex justify-center">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                        onClick={handleEditToggle}
                                    >
                                        {isEditing ? 'Cancel' : 'Edit'}
                                    </button>
                                    {isEditing && (
                                        <button
                                            className="px-4 py-2 bg-green-500 text-white rounded ml-2"
                                            onClick={handleSave}
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
