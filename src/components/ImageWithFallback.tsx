import { useState } from 'react';

interface ImageWithFallbackProps {
    src?: string;
    alt: string;
    fallback: React.ReactNode;
    className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
                                                                        src,
                                                                        alt,
                                                                        fallback,
                                                                        className
                                                                    }) => {
    const [error, setError] = useState(false);

    const isValidImage = src && (src.startsWith('http') || src.startsWith('/') || src.startsWith('./'));
    const showFallback = !isValidImage || error;

    if (showFallback) {
        return <>{fallback}</>;
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
        />
    );
};