"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../server/subapase';

export default function Admin() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const { data, error } = await supabase
                .from('tumbuhan')
                .select('*');

                if (error) throw error;

                setItems(data);
            } catch (err) {
                setError('Terjadi kesalahan saat mengambil data');
                console.error('Error fetching data:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Memuat...</div>;
    if (error) return <div>{error}</div>;
    if (!items.length) return <div>Data tidak ditemukan</div>;

    return (
        <div className="p-4 w-full h-full bg-black justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                    <div
                        key={item.kode}
                        className="overflow-hidden border border-white rounded-lg"
                    >
                        <div className="relative h-56 w-full">
                            <img
                                src={item.foto}
                                alt={item.nama}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-2 text-center text-white">
                                <p className="font-bold text-sm border-b-2 border-white">{item.nama}</p>
                                <p className="text-xs italic">({item.subLatin})</p>
                            </div>
                        </div>
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
                            <div className="font-bold mt-4"> {item.subKesimpulan}</div>
                            <div className=" mt-1 mb-2">{item.kesimpulan1}</div>
                            <div className=" mt-1 mb-2">{item.kesimpulan2}</div>
                            <div className=" mt-1 mb-2">{item.kesimpulan3}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
