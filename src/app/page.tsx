'use client'

import { Button } from '@/components/ui/Button'
import { ClipboardList, Users, Wrench } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import FeatureCard from '@/components/FeatureCard'
import imageUrl from "../../public/images/home-img.jpg"
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function RepairShopLanding() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navigation */}
      <motion.nav
        className="flex items-center justify-between p-4 bg-black bg-opacity-90 backdrop-blur-md fixed w-full z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-2xl font-bold text-white">TechFix Shop</div>
        <div>
          <Button className="bg-white text-black hover:bg-gray-200">
            <LoginLink>Sign In</LoginLink>
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.header
        className="relative text-center py-32 px-4 overflow-hidden"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-90"></div>
          <Image
            src={imageUrl}
            alt="Repair Shop Background"
            layout="fill"
            objectFit="cover"
            className="mix-blend-overlay"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 text-white">Streamline Your Repair Shop Management</h1>
          <p className="text-xl mb-8 text-gray-300">Efficiently manage employees and repair tickets with our all-in-one solution</p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-200" asChild>
            <LoginLink>Get Started</LoginLink>
          </Button>
        </div>
      </motion.header>

      {/* Features Section */}
      <motion.section
        className="py-20 px-4 bg-black"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Users}
            title="Employee Management"
            description="Easily manage your team, assign tasks, and track performance."
            imageUrl="/placeholder.svg?height=200&width=200"
          />
          <FeatureCard
            icon={ClipboardList}
            title="Ticket Tracking"
            description="Create, assign, and monitor repair tickets from start to finish."
            imageUrl="/placeholder.svg?height=200&width=200"
          />
          <FeatureCard
            icon={Wrench}
            title="Repair Analytics"
            description="Gain insights into your shop's performance with detailed analytics."
            imageUrl="/placeholder.svg?height=200&width=200"
          />
        </div>
      </motion.section>

      {/* Call-to-Action Section */}
      <motion.section
        className="text-center py-20 px-4 bg-gradient-to-r from-black to-gray-900"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <h2 className="text-3xl font-bold mb-4 text-white">Ready to Optimize Your Repair Shop?</h2>
        <p className="text-xl mb-8 text-gray-300">Join TechFix Repairs and take your business to the next level</p>
        <Button size="lg" className="bg-white text-black hover:bg-gray-200" asChild>
          <LoginLink>Sign Up Now</LoginLink>
        </Button>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="text-center py-8 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p className="text-white">&copy; 2024 TechFix Repairs. All rights reserved.</p>
      </motion.footer>
    </div>
  )
}
