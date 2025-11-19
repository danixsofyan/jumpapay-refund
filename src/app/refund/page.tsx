'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { RefundHeader } from '@/components/header';
import Image from 'next/image';

type SubmissionStatus = 'Belum Diajukan' | 'Sedang Divalidasi' | 'Selesai';

const DetailRow = ({ 
    label, 
    value, 
    valueClass 
    }: { 
    label: string, 
    value: string | JSX.Element,
    valueClass?: string 
    }) => (
    <div className="flex justify-between items-start text-sm py-0.5"> 
        <span className="text-muted-foreground">{label}</span> 
        <span className={`font-semibold text-right text-foreground ${valueClass}`}>
            {value}
        </span>
    </div>
)

const StatusBadge = ({ status }: { status: SubmissionStatus }) => {
    let classes = "px-3 py-1 rounded-full text-xs font-medium";
    let text = status;

    if (status === 'Sedang Divalidasi') {
        classes += " bg-cyan-100 text-cyan-600 dark:bg-cyan-900 dark:text-cyan-300";
    } else if (status === 'Selesai') {
        classes += " bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300";
    } else {
        classes += " bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    }

    return (
        <span className={classes}>
            {text}
        </span>
    );
}

export default function RefundPage() {
    const [isOrderFound, setIsOrderFound] = useState(false);
    const [orderNotFound, setOrderNotFound] = useState(false); 
    const [orderNumber, setOrderNumber] = useState('12345'); 
    const [refundStatus, setRefundStatus] = useState<SubmissionStatus>('Belum Diajukan');
    
    const router = useRouter();

    const handleCheckOrder = () => {
        setIsOrderFound(false);
        setOrderNotFound(false); 
        setRefundStatus('Belum Diajukan');
        
        if (orderNumber.trim() === '00000') {
            setIsOrderFound(true);
            setRefundStatus('Sedang Divalidasi');
        } else if (orderNumber.trim() === '12345') {
            setIsOrderFound(true);
            setRefundStatus('Belum Diajukan');
        } else if (orderNumber.trim().length > 0) {
            setOrderNotFound(true);
        } else {
            alert('Masukkan nomor order terlebih dahulu.'); 
        }
    };


    return (
        <div className="min-h-screen max-w-lg mx-auto bg-background">
            
            <RefundHeader />
            
            <main className="p-4 space-y-6">
                <section className="space-y-2 text-center">
                    <h1 className="text-2xl font-extrabold text-foreground">
                        Pengajuan Pengembalian
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Anda dapat mengajukan pengembalian dengan mencari nomor order milik Anda di sini
                    </p>
                </section>

                <section className="space-y-4">
                    <Label className="text-base font-medium">
                        Nomor Order
                    </Label>
                    <input 
                        id="order-number"
                        placeholder="Masukkan Nomor Order Anda"
                        value={orderNumber}
                        onChange={(e) => {
                            setOrderNumber(e.target.value);
                            setIsOrderFound(false); 
                            setOrderNotFound(false); 
                            setRefundStatus('Belum Diajukan');
                        }}
                        className="h-12 pl-4 pr-10 py-2 w-full border border-gray-300 dark:border-neutral-600 rounded-lg bg-white
                        dark:bg-neutral-900 focus:ring-2 focus:ring-primary focus:outline-none text-sm font-medium"
                    />
                    
                    <Button 
                        onClick={handleCheckOrder}
                        className="w-full py-3 h-12 bg-primary text-white rounded-lg hover:opacity-90 font-semibold transition-colors"
                    >
                        Cek Order
                    </Button>
                </section>

                {orderNotFound && (
                    <section className="text-center space-y-4 pt-6">
                        <div className="relative w-80 h-80 mx-auto">
                            <Image
                                src="/images/order-not-found.svg" 
                                alt="Nomor Order Tidak Ditemukan"
                                fill
                                className="object-contain"
                            />
                        </div>
                        
                        <h2 className="text-xl font-bold text-foreground">
                            Nomor Order Tidak Ditemukan
                        </h2>
                        <p className="text-muted-foreground text-sm">
                            Silakan periksa kembali nomor order yang Anda masukkan.
                        </p>
                    </section>
                )}

                {isOrderFound && (
                <section className="space-y-4 pt-2">
                    <h2 className="text-lg font-bold text-foreground">
                    Order Detail
                    </h2>

                    <Card className="shadow-sm"> 
                    <CardContent className="p-4 space-y-3">
                        <div className="space-y-1">
                            <DetailRow label="Nomor Order" value={orderNumber} valueClass="font-bold" /> 
                            <DetailRow label="Tanggal Order" value="11/01/2025" />
                            <DetailRow label="Nama" value="Rayhan Alfaruq" />
                            <div className="flex justify-between items-start text-sm py-0.5">
                                <span className="text-muted-foreground">Layanan</span> 
                                <span className="font-semibold text-right text-foreground">Perpanjangan Pajak 1 Tahun</span>
                            </div>
                            <DetailRow label="Total Harga" value="Rp240.000" valueClass="font-extrabold text-lg text-foreground"/>
                            
                            {refundStatus !== 'Belum Diajukan' && (
                                <DetailRow label="Status Pengajuan" value={<StatusBadge status={refundStatus} />} />
                            )}
                        </div>
                        
                        {refundStatus === 'Belum Diajukan' && (
                            <Button 
                                onClick={() => router.push('/refund/form')} 
                                variant="outline" 
                                className="w-full h-12 font-semibold border-cyan-500 text-cyan-500 hover:bg-cyan-50 mt-4 hover:text-cyan-600"
                            >
                                Ajukan Pengembalian
                            </Button>
                        )}
                        
                    </CardContent>
                    </Card>
                </section>
                )}

            </main>
        </div>
    )
}