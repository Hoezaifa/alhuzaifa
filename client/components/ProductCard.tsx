import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";

interface PriceData {
  tier1: { min: number; max: number; price: number };
  tier2: { min: number; max: number; price: number };
  tier3: { min: number; max: number; price: number };
}

interface Variant {
  name?: string;
  image?: string;
}

interface ProductCardProps {
  name: string;
  image: string;
  basePrice: number;
  category: string;
  minQuantity?: number;
  variants?: (string | Variant)[];
  priceData?: PriceData;
  specialPricing?: {
    nonPrintedSingle?: number;
  };
}

export default function ProductCard({
  name,
  image,
  basePrice,
  category,
  minQuantity = 1,
  variants = [],
  priceData,
  specialPricing,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(minQuantity);
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || "");
  const [currentImage, setCurrentImage] = useState(image);
  const [currentPrice, setCurrentPrice] = useState(basePrice);
  const [isPrintingEnabled, setIsPrintingEnabled] = useState(true);

  // Calculate price based on quantity tiers
  const calculatePrice = (qty: number, printingEnabled: boolean = true) => {
    if (!printingEnabled && specialPricing?.nonPrintedSingle) {
      return specialPricing.nonPrintedSingle;
    }

    if (!priceData) return basePrice;

    if (qty >= priceData.tier3.min) return priceData.tier3.price;
    if (qty >= priceData.tier2.min) return priceData.tier2.price;
    return priceData.tier1.price;
  };

  useEffect(() => {
    const newPrice = calculatePrice(quantity, isPrintingEnabled);
    setCurrentPrice(newPrice);
  }, [quantity, isPrintingEnabled, priceData, specialPricing]);

  useEffect(() => {
    // Update image when variant changes
    if (
      typeof selectedVariant === "object" &&
      selectedVariant &&
      "image" in selectedVariant
    ) {
      setCurrentImage(selectedVariant.image || image);
    }
  }, [selectedVariant, image]);

  const totalPrice = currentPrice * quantity;

  const handleVariantChange = (variant: string | Variant) => {
    setSelectedVariant(variant);
    if (typeof variant === "object" && variant.image) {
      setCurrentImage(variant.image);
    }
  };

  const getVariantDisplayName = (variant: string | Variant) => {
    if (typeof variant === "string") return variant;
    return variant.name || "Variant";
  };

  const getPricingTierText = () => {
    if (!priceData) return "";

    return `Pricing: 1-${priceData.tier1.max}: PKR ${priceData.tier1.price} | ${priceData.tier2.min}-${priceData.tier2.max}: PKR ${priceData.tier2.price} | ${priceData.tier3.min}+: PKR ${priceData.tier3.price}`;
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-gray-200 dark:border-gray-700 dark:bg-gray-800 overflow-hidden hover:-translate-y-2 hover:border-brand-primary/50">
      <div className="aspect-square overflow-hidden bg-gray-50 dark:bg-gray-700 relative">
        <img
          src={currentImage}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <Badge
            variant="secondary"
            className="bg-brand-primary/10 text-brand-primary mb-2"
          >
            {category}
          </Badge>
          <h3 className="font-semibold text-lg text-black dark:text-white">
            {name}
          </h3>
        </div>

        {variants.length > 0 && (
          <div className="mb-3">
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
              Variant:
            </label>
            <select
              value={
                typeof selectedVariant === "string"
                  ? selectedVariant
                  : (selectedVariant as Variant)?.name || ""
              }
              onChange={(e) => {
                const variant = variants.find((v) =>
                  typeof v === "string"
                    ? v === e.target.value
                    : v.name === e.target.value,
                );
                if (variant) handleVariantChange(variant);
              }}
              className="w-full p-2 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
            >
              {variants.map((variant, index) => (
                <option key={index} value={getVariantDisplayName(variant)}>
                  {getVariantDisplayName(variant)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Special wristband printing option */}
        {specialPricing?.nonPrintedSingle && (
          <div className="mb-3">
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
              Options:
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setIsPrintingEnabled(true)}
                className={`px-3 py-1 text-xs rounded ${
                  isPrintingEnabled
                    ? "bg-brand-primary text-white"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                }`}
              >
                With Printing
              </button>
              <button
                onClick={() => setIsPrintingEnabled(false)}
                className={`px-3 py-1 text-xs rounded ${
                  !isPrintingEnabled
                    ? "bg-brand-primary text-white"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                }`}
              >
                Without Printing
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.max(minQuantity, quantity - 1))}
              disabled={quantity <= minQuantity}
              className="h-8 w-8 p-0 dark:border-gray-600"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-12 text-center font-medium dark:text-white">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
              className="h-8 w-8 p-0 dark:border-gray-600"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {priceData && (
          <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
            <div>Tier pricing available:</div>
            <div>{getPricingTierText()}</div>
          </div>
        )}

        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Per piece: PKR {currentPrice}
          </p>
          <p className="text-lg font-bold text-brand-primary">
            Total: PKR {totalPrice}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-brand-primary hover:bg-brand-dark text-white transform hover:scale-105 transition-all duration-200 hover:shadow-lg"
          onClick={() => {
            const variantText = selectedVariant
              ? ` (${getVariantDisplayName(selectedVariant)})`
              : "";
            const printingText = specialPricing?.nonPrintedSingle
              ? isPrintingEnabled
                ? " with printing"
                : " without printing"
              : "";
            const message = `Hi! I'd like to order ${quantity} ${name}${variantText}${printingText} for PKR ${totalPrice}. Please provide more details.`;
            window.open(
              `https://wa.me/+923332054452?text=${encodeURIComponent(message)}`,
              "_blank",
            );
          }}
        >
          Order via WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
}
