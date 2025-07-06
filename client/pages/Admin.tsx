import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Lock,
  Save,
  Edit,
  DollarSign,
  Package,
  Users,
  TrendingUp,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

interface PriceData {
  tier1: { min: number; max: number; price: number };
  tier2: { min: number; max: number; price: number };
  tier3: { min: number; max: number; price: number };
}

interface Variant {
  name: string;
  image?: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description?: string;
  priceData: PriceData;
  variants: (string | Variant)[];
  specialPricing?: {
    nonPrintedSingle?: number;
  };
  pricingNote?: string;
}

interface SiteImages {
  logo: string;
  heroImages: string[];
  backgroundImages: string[];
}

const initialProducts: Product[] = [
  {
    id: "sublimation-mug-white",
    name: "Sublimation Mug (White Inner)",
    category: "Sublimation",
    image: "https://images.pexels.com/photos/3932951/pexels-photo-3932951.jpeg",
    description: "High-quality white inner sublimation mugs",
    variants: ["11oz", "15oz"],
    priceData: {
      tier1: { min: 1, max: 3, price: 600 },
      tier2: { min: 4, max: 6, price: 550 },
      tier3: { min: 10, max: 999, price: 500 },
    },
  },
  {
    id: "sublimation-mug-colored",
    name: "Sublimation Mug (Colored Inner+Handle)",
    category: "Sublimation",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F51336b8f313240f88ea592f27ea65109?format=webp&width=800",
    description: "Sublimation mugs with colored inner and handle",
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
    id: "patch-mug",
    name: "Patch Mug (Black with Custom Printing)",
    category: "Sublimation",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F22a3aa55c28b4dc28efcf142f1a5a4f0?format=webp&width=800",
    description: "Premium black patch mugs with custom printing",
    variants: ["Standard 11oz", "Large 15oz"],
    priceData: {
      tier1: { min: 1, max: 3, price: 1200 },
      tier2: { min: 4, max: 6, price: 1150 },
      tier3: { min: 10, max: 999, price: 1100 },
    },
  },
];

const initialSiteImages: SiteImages = {
  logo: "https://cdn.builder.io/api/v1/assets/ea61dcf4d4424dd79aa5d25b8d2c102b/alhuzaifa-logo-c3ac64?format=webp&width=800",
  heroImages: [
    "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F51336b8f313240f88ea592f27ea65109?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F6dfa405e89e843fca47a17615cfc40e3?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F22a3aa55c28b4dc28efcf142f1a5a4f0?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2Fea61dcf4d4424dd79aa5d25b8d2c102b%2F8260e4adb06745cdbdbdb39461d211b6?format=webp&width=800",
  ],
  backgroundImages: [],
};

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [siteImages, setSiteImages] = useState<SiteImages>(initialSiteImages);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [newProduct, setNewProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    // Load saved data from localStorage
    const savedProducts = localStorage.getItem("adminProducts");
    const savedImages = localStorage.getItem("adminSiteImages");

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
    if (savedImages) {
      setSiteImages(JSON.parse(savedImages));
    }
  }, []);

  const handleLogin = () => {
    if (username === "huzefa" && password === "huzefa") {
      setIsAuthenticated(true);
      setSaveMessage("");
    } else {
      setSaveMessage("Incorrect username or password");
    }
  };

  const saveChanges = () => {
    localStorage.setItem("adminProducts", JSON.stringify(products));
    localStorage.setItem("adminSiteImages", JSON.stringify(siteImages));
    setSaveMessage("✅ Changes saved successfully!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const updateProductField = (
    productId: string,
    field: keyof Product,
    value: any,
  ) => {
    setProducts(
      products.map((product) =>
        product.id === productId ? { ...product, [field]: value } : product,
      ),
    );
  };

  const updateProductPrice = (
    productId: string,
    tier: "tier1" | "tier2" | "tier3",
    field: "price" | "min" | "max",
    value: number,
  ) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            priceData: {
              ...product.priceData,
              [tier]: {
                ...product.priceData[tier],
                [field]: value,
              },
            },
          };
        }
        return product;
      }),
    );
  };

  const addVariant = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const newVariants = [...product.variants, "New Variant"];
      updateProductField(productId, "variants", newVariants);
    }
  };

  const updateVariant = (
    productId: string,
    variantIndex: number,
    newValue: string | Variant,
  ) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const newVariants = [...product.variants];
      newVariants[variantIndex] = newValue;
      updateProductField(productId, "variants", newVariants);
    }
  };

  const removeVariant = (productId: string, variantIndex: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const newVariants = product.variants.filter(
        (_, index) => index !== variantIndex,
      );
      updateProductField(productId, "variants", newVariants);
    }
  };

  const addNewProduct = () => {
    const newProd: Product = {
      id: `product-${Date.now()}`,
      name: "New Product",
      category: "Sublimation",
      image: "https://via.placeholder.com/400x400",
      description: "New product description",
      variants: ["Default"],
      priceData: {
        tier1: { min: 1, max: 10, price: 100 },
        tier2: { min: 11, max: 50, price: 90 },
        tier3: { min: 51, max: 999, price: 80 },
      },
    };
    setProducts([...products, newProd]);
    setEditingProduct(newProd.id);
  };

  const deleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
    if (editingProduct === productId) {
      setEditingProduct(null);
    }
  };

  const updateSiteImage = (
    type: keyof SiteImages,
    value: string | string[],
  ) => {
    setSiteImages({
      ...siteImages,
      [type]: value,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="max-w-md mx-auto dark:bg-gray-800 dark:border-gray-700 shadow-xl">
            <CardHeader className="text-center">
              <Lock className="h-12 w-12 text-brand-primary mx-auto mb-4" />
              <CardTitle className="text-2xl font-display dark:text-white">
                🚀 Epic Admin Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="username" className="dark:text-white">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <Label htmlFor="password" className="dark:text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter password"
                />
              </div>
              <Button
                onClick={handleLogin}
                className="w-full bg-brand-primary hover:bg-brand-dark transform hover:scale-105 transition-all duration-200"
              >
                🔓 Unlock Admin Powers
              </Button>
              {saveMessage && (
                <p className="text-red-500 text-sm text-center">
                  {saveMessage}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-black dark:text-white mb-2">
              🚀 Epic Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Full control over products, images, and site content
            </p>
          </div>
          <Button
            onClick={saveChanges}
            className="bg-green-500 hover:bg-green-600 text-white transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <Save className="h-4 w-4 mr-2" />
            💾 Save All Changes
          </Button>
        </div>

        {saveMessage && (
          <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg transform animate-pulse">
            <p className="text-green-700 dark:text-green-300 font-medium">
              {saveMessage}
            </p>
          </div>
        )}

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 dark:bg-gray-800">
            <TabsTrigger value="products" className="dark:text-white">
              <Package className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="images" className="dark:text-white">
              <ImageIcon className="h-4 w-4 mr-2" />
              Site Images
            </TabsTrigger>
            <TabsTrigger value="pricing" className="dark:text-white">
              <DollarSign className="h-4 w-4 mr-2" />
              Pricing
            </TabsTrigger>
            <TabsTrigger value="analytics" className="dark:text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold dark:text-white">
                📦 Product Management
              </h2>
              <Button
                onClick={addNewProduct}
                className="bg-brand-primary hover:bg-brand-dark transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </div>

            <div className="grid gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <CardTitle className="dark:text-white">
                            {product.name}
                          </CardTitle>
                          <Badge variant="secondary" className="mt-1">
                            {product.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setEditingProduct(
                              editingProduct === product.id ? null : product.id,
                            )
                          }
                          className="dark:border-gray-600 dark:text-white transform hover:scale-105 transition-all duration-200"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          {editingProduct === product.id ? "Cancel" : "Edit"}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteProduct(product.id)}
                          className="transform hover:scale-105 transition-all duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {editingProduct === product.id && (
                    <CardContent className="space-y-6 border-t dark:border-gray-700 pt-6">
                      {/* Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="dark:text-white">
                            Product Name
                          </Label>
                          <Input
                            value={product.name}
                            onChange={(e) =>
                              updateProductField(
                                product.id,
                                "name",
                                e.target.value,
                              )
                            }
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <Label className="dark:text-white">Category</Label>
                          <Select
                            value={product.category}
                            onValueChange={(value) =>
                              updateProductField(product.id, "category", value)
                            }
                          >
                            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-gray-800">
                              <SelectItem value="Sublimation">
                                Sublimation
                              </SelectItem>
                              <SelectItem value="Apparel">Apparel</SelectItem>
                              <SelectItem value="Wristbands">
                                Wristbands
                              </SelectItem>
                              <SelectItem value="Flags & Banners">
                                Flags & Banners
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Main Image */}
                      <div>
                        <Label className="dark:text-white">
                          Main Image URL
                        </Label>
                        <Input
                          value={product.image}
                          onChange={(e) =>
                            updateProductField(
                              product.id,
                              "image",
                              e.target.value,
                            )
                          }
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <Label className="dark:text-white">Description</Label>
                        <Textarea
                          value={product.description || ""}
                          onChange={(e) =>
                            updateProductField(
                              product.id,
                              "description",
                              e.target.value,
                            )
                          }
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          rows={3}
                        />
                      </div>

                      {/* Variants */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label className="dark:text-white">Variants</Label>
                          <Button
                            size="sm"
                            onClick={() => addVariant(product.id)}
                            className="bg-blue-500 hover:bg-blue-600"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Variant
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {product.variants.map((variant, index) => (
                            <div key={index} className="flex space-x-2">
                              <Input
                                value={
                                  typeof variant === "string"
                                    ? variant
                                    : variant.name
                                }
                                onChange={(e) => {
                                  if (typeof variant === "string") {
                                    updateVariant(
                                      product.id,
                                      index,
                                      e.target.value,
                                    );
                                  } else {
                                    updateVariant(product.id, index, {
                                      ...variant,
                                      name: e.target.value,
                                    });
                                  }
                                }}
                                className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Variant name"
                              />
                              {typeof variant === "object" && (
                                <Input
                                  value={variant.image || ""}
                                  onChange={(e) =>
                                    updateVariant(product.id, index, {
                                      ...variant,
                                      image: e.target.value,
                                    })
                                  }
                                  className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                  placeholder="Variant image URL"
                                />
                              )}
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeVariant(product.id, index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing Tiers */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(["tier1", "tier2", "tier3"] as const).map((tier) => (
                          <div
                            key={tier}
                            className="p-4 border rounded-lg dark:border-gray-600 space-y-2"
                          >
                            <h4 className="font-semibold mb-2 dark:text-white">
                              {tier === "tier1"
                                ? "Tier 1"
                                : tier === "tier2"
                                  ? "Tier 2"
                                  : "Tier 3"}
                            </h4>
                            <div>
                              <Label className="text-xs dark:text-gray-400">
                                Min Qty
                              </Label>
                              <Input
                                type="number"
                                value={product.priceData[tier].min}
                                onChange={(e) =>
                                  updateProductPrice(
                                    product.id,
                                    tier,
                                    "min",
                                    parseInt(e.target.value),
                                  )
                                }
                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-xs dark:text-gray-400">
                                Max Qty
                              </Label>
                              <Input
                                type="number"
                                value={product.priceData[tier].max}
                                onChange={(e) =>
                                  updateProductPrice(
                                    product.id,
                                    tier,
                                    "max",
                                    parseInt(e.target.value),
                                  )
                                }
                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-xs dark:text-gray-400">
                                Price (PKR)
                              </Label>
                              <Input
                                type="number"
                                value={product.priceData[tier].price}
                                onChange={(e) =>
                                  updateProductPrice(
                                    product.id,
                                    tier,
                                    "price",
                                    parseInt(e.target.value),
                                  )
                                }
                                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Site Images Tab */}
          <TabsContent value="images" className="space-y-6">
            <h2 className="text-2xl font-semibold dark:text-white">
              🖼️ Site-wide Image Management
            </h2>

            {/* Logo Management */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Company Logo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={siteImages.logo}
                    alt="Logo"
                    className="w-16 h-16 object-contain bg-white rounded"
                  />
                  <div className="flex-1">
                    <Label className="dark:text-white">Logo URL</Label>
                    <Input
                      value={siteImages.logo}
                      onChange={(e) => updateSiteImage("logo", e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hero Images */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="dark:text-white">
                    Hero Section Images
                  </CardTitle>
                  <Button
                    onClick={() =>
                      updateSiteImage("heroImages", [
                        ...siteImages.heroImages,
                        "https://via.placeholder.com/400x400",
                      ])
                    }
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {siteImages.heroImages.map((image, index) => (
                    <div key={index} className="space-y-2">
                      <img
                        src={image}
                        alt={`Hero ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="flex space-x-2">
                        <Input
                          value={image}
                          onChange={(e) => {
                            const newImages = [...siteImages.heroImages];
                            newImages[index] = e.target.value;
                            updateSiteImage("heroImages", newImages);
                          }}
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            const newImages = siteImages.heroImages.filter(
                              (_, i) => i !== index,
                            );
                            updateSiteImage("heroImages", newImages);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  💰 Quick Pricing Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 border rounded-lg dark:border-gray-600"
                    >
                      <h3 className="font-semibold dark:text-white mb-2">
                        {product.name}
                      </h3>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
                          <div className="font-medium dark:text-white">
                            Tier 1
                          </div>
                          <div className="text-brand-primary">
                            PKR {product.priceData.tier1.price}
                          </div>
                        </div>
                        <div className="text-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
                          <div className="font-medium dark:text-white">
                            Tier 2
                          </div>
                          <div className="text-brand-primary">
                            PKR {product.priceData.tier2.price}
                          </div>
                        </div>
                        <div className="text-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
                          <div className="font-medium dark:text-white">
                            Tier 3
                          </div>
                          <div className="text-brand-primary">
                            PKR {product.priceData.tier3.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  📊 Analytics Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border rounded-lg dark:border-gray-600">
                    <div className="text-3xl font-bold text-brand-primary">
                      {products.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Products
                    </div>
                  </div>
                  <div className="text-center p-6 border rounded-lg dark:border-gray-600">
                    <div className="text-3xl font-bold text-green-500">
                      {siteImages.heroImages.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Hero Images
                    </div>
                  </div>
                  <div className="text-center p-6 border rounded-lg dark:border-gray-600">
                    <div className="text-3xl font-bold text-blue-500">100%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      System Status
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
