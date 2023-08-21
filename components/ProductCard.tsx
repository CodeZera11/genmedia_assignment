import { Product } from '@/app/page'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'

const montserrat = Montserrat({
    weight: "900",
    subsets: ["latin"]
})


interface ProductCardProps {
    product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className='flex flex-col border border-gray-500'>
            <Image
                src={product.images[0]}
                alt={product.title}
                width={1000}
                height={1000}
                className='w-full object-fill h-[300px] inset-0'
            />
            <div className='flex flex-col gap-1 px-4 py-2 bg-zinc-900'>
                <h1 className={`${montserrat.className} font-mono text-lg`}>{product.title}</h1>
                <p className='text-gray-400'>₹{product.price}/-</p>
            </div>
        </div>
    )
}

export default ProductCard