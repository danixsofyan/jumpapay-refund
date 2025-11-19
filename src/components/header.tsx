'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface RefundHeaderProps {
    onBackClick?: () => void; 
}

export const RefundHeader = ({ onBackClick }: RefundHeaderProps) => {
    const router = useRouter();

    const handleBack = () => {
        if (onBackClick) {
        onBackClick();
        } else {
        router.back();
        }
    };

    return (
        <header className="flex items-center justify-between p-4 border-b border-border">
        <Button 
            onClick={handleBack}
            variant="ghost"
            size="icon"
            className="w-10 h-10"
        >
            <ArrowLeft className="w-6 h-6 text-foreground" />
        </Button>

        <div className="h-7 w-[180px] relative ml-auto"> 
            <Image
            alt="Logo Jumpapay" 
            src="/images/logo-jumpapay-primary.svg"
            fill 
            sizes="180px" 
            className="object-contain" 
            priority={true}
            />
        </div>
        </header>
    );
};