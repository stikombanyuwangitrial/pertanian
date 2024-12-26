'use client';

import { useState } from 'react';
import { supabase } from './server/subapase';
// import Image from 'next/image';


export default function Tumbuhan({ item }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState({ ...item });
    const [file, setFile] = useState(null); 
    const [newPhoto, setNewPhoto] = useState(null); 
    const [uploading, setUploading] = useState(false);

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

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setNewPhoto(selectedFile);
    };

    const uploadImages = async (file) => {
        if (!file) {
            console.log('File belum dipilih!');
            return '';
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');
        formData.append('folder', 'tumbuhan');

        try {
            setUploading(true);
            const response = await fetch('https://api.cloudinary.com/v1_1/dgnfgxqem/image/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('Upload result:', data);

            return data.secure_url;
        } catch (error) {
            console.error('Error uploading file:', error);
            return '';
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        try {
            let updatedData = { ...editedItem };

            if (file) {
                const photoUrl = await uploadImages(file);
                if (photoUrl) {
                    updatedData.foto = photoUrl;
                }
            }

            console.log('Updated Data before save:', updatedData);

            const { data, error } = await supabase
                .from('tumbuhan')
                .update(updatedData)
                .eq('kode', item.kode)
                .select();

            console.log('Response Data:', data);

            if (error) {
                throw error;
            }

            Object.assign(item, updatedData);
            setIsEditing(false);

            alert("Data berhasil disimpan!");
        } catch (error) {
            console.error("Error saving data:", error.message || error);
            alert("Terjadi kesalahan saat menyimpan data.");
        }
    };

    return (
        <div className="p-4 w-full h-full justify-center items-center">
            <div className="overflow-hidden border border-white w-full h-full lg:h-[500px] rounded-lg">
                <div className="flex flex-col lg:flex-row">
                    <div className="relative h-full w-full lg:w-2/3 border-b lg:border-r ">
                        <img
                            src={item.foto || null}
                            className="w-full h-[250px] lg:h-[500px] lg:w-full bg-cover bg-center rounded-t-md"
                            alt="Tumbuhan"
                        />
                        <div className='flex-1 text-center absolute bottom-0 bg-black w-full h-14 bg-opacity-50 block lg:hidden'>
                            <div className="text-[14px] font-bold mt-2  ">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="nama"
                                        value={editedItem.nama}
                                        onChange={handleChange}
                                        className="text-white bg-transparent border-b-2 w-full border-white"
                                    />
                                ) : (
                                    item.nama
                                )}
                            </div>
                            <div className="text-[10px] font-bold ">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="subLatin"
                                        value={editedItem.subLatin}
                                        onChange={handleChange}
                                        className="text-white bg-transparent border-b-2 w-full border-white"
                                    />
                                ) : (
                                    item.subLatin
                                )}
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 p-4 flex justify-center lg:text-xs text[8px] font-bold r">
                            <button
                                className="px-4 py-2 bg-orange-500  hover:text-white text-black rounded"
                                onClick={handleEditToggle}
                            >
                                {isEditing ? 'Cancel' : 'Edit'}
                            </button>
                            {isEditing && (
                                <button
                                    className="px-4 py-2 bg-green-500 text-black hover:text-white ounded ml-2"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex-1 relative overflow-hidden justify-center w-full h-full lg:h-[500px] items-center">
                        <img
                            src="https://res.cloudinary.com/dgnfgxqem/image/upload/v1732966875/tumbuhan/kgt0pkfa1jjyqfx1mill.jpg"
                            className="w-full h-full lg:h-[600px] object-cover"
                            alt="New Tumbuhan"
                        />
                        <div className="absolute bg-black bg-opacity-50 top-0 left-1/2 transform -translate-x-1/2 rounded-b-lg w-full h-full lg:h-full">
                            <div className="text-white mx-2 px-2 text-justify overflow-y-auto h-full g no-scrollbar">
                                {isEditing && (
                                    <input type="file" onChange={handleFileChange} className="mb-2 text-[10px] lg:text-xs" />
                                )}
                                <div className="text-lg font-bold mt-2 hidden lg:block">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="nama"
                                            value={editedItem.nama}
                                            onChange={handleChange}
                                            className="text-white bg-transparent border-b-2 w-full border-white"
                                        />
                                    ) : (
                                        item.nama
                                    )}
                                </div>
                                <div className="text-sm font-bold hidden lg:block ">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="subLatin"
                                            value={editedItem.subLatin}
                                            onChange={handleChange}
                                            className="text-white bg-transparent border-b-2 w-full border-white"
                                        />
                                    ) : (
                                        item.subLatin
                                    )}
                                </div>
                                <div className='text-[10px] lg:text-[12px]'>
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
                                        name="namaLatin"
                                        value={editedItem.namaLatin}
                                        onChange={handleChange}
                                        className="mt-2 text-white bg-transparent w-full h-28 border border-white"
                                    />
                                ) : (
                                    item.namaLatin
                                )}
                                <div className="font-bold mt-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="subNama"
                                            value={editedItem.subAsalusul}
                                            onChange={handleChange}
                                            className="text-white bg-transparent border-b-2 w-full border-white"
                                        />
                                    ) : (
                                        item.subAsalusul
                                    )}
                                </div>
                                {isEditing ? (
                                    <textarea
                                        name="asalUsul"
                                        value={editedItem.asalUsul}
                                        onChange={handleChange}
                                        className="mt-2 text-white bg-transparent w-full h-28 border border-white"
                                    />
                                ) : (
                                    item.asalUsul
                                )}
                                <div className="font-bold mt-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="subSiklus"
                                            value={editedItem.subSiklus}
                                            onChange={handleChange}
                                            className="text-white bg-transparent border-b-2 w-full border-white"
                                        />
                                    ) : (
                                        item.subSiklus
                                    )}
                                </div>
                                {isEditing ? (
                                    <textarea
                                        name="siklusHidup"
                                        value={editedItem.siklusHidup}
                                        onChange={handleChange}
                                        className="mt-2 text-white bg-transparent w-full h-28 border border-white"
                                    />
                                ) : (
                                    item.siklusHidup
                                )}
                                <div className="font-bold mt-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="subJenis"
                                            value={editedItem.subJenis}
                                            onChange={handleChange}
                                            className="text-white bg-transparent border-b-2 w-full border-white"
                                        />
                                    ) : (
                                        item.subJenis
                                    )}
                                </div>
                                {isEditing ? (
                                    <textarea
                                        name="jenis"
                                        value={editedItem.jenis}
                                        onChange={handleChange}
                                        className="mt-2 text-white bg-transparent w-full h-28 border border-white"
                                    />
                                ) : (
                                    item.jenis
                                )}
                                <div className="font-bold mt-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="subBudidaya"
                                            value={editedItem.subBudidaya}
                                            onChange={handleChange}
                                            className="text-white bg-transparent border-b-2 w-full border-white"
                                        />
                                    ) : (
                                        item.subBudidaya
                                    )}
                                </div>
                                {isEditing ? (
                                    <textarea
                                        name="budiDaya"
                                        value={editedItem.budiDaya}
                                        onChange={handleChange}
                                        className="mt-2 text-white bg-transparent w-full h-28 border border-white"
                                    />
                                ) : (
                                    item.budiDaya
                                )}
                                <div className="font-bold mt-2">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="subResep"
                                            value={editedItem.subResep}
                                            onChange={handleChange}
                                            className="text-white bg-transparent border-b-2 w-full border-white"
                                        />
                                    ) : (
                                        item.subResep
                                    )}
                                </div>
                                {isEditing ? (
                                    <textarea
                                        name="resep"
                                        value={editedItem.resep}
                                        onChange={handleChange}
                                        className="mt-2 text-white bg-transparent w-full h-28 border border-white"
                                    />
                                ) : (
                                    item.resep
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
