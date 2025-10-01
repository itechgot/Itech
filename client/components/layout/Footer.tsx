import { Link } from "react-router-dom";

const logoUrl =
  "https://cdn.builder.io/api/v1/image/assets%2F14de5a695c9545c2aa5180d70bd1c72c%2F5827d0d341a54df4b1ad54daeb958e0e?format=webp&width=800";

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container py-10 grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        {/* Company */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt="Igiehon Foundation"
              className="h-12 w-auto"
            />
            <span className="font-extrabold text-lg">Igiehon Foundation</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Advancing academic excellence and empowering youth through
            competitions, mentorship and community programs.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="text-sm space-y-2">
            <li>
              <Link to="/about" className="hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link to="/programs" className="hover:text-primary">
                Programs
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-primary">
                Events
              </Link>
            </li>
            <li>
              <Link to="/#impact" className="hover:text-primary">
                Impact
              </Link>
            </li>
            <li>
              <Link to="/#partners" className="hover:text-primary">
                Partners
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-primary">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="text-sm space-y-2">
            <li>
              <Link to="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow */}
        <div>
          <h4 className="font-semibold mb-3">Follow</h4>
          <ul className="text-sm space-y-2">
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61568978783595"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://x.com/IgiehonFoundat"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary"
              >
                X (Twitter)
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/igiehonfoundation/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@igiehonmathtourney?lang=en"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary"
              >
                TikTok
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>
              Lagos Office: F19, Lekki Town Square Mall, Providence Road, Marwa, Lekki, Phase 1, Lagos
            </li>
            <li>Email: info@igiehonfoundation.org</li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container py-6 text-xs text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} Igiehon Foundation. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
