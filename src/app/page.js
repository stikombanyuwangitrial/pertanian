"use client";
import Detail from './detail'
import React, { useState, useEffect } from 'react';
import { supabase } from './server/subapase'; // pastikan impor dari file Supabase yang benar

export default function TumbuhanList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tumbuhanData, setTumbuhanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
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
    <div className='grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 w-full h-full justify-center'>
      {tumbuhanData.map((item) => (
        <div
          key={item.kode}
          className="flex flex-row sm:flex-col md:flex-col border-2 rounded-lg shadow-xl bg-orange-200 bg-opacity-35  h-[180px] sm:h-auto md:h-auto lg:h-auto w-full items-center text-left"
        >
          <div className="flex flex-col max-sm:border-r-2 sm:border-b-2 md:border-b-2 lg:border-b-2 br-border-none sm:rounded-bl-none sm:rounded-tr-lg md:border-b md:border-b rounded-l-sm md:rounded-bl-none md:rounded-t-lg h-full justify-center items-center w-2/4 sm:w-full md:w-full lg:w-full relative">
            <img
              src={item.foto}
              alt="Foto"
              className="object-cover rounded-l-md h-full w-full sm:rounded-t-md sm:h-24 sm:w-24 md:h-24 md:w-24 lg:h-44 lg:w-full"
            />
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
              src="https://res.cloudinary.com/dgnfgxqem/image/upload/v1732966875/tumbuhan/kgt0pkfa1jjyqfx1mill.jpg"
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-black bg-opacity-30 p-24 rounded-lg shadow-lg w-full">
            <h2 className="text-lg font-bold mb-4">Edit {selectedItem?.nama}</h2>
            <Detail item={selectedItem} />
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
