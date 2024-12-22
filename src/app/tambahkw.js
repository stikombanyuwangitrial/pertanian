"use client";

import React, { useState } from 'react';
import { supabase } from './server/subapase';

export default function TambahData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const [newTumbuhan, setNewTumbuhan] = useState({
    nama: '',
    subNama: '',
    namaLatin: '',
    asalUsul: '',
    siklusHidup: '',
    nutrisi: '',
    jenis: '',
    budiDaya: '',
    resep: '',
    kesimpulan1: '',
    kesimpulan2: '',
    kesimpulan3: '',
    foto: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTumbuhan({
      ...newTumbuhan,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (file) {
        const photoUrl = await uploadImages(file);
        if (photoUrl) {
          newTumbuhan.foto = photoUrl;
        }
      }

      const { data, error } = await supabase.from('tumbuhan').insert([{ ...newTumbuhan }]);
      if (error) {
        throw error;
      }
      setNewTumbuhan({
        nama: '',
        subNama: '',
        namaLatin: '',
        asalUsul: '',
        siklusHidup: '',
        nutrisi: '',
        jenis: '',
        budiDaya: '',
        resep: '',
        kesimpulan1: '',
        kesimpulan2: '',
        kesimpulan3: '',
        foto: '',
      });
      alert('Tumbuhan berhasil ditambahkan');
    } catch (err) {
      setError('Terjadi kesalahan saat menyimpan data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-20 overflow-y-auto lg:h-[600px] h-[600px] no-scrollbar">
      <h1 className="text-2xl text-white font-bold mb-4">Tambah Tumbuhan Baru</h1>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex flex-col">
        <input type="file" onChange={handleFileChange} className="mb-2" />
        <label className="text-white">Nama Tumbuhan</label>
        <input
          type="text"
          name="nama"
          value={newTumbuhan.nama}
          onChange={handleChange}
          className="border p-2 rounded h-[32px] text-black"
          required
        />
        <small className="text-gray-400">Masukkan nama tumbuhan</small>
      </div>
      <div className="flex flex-col">
        <label className="text-white">Sub Nama</label>
        <input
          type="text"
          name="subNama"
          // placeholder='Selada : Sayur hijau penggugah selera'
          value={newTumbuhan.subNama}
          onChange={handleChange}
          className="border p-2 rounded h-[32px] text-xs text-black"
        />
        <small className="text-gray-400">Masukkan nama alternatif</small>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 lg:grid lg:grid-cols-3 lg:gap-4 lg:space-y-0"
      >
        <div className="flex flex-col">
          <label className="text-white">Nama Latin</label>
          <textarea
            name="namaLatin"
            value={newTumbuhan.namaLatin}
            onChange={handleChange}
            className="border p-2 rounded h-[100px] resize-none text-black"
          />
          <small className="text-gray-400">Masukkan nama latin tumbuhan</small>
        </div>

        <div className="flex flex-col">
          <label className="text-white">Asal Usul</label>
          <textarea
            name="asalUsul"
            value={newTumbuhan.asalUsul}
            onChange={handleChange}
            className="border p-2 rounded h-[100px] resize-none text-black"
          />
          <small className="text-gray-400">Tuliskan asal usul tumbuhan ini secara lengkap</small>
        </div>

        <div className="flex flex-col">
          <label className="text-white">Siklus Hidup</label>
          <textarea
            name="siklusHidup"
            value={newTumbuhan.siklusHidup}
            onChange={handleChange}
            className="border p-2 rounded h-[100px] resize-none text-black"
          />
          <small className="text-gray-400">Deskripsikan siklus hidup tumbuhan ini</small>
        </div>

        <div className="flex flex-col">
          <label className="text-white">Nutrisi</label>
          <textarea
            name="nutrisi"
            value={newTumbuhan.nutrisi}
            onChange={handleChange}
            className="border p-2 rounded h-[100px] resize-none text-black"
          />
          <small className="text-gray-400">Jelaskan kandungan nutrisi tumbuhan ini</small>
        </div>

        <div className="flex flex-col">
          <label className="text-white">Jenis</label>
          <textarea
            name="jenis"
            value={newTumbuhan.jenis}
            onChange={handleChange}
            className="border p-2 rounded h-[100px] resize-none text-black"
          />
          <small className="text-gray-400">Masukkan jenis tumbuhan</small>
        </div>

        <div className="flex flex-col">
          <label className="text-white">Budidaya</label>
          <textarea
            name="budiDaya"
            value={newTumbuhan.budiDaya}
            onChange={handleChange}
            className="border p-2 rounded h-[100px] resize-none text-black"
          />
          <small className="text-gray-400">Deskripsikan cara budidaya tumbuhan ini</small>
        </div>

        <div className="flex flex-col">
          <label className="text-white">Resep</label>
          <textarea
            name="resep"
            value={newTumbuhan.resep}
            onChange={handleChange}
            className="border p-2 rounded h-[100px] resize-none text-black"
          />
          <small className="text-gray-400">Tambahkan resep terkait tumbuhan</small>
        </div>

        <div className="flex flex-col">
          <label className="text-white">Kesimpulan 1</label>
          <textarea
            name="kesimpulan1"
            value={newTumbuhan.kesimpulan1}
            onChange={handleChange}
            className="border p-2 rounded h-[100px] resize-none text-black"
          />
          <small className="text-gray-400">Kesimpulan pertama terkait tumbuhan</small>
        </div>

        <div className="flex flex-col">
          <label className="text-white">Kesimpulan 2</label>
          <textarea
            name="kesimpulan2"
            value={newTumbuhan.kesimpulan2}
            onChange={handleChange}
            className="border p-2 rounded h-[100px] resize-none text-black"
          />
          <small className="text-gray-400">Kesimpulan kedua terkait tumbuhan</small>
        </div>

        <div className="flex flex-col">
          <label className="text-white">Kesimpulan 3</label>
          <textarea
            name="kesimpulan3"
            value={newTumbuhan.kesimpulan3}
            onChange={handleChange}
            className="border p-2 rounded h-[100px] resize-none text-black"
          />
          <small className="text-gray-400">Kesimpulan ketiga terkait tumbuhan</small>
        </div>
  <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-orange-400 hover:bg-orange-600 text-white py-2 px-4 rounded"
      >
        {loading ? 'Menyimpan...' : 'Simpan'}
      </button>
      </form>
    
    </div>
  );
}
