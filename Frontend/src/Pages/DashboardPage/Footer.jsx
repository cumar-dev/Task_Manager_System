import { Link } from "react-router-dom";
import { CheckSquare } from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#e5e5e5]">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
                <CheckSquare size={15} />
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">
                TaskFlow
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              TaskFlow keeps your team focused on what matters. Assign, track,
              and complete tasks without the noise.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 mt-5">
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f0f0f0] text-muted-foreground hover:bg-foreground hover:text-background transition-all"
              >
                <FaGithub size={15} />
              </a>

              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f0f0f0] text-muted-foreground hover:bg-foreground hover:text-background transition-all"
              >
                <FaTwitter size={15} />
              </a>

              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f0f0f0] text-muted-foreground hover:bg-foreground hover:text-background transition-all"
              >
                <FaLinkedin size={15} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/home" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "Features", href: "/home#features" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Privacy Policy", href: "" },
                { label: "Terms of Service", href: "" },
                { label: "Contact", href: "" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#e5e5e5] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; 2025 TaskFlow. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with <span className="text-red-500">&#9829;</span> for
            productive teams
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
