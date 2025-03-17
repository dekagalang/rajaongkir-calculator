
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="pt-32 pb-16 px-6">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-6">
                    INDONESIA'S SHIPPING CALCULATOR
                  </span>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                    Calculate shipping costs with precision
                  </h1>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Get accurate shipping rates from JNE, TIKI, and POS Indonesia for deliveries across Indonesia. Fast, reliable, and easy to use.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild size="lg" className="rounded-xl h-12 px-8">
                      <Link to="/calculator">Try Calculator</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-xl h-12 px-8">
                      <Link to="/sign-up">Sign Up</Link>
                    </Button>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="relative"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      alt="Shipping and logistics"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="absolute -bottom-6 -left-6"
                  >
                    <GlassCard className="p-4 shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-primary text-primary-foreground">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="16" height="13" x="4" y="5" rx="2" />
                            <path d="M16 2v3" />
                            <path d="M8 2v3" />
                            <path d="M4 10h16" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Fast Calculation</p>
                          <p className="text-xs text-gray-500">Real-time shipping rates</p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="absolute -top-6 -right-6"
                  >
                    <GlassCard className="p-4 shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-primary text-primary-foreground">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Save Time</p>
                          <p className="text-xs text-gray-500">Compare multiple couriers</p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Features */}
          <section className="py-16 px-6 bg-gray-50">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800 mb-4">
                    FEATURES
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Everything you need for shipping
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Our shipping calculator provides all the tools you need to estimate and plan your shipping across Indonesia.
                  </p>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <GlassCard className="h-full" hoverEffect>
                      <div className="p-3 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-20 px-6">
            <div className="container mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard className="p-12 bg-primary/5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                      <h2 className="text-3xl font-bold mb-6">Ready to calculate your shipping costs?</h2>
                      <p className="text-lg text-gray-600 mb-8">
                        Create an account to save your calculations and get access to more features. It's free!
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <Button asChild size="lg" className="rounded-xl h-12 px-8">
                          <Link to="/sign-up">Get Started</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-xl h-12 px-8">
                          <Link to="/calculator">Try Calculator</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="aspect-[5/4] rounded-xl overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80" 
                          alt="Delivery person with package" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

// Features data
const features = [
  {
    title: "Multiple Couriers",
    description: "Compare shipping rates from JNE, TIKI, and POS Indonesia to find the best option for you.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="16" x="4" y="4" rx="2" />
        <path d="M4 12h16" />
        <path d="M12 4v16" />
      </svg>
    ),
  },
  {
    title: "Accurate Rates",
    description: "Our calculator provides up-to-date shipping rates for accurate cost estimations.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    ),
  },
  {
    title: "Save Calculations",
    description: "Create an account to save your shipping calculations and access them anytime.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </svg>
    ),
  },
];

export default Index;
