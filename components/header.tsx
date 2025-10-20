import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">
              노마드 코리아
            </div>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">
                로그인
              </Button>
            </Link>
            <Link href="/login">
              <Button>
                회원가입
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
