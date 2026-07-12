import {
  ArrowLeft, ArrowRight, ArrowUpRight, Award, BarChart3, Briefcase,
  Code, Code2, Download, ExternalLink, Eye, FolderOpen, GraduationCap,
  Image as ImageIcon, LayoutGrid, Lock, LogOut, Mail, MapPin, Menu,
  Phone, Plus, Quote, Send, Server, Star, Trash2, User, X, LoaderCircle,
  type LucideIcon,
} from "lucide-react";

/**
 * Material Symbols (font) isimlerini lucide-react inline SVG'lere eşler.
 * Amaç: harici ikon web fontunu (render-blok ~200KB) tamamen kaldırmak.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  add: Plus,
  plus: Plus,
  analytics: BarChart3,
  arrow_back: ArrowLeft,
  arrow_forward: ArrowRight,
  arrow_outward: ArrowUpRight,
  category: LayoutGrid,
  close: X,
  code: Code,
  delete: Trash2,
  developer_mode: Code2,
  download: Download,
  folder_open: FolderOpen,
  format_quote: Quote,
  image: ImageIcon,
  location_on: MapPin,
  lock: Lock,
  logout: LogOut,
  mail: Mail,
  menu: Menu,
  open_in_new: ExternalLink,
  person: User,
  phone: Phone,
  progress_activity: LoaderCircle,
  school: GraduationCap,
  send: Send,
  star: Star,
  visibility: Eye,
  work: Briefcase,
  workspace_premium: Award,
  dns: Server,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
  ...rest
}: {
  name?: string | null;
  className?: string;
  strokeWidth?: number;
} & Omit<React.SVGProps<SVGSVGElement>, "name">) {
  const Cmp = (name && ICON_MAP[name]) || Star;
  return (
    <Cmp
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden={rest["aria-hidden"] ?? true}
      {...rest}
    />
  );
}

export default Icon;
