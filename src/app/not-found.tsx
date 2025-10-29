'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
    useEffect(() => {
        document.body.style.backgroundColor = '#000'
        return () => {
            document.body.style.backgroundColor = ''
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
            <motion.h1
                className="text-9xl font-bold mb-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                404
            </motion.h1>
            <motion.div
                className="text-2xl mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                Oops! Looks like you&apos;ve ventured into the void.
            </motion.div>
            <motion.div
                className="relative w-64 h-64 mb-8"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                {/* <StarField /> */}
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <Button asChild>
                    <Link href="/" className=' bg-primary text-white rounded py-4 px-4 font-bold'>
                        Return to Home
                    </Link>
                </Button>
            </motion.div>
        </div>
    )
}

// function StarField() {
//     return (
//         <>
//             {[ ...Array(50) ].map((_, i) => (
//                 <motion.div
//                     key={i}
//                     className="absolute w-1 h-1 bg-white rounded-full"
//                     initial={{
//                         x: Math.random() * 100 - 50,
//                         y: Math.random() * 100 - 50,
//                         scale: Math.random() * 0.5 + 0.5,
//                     }}
//                     animate={{
//                         x: Math.random() * 100 - 50,
//                         y: Math.random() * 100 - 50,
//                         scale: Math.random() * 0.5 + 0.5,
//                     }}
//                     transition={{
//                         duration: Math.random() * 5 + 5,
//                         repeat: Infinity,
//                         repeatType: "reverse",
//                     }}
//                 />
//             ))}
//         </>
//     )
// }

