'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../server/subapase';

export default function Tumbuhan({ params }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { kode } = params;

  useEffect(() => {
    if (!kode) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('tumbuhan')
          .select('*')
          .eq('kode', kode)
          .limit(1)
          .single();

        if (error) throw error;

        setItem(data);
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data');
        console.error('Error fetching data:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [kode]);

  if (loading) return <div>Memuat...</div>;
  if (error) return <div>{error}</div>;
  if (!item) return <div>Data tidak ditemukan</div>;

  return (
    <div className="p-4 w-full h-full bg-black justify-center items-center ">
      <div className="overflow-hidden border border-white w-full max-h-screen lg:h-full rounded-lg">
        <div className="flex flex-col lg:flex-row">
          <div className="relative h-full w-full lg:w-2/3 border-b lg:h-auto">
            <img
              src={item.foto}
              className="w-full h-[250px] lg:h-full lg:w-full bg-cover bg-center rounded-t-md"
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 w-full h-14 flex items-center justify-center">
              <div className="text-center text-white font-bold">
                <p className="text-[14px] border-b-2 border-white">{item.nama}</p>
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
            <div className='text-white mx-2 px-2 text-justify h-full overflow-y-auto no-scrollbar'>
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
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
