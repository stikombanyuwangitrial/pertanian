"use client";
import Detail from '../detail'
import React, { useState, useEffect } from 'react';
import { supabase } from '../server/subapase';
import Tambah from '../tambah'

export default function TumbuhanList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTambahModalOpen, setIsTambahModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tumbuhanData, setTumbuhanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('tumbuhan')
          .select('*');

        if (error) {
          throw error;
        }
        setTumbuhanData(data);
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = tumbuhanData.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  const openTambahModal = () => {
    setIsTambahModalOpen(true);
  };
  const closeTambahModal = () => {
    setIsTambahModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='bg-gray-900'>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Cari tumbuhan..."
          className="border outline-none rounded my-4 px-4 py-2 w-1/2 text-xs text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex justify-center my-4">
        <button
          onClick={openTambahModal}
          className="bg-green-500 hover:bg-green-600 text-white rounded px-6 py-2 text-sm font-bold"
        >
          Tambah Data
        </button>
      </div>
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 w-full h-full justify-center'>
        {filteredData.map((item) => (
          <div
            key={item.kode}
            className="flex flex-row sm:flex-col md:flex-col border-2 rounded-lg shadow-xl bg-orange-200 bg-opacity-35  h-[180px] sm:h-auto md:h-auto lg:h-auto w-full items-center text-left"
          >

            <div className="flex flex-col max-sm:border-r-2 sm:border-b-2 md:border-b-2 lg:border-b-2 br-border-none sm:rounded-bl-none sm:rounded-tr-lg md:border-b md:border-b rounded-l-sm md:rounded-bl-none md:rounded-t-lg h-full justify-center items-center w-2/4 sm:w-full md:w-full lg:w-full relative">
              {item.foto && item.foto.trim() !== "" ? (
                <img
                  src={item.foto}
                  alt="Foto"
                  className="object-cover rounded-l-md h-full w-full sm:rounded-t-md sm:h-24 sm:w-24 md:h-24 md:w-24 lg:h-44 lg:w-full"
                />
              ) : (
                <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                  <p className="text-gray-500 text-xs">No Image Available</p>
                </div>
              )}

              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
                <p className="font-bold text-[12px] sm:text-xs md:text-xs lg:text-xs underline underline-offset-2">
                  {item.nama}
                </p>
                <p className="font-bold text-[10px] sm:text-[8px] md:text-[10px]">
                  {item.subLatin}
                </p>
              </div>
            </div>
            <div className="relative w-full h-full">
              <img
                src="y.jpg"
                alt="Background"
                className="h-44 md:h-44 lg:h-44 w-full h-full object-cover rounded-r-md sm:rounded-r-none sm:rounded-b-md" />
              <div className="sm:rounded-b-md absolute inset-0 w-full flex h-full flex-col justify-between rounded-r-md sm:rounded-tr-none md:rounded-t-none md:rounded-bl-lg p-2 w-3/4 sm:w-full px-4">
                <div className="overflow-hidden overflow-y-auto w-full py-1 flex flex-col space-y-1 text-[8px] sm:text-[8px] md:text-[8px] lg:text-[8px] no-scrollbar h-full sm:h-28 md:h-28 lg:h-28">
                  <div className='text-justify'>
                    <div className="font-bold mt-2"> {item.nama} : {item.subNama}</div>
                    <div className=" mt-1">{item.namaLatin}</div>
                    <div className="font-bold mt-4"> {item.subAsalusul}</div>
                    <div className=" mt-1">{item.asalUsul}</div>
                    <div className="font-bold mt-4"> {item.subSiklus}</div>
                    <div className=" mt-1">{item.siklusHidup}</div>
                    <div className="font-bold mt-4">{item.subNutrisi}</div>
                    <div className=" mt-1">{item.nutrisi}</div>
                    <div className="font-bold mt-4">{item.subJenis}</div>
                    <div className=" mt-1">{item.jenis}</div>
                    <div className="font-bold mt-4">{item.subBudidaya}</div>
                    <div className=" mt-1">{item.budiDaya}</div>
                    <div className="font-bold mt-4"> {item.subResep}</div>
                    <div className=" mt-1 mb-2">{item.resep}</div>
                    <div className="font-bold mt-4"> {item.subKesimpulan}</div>
                    <div className=" mt-1 mb-2">{item.kesimpulan1}</div>
                    <div className=" mt-1 mb-2">{item.kesimpulan2}</div>
                    <div className=" mt-1 mb-2">{item.kesimpulan3}</div>
                  </div>
                </div>
                <div className='relative'>
                  <button
                    onClick={() => openModal(item)}
                    className="z-10 w-full mt-1.5 rounded text-center px-1 py-1 text-[10px] sm:text-[8px] md:text-[8px] lg:text-[8px] font-bold bg-orange-400 hover:bg-orange-600 text-black">
                    EDIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isModalOpen && (
          <div className="fixed top-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50 h-full z-50">
            <div className="bg-black bg-opacity-60 rounded-lg shadow-lg w-full px-10 lg:px-16 py-4 relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white text-2xl font-bold"
              >
                &times;
              </button>

              <h2 className="ml-4 text-lg font-bold">Edit {selectedItem?.nama}</h2>
              <Detail item={selectedItem} />
            </div>
          </div>
        )}
        {isTambahModalOpen && (
          <div className="fixed top-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50 h-full z-50">
            <div className="bg-black bg-opacity-60 rounded-lg shadow-lg w-full px-10 lg:px-16 py-4 relative">
              <button
                onClick={closeTambahModal}
                className="absolute top-2 right-2 text-white text-2xl font-bold"
              >
                &times;
              </button>
              <h2 className="ml-4 text-lg font-bold">Tambah Tumbuhan Baru</h2>
              <Tambah />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
