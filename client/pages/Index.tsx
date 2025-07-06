import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import RateCalculator from "@/components/RateCalculator";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Star,
  Award,
  Users,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";

// All Mug Products (Sublimation)
const mugProducts = [
  {
    name: "Sublimation Mug (White Inner)",
    image: "https://images.pexels.com/photos/3932951/pexels-photo-3932951.jpeg",
    basePrice: 600,
    category: "Sublimation",
    variants: ["11oz", "15oz"],
    priceData: {
      tier1: { min: 1, max: 3, price: 600 },
      tier2: { min: 4, max: 6, price: 550 },
      tier3: { min: 10, max: 999, price: 500 },
    },
  },
  {
    name: "Sublimation Mug (Colored Inner+Handle)",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F51336b8f313240f88ea592f27ea65109?format=webp&width=800",
    basePrice: 800,
    category: "Sublimation",
    variants: [
      {
        name: "11oz - Red Inner",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F51336b8f313240f88ea592f27ea65109?format=webp&width=800",
      },
      {
        name: "11oz - Black Inner",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F0a0b26ddf1974ba7be481c3897e383a6?format=webp&width=800",
      },
      {
        name: "11oz - Green Inner",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2Fce256536223141d98be0ca2b249d429d?format=webp&width=800",
      },
      {
        name: "15oz - Yellow Inner",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F529691f7adf940ae81b18103f1769fc5?format=webp&width=800",
      },
    ],
    priceData: {
      tier1: { min: 1, max: 3, price: 800 },
      tier2: { min: 4, max: 6, price: 750 },
      tier3: { min: 10, max: 999, price: 700 },
    },
  },
  {
    name: "Patch Mug (Black with Custom Printing)",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F22a3aa55c28b4dc28efcf142f1a5a4f0?format=webp&width=800",
    basePrice: 1200,
    category: "Sublimation",
    variants: ["Standard 11oz", "Large 15oz"],
    priceData: {
      tier1: { min: 1, max: 3, price: 1200 },
      tier2: { min: 4, max: 6, price: 1150 },
      tier3: { min: 10, max: 999, price: 1100 },
    },
  },
];

// T-Shirt Products
const tshirtProducts = [
  {
    name: "T-Shirt White (Jersey)",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F6dfa405e89e843fca47a17615cfc40e3?format=webp&width=800",
    basePrice: 400,
    category: "Apparel",
    variants: ["S", "M", "L", "XL", "XXL"],
    priceData: {
      tier1: { min: 1, max: 10, price: 400 },
      tier2: { min: 11, max: 50, price: 350 },
      tier3: { min: 51, max: 999, price: 300 },
    },
  },
  {
    name: "T-Shirt Colored (Cotton/Polo)",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F5d8c378ff2914d5dba91e7d6a29255cb?format=webp&width=800",
    basePrice: 500,
    category: "Apparel",
    variants: [
      {
        name: "Black - S",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F5d8c378ff2914d5dba91e7d6a29255cb?format=webp&width=800",
      },
      {
        name: "Blue - M",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F5d8c378ff2914d5dba91e7d6a29255cb?format=webp&width=800",
      },
      {
        name: "Green - L",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F5d8c378ff2914d5dba91e7d6a29255cb?format=webp&width=800",
      },
      {
        name: "Red - XL",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F5d8c378ff2914d5dba91e7d6a29255cb?format=webp&width=800",
      },
    ],
    priceData: {
      tier1: { min: 1, max: 10, price: 500 },
      tier2: { min: 11, max: 50, price: 450 },
      tier3: { min: 51, max: 999, price: 400 },
    },
  },
  {
    name: "Polo Shirts (Multiple Colors)",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F7de49859ef554a0d8f16dc60e0e218d1?format=webp&width=800",
    basePrice: 600,
    category: "Apparel",
    variants: [
      {
        name: "Navy - S",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F7de49859ef554a0d8f16dc60e0e218d1?format=webp&width=800",
      },
      {
        name: "Black - M",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F7de49859ef554a0d8f16dc60e0e218d1?format=webp&width=800",
      },
      {
        name: "White - L",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F7de49859ef554a0d8f16dc60e0e218d1?format=webp&width=800",
      },
    ],
    priceData: {
      tier1: { min: 1, max: 10, price: 600 },
      tier2: { min: 11, max: 50, price: 550 },
      tier3: { min: 51, max: 999, price: 500 },
    },
  },
];

// Wristband Products
const wristbandProducts = [
  {
    name: "Silicone Wristband (Printed)",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F8260e4adb06745cdbdbdb39461d211b6?format=webp&width=800",
    basePrice: 50,
    category: "Wristbands",
    variants: [
      {
        name: "Green",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2Fa279cb1794f443299a97db13e9ef012f?format=webp&width=800",
      },
      {
        name: "Red",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F15d9b2f63fc54e4dba1f7e7255c44f07?format=webp&width=800",
      },
      {
        name: "Blue",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F1320cec0ec12409ea4449f23c77b28bf?format=webp&width=800",
      },
      {
        name: "Black",
        image:
          "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F6e2b0bbda91b46af9895084b03db1bde?format=webp&width=800",
      },
    ],
    priceData: {
      tier1: { min: 100, max: 500, price: 50 },
      tier2: { min: 100, max: 500, price: 25 },
      tier3: { min: 500, max: 1000, price: 20 },
    },
    specialPricing: {
      nonPrintedSingle: 30,
    },
  },
  {
    name: "Event Non-Tear Bands",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F8260e4adb06745cdbdbdb39461d211b6?format=webp&width=800",
    basePrice: 20,
    category: "Event Bands",
    variants: ["Standard", "VIP", "Security"],
    priceData: {
      tier1: { min: 1000, max: 1000, price: 20 },
      tier2: { min: 1000, max: 1000, price: 20 },
      tier3: { min: 1000, max: 1000, price: 20 },
    },
  },
];

// Flags and Banners
const flagProducts = [
  {
    name: "Sublimation Flag",
    image: "https://images.pexels.com/photos/6786894/pexels-photo-6786894.jpeg",
    basePrice: 200,
    category: "Flags & Banners",
    variants: ["2x3 feet", "3x5 feet", "4x6 feet"],
    priceData: {
      tier1: { min: 1, max: 5, price: 200 },
      tier2: { min: 6, max: 20, price: 180 },
      tier3: { min: 21, max: 999, price: 160 },
    },
    pricingNote: "Price per square feet",
  },
  {
    name: "Vinyl Banner",
    image: "https://images.pexels.com/photos/6786894/pexels-photo-6786894.jpeg",
    basePrice: 150,
    category: "Flags & Banners",
    variants: ["Standard", "Premium", "Outdoor"],
    priceData: {
      tier1: { min: 1, max: 10, price: 150 },
      tier2: { min: 11, max: 50, price: 140 },
      tier3: { min: 51, max: 999, price: 130 },
    },
    pricingNote: "Price per square feet",
  },
  {
    name: "Panaflex Banner",
    image: "https://images.pexels.com/photos/6786894/pexels-photo-6786894.jpeg",
    basePrice: 50,
    category: "Flags & Banners",
    variants: ["Indoor", "Outdoor", "Heavy Duty"],
    priceData: {
      tier1: { min: 1, max: 20, price: 50 },
      tier2: { min: 21, max: 100, price: 45 },
      tier3: { min: 101, max: 999, price: 40 },
    },
    pricingNote: "Price per square feet",
  },
];

// Removed keychain and pen products as requested

const services = [
  {
    title: "Digital Sublimation",
    description:
      "High-quality sublimation printing on mugs, shirts, and more with vibrant, long-lasting colors.",
    features: [
      "Photo Quality",
      "Scratch Resistant",
      "Dishwasher Safe",
      "Full Color",
    ],
    icon: <Star className="h-8 w-8 text-brand-primary" />,
  },
  {
    title: "Screen Printing",
    description:
      "Professional screen printing for bulk orders with consistent quality and durability.",
    features: [
      "Bulk Discounts",
      "Pantone Colors",
      "Durable Finish",
      "Quick Turnaround",
    ],
    icon: <Award className="h-8 w-8 text-brand-primary" />,
  },
  {
    title: "Custom Design",
    description:
      "Our design team creates unique artwork tailored to your brand and requirements.",
    features: [
      "Logo Design",
      "Brand Identity",
      "Vector Art",
      "Design Consultation",
    ],
    icon: <Users className="h-8 w-8 text-brand-primary" />,
  },
  {
    title: "Corporate Solutions",
    description:
      "Complete branding solutions for restaurants, offices, and businesses.",
    features: [
      "Uniform Printing",
      "Staff Apparel",
      "Promotional Items",
      "Bulk Orders",
    ],
    icon: <Clock className="h-8 w-8 text-brand-primary" />,
  },
];

const stats = [
  { number: "5000+", label: "Happy Customers" },
  { number: "50000+", label: "Products Printed" },
  { number: "99%", label: "Quality Guarantee" },
  { number: "24h", label: "Average Turnaround" },
];

const defaultSiteImages = {
  logo: "https://cdn.builder.io/api/v1/assets/ea61dcf4d4424dd79aa5d25b8d2c102b/alhuzaifa-logo-c3ac64?format=webp&width=800",
  heroImages: [
    "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F51336b8f313240f88ea592f27ea65109?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F6dfa405e89e843fca47a17615cfc40e3?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F22a3aa55c28b4dc28efcf142f1a5a4f0?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F8260e4adb06745cdbdbdb39461d211b6?format=webp&width=800",
  ],
  backgroundImages: [],
};

export default function Index() {
  const [siteImages, setSiteImages] = useState(defaultSiteImages);
  useEffect(() => {
    const savedImages = localStorage.getItem("adminSiteImages");
    if (savedImages) {
      setSiteImages(JSON.parse(savedImages));
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />

      {/* Enhanced Hero Section */}
      <section
        id="home"
        className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-gray-50 to-brand-primary/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-brand-primary/10 rounded-full text-brand-primary text-sm font-medium mb-6 hover:bg-brand-primary/20 transition-colors">
                <Star className="w-4 h-4 mr-2" />
                Pakistan's Premier Printing Service
              </div>

              <h1 className="text-4xl lg:text-6xl font-display font-bold text-black dark:text-white mb-6">
                Transform Your Ideas Into{" "}
                <span className="text-brand-primary bg-gradient-to-r from-brand-primary to-brand-dark bg-clip-text text-transparent animate-pulse">
                  Reality
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                From custom mugs and apparel to promotional materials - we
                deliver premium quality printing solutions with unmatched
                precision and creativity.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button
                  size="lg"
                  className="bg-brand-primary hover:bg-brand-dark text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200 hover:shadow-lg"
                  onClick={() =>
                    document
                      .getElementById("services")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200"
                  onClick={() =>
                    document
                      .getElementById("calculator")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Get Instant Quote
                </Button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left group">
                    <div className="text-2xl lg:text-3xl font-bold text-brand-primary group-hover:scale-110 transition-transform">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={siteImages.heroImages[0] || defaultSiteImages.heroImages[0]}
                  alt="Custom Mug"
                  className="w-full h-40 object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                />
                <img
                  src={siteImages.heroImages[1] || defaultSiteImages.heroImages[1]}
                  alt="Custom T-Shirt"
                  className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src={siteImages.heroImages[2] || defaultSiteImages.heroImages[2]}
                  alt="Patch Mug"
                  className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                />
                <img
                  src={siteImages.heroImages[3] || defaultSiteImages.heroImages[3]}
                  alt="Custom Wristbands"
                  className="w-full h-40 object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-black dark:text-white mb-4">
              Our Premium Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Professional printing services with state-of-the-art equipment and
              expert craftsmanship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
              >
                <CardContent className="p-6">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-black dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-brand-primary mr-2 flex-shrink-0" />
                        <span className="dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sublimation Mugs Section */}
      <section id="mugs" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-black dark:text-white mb-4">
              Sublimation Mugs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              High-quality sublimation printing on all types of mugs with
              vibrant, permanent designs
            </p>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 w-max">
              {mugProducts.map((product, index) => (
                <div key={index} className="w-80 flex-shrink-0">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Apparel */}
      <section id="apparel" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-black dark:text-white mb-4">
              Custom Apparel
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Professional uniform and custom apparel printing for businesses
              and individuals
            </p>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 w-max">
              {tshirtProducts.map((product, index) => (
                <div key={index} className="w-80 flex-shrink-0">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wristbands & Event Bands */}
      <section id="wristbands" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-black dark:text-white mb-4">
              Wristbands & Event Bands
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Custom wristbands and event bands for promotions, events, and
              identification
            </p>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 w-max">
              {wristbandProducts.map((product, index) => (
                <div key={index} className="w-80 flex-shrink-0">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flags & Banners */}
      <section id="flags" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-black dark:text-white mb-4">
              Flags & Banners
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Custom flags, vinyl banners, and panaflex for outdoor and indoor
              advertising
            </p>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 w-max">
              {flagProducts.map((product, index) => (
                <div key={index} className="w-80 flex-shrink-0">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rate Calculator */}
      <RateCalculator />

      {/* About Section */}
      <section id="about" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-black dark:text-white mb-4">
              About Al Huzaifa Printers
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              With years of experience in digital printing, we are committed to
              delivering the highest quality products at competitive prices. Our
              state-of-the-art equipment and skilled team ensure every project
              meets our strict quality standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-brand-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 dark:text-white">
                  Quality Guarantee
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  We stand behind every product with our 100% quality guarantee
                  and customer satisfaction promise.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-brand-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 dark:text-white">
                  Fast Turnaround
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Quick processing and delivery times without compromising on
                  quality. Most orders ready within 24-48 hours.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-brand-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 dark:text-white">
                  Expert Team
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Our experienced design and printing team provides professional
                  consultation and superior craftsmanship.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-black dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Ready to start your project? Contact us for quotes and
              consultations.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <Card className="text-center border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <Phone className="h-8 w-8 text-brand-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 dark:text-white">
                  Call Us
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  03332054452
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  03362537450
                </p>
                <Button
                  variant="outline"
                  className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transform hover:scale-105 transition-all duration-200"
                  onClick={() => window.open("tel:+923332054452")}
                >
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <Mail className="h-8 w-8 text-brand-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 dark:text-white">
                  Email Us
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  huzaifariaz1234@gmail.com
                </p>
                <Button
                  variant="outline"
                  className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transform hover:scale-105 transition-all duration-200"
                  onClick={() =>
                    window.open("mailto:huzaifariaz1234@gmail.com")
                  }
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-brand-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 dark:text-white">
                  Visit Us
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Shop # 50, Al Momin Plaza
                  <br />
                  Behind Fresco Sweets
                  <br />
                  Burns Road, Karachi
                </p>
                <Button
                  variant="outline"
                  className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transform hover:scale-105 transition-all duration-200"
                  onClick={() =>
                    window.open(
                      `https://wa.me/+923332054452?text=${encodeURIComponent("Hi! I would like to visit your shop. Could you please share directions to Shop # 50, Al Momin Plaza, Burns Road?")}`,
                    )
                  }
                >
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer with hidden admin access */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img
                src={siteImages.logo || defaultSiteImages.logo}
                alt="Al Huzaifa Printers Logo"
                className="h-8 w-auto filter brightness-0 invert"
              />
              <div>
                <h3 className="font-display font-semibold">
                  Al Huzaifa Printers
                </h3>
                <p className="text-sm text-gray-400">
                  Digital Printing Solutions
                </p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400 mb-2">
                © 2024 Al Huzaifa Printers. All rights reserved.
              </p>
              <p className="text-sm text-gray-400 mb-2">
                Professional printing services with quality guarantee
              </p>
              {/* Admin access link */}
              <div className="mt-4 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs text-gray-600 hover:text-white"
                  onClick={() => (window.location.href = "/admin")}
                >
                  Admin Access
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
    </div>
  );
}
