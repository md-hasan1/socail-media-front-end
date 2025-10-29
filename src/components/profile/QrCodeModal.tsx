
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Twitter, XIcon } from "lucide-react";
import { useState } from "react";
import { BsInstagram, BsTelegram, BsWhatsapp } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";
import QRCode from "react-qr-code"; // You can install react-qr-code via npm or yarn
import { Button } from "../ui/button";
import Link from "next/link";

interface QrCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({ isOpen, onClose }) => {
    const currentUrl = window?.location?.href;
    const [ generatedUrl, setGeneratedUrl ] = useState<string>(currentUrl);
    const [ isCopied, setIsCopied ] = useState(false);

    const handleGenerateQRCode = () => {
        // setGeneratedUrl(url); // You can allow custom URLs here if needed.
    };

    const handleCopyLink = () => {
        if (generatedUrl) {
            navigator.clipboard.writeText(generatedUrl);
            setIsCopied(true);
            // Reset isCopied state to false after 2 seconds
            setTimeout(() => {
                setIsCopied(false);
            }, 1000);
        }
    };

    // Social media sharing links
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generatedUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(generatedUrl)}&text=Check%20this%20out!`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(generatedUrl)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(generatedUrl)}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(generatedUrl)}`,
        instagram: `https://www.instagram.com/sharer.php?url=${encodeURIComponent(generatedUrl)}`, // Instagram doesn't have direct URL sharing, but this can be used with a third-party solution.
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-90 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded max-w-lg w-full">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Share Contact</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Generated QR Code */}
                {generatedUrl && (
                    <div className="flex justify-center mx-4 my-4">
                        <QRCode value={generatedUrl} className="my-8" size={150} />
                    </div>
                )}

                {/* Share Link Via Section */}
                <div className="mb-4">
                    <p className="text-gray-700">Share link via:</p>
                    <div className="flex gap-4 mb-4">
                        <Link href={shareUrls.facebook} target="_blank" rel="noopener noreferrer" className="p-2 border rounded-full text-blue-600">
                            <FaFacebook className="h-6 w-6" />
                        </Link>
                        <Link href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" className="p-2 border rounded-full text-blue-600">
                            <Twitter className="h-6 w-6" />
                        </Link>
                        <Link href={shareUrls.telegram} target="_blank" rel="noopener noreferrer" className="p-2 border rounded-full text-blue-600">
                            <BsTelegram className="h-6 w-6" />
                        </Link>
                        <Link href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer" className="p-2 border rounded-full text-green-600">
                            <BsWhatsapp className="h-6 w-6" />
                        </Link>
                        <Link href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 border rounded-full text-blue-600">
                            <LiaLinkedin className="h-6 w-6" />
                        </Link>
                        <Link href={shareUrls.instagram} target="_blank" rel="noopener noreferrer" className="p-2 border rounded-full text-pink-600">
                            <BsInstagram className="h-6 w-6" />
                        </Link>
                    </div>
                </div>

                {/* Copy Link Section */}
                <div className="mb-4 w-full justify-between flex items-center">
                    <input
                        type="text"
                        readOnly
                        value={generatedUrl}
                        className="p-2 border w-full rounded border-gray-300 mr-2"
                    />
                    <button
                        onClick={handleCopyLink}
                        className="bg-primary w-36 rounded text-white p-2"
                    >
                        {isCopied ? "Copied" : "Copy Link"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QrCodeModal;
