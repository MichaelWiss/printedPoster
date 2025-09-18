/**
 * Huncwot-Inspired Component Utilities
 * 
 * Utility functions for applying consistent Huncwot styling
 * to components throughout the application.
 */

import { componentStyles, layoutUtils as componentLayoutUtils } from './components';
import { typographyUtils } from './typography';
import { spacingUtils } from './spacing';

/**
 * Button utility functions
 */
export const buttonUtils = {
  /**
   * Get button classes based on variant and size
   */
  getButtonClasses: (variant: 'primary' | 'accent' | 'secondary' | 'ghost' = 'primary', size: 'sm' | 'md' | 'lg' | 'xl' = 'md') => {
    const baseClasses = componentStyles.button.base;
    const variantClasses = componentStyles.button.variants[variant];
    const sizeClasses = componentStyles.button.sizes[size];
    
    return `${baseClasses} ${variantClasses} ${sizeClasses}`;
  },
  
  /**
   * Get Huncwot button classes (using Tailwind utilities)
   */
  getHuncwotButtonClasses: (variant: 'primary' | 'accent' | 'secondary' | 'ghost' = 'primary') => {
    const variants = {
      primary: 'btn-huncwot-primary',
      accent: 'btn-huncwot-accent',
      secondary: 'btn-huncwot-secondary',
      ghost: 'btn-huncwot-ghost',
    };
    
    return variants[variant];
  },
};

/**
 * Card utility functions
 */
export const cardUtils = {
  /**
   * Get card classes with optional header and footer
   */
  getCardClasses: (hasHeader = false, hasFooter = false) => {
    let classes = componentStyles.card.base;
    
    if (hasHeader) {
      classes += ` ${componentStyles.card.header}`;
    }
    
    if (hasFooter) {
      classes += ` ${componentStyles.card.footer}`;
    }
    
    return classes;
  },
  
  /**
   * Get Huncwot card classes (using Tailwind utilities)
   */
  getHuncwotCardClasses: () => 'card-huncwot',
  getHuncwotCardHeaderClasses: () => 'card-huncwot-header',
  getHuncwotCardBodyClasses: () => 'card-huncwot-body',
  getHuncwotCardFooterClasses: () => 'card-huncwot-footer',
};

/**
 * Input utility functions
 */
export const inputUtils = {
  /**
   * Get input classes with optional error state
   */
  getInputClasses: (hasError = false) => {
    const baseClasses = componentStyles.input.base;
    const errorClasses = hasError ? componentStyles.input.error : '';
    
    return `${baseClasses} ${errorClasses}`;
  },
  
  /**
   * Get Huncwot input classes (using Tailwind utilities)
   */
  getHuncwotInputClasses: () => 'input-huncwot',
};

/**
 * Layout utility functions
 */
export const layoutUtils = {
  /**
   * Get container classes with responsive sizing
   */
  getContainerClasses: (size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'xl') => {
    const baseClasses = componentStyles.container.base;
    const sizeClasses = componentStyles.container.sizes[size];
    
    return `${baseClasses} ${sizeClasses}`;
  },
  
  /**
   * Get grid classes with responsive columns
   */
  getGridClasses: (cols: 1 | 2 | 3 | 4 = 4, responsive = true) => {
    let classes = componentStyles.grid.base;
    classes += ` ${componentStyles.grid.cols[cols]}`;
    
    if (responsive) {
      if (cols >= 2) classes += ` ${componentStyles.grid.responsive['md-2']}`;
      if (cols >= 3) classes += ` ${componentStyles.grid.responsive['md-3']}`;
      if (cols >= 4) classes += ` ${componentStyles.grid.responsive['lg-4']}`;
    }
    
    return classes;
  },
  
  /**
   * Get flex classes with alignment
   */
  getFlexClasses: (direction: 'row' | 'col' = 'row', align: 'center' | 'between' | 'start' | 'end' = 'center') => {
    const directionClasses = direction === 'col' ? componentStyles.flex.col : componentStyles.flex.row;
    const alignClasses = componentStyles.flex[align];
    
    return `${componentStyles.flex.base} ${directionClasses} ${alignClasses}`;
  },
  
  /**
   * Get Huncwot layout utilities
   */
  getHuncwotLayoutClasses: () => componentLayoutUtils,
};

/**
 * Typography utility functions
 */
export const textUtils = {
  /**
   * Get typography classes based on type and size
   */
  getTextClasses: (type: 'display' | 'heading' | 'body' | 'special', size?: string) => {
    switch (type) {
      case 'display':
        return typographyUtils.display[size as keyof typeof typographyUtils.display] || typographyUtils.display['4xl'];
      case 'heading':
        return typographyUtils.heading[size as keyof typeof typographyUtils.heading] || typographyUtils.heading.h1;
      case 'body':
        return typographyUtils.body[size as keyof typeof typographyUtils.body] || typographyUtils.body.base;
      case 'special':
        return typographyUtils.special[size as keyof typeof typographyUtils.special] || typographyUtils.special.label;
      default:
        return typographyUtils.body.base;
    }
  },
};

/**
 * Spacing utility functions
 */
export const spaceUtils = {
  /**
   * Get spacing classes for padding, margin, and gap
   */
  getSpacingClasses: (type: 'padding' | 'margin' | 'gap', size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md') => {
    return spacingUtils[type][size];
  },
  
  /**
   * Get responsive spacing classes
   */
  getResponsiveSpacingClasses: (type: 'padding' | 'margin' | 'gap', sizes: { base: string; md?: string; lg?: string }) => {
    let classes = spacingUtils[type][sizes.base as keyof typeof spacingUtils.padding];
    
    if (sizes.md) {
      classes += ` md:${spacingUtils[type][sizes.md as keyof typeof spacingUtils.padding]}`;
    }
    
    if (sizes.lg) {
      classes += ` lg:${spacingUtils[type][sizes.lg as keyof typeof spacingUtils.padding]}`;
    }
    
    return classes;
  },
};
