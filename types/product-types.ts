// Product type enumeration
export enum ProductType {
  MASS_PRODUCED = 'mass_produced',
  ONE_OF_A_KIND = 'one_of_a_kind'
}

// Base product interface
export interface BaseProduct {
  id: string;
  title: string;
  description: string;
  type: ProductType;
  images: ProductImage[];
  sku?: string;
  inStock: boolean;
  tags?: string[];
  materials?: string[];
  frameIncluded: boolean;
}

// Product image interface
export interface ProductImage {
  id: string;
  url: string;
  altText: string;
  width: number;
  height: number;
}

// Variant for mass-produced products
export interface ProductVariant {
  id: string;
  title: string;
  size: string;
  dimensions: {
    width: number;
    height: number;
    unit: 'in' | 'cm';
  };
  price: {
    amount: number;
    currency: string;
  };
  sku?: string;
  inStock: boolean;
  isDefault?: boolean;
}

// Mass-produced product (with variants)
export interface MassProducedProduct extends BaseProduct {
  type: ProductType.MASS_PRODUCED;
  variants: ProductVariant[];
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  availableSizes: string[];
  printOnDemand?: boolean;
  deliveryInfo?: DeliveryInfo;
}

// One-of-a-kind product (single item)
export interface OneOfAKindProduct extends BaseProduct {
  type: ProductType.ONE_OF_A_KIND;
  price: {
    amount: number;
    currency: string;
  };
  size: string;
  dimensions: {
    width: number;
    height: number;
    unit: 'in' | 'cm';
  };
  isUnique: true;
  artist?: string;
  creationDate?: string;
  authenticity?: AuthenticityInfo;
}

// Delivery information
export interface DeliveryInfo {
  estimatedDays: string;
  freeShippingThreshold?: number;
  shippingMethods: ShippingMethod[];
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

// Authenticity information for unique pieces
export interface AuthenticityInfo {
  certificate: boolean;
  signature: boolean;
  edition?: string;
  provenance?: string;
}

// Quality specifications
export interface QualitySpecs {
  paperWeight: string;
  paperType: string;
  finish: string;
  frameOptions?: FrameOption[];
}

export interface FrameOption {
  id: string;
  name: string;
  material: string;
  color: string;
  additionalPrice: number;
}

// Union type for all products
export type Product = MassProducedProduct | OneOfAKindProduct;

// Type guards
export function isMassProduced(product: Product): product is MassProducedProduct {
  return product.type === ProductType.MASS_PRODUCED;
}

export function isOneOfAKind(product: Product): product is OneOfAKindProduct {
  return product.type === ProductType.ONE_OF_A_KIND;
}