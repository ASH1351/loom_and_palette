import { ClothingSize } from '../types';

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export interface SizeMeasurement {
  size: ClothingSize;
  bustInches: string;
  waistInches: string;
  hipInches: string;
  bustCm: string;
  waistCm: string;
  hipCm: string;
  description: string;
}

export const SIZE_CHART: SizeMeasurement[] = [
  {
    size: 'XS',
    bustInches: '32 - 33"',
    waistInches: '25 - 26"',
    hipInches: '35 - 36"',
    bustCm: '81 - 84 cm',
    waistCm: '63 - 66 cm',
    hipCm: '89 - 91 cm',
    description: 'Petite tailored fit, contoured shoulders with delicate drape',
  },
  {
    size: 'S',
    bustInches: '34 - 35"',
    waistInches: '27 - 28"',
    hipInches: '37 - 38"',
    bustCm: '86 - 89 cm',
    waistCm: '68 - 71 cm',
    hipCm: '94 - 96 cm',
    description: 'Classic slender frame with comfortable ease of movement',
  },
  {
    size: 'M',
    bustInches: '36 - 37"',
    waistInches: '29 - 30"',
    hipInches: '39 - 40"',
    bustCm: '91 - 94 cm',
    waistCm: '73 - 76 cm',
    hipCm: '99 - 102 cm',
    description: 'Balanced proportion, gentle waist definition',
  },
  {
    size: 'L',
    bustInches: '38 - 40"',
    waistInches: '31 - 33"',
    hipInches: '41 - 43"',
    bustCm: '96 - 101 cm',
    waistCm: '78 - 84 cm',
    hipCm: '104 - 109 cm',
    description: 'Graceful drape, tailored armholes and breathable chest fit',
  },
  {
    size: 'XL',
    bustInches: '41 - 43"',
    waistInches: '34 - 36"',
    hipInches: '44 - 46"',
    bustCm: '104 - 109 cm',
    waistCm: '86 - 91 cm',
    hipCm: '112 - 117 cm',
    description: 'Sculpted ease, flattering neckline depth and curve alignment',
  },
  {
    size: '2XL',
    bustInches: '44 - 46"',
    waistInches: '37 - 39"',
    hipInches: '47 - 49"',
    bustCm: '112 - 117 cm',
    waistCm: '94 - 99 cm',
    hipCm: '119 - 124 cm',
    description: 'Proportionally graded bust and hip for confident fluid wear',
  },
  {
    size: '3XL',
    bustInches: '47 - 49"',
    waistInches: '40 - 43"',
    hipInches: '50 - 53"',
    bustCm: '119 - 124 cm',
    waistCm: '102 - 109 cm',
    hipCm: '127 - 135 cm',
    description: 'Generous artisanal flare, reinforced seamwork and relaxed waist',
  },
  {
    size: '4XL',
    bustInches: '50 - 53"',
    waistInches: '44 - 47"',
    hipInches: '54 - 57"',
    bustCm: '127 - 135 cm',
    waistCm: '112 - 119 cm',
    hipCm: '137 - 145 cm',
    description: 'Magnificent sweeping volume, majestic royal silhouette and ease',
  },
];

export const calculateSuggestedSize = (
  bust: number,
  isCm: boolean = false
): { size: ClothingSize; confidence: number; note: string } => {
  const bustInches = isCm ? bust / 2.54 : bust;

  if (bustInches <= 33.5) {
    return { size: 'XS', confidence: 96, note: 'Recommended for snug, elegant couture drape.' };
  } else if (bustInches <= 35.5) {
    return { size: 'S', confidence: 95, note: 'Tailored fit with comfortable breathing room.' };
  } else if (bustInches <= 37.5) {
    return { size: 'M', confidence: 94, note: 'Ideal proportional match for your measurements.' };
  } else if (bustInches <= 40.5) {
    return { size: 'L', confidence: 97, note: 'Relaxed elegance with pristine shoulder alignment.' };
  } else if (bustInches <= 43.5) {
    return { size: 'XL', confidence: 95, note: 'Fluid silhouette tailored to flatter natural curves.' };
  } else if (bustInches <= 46.5) {
    return { size: '2XL', confidence: 96, note: 'Proportionally contoured comfort fit.' };
  } else if (bustInches <= 49.5) {
    return { size: '3XL', confidence: 98, note: 'Regal silhouette with ample movement room.' };
  } else {
    return { size: '4XL', confidence: 96, note: 'Sweeping majestic drape designed for total confidence.' };
  }
};

export const checkPincodeDelivery = (pincode: string) => {
  const clean = pincode.trim();
  if (clean.length !== 6 || !/^\d{6}$/.test(clean)) {
    return { valid: false, message: 'Please enter a valid 6-digit Indian PIN code.' };
  }
  const metroPrefixes = ['11', '40', '56', '60', '70', '50', '38', '30', '20'];
  const isMetro = metroPrefixes.some(p => clean.startsWith(p));
  return {
    valid: true,
    message: isMetro 
      ? `Express Delivery available to PIN ${clean} (2-3 business days)`
      : `Standard Express delivery available to PIN ${clean} (4-5 business days)`,
    isExpress: isMetro,
    deliveryDate: new Date(Date.now() + (isMetro ? 3 : 5) * 86400000).toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  };
};
