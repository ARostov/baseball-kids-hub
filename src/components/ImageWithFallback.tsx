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

    if (!src || error) {
        return <div className={className}>{fallback}</div>;
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