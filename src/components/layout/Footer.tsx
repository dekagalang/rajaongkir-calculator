
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 mt-20 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">ShipCost</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Calculate shipping costs across Indonesia with precision and ease.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4 text-gray-900">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-500 hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-sm text-gray-500 hover:text-black transition-colors">
                  Calculator
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-gray-500 hover:text-black transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4 text-gray-900">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-sm text-gray-500 hover:text-black transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-500 hover:text-black transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4 text-gray-900">Contact</h4>
            <ul className="space-y-3">
              <li className="text-sm text-gray-500">
                support@shipcost.com
              </li>
              <li className="text-sm text-gray-500">
                +62 123 4567 890
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} ShipCost. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
