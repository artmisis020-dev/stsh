import { useState } from "react";

export const useCopyToClipboard = () => {
    const [copiedValue, setCopiedValue] = useState<string | null>(null);

    const copyToClipboard = async (value: string) => {
        await navigator.clipboard.writeText(value);
        setCopiedValue(value);
        window.setTimeout(() => {
            setCopiedValue((current) => (current === value ? null : current));
        }, 1500);

    }

    return { copiedValue, copyToClipboard };
}