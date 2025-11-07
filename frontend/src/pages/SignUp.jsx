import { SignUp } from '@clerk/clerk-react'
import { motion } from 'framer-motion'

const SignUpPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                        Create Account
                    </h1>
                    <p className="text-gray-600">Join us and start shopping</p>
                </div>
                <div className="flex justify-center">
                    <SignUp
                        appearance={{
                            elements: {
                                rootBox: 'mx-auto',
                                card: 'shadow-2xl',
                            },
                        }}
                        routing="path"
                        path="/sign-up"
                        signInUrl="/sign-in"
                    />
                </div>
            </motion.div>
        </div>
    )
}

export default SignUpPage

