import React from 'react';
// High quality free Hugeicons exports for DataTable and across the PMS application
import { HugeiconsIcon } from '@hugeicons/react';
import * as CoreIcons from '@hugeicons/core-free-icons';


export function GoogleIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );
}

export function MicrosoftIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 23 23">
      <path fill="#f35325" d="M1 1h10v10H1z" />
      <path fill="#81bc06" d="M12 1h10v10H12z" />
      <path fill="#05a6f0" d="M1 12h10v10H1z" />
      <path fill="#ffba08" d="M12 12h10v10H12z" />
    </svg>
  );
}

/**
 * Helper to wrap a Hugeicon definition into a standard React component
 * supporting `className`, `size`, `strokeWidth`, etc.
 */
export const createHugeIcon = (iconData, defaultCls = 'w-4 h-4') => {
  return function HugeIconComponent({ className = defaultCls, size, strokeWidth = 1.6, ...props }) {
    if (!iconData) return null;
    return (
      <HugeiconsIcon
        icon={iconData}
        className={className}
        size={size}
        strokeWidth={strokeWidth}
        {...props}
      />
    );
  };
};

export { HugeiconsIcon, CoreIcons };

// ── Common Core Icons used by DataTable, StatCard, and throughout the app ────────
export const HashIcon = createHugeIcon(CoreIcons.HashIcon);
export const DocIcon = createHugeIcon(CoreIcons.Doc01Icon);
export const UserCircleIcon = createHugeIcon(CoreIcons.UserCircleIcon);
export const UsersIcon = createHugeIcon(CoreIcons.UserAiIcon);
export const PhoneIcon = createHugeIcon(CoreIcons.Call02Icon);
export const MailIcon = createHugeIcon(CoreIcons.Mail01Icon);
export const ChatIcon = createHugeIcon(CoreIcons.BubbleChatIcon);
export const CalendarIcon = createHugeIcon(CoreIcons.Calendar01Icon);
export const ClockIcon = createHugeIcon(CoreIcons.Clock01Icon);
export const CashIcon = createHugeIcon(CoreIcons.Money01Icon);
export const PercentIcon = createHugeIcon(CoreIcons.PercentCircleIcon);
export const TagIcon = createHugeIcon(CoreIcons.Tag01Icon);
export const StarIcon = createHugeIcon(CoreIcons.StarIcon);
export const StatusIcon = createHugeIcon(CoreIcons.CheckmarkCircle01Icon);
export const BoltIcon = createHugeIcon(CoreIcons.FlashIcon);
export const SortingUpIcon = createHugeIcon(CoreIcons.SortingUpIcon);
export const MapPinIcon = createHugeIcon(CoreIcons.Location01Icon);
export const BuildingIcon = createHugeIcon(CoreIcons.City01Icon);
export const ShieldIcon = createHugeIcon(CoreIcons.ContentWritingIcon);
export const VenusIcon = createHugeIcon(CoreIcons.VenusIcon);
export const SwatchIcon = createHugeIcon(CoreIcons.ColorsIcon);
export const DocumentIcon = createHugeIcon(CoreIcons.LegalDocument01Icon);
export const FolderIcon = createHugeIcon(CoreIcons.Folder01Icon);
export const GlobeIcon = createHugeIcon(CoreIcons.Globe02Icon);
export const DotsIcon = createHugeIcon(CoreIcons.MoreVerticalIcon);
export const ArrowUpIcon = createHugeIcon(CoreIcons.ArrowUp02Icon);
export const ArrowDownIcon = createHugeIcon(CoreIcons.ArrowDown02Icon);
export const AlertIcon = createHugeIcon(CoreIcons.AlertCircleIcon);
export const CheckCircleIcon = createHugeIcon(CoreIcons.CheckmarkCircle01Icon);
export const PlusIcon = createHugeIcon(CoreIcons.PlusSignIcon);
export const XIcon = createHugeIcon(CoreIcons.Cancel01Icon);
export const PencilIcon = createHugeIcon(CoreIcons.PencilEdit01Icon);
export const TrashIcon = createHugeIcon(CoreIcons.Delete02Icon);
export const EyeIcon = createHugeIcon(CoreIcons.ViewIcon);
export const EyeOffIcon = createHugeIcon(CoreIcons.ViewOffSlashIcon || CoreIcons.EyeOffIcon);
export const ChevronRightIcon = createHugeIcon(CoreIcons.ArrowRight01Icon);
export const ChevronDownIcon = createHugeIcon(CoreIcons.ArrowDown01Icon);
export const BellIcon = createHugeIcon(CoreIcons.Notification01Icon);
export const LogOutIcon = createHugeIcon(CoreIcons.Logout01Icon);
export const SearchIcon = createHugeIcon(CoreIcons.Search01Icon);
export const DownloadIcon = createHugeIcon(CoreIcons.Download01Icon);
export const RefreshIcon = createHugeIcon(CoreIcons.ReloadIcon);
export const ReloadIcon = RefreshIcon;
export const KeyIcon = createHugeIcon(CoreIcons.Key01Icon);
export const MenuIcon = createHugeIcon(CoreIcons.Menu01Icon);
export const HomeIcon = createHugeIcon(CoreIcons.Home01Icon);
export const UploadIcon = createHugeIcon(CoreIcons.Upload01Icon);
export const CheckIcon = createHugeIcon(CoreIcons.Tick01Icon);
export const ChecklistIcon = createHugeIcon(CoreIcons.CheckListIcon);
export const CameraIcon = createHugeIcon(CoreIcons.Camera01Icon);

// ── Additional utility icons ──────────────────────────────────────────────────
export const FilterIcon = createHugeIcon(CoreIcons.FilterIcon);
export const GridIcon = createHugeIcon(CoreIcons.LayoutGridIcon || CoreIcons.GridIcon);
export const ListIcon = createHugeIcon(CoreIcons.LeftToRightListBulletIcon);
export const WrenchIcon = createHugeIcon(CoreIcons.Wrench01Icon);
export const ToolsIcon = createHugeIcon(CoreIcons.ToolsIcon || CoreIcons.Wrench01Icon);
export const ChartIcon = createHugeIcon(CoreIcons.Analytics01Icon);
export const LockIcon = createHugeIcon(CoreIcons.LockIcon);
export const SettingsIcon = createHugeIcon(CoreIcons.Settings01Icon);
export const ArrowLeftIcon = createHugeIcon(CoreIcons.ArrowLeft01Icon);
export const ArrowRightIcon = createHugeIcon(CoreIcons.ArrowRight01Icon);
export const CreditCardIcon = createHugeIcon(CoreIcons.CreditCardIcon);
export const InvoiceIcon = createHugeIcon(CoreIcons.Invoice01Icon);
export const CoinsIcon = createHugeIcon(CoreIcons.Coins01Icon);
export const HelpIcon = createHugeIcon(CoreIcons.HelpCircleIcon);
export const PinIcon = createHugeIcon(CoreIcons.Location01Icon);
export const ToggleIcon = createHugeIcon(CoreIcons.ToggleOnIcon);
export const ShoppingBagIcon = createHugeIcon(CoreIcons.ShoppingBag01Icon);
export const AgreementIcon = createHugeIcon(CoreIcons.Agreement01Icon);
export const LoadingIcon = createHugeIcon(CoreIcons.Loading03Icon || CoreIcons.Loading01Icon);
export const ExternalLinkIcon = createHugeIcon(CoreIcons.LinkSquare01Icon || CoreIcons.ExternalLinkIcon);
export const PlayIcon = createHugeIcon(CoreIcons.PlayIcon);
export const SendIcon = createHugeIcon(CoreIcons.SendIcon);

export function PanelRightCloseIcon({ className = "w-4 h-4" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M15 3v18" />
      <path d="m8 9 3 3-3 3" />
    </svg>
  );
}

export function PanelLeftCloseIcon({ className = "w-4 h-4" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
      <path d="m16 15-3-3 3-3" />
    </svg>
  );
}

export function PanelLeftOpenIcon({ className = "w-4 h-4" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
      <path d="m14 9 3 3-3 3" />
    </svg>
  );
}
export const PrinterIcon = createHugeIcon(CoreIcons.PrinterIcon);
export const ReceiptIcon = createHugeIcon(CoreIcons.ReceiptIcon || CoreIcons.ReceiptTextIcon);
export const MegaphoneIcon = createHugeIcon(CoreIcons.Megaphone01Icon || CoreIcons.MegaphoneIcon);
export const SparklesIcon = createHugeIcon(CoreIcons.SparklesIcon || CoreIcons.StarIcon);
export const XCircleIcon = createHugeIcon(CoreIcons.CancelCircleIcon || CoreIcons.AlertCircleIcon);
export const FileTextIcon = createHugeIcon(CoreIcons.LegalDocument01Icon || CoreIcons.Doc01Icon);
export const CopyIcon = createHugeIcon(CoreIcons.Copy01Icon || CoreIcons.CopyIcon);
export const UserPlusIcon = createHugeIcon(CoreIcons.UserAdd01Icon || CoreIcons.UserCircleIcon);
export const WaitersIcon = createHugeIcon(CoreIcons.WaitersIcon);
export const EditIcon = PencilIcon;
export const CurrencyIcon = CashIcon;
export const GoogleSheetIcon = createHugeIcon(CoreIcons.GoogleSheetIcon);
export const ComplaintIcon = createHugeIcon(CoreIcons.ComplaintIcon || CoreIcons.AlertCircleIcon);
export const WaterDropIcon = createHugeIcon(CoreIcons.DropletIcon || CoreIcons.WaterEnergyIcon);
export const LinkIcon = createHugeIcon(CoreIcons.Link01Icon);
export const ScissorIcon = createHugeIcon(CoreIcons.ScissorIcon);
export const HourglassIcon = createHugeIcon(CoreIcons.HourglassIcon);
export const BalanceScaleIcon = createHugeIcon(CoreIcons.BalanceScaleIcon);
export const BulbIcon = createHugeIcon(CoreIcons.BulbIcon);
export const BanIcon = createHugeIcon(CoreIcons.BanIcon);
export const StopIcon = createHugeIcon(CoreIcons.StopIcon);
export const ClipboardIcon = createHugeIcon(CoreIcons.ClipboardIcon);
export const ArrowUpRightIcon = createHugeIcon(CoreIcons.ArrowUpRight01Icon);

export const UTILITY_ICONS = {
  water: WaterDropIcon,
  electricity: BoltIcon,
  internet: GlobeIcon,
  garbage: TrashIcon,
  other: WrenchIcon,
};

