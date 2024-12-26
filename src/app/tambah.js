'use client';

import { useState } from 'react';
import { supabase } from './server/subapase';
// import Image from 'next/image';


export default function Tumbuhan() {
  const [newItem, setNewItem] = useState({
    nama: '',
    subLatin: '',
    subNama: '',
    namaLatin: '',
    subAsalusul: '',
    asalUsul: '',
    subSiklus: '',
    siklusHidup: '',
    subJenis: '',
    jenis: '',
    subBudidaya: '',
    budiDaya: '',
    subResep: '',
    resep: '',
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
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
      let itemData = { ...newItem };

      if (file) {
        const photoUrl = await uploadImages(file);
        if (photoUrl) {
          itemData.foto = photoUrl;
        }
      }

      console.log('Data before save:', itemData);

      const { data, error } = await supabase
        .from('tumbuhan')
        .insert([itemData])
        .select();

      console.log('Response Data:', data);

      if (error) {
        throw error;
      }

      alert("Data berhasil ditambahkan!");
      // Reset form setelah berhasil menyimpan data
      setNewItem({
        nama: '',
        subLatin: '',
        subNama: '',
        namaLatin: '',
        subAsalusul: '',
        asalUsul: '',
        subSiklus: '',
        siklusHidup: '',
        subJenis: '',
        jenis: '',
        subBudidaya: '',
        budiDaya: '',
        subResep: '',
        resep: '',
      });
      setFile(null);

    } catch (error) {
      console.error("Error saving data:", error.message || error);
      alert("Terjadi kesalahan saat menambah data.");
    }
  };

  return (
    <div className="p-4 w-full h-full justify-center items-center">
      <div className="overflow-hidden border border-white w-full h-full lg:h-[500px] rounded-lg">
        <div className="flex flex-col lg:flex-row">
          <div className="relative h-full w-full lg:w-2/3 border-b lg:border-r">
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                className="w-full h-[250px] lg:h-[500px] lg:w-full bg-cover bg-center rounded-t-md"
                alt="Tumbuhan"
              />
            ) : (
              <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                <p className="text-gray-500 text-xs h-full">No Image Available</p>
              </div>
            )}

            <div className="absolute top-0 right-0 p-4 flex justify-center lg:text-xs text[8px] font-bold">
              <button
                className="px-4 py-2 bg-orange-500 hover:text-white text-black rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
          <div className="flex-1 relative overflow-hidden justify-center w-full h-full lg:h-[500px] items-center">
            <img
              src="https://res.cloudinary.com/dgnfgxqem/image/upload/v1732966875/tumbuhan/kgt0pkfa1jjyqfx1mill.jpg"
              className="w-full h-full lg:h-[600px] object-cover"
              alt="New Tumbuhan"
            />
            <div className="absolute bg-black bg-opacity-50 top-0 left-1/2 transform -translate-x-1/2 rounded-b-lg w-full h-full lg:h-full">
              <div className="lg:text-[14px] text-[11px] text-white mx-2 px-2 text-justify overflow-y-auto h-full no-scrollbar">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mb-2"
                />
                <input
                  type="text"
                  name="nama"
                  placeholder="Nama Tumbuhan"
                  value={newItem.nama}
                  onChange={handleChange}
                  className="text-white bg-transparent border-b-2 w-full border-white mb-2 "
                />
                <input
                  type="text"
                  name="subLatin"
                  placeholder="Nama Latin"
                  value={newItem.subLatin}
                  onChange={handleChange}
                  className="text-white bg-transparent border-b-2 w-full border-white mb-2"
                />
                <input
                  type="text"
                  name="subNama"
                  placeholder="Nama Alternatif"
                  value={newItem.subNama}
                  onChange={handleChange}
                  className="text-white bg-transparent border-b-2 w-full border-white mb-2"
                />
                <textarea
                  name="namaLatin"
                  placeholder="Keterangan"
                  value={newItem.namaLatin}
                  onChange={handleChange}
                  className="text-white bg-transparent w-full h-28 border border-white mb-2"
                />
                <input
                  type="text"
                  name="subAsalusul"
                  placeholder="Sub Asal Usul"
                  value={newItem.subAsalusul}
                  onChange={handleChange}
                  className="text-white bg-transparent border-b-2 w-full border-white mb-2"
                />
                <textarea
                  name="asalUsul"
                  placeholder="Asal Usul"
                  value={newItem.asalUsul}
                  onChange={handleChange}
                  className="text-white bg-transparent w-full h-28 border border-white mb-2"
                />
                <input
                  type="text"
                  name="subSiklus"
                  placeholder="Sub Siklus Hidup"
                  value={newItem.subSiklus}
                  onChange={handleChange}
                  className="text-white bg-transparent border-b-2 w-full border-white mb-2"
                />
                <textarea
                  name="siklusHidup"
                  placeholder="Siklus Hidup"
                  value={newItem.siklusHidup}
                  onChange={handleChange}
                  className="text-white bg-transparent w-full h-28 border border-white mb-2"
                />
                <input
                  type="text"
                  name="subJenis"
                  placeholder="Jenis Tumbuhan"
                  value={newItem.subJenis}
                  onChange={handleChange}
                  className="text-white bg-transparent border-b-2 w-full border-white mb-2"
                />
                <textarea
                  name="jenis"
                  placeholder="Jenis Tumbuhan Lengkap"
                  value={newItem.jenis}
                  onChange={handleChange}
                  className="text-white bg-transparent w-full h-28 border border-white mb-2"
                />
                <input
                  type="text"
                  name="subBudidaya"
                  placeholder="Sub Budidaya"
                  value={newItem.subBudidaya}
                  onChange={handleChange}
                  className="text-white bg-transparent border-b-2 w-full border-white mb-2"
                />
                <textarea
                  name="budiDaya"
                  placeholder="Budidaya"
                  value={newItem.budiDaya}
                  onChange={handleChange}
                  className="text-white bg-transparent w-full h-28 border border-white mb-2"
                />
                <input
                  type="text"
                  name="subResep"
                  placeholder="Sub Resep"
                  value={newItem.subResep}
                  onChange={handleChange}
                  className="text-white bg-transparent border-b-2 w-full border-white mb-2"
                />
                <textarea
                  name="resep"
                  placeholder="Resep"
                  value={newItem.resep}
                  onChange={handleChange}
                  className="text-white bg-transparent w-full h-28 border border-white mb-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
