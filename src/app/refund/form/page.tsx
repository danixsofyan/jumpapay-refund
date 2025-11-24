'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { RefundHeader } from '@/components/header'; 
import { CheckCircle } from 'lucide-react';

interface RefundFormData {
    nominalAktual: string;
    catatan: string;
    bank: string;
    noRekening: string;
}

export default function RefundFormPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
    
    const [formData, setFormData] = useState<RefundFormData>({
        nominalAktual: '',
        catatan: '',
        bank: '',
        noRekening: '',
    });

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!formData.nominalAktual || !formData.bank || !formData.noRekening) {
            alert('Mohon lengkapi semua field yang diperlukan.');
            return;
        }

        setIsSubmitting(true);
        
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccessAlertOpen(true);
        }, 1500); 
    };
    
    const handleSuccessClose = () => {
        setIsSuccessAlertOpen(false);
        router.push('/'); 
    };

    return (
        <div className="min-h-screen max-w-lg mx-auto bg-background">
            <RefundHeader />
            <main className="p-4 space-y-6">
                <h1 className="text-xl font-bold text-foreground">
                    Pengajuan Pengembalian
                </h1>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="nominal-awal" className="text-sm font-medium space-y-4 mb-2">Nominal PKB & denda pajak awal</Label>
                        <input 
                            id="nominal-awal"
                            value="Rp1.200.000"
                            disabled
                            className="h-12 pl-4 pr-10 py-2 w-full border border-gray-300 dark:border-neutral-600 rounded-lg bg-white
                        dark:bg-neutral-900 focus:ring-2 focus:ring-primary focus:outline-none text-sm font-medium"
                        />
                    </div>
                    <div>
                        <Label htmlFor="nominal-aktual" className="text-sm font-medium mb-2">Nominal PKB & denda pajak aktual</Label>
                        <input 
                            id="nominal-aktual"
                            placeholder="Isi nominal aktual di sini"
                            value={formData.nominalAktual}
                            onChange={(e) => setFormData({...formData, nominalAktual: e.target.value})}
                            className="h-12 pl-4 pr-10 py-2 w-full border border-gray-300 dark:border-neutral-600 rounded-lg bg-white
                        dark:bg-neutral-900 focus:ring-2 focus:ring-primary focus:outline-none text-sm font-medium"
                        />
                    </div>
                    <div>
                        <Label htmlFor="catatan-tambahan" className="text-sm font-medium mb-2">Catatan Tambahan</Label>
                        <Textarea 
                            id="catatan-tambahan"
                            placeholder="Isi catatan tambahan untuk pengajuan ini"
                            value={formData.catatan}
                            onChange={(e) => setFormData({...formData, catatan: e.target.value})}
                            rows={3}
                            className="h-12 pl-4 pr-10 py-2 w-full border border-gray-300 dark:border-neutral-600 rounded-lg bg-white
                        dark:bg-neutral-900 focus:ring-2 focus:ring-primary focus:outline-none text-sm font-medium"
                        />
                    </div>
                    <div>
                        <Label htmlFor="pilih-bank" className="text-sm font-medium mb-2">Pilih Bank</Label>
                        <Select onValueChange={(value) => setFormData({...formData, bank: value})}>
                            <SelectTrigger id="pilih-bank" className="w-full mt-2">
                                <SelectValue placeholder="Pilih bank yang dituju" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="BCA">BCA</SelectItem>
                                <SelectItem value="Mandiri">Mandiri</SelectItem>
                                <SelectItem value="BNI">BNI</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="nomor-rekening" className="text-sm font-medium mb-2">Nomor Rekening</Label>
                        <input 
                            id="nomor-rekening"
                            type="text"
                            placeholder="Ketik nomor rekening Anda di sini"
                            value={formData.noRekening}
                            onChange={(e) => setFormData({...formData, noRekening: e.target.value})}
                            className="h-12 pl-4 pr-10 py-2 w-full border border-gray-300 dark:border-neutral-600 rounded-lg bg-white
                        dark:bg-neutral-900 focus:ring-2 focus:ring-primary focus:outline-none text-sm font-medium"
                        />
                    </div>
                    <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 font-semibold border-cyan-500 text-cyan-500 hover:bg-cyan-50 mt-4 hover:text-cyan-600"
                        variant="outline"
                    >
                        {isSubmitting ? 'Proses...' : 'Ajukan Pengembalian'}
                    </Button>
                </form>
            </main>

            <AlertDialog open={isSuccessAlertOpen} onOpenChange={setIsSuccessAlertOpen}>
                <AlertDialogContent className="w-[90%] max-w-sm rounded-lg">
                    <AlertDialogHeader className="items-center text-center space-y-3">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                        <AlertDialogTitle className="text-xl font-bold">Pengajuan Berhasil!</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-center">
                            Pengajuan pengembalian Anda telah berhasil dikirim. <br/> Kami akan memprosesnya dalam 1x24 jam.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction 
                            onClick={handleSuccessClose} 
                            className="w-full h-12 font-semibold border-cyan-500 text-white hover:bg-cyan-50 mt-4 hover:text-cyan-600"
                        >
                            Oke
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}