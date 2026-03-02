function Product({ product }) {
    return (
        <div className="bg-black rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {product.brand}
                </div>
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white leading-tight">
                        {product.name}
                    </h3>
                    <span className="text-lg font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg">
                        ₹{product.price}
                    </span>
                </div>

                <p className="text-white text-sm mt-2 grow leading-relaxed">
                    {product.description}
                </p>
            </div>
        </div>
    );
}

export default Product;
