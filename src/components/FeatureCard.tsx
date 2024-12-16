import { motion } from "motion/react";
import Image from "next/image";
import imageUrl1 from "../../public/images/home-img.jpg"
import { type LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  imageUrl: string;
}

export default function FeatureCard({ icon: Icon, title, description, imageUrl }: FeatureCardProps) {
  console.log(imageUrl)
  return (
    <motion.div variants={fadeInUp}>
      <Card className="bg-gray-600 border-gray-800 hover:border-gray-300 transition-colors">
        <CardHeader>
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-white">
              <Image
                src={imageUrl1}
                alt={title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <CardTitle className="flex items-center text-white">
              <Icon className="mr-2" />
              {title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 text-center">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
