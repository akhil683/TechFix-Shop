import { LucideIcon } from "lucide-react";
import { Button } from "./ui/Button";
import Link from "next/link";

type Props = {
  icon: LucideIcon;
  label: string;
  href?: string;
};

export default function NavButton({ icon: Icon, label, href }: Props) {
  return (
    <Button
      variant={"ghost"}
      aria-label={label}
      title={label}
      className="rounded-full"
      asChild
    >
      {href ? (
        <Link href={href}>
          <Icon />
        </Link>
      ) : (
        <Icon />
      )}
    </Button>
  );
}
