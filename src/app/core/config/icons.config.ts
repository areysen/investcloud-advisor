import { Provider } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  // Navigation & UI
  lucideChevronDown,
  lucideChevronUp,
  lucideChevronLeft,
  lucideChevronRight,
  lucideArrowLeft,
  lucideArrowRight,
  lucideArrowUp,
  lucideArrowDown,
  lucideArrowUpDown,
  lucideMenu,
  lucideX,
  
  // User & Account
  lucideUser,
  lucideUsers,
  lucideUserPlus,
  lucideUserMinus,
  lucideUserCheck,
  lucideLogOut,
  lucideLogIn,
  
  // Communication
  lucideMail,
  lucideMailOpen,
  lucideMessageSquare,
  lucideBell,
  lucideBellOff,
  
  // Actions
  lucideLayoutGrid,
  lucidePlus,
  lucideMinus,
  lucidePencil,
  lucideTrash,
  lucideDownload,
  lucideUpload,
  lucideSave,
  lucideRefreshCw,
  lucideSearch,
  lucideSettings,
  
  // Data & Charts
  lucideTrendingUp,
  lucideTrendingDown,
  lucideActivity,
  
  // Documents & Files
  lucideFile,
  lucideFileText,
  lucideFolder,
  lucideFolderOpen,
  lucideClipboard,
  lucideCopy,
  lucideLayers,
  
  // Status & Alerts
  lucideCheck,
  lucideX as lucideClose,
  lucideCircleAlert,
  lucideInfo,
  lucideCircleHelp,
  lucideEye,
  lucideEyeOff,
  
  // Finance & Business
  lucideDollarSign,
  lucideCreditCard,
  lucideWallet,
  lucideBriefcase,
  lucideBuilding,
  lucideHouse,
  
  // Time
  lucideCalendar,
  lucideClock,
  
  // Misc
  lucideGlobe,
  lucideMap,
  lucidePhone,
  lucideShare2,
  lucideExternalLink,
  lucideLink,
  lucidePaperclip,
  lucideStar,
  lucideHeart,
  lucideEllipsis,
  lucideEllipsisVertical,
  lucideGrid3x3,
  lucideList,
  lucideDatabase,
  lucideShield,
  lucideLock,
  lucideLockOpen
} from '@ng-icons/lucide';

export function provideAppIcons(): Provider {
  return provideIcons({
    // Navigation & UI
    lucideChevronDown,
    lucideChevronUp,
    lucideChevronLeft,
    lucideChevronRight,
    lucideArrowLeft,
    lucideArrowRight,
    lucideArrowUp,
    lucideArrowDown,
    lucideArrowUpDown,
    lucideMenu,
    lucideX,
    
    // User & Account
    lucideUser,
    lucideUsers,
    lucideUserPlus,
    lucideUserMinus,
    lucideUserCheck,
    lucideLogOut,
    lucideLogIn,
    
    // Communication
    lucideMail,
    lucideMailOpen,
    lucideMessageSquare,
    lucideBell,
    lucideBellOff,
    
    // Actions
    lucideLayoutGrid,
    lucidePlus,
    lucideMinus,
    lucidePencil,
    lucideTrash,
    lucideDownload,
    lucideUpload,
    lucideSave,
    lucideRefreshCw,
    lucideSearch,
    lucideSettings,
    
    // Data & Charts
    lucideTrendingUp,
    lucideTrendingDown,
    lucideActivity,
    
    // Documents & Files
    lucideFile,
    lucideFileText,
    lucideFolder,
    lucideFolderOpen,
    lucideClipboard,
    lucideCopy,
    lucideLayers,
    
    // Status & Alerts
    lucideCheck,
    lucideClose,
    lucideCircleAlert,
    lucideInfo,
    lucideCircleHelp,
    lucideEye,
    lucideEyeOff,
    
    // Finance & Business
    lucideDollarSign,
    lucideCreditCard,
    lucideWallet,
    lucideBriefcase,
    lucideBuilding,
    lucideHouse,
    
    // Time
    lucideCalendar,
    lucideClock,
    
    // Misc
    lucideGlobe,
    lucideMap,
    lucidePhone,
    lucideShare2,
    lucideExternalLink,
    lucideLink,
    lucidePaperclip,
    lucideStar,
    lucideHeart,
    lucideEllipsis,
    lucideEllipsisVertical,
    lucideGrid3x3,
    lucideList,
    lucideDatabase,
    lucideShield,
    lucideLock,
    lucideLockOpen
  });
}