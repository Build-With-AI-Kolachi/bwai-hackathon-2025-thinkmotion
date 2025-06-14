import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  popular?: boolean
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  popular = false,
}: PricingCardProps) {
  return (
    <div
      className={`
      bg-gray-800/50 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300
      ${
        popular
          ? "border-blue-500 shadow-lg shadow-blue-500/20 scale-105 z-10"
          : "border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
      }
    `}
    >
      {popular && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-2 rounded-full inline-block mb-4">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        {price !== "Custom" && <span className="text-gray-400">/month</span>}
      </div>
      <p className="text-gray-300 mb-6">{description}</p>
      <Button
        className={
          popular
            ? "w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            : "w-full bg-gray-700 hover:bg-gray-600"
        }
      >
        {buttonText}
      </Button>
      <div className="border-t border-gray-700 my-6"></div>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-blue-400 mr-2 shrink-0 mt-0.5" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
