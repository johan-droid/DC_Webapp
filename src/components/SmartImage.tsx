"use client";

import { CldImage } from 'next-cloudinary';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface SmartImageProps extends Omit<ImageProps, 'src'> {
    src: string | null | undefined;
}

export default function SmartImage({ src, alt, ...props }: SmartImageProps) {
    const [error, setError] = useState(false);

    if (!src || error) {
        // Fallback or placeholder could go here
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#444'
                }}
                className={props.className}
            >
                <span style={{ fontSize: '2rem' }}>?</span>
            </div>
        );
    }

    const isCloudinary = src.includes('cloudinary.com');

    if (isCloudinary) {
        return (
            <CldImage
                src={src}
                alt={alt}
                {...props}
                onError={() => setError(true)}
            />
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            {...props}
            onError={() => setError(true)}
        />
    );
}
