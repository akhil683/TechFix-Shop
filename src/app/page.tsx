import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ClipboardList, Users, BarChart, Phone, Laptop } from 'lucide-react'
import { Button } from "@/components/ui/Button"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"

export default function Home() {
  return (
    <div className="min-h-screen text-white">

      {/* Main Content */}
      <div className="relative">
        {/* Header */}
        <header className="border-b border-white/10">
          <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">TechFix Repair</span>
            </div>
            <div className="flex items-center gap-4">
              {/* <Link href="/about" className="hover:text-purple-400">About</Link> */}
              {/* <Link href="/features" className="hover:text-purple-400">Features</Link> */}
              {/* <Link href="/pricing" className="hover:text-purple-400">Pricing</Link> */}
              <LoginLink>
                <Button variant="secondary" className="bg-blue-500 hover:bg-blue-700">Login</Button>
              </LoginLink>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="min-h-screen container flex justify-center items-center mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Streamline Your Repair Shop Management
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Efficiently manage employees, customers, and repair tickets with our comprehensive management solution.
              </p>
              <div className="flex gap-4">
                <LoginLink>
                  <Button size="lg" variant="secondary" className="bg-blue-500 hover:bg-blue-700">Get Started</Button>
                </LoginLink>
              </div>
            </div>

            {/* Right Column */}
            <div className="relative aspect-square lg:aspect-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg" />
              <div className="relative h-full min-h-[400px] w-full rounded-lg border border-white/10 bg-black/50 backdrop-blur p-8">
                <div className="grid gap-6">
                  {/* Ticket Example */}
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">Ticket #1234</h3>
                        <p className="text-sm text-gray-400">S24 Ultra Screen Repair</p>
                      </div>
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/50">In Progress</Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>Assigned to: Akhil Palsra</span>
                    </div>
                  </div>

                  {/* Customer Example */}
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar>
                        <AvatarImage src="https://avatars.githubusercontent.com/u/71344171?v=4" />
                        <AvatarFallback>SH</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">Shivansh</h3>
                        <p className="text-sm text-gray-400">Customer since 2022</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <Laptop className="w-4 h-4 mr-2" />
                      <span>Last repair: MacBook Pro Battery Replacement</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/50">Loyal Customer</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="container mx-auto px-4 py-24">
          <h2 className="text-3xl font-bold text-center mb-12">Our Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <div
                key={solution.title}
                className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/50 transition-colors"
              >
                <solution.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                <p className="text-gray-400">{solution.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12">
          <div className="container mx-auto px-4">
            <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
              <p>&copy; 2024 TechFix Repair. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

const solutions = [
  {
    title: "Ticket Management",
    description: "Efficiently track and manage repair tickets from creation to completion.",
    icon: ClipboardList,
  },
  {
    title: "Customer Relations",
    description: "Keep detailed customer records and improve engagement.",
    icon: Users,
  },
  {
    title: "Performance Analytics",
    description: "Track repair shop metrics and employee performance.",
    icon: BarChart,
  },
]

