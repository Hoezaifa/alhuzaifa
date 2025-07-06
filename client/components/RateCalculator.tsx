import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { useState } from "react";

interface PriceData {
  tier1: { min: number; max: number; price: number };
  tier2: { min: number; max: number; price: number };
  tier3: { min: number; max: number; price: number };
}

interface Product {
  id: string;
  name: string;
  priceData: PriceData;
  specialPricing?: {
    nonPrintedSingle?: number;
  };
}

const products: Product[] = [
  {
    id: "sublimation-mug-white",
    name: "Sublimation Mug (White Inner)",
    priceData: {
      tier1: { min: 1, max: 3, price: 600 },
      tier2: { min: 4, max: 6, price: 550 },
      tier3: { min: 10, max: 999, price: 500 },
    },
  },
  {
    id: "sublimation-mug-colored",
    name: "Sublimation Mug (Colored Inner+Handle)",
    priceData: {
      tier1: { min: 1, max: 3, price: 800 },
      tier2: { min: 4, max: 6, price: 750 },
      tier3: { min: 10, max: 999, price: 700 },
    },
  },
  {
    id: "patch-mug",
    name: "Patch Mug (Black with Custom Printing)",
    priceData: {
      tier1: { min: 1, max: 3, price: 1200 },
      tier2: { min: 4, max: 6, price: 1150 },
      tier3: { min: 10, max: 999, price: 1100 },
    },
  },
  {
    id: "tshirt-white-jersey",
    name: "T-Shirt White (Jersey)",
    priceData: {
      tier1: { min: 1, max: 10, price: 400 },
      tier2: { min: 11, max: 50, price: 350 },
      tier3: { min: 51, max: 999, price: 300 },
    },
  },
  {
    id: "tshirt-colored-cotton",
    name: "T-Shirt Colored (Cotton/Polo)",
    priceData: {
      tier1: { min: 1, max: 10, price: 500 },
      tier2: { min: 11, max: 50, price: 450 },
      tier3: { min: 51, max: 999, price: 400 },
    },
  },
  {
    id: "polo-shirts",
    name: "Polo Shirts (Multiple Colors)",
    priceData: {
      tier1: { min: 1, max: 10, price: 600 },
      tier2: { min: 11, max: 50, price: 550 },
      tier3: { min: 51, max: 999, price: 500 },
    },
  },

  {
    id: "silicone-wristband",
    name: "Silicone Wristband (Printed)",
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
    id: "event-non-tear-bands",
    name: "Event Non-Tear Bands",
    priceData: {
      tier1: { min: 1000, max: 1000, price: 20 },
      tier2: { min: 1000, max: 1000, price: 20 },
      tier3: { min: 1000, max: 1000, price: 20 },
    },
  },
  {
    id: "sublimation-flag",
    name: "Sublimation Flag (per sq ft)",
    priceData: {
      tier1: { min: 1, max: 5, price: 200 },
      tier2: { min: 6, max: 20, price: 180 },
      tier3: { min: 21, max: 999, price: 160 },
    },
  },
  {
    id: "vinyl-banner",
    name: "Vinyl Banner (per sq ft)",
    priceData: {
      tier1: { min: 1, max: 10, price: 150 },
      tier2: { min: 11, max: 50, price: 140 },
      tier3: { min: 51, max: 999, price: 130 },
    },
  },
  {
    id: "panaflex-banner",
    name: "Panaflex Banner (per sq ft)",
    priceData: {
      tier1: { min: 1, max: 20, price: 50 },
      tier2: { min: 21, max: 100, price: 45 },
      tier3: { min: 101, max: 999, price: 40 },
    },
  },
];

export default function RateCalculator() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customDesign, setCustomDesign] = useState(false);
  const [isPrintingEnabled, setIsPrintingEnabled] = useState(true);

  const selectedProductData = products.find((p) => p.id === selectedProduct);

  const calculatePrice = (
    product: Product,
    qty: number,
    printingEnabled: boolean = true,
  ) => {
    if (!printingEnabled && product.specialPricing?.nonPrintedSingle) {
      return product.specialPricing.nonPrintedSingle;
    }

    const { priceData } = product;
    if (qty >= priceData.tier3.min) return priceData.tier3.price;
    if (qty >= priceData.tier2.min) return priceData.tier2.price;
    return priceData.tier1.price;
  };

  const basePrice = selectedProductData
    ? calculatePrice(selectedProductData, quantity, isPrintingEnabled)
    : 0;
  const designFee = customDesign ? 500 : 0;
  const subtotal = basePrice * quantity;
  const total = subtotal + designFee;
  const pricePerPiece = quantity > 0 ? total / quantity : 0;

  const getTierInfo = (product: Product) => {
    const { priceData } = product;
    return `Tier 1 (${priceData.tier1.min}-${priceData.tier1.max}): PKR ${priceData.tier1.price} | Tier 2 (${priceData.tier2.min}-${priceData.tier2.max}): PKR ${priceData.tier2.price} | Tier 3 (${priceData.tier3.min}+): PKR ${priceData.tier3.price}`;
  };

  const handleWhatsAppOrder = () => {
    if (!selectedProductData) return;

    const printingText = selectedProductData.specialPricing?.nonPrintedSingle
      ? isPrintingEnabled
        ? " with printing"
        : " without printing"
      : "";

    const message = `Hi! I'd like to get a quote for:
Product: ${selectedProductData.name}${printingText}
Quantity: ${quantity}
Custom Design: ${customDesign ? "Yes" : "No"}
Total Estimated Cost: PKR ${total}
Per Piece Cost: PKR ${pricePerPiece.toFixed(2)}

Please provide detailed pricing and next steps.`;

    window.open(
      `https://wa.me/+923332054452?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <section id="calculator" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-black dark:text-white mb-4">
            Advanced Rate Calculator
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get instant pricing with our tier-based pricing system. Bigger
            orders mean better rates!
          </p>
        </div>

        <Card className="max-w-2xl mx-auto dark:bg-gray-900 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Calculator className="h-5 w-5 text-brand-primary" />
              Calculate Your Order
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="product" className="dark:text-white">
                Select Product
              </Label>
              <Select
                value={selectedProduct}
                onValueChange={setSelectedProduct}
              >
                <SelectTrigger className="dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                  <SelectValue placeholder="Choose a product..." />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                  {products.map((product) => (
                    <SelectItem
                      key={product.id}
                      value={product.id}
                      className="dark:text-white dark:focus:bg-gray-700"
                    >
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity" className="dark:text-white">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="mt-1 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>

            {selectedProductData?.specialPricing?.nonPrintedSingle && (
              <div>
                <Label className="dark:text-white">Printing Options</Label>
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => setIsPrintingEnabled(true)}
                    className={`px-4 py-2 text-sm rounded ${
                      isPrintingEnabled
                        ? "bg-brand-primary text-white"
                        : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    With Printing
                  </button>
                  <button
                    onClick={() => setIsPrintingEnabled(false)}
                    className={`px-4 py-2 text-sm rounded ${
                      !isPrintingEnabled
                        ? "bg-brand-primary text-white"
                        : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Without Printing (PKR{" "}
                    {selectedProductData.specialPricing.nonPrintedSingle})
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="customDesign"
                checked={customDesign}
                onChange={(e) => setCustomDesign(e.target.checked)}
                className="w-4 h-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"
              />
              <Label htmlFor="customDesign" className="dark:text-white">
                Custom Design Service (+PKR 500)
              </Label>
            </div>

            {selectedProductData && (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Pricing Tiers: {getTierInfo(selectedProductData)}
                </div>
                <div className="flex justify-between dark:text-white">
                  <span>
                    Base Price ({quantity} × PKR {basePrice}):
                  </span>
                  <span>PKR {subtotal}</span>
                </div>
                {customDesign && (
                  <div className="flex justify-between dark:text-white">
                    <span>Design Fee:</span>
                    <span>PKR {designFee}</span>
                  </div>
                )}
                <hr className="my-2 dark:border-gray-600" />
                <div className="flex justify-between font-semibold text-lg">
                  <span className="dark:text-white">Total:</span>
                  <span className="text-brand-primary">PKR {total}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Per Piece Cost:</span>
                  <span>PKR {pricePerPiece.toFixed(2)}</span>
                </div>
              </div>
            )}

            {selectedProduct && (
              <Button
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-500 hover:bg-green-600 text-white transform hover:scale-105 transition-all duration-200 hover:shadow-lg"
              >
                Get Quote via WhatsApp
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
