import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

const logoUrl = "https://igiehonfoundation.org/assets/images/IFnewicon.jpg";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logoUrl}
                alt="Igiehon Foundation"
                className="h-12 w-12 rounded-lg"
              />
              <div>
                <h3 className="font-bold text-lg">Igiehon Foundation</h3>
                <p className="text-sm text-muted-foreground">For Academic Excellence</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Advancing academic excellence and empowering youth through mathematics competitions, 
              mentorship programs, and community initiatives across Edo State and beyond.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium">Lagos Office</p>
                  <p className="text-muted-foreground">
                    F19, Lekki Town Square Mall<br />
                    Providence Road, Marwa, Lekki Phase 1<br />
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a 
                  href="mailto:info@igiehonfoundation.org" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  info@igiehonfoundation.org
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-muted-foreground hover:text-primary transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/#impact" className="text-muted-foreground hover:text-primary transition-colors">
                  Impact
                </Link>
              </li>
              <li>
                <Link to="/#partners" className="text-muted-foreground hover:text-primary transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-muted-foreground hover:text-primary transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-muted-foreground hover:text-primary transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
            
            {/* Social Links */}
            <div className="pt-4">
              <h5 className="font-medium text-sm mb-3">Follow Us</h5>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61568978783595"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Facebook
                </a>
                <a
                  href="https://x.com/IgiehonFoundat"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Twitter
                </a>
                <a
                  href="https://www.instagram.com/igiehonfoundation/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t bg-muted/50">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Igiehon Foundation for Academic Excellence. All rights reserved.
            </p>
            <p>
              ...in pursuit of excellence & heritage.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
