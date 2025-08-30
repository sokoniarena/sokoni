import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import * as Icons from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "@/data/mockData";

const CategoriesSection = () => {
  const getIcon = (iconName?: string) => {
    if (!iconName) return Package;
    const IconComponent = Icons[iconName as keyof typeof Icons];
    return IconComponent || Package;
  };

  if (!Array.isArray(categories) || categories.length === 0) {
    return (
      <section className="py-20 text-center text-gray-500">
        No categories available yet. Please check back soon!
      </section>
    );
  }

  return (
    <section
      id="categories"
      className="py-20 bg-gradient-to-br from-secondary/20 to-background"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Explore All Categories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From electronics to services, discover everything you need in our
            beautifully organized categories
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = getIcon(category.icon);
            const subcategories = category.subcategories || [];
            const productCount = category.productCount || 0;

            return (
              <motion.div
                key={category.id || index}
                initial={{ y: 100, opacity: 0, scale: 0.8 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className="category-card group"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-hero rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Category Info */}
                <div className="text-center">
                  <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.name || "Unnamed"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {productCount.toLocaleString()} items
                  </p>

                  {/* Subcategories Preview */}
                  <div className="text-xs text-muted-foreground mb-4 space-y-1">
                    {subcategories.slice(0, 3).map((sub, idx) => (
                      <div key={idx}>{sub}</div>
                    ))}
                    {subcategories.length > 3 && (
                      <div className="font-medium text-primary">
                        +{subcategories.length - 3} more
                      </div>
                    )}
                  </div>

                  {/* Explore Button */}
                  <Link to={`/category/${category.id}`}>
                    <div className="flex items-center justify-center space-x-1 text-primary font-medium text-sm group-hover:text-warm-green transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* All Categories CTA */}
      </div>
    </section>
  );
};

export default CategoriesSection;
