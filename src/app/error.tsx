// /* eslint-disable @typescript-eslint/no-explicit-any */
// // pages/_error.js
// "use client"
// import React from 'react';
// import { NextPageContext } from 'next';
// import Link from 'next/link';

// const ErrorPage = ({ statusCode, error }: { statusCode: any, error: any }) => {
//     return (
//         <div style={{ padding: '20px', textAlign: 'center' }}>
//             <h1>{statusCode ? `Error: ${statusCode}` : 'An unexpected error occurred'}</h1>
//             <p>{error ? error.message : 'Something went wrong!'}</p>
//             <Link href="/" style={{ color: 'blue' }}>
//                 Go back to Home
//             </Link>
//         </div>
//     );
// };

// // This will be executed when there is a server-side error
// ErrorPage.getInitialProps = async (context: NextPageContext) => {
//     const { err, res } = context;

//     const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

//     return {
//         statusCode,
//         error: err ? err : null,
//     };
// };

// export default ErrorPage;



// pages/_error.tsx


"use client"
import { NextPageContext } from 'next';
import Link from 'next/link';

interface ErrorPageProps {
    statusCode?: number;
    message?: string;
}

const ErrorPage = ({ statusCode, message }: ErrorPageProps) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r rounded-lg from-indigo-500 via-purple-500 to-pink-500 text-white">
            <div className="text-center p-6 max-w-lg w-full rounded bg-[#ffffff41] text-gray-800 shadow-lg">
                <h1 className="text-6xl font-extrabold mb-4">{statusCode || 'Oops!'}</h1>
                <h2 className="text-xl mb-6">{message || 'Something went wrong. Please try again later.'}</h2>

                {/* Error details */}
                {statusCode && (
                    <div className="bg-gray-200 text-gray-800 rounded-lg p-4 mb-6">
                        <p className="font-semibold">Error Code:</p>
                        <p>{statusCode}</p>
                    </div>
                )}

                {/* CTA: Go back to Home */}
                <Link
                    href="/"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
                >
                    Go back to Home
                </Link>
            </div>
        </div>
    );
};

// This function runs on the server side to fetch error details
ErrorPage.getInitialProps = async (context: NextPageContext) => {
    const { res, err } = context;
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    const message = err ? err.message : 'An unexpected error occurred.';

    return { statusCode, message };
};

export default ErrorPage;
