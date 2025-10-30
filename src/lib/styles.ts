/**
 * 🚨 DEPRECATED: This file is no longer used 🚨
 * 
 * ✅ ALL STYLING NOW USES CSS VARIABLES DIRECTLY
 * 
 * The entire app now uses CSS variables defined in src/app/globals.css.
 * All components have been updated to use inline styles with CSS variables like:
 * 
 * style={{ backgroundColor: 'hsl(var(--brand-primary))' }}
 * 
 * This provides better theme switching and eliminates the need for this
 * intermediate styling layer.
 * 
 * To change colors: Edit src/app/globals.css CSS variables only!
 */

// =============================================================================
// SEMANTIC COLOR CLASSES - Use these instead of hardcoded colors
// =============================================================================

/**
 * Primary Button Styles (Main CTAs like "Book Now", "Continue")
 * Theme-aware: Gold in light mode, adjusted gold in dark mode
 */
export const primaryButton = 'bg-brand-button-primary hover:bg-brand-button-primary-hover text-brand-button-primary-foreground font-semibold shadow-lg transition-colors duration-200';

/**
 * Secondary Button Styles (Less prominent actions)
 * Theme-aware: Black with gold text in light mode, dark with gold text in dark mode
 */
export const secondaryButton = 'bg-brand-button-secondary hover:bg-brand-button-secondary-hover text-brand-button-secondary-foreground border border-brand-border font-medium transition-colors duration-200';

/**
 * Outline Button Styles (Minimal actions)
 * Theme-aware: Gold border with transparent background
 */
export const outlineButton = 'border border-brand-border text-brand-primary hover:bg-brand-primary hover:text-brand-primary-foreground font-medium transition-colors duration-200';

/**
 * Navbar Styles
 * Theme-aware: Pure black with gold accents in light mode, very dark in dark mode
 */
export const navbar = 'bg-brand-navbar border-b border-brand-navbar-border shadow-lg';
export const navbarText = 'text-brand-navbar-foreground font-bold text-lg tracking-wide';

/**
 * Background Gradients
 * Theme-aware: Dark to gold gradients that adapt to theme
 */
export const gradientBackground = 'bg-gradient-to-br from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to';

/**
 * Card Styles
 * Theme-aware: Clean cards with subtle brand borders
 */
export const luxuryCard = 'bg-background border border-brand-border shadow-xl backdrop-blur-sm';
export const premiumContainer = 'bg-brand-surface border border-brand-border shadow-xl backdrop-blur-md';

/**
 * Form Element Styles
 * Theme-aware: Inputs, checkboxes, etc.
 */
export const checkbox = 'data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-border data-[state=checked]:text-brand-primary-foreground';
export const input = 'bg-brand-input border-brand-border text-foreground focus:ring-brand-ring';

/**
 * Text Styles
 * Theme-aware: Various text colors for different contexts
 */
export const headingText = 'text-foreground font-bold';
export const bodyText = 'text-muted-foreground';
export const accentText = 'text-brand-primary font-medium';
export const linkText = 'text-brand-primary hover:text-brand-primary font-medium hover:underline transition-colors duration-200';

/**
 * Loading States
 * Theme-aware: Spinners and loading text
 */
export const loadingSpinner = 'animate-spin rounded-full border-b-2 border-brand-primary';
export const loadingText = 'text-brand-primary font-medium';
export const loadingContainer = `${gradientBackground} min-h-screen flex items-center justify-center`;

/**
 * Interactive States
 * Theme-aware: Selected, active, focus states
 */
export const selectedState = 'bg-brand-primary text-brand-primary-foreground border-brand-border ring-2 ring-brand-ring';
export const unselectedState = 'border-brand-border text-brand-primary hover:bg-brand-primary hover:text-brand-primary-foreground';

// =============================================================================
// COMPONENT-SPECIFIC STYLES
// =============================================================================

/**
 * Time Slot Picker Styles
 */
export const timeSlotSelected = `${selectedState} font-semibold transition-all duration-200`;
export const timeSlotUnselected = `${unselectedState} font-medium transition-all duration-200`;

/**
 * Date Picker Styles
 */
export const dateSelected = `${selectedState} font-semibold`;
export const dateUnselected = `${unselectedState} font-medium`;

/**
 * Service Card Styles
 */
export const serviceCardSelected = `${luxuryCard} ${selectedState}`;
export const serviceCardUnselected = `${luxuryCard} hover:border-brand-primary transition-all duration-200`;

/**
 * Page Layout Styles
 */
export const pageBackground = `${gradientBackground} min-h-screen flex items-center justify-center p-4`;
export const centeredLayout = 'max-w-md w-full mx-auto';
export const mobileContainer = 'max-w-xs mx-auto';

/**
 * Fixed Bottom CTA Styles
 */
export const fixedBottomCTA = 'fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-brand-border shadow-lg';

// =============================================================================
// LEGACY COMPONENT STYLES (for gradual migration)
// =============================================================================

/**
 * Legacy styles for existing components that haven't been updated yet
 * These provide fallbacks using both CSS variables and hardcoded colors
 */
export const legacyStyles = {
  // CTA buttons with fallbacks
  ctaButton: 'w-full h-12 bg-brand-500 bg-amber-500 hover:bg-brand-600 hover:bg-amber-600 text-brand-black text-black font-semibold',
  
  // Service selection buttons with fallbacks
  serviceButton: 'w-full bg-brand-black bg-black hover:bg-brand-charcoal hover:bg-gray-900 text-brand-500 text-amber-500 border border-brand-500 border-amber-500 font-medium',
  
  // Page backgrounds with fallbacks
  pageBackground: 'min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-charcoal from-gray-900 via-brand-900 via-gray-800 to-brand-700 to-amber-800',
  
  // Cards with fallbacks
  luxuryCard: 'bg-white border border-brand-500 border-amber-500 shadow-lg shadow-brand-900/20 shadow-amber-900/20',
} as const;